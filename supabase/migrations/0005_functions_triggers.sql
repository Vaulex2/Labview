-- 0005_functions_triggers.sql
-- Security-definer helpers, the new-user trigger, the student-id login resolver,
-- the server-side quiz grading RPC, the JWT role hook, and the audit trigger.

-- ─── handle_new_user: create a profile row when an auth user signs up ──────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, phone, student_id, first_name, surname)
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data ->> 'phone', ''),
    nullif(new.raw_user_meta_data ->> 'student_id', ''),
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'surname', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── RLS helper functions (SECURITY DEFINER avoids recursive policy eval) ──────
create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = ''
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.current_user_role() = 'admin', false);
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.current_user_role() in ('teacher', 'admin'), false);
$$;

grant execute on function public.current_user_role() to authenticated, anon;
grant execute on function public.is_admin() to authenticated, anon;
grant execute on function public.is_staff() to authenticated, anon;

-- ─── get_email_for_student_id: lets anon resolve a student-id login ────────────
-- Returns the email for an exact student_id match so signInWithPassword can run.
create or replace function public.get_email_for_student_id(p_student_id text)
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select email from public.profiles where student_id = p_student_id limit 1;
$$;

grant execute on function public.get_email_for_student_id(text) to anon, authenticated;

-- ─── submit_quiz: the ONLY path that reads correct answers and writes results ──
create or replace function public.submit_quiz(
  p_quiz_id uuid,
  p_answers jsonb,
  p_time_spent integer default 0
)
returns public.quiz_results
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_lesson_id uuid;
  v_passing integer;
  v_score integer := 0;
  v_max integer := 0;
  v_pct integer := 0;
  v_passed boolean := false;
  q record;
  v_submitted jsonb;
  v_result public.quiz_results;
begin
  if v_user_id is null then
    raise exception 'not authenticated';
  end if;

  select lesson_id, passing_score into v_lesson_id, v_passing
  from public.quizzes where id = p_quiz_id;

  if v_lesson_id is null then
    raise exception 'quiz not found';
  end if;

  for q in
    select id, correct_answer, points
    from public.quiz_questions
    where quiz_id = p_quiz_id
  loop
    v_max := v_max + q.points;
    v_submitted := p_answers -> (q.id::text);

    if v_submitted is not null then
      if jsonb_typeof(q.correct_answer) = 'array' then
        -- order-independent set comparison for multi-answer questions
        if (
          select coalesce(array_agg(value order by value), '{}')
          from jsonb_array_elements_text(v_submitted)
        ) = (
          select coalesce(array_agg(value order by value), '{}')
          from jsonb_array_elements_text(q.correct_answer)
        ) then
          v_score := v_score + q.points;
        end if;
      else
        if v_submitted = q.correct_answer then
          v_score := v_score + q.points;
        end if;
      end if;
    end if;
  end loop;

  if v_max > 0 then
    v_pct := round((v_score::numeric / v_max::numeric) * 100);
  end if;
  v_passed := v_pct >= coalesce(v_passing, 70);

  insert into public.quiz_results
    (user_id, quiz_id, score, max_score, percentage, passed, answers, time_spent_seconds)
  values
    (v_user_id, p_quiz_id, v_score, v_max, v_pct, v_passed, coalesce(p_answers, '{}'::jsonb), greatest(p_time_spent, 0))
  returning * into v_result;

  -- keep the learner's best score on the lesson's progress row
  insert into public.progress_tracking (user_id, lesson_id, quiz_best_score, status, progress_percent)
  values (v_user_id, v_lesson_id, v_pct, 'in-progress', 0)
  on conflict (user_id, lesson_id) do update
    set quiz_best_score = greatest(public.progress_tracking.quiz_best_score, excluded.quiz_best_score),
        updated_at = now();

  return v_result;
end;
$$;

grant execute on function public.submit_quiz(uuid, jsonb, integer) to authenticated;

-- ─── get_quiz_review: reveal answers/explanations ONLY after an attempt ────────
-- Lets the result screen show correct answers + explanations, but only for a
-- quiz the caller has already submitted. Students never see answers beforehand.
create or replace function public.get_quiz_review(p_quiz_id uuid)
returns table (question_id uuid, correct_answer jsonb, explanation jsonb)
language sql
stable
security definer
set search_path = ''
as $$
  select qq.id, qq.correct_answer, qq.explanation
  from public.quiz_questions qq
  where qq.quiz_id = p_quiz_id
    and exists (
      select 1 from public.quiz_results r
      where r.quiz_id = p_quiz_id and r.user_id = auth.uid()
    );
$$;

grant execute on function public.get_quiz_review(uuid) to authenticated;

-- ─── prevent_role_escalation: block self-promotion via the public API ─────────
-- Trusted contexts (service role, MCP/SQL console, definer functions) run with a
-- null auth.uid() and are allowed; an authenticated non-admin cannot change their
-- own role or status.
create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
as $$
begin
  if auth.uid() is not null
     and not public.is_admin()
     and (new.role is distinct from old.role or new.status is distinct from old.status) then
    raise exception 'not authorized to change role or status';
  end if;
  return new;
end;
$$;

create trigger profiles_prevent_role_escalation
  before update on public.profiles
  for each row execute function public.prevent_role_escalation();

-- ─── Custom Access Token Hook: embed user_role into the JWT ────────────────────
-- Enables role checks at the edge (proxy.ts). Must be enabled in
-- Dashboard → Authentication → Hooks → Custom Access Token (or via auth config).
create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_role public.user_role;
  v_claims jsonb;
begin
  select role into v_role from public.profiles where id = (event ->> 'user_id')::uuid;
  v_claims := event -> 'claims';
  v_claims := jsonb_set(v_claims, '{user_role}', to_jsonb(coalesce(v_role::text, 'student')));
  return jsonb_set(event, '{claims}', v_claims);
end;
$$;

grant execute on function public.custom_access_token_hook(jsonb) to supabase_auth_admin;
revoke execute on function public.custom_access_token_hook(jsonb) from authenticated, anon, public;
grant usage on schema public to supabase_auth_admin;
grant select on table public.profiles to supabase_auth_admin;

-- ─── Audit trigger: record create/update/delete on sensitive tables ───────────
create or replace function public.audit_trigger()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_entity_id text;
begin
  v_entity_id := coalesce((to_jsonb(new) ->> 'id'), (to_jsonb(old) ->> 'id'));
  insert into public.audit_logs (actor_id, action, entity, entity_id, detail)
  values (
    auth.uid(),
    lower(tg_table_name) || '.' || lower(tg_op),
    tg_table_name,
    v_entity_id,
    case when tg_op = 'DELETE' then to_jsonb(old) else to_jsonb(new) end
  );
  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

create trigger audit_video_lessons
  after insert or update or delete on public.video_lessons
  for each row execute function public.audit_trigger();

create trigger audit_quizzes
  after insert or update or delete on public.quizzes
  for each row execute function public.audit_trigger();

create trigger audit_quiz_questions
  after insert or update or delete on public.quiz_questions
  for each row execute function public.audit_trigger();
