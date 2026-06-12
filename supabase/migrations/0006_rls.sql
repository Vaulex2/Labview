-- 0006_rls.sql
-- Default-deny RLS on every table, then explicit policies. ENABLE + FORCE so the
-- table owner is also subject to policies; service_role / postgres bypass via
-- BYPASSRLS, and SECURITY DEFINER helpers use that to read profiles safely.

-- ─── Enable + force RLS everywhere ────────────────────────────────────────────
alter table public.profiles                enable row level security;
alter table public.profiles                force row level security;
alter table public.video_lessons           enable row level security;
alter table public.video_lessons           force row level security;
alter table public.lesson_summaries        enable row level security;
alter table public.lesson_summaries        force row level security;
alter table public.visualization_examples  enable row level security;
alter table public.visualization_examples  force row level security;
alter table public.quizzes                 enable row level security;
alter table public.quizzes                 force row level security;
alter table public.quiz_questions          enable row level security;
alter table public.quiz_questions          force row level security;
alter table public.progress_tracking       enable row level security;
alter table public.progress_tracking       force row level security;
alter table public.quiz_results            enable row level security;
alter table public.quiz_results            force row level security;
alter table public.visualization_sessions  enable row level security;
alter table public.visualization_sessions  force row level security;
alter table public.notifications           enable row level security;
alter table public.notifications           force row level security;
alter table public.analytics_logs          enable row level security;
alter table public.analytics_logs          force row level security;
alter table public.error_logs              enable row level security;
alter table public.error_logs              force row level security;
alter table public.audit_logs              enable row level security;
alter table public.audit_logs              force row level security;
alter table public.system_settings         enable row level security;
alter table public.system_settings         force row level security;

-- ─── profiles ─────────────────────────────────────────────────────────────────
create policy profiles_select on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_admin());

create policy profiles_update_own on public.profiles
  for update to authenticated
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

create policy profiles_delete_admin on public.profiles
  for delete to authenticated
  using (public.is_admin());

-- ─── video_lessons ────────────────────────────────────────────────────────────
create policy video_lessons_select on public.video_lessons
  for select to authenticated
  using (is_published or created_by = auth.uid() or public.is_admin());

create policy video_lessons_insert on public.video_lessons
  for insert to authenticated
  with check (public.is_staff() and created_by = auth.uid());

create policy video_lessons_update on public.video_lessons
  for update to authenticated
  using (created_by = auth.uid() or public.is_admin())
  with check (created_by = auth.uid() or public.is_admin());

create policy video_lessons_delete on public.video_lessons
  for delete to authenticated
  using (created_by = auth.uid() or public.is_admin());

-- ─── helper predicates expressed inline as EXISTS on the parent lesson ─────────
-- lesson_summaries
create policy lesson_summaries_select on public.lesson_summaries
  for select to authenticated
  using (exists (
    select 1 from public.video_lessons l
    where l.id = lesson_id and (l.is_published or l.created_by = auth.uid() or public.is_admin())
  ));

create policy lesson_summaries_write on public.lesson_summaries
  for all to authenticated
  using (exists (
    select 1 from public.video_lessons l
    where l.id = lesson_id and (l.created_by = auth.uid() or public.is_admin())
  ))
  with check (exists (
    select 1 from public.video_lessons l
    where l.id = lesson_id and (l.created_by = auth.uid() or public.is_admin())
  ));

-- visualization_examples
create policy visualization_examples_select on public.visualization_examples
  for select to authenticated
  using (exists (
    select 1 from public.video_lessons l
    where l.id = lesson_id and (l.is_published or l.created_by = auth.uid() or public.is_admin())
  ));

create policy visualization_examples_write on public.visualization_examples
  for all to authenticated
  using (exists (
    select 1 from public.video_lessons l
    where l.id = lesson_id and (l.created_by = auth.uid() or public.is_admin())
  ))
  with check (exists (
    select 1 from public.video_lessons l
    where l.id = lesson_id and (l.created_by = auth.uid() or public.is_admin())
  ));

-- ─── quizzes ──────────────────────────────────────────────────────────────────
create policy quizzes_select on public.quizzes
  for select to authenticated
  using (exists (
    select 1 from public.video_lessons l
    where l.id = lesson_id and (l.is_published or l.created_by = auth.uid() or public.is_admin())
  ));

create policy quizzes_insert on public.quizzes
  for insert to authenticated
  with check (public.is_staff() and created_by = auth.uid());

create policy quizzes_update on public.quizzes
  for update to authenticated
  using (created_by = auth.uid() or public.is_admin())
  with check (created_by = auth.uid() or public.is_admin());

create policy quizzes_delete on public.quizzes
  for delete to authenticated
  using (created_by = auth.uid() or public.is_admin());

-- ─── quiz_questions (SENSITIVE) ───────────────────────────────────────────────
-- No student SELECT policy: students read questions via the answer-free
-- public.quiz_questions_public view and grade through submit_quiz(). Only the
-- owning staff member / admin can select full rows (incl. correct_answer).
create policy quiz_questions_staff_select on public.quiz_questions
  for select to authenticated
  using (exists (
    select 1 from public.quizzes qz
    join public.video_lessons l on l.id = qz.lesson_id
    where qz.id = quiz_id and (l.created_by = auth.uid() or public.is_admin())
  ));

create policy quiz_questions_write on public.quiz_questions
  for all to authenticated
  using (exists (
    select 1 from public.quizzes qz
    join public.video_lessons l on l.id = qz.lesson_id
    where qz.id = quiz_id and (l.created_by = auth.uid() or public.is_admin())
  ))
  with check (exists (
    select 1 from public.quizzes qz
    join public.video_lessons l on l.id = qz.lesson_id
    where qz.id = quiz_id and (l.created_by = auth.uid() or public.is_admin())
  ));

-- Answer-free view for students taking a quiz (owner = postgres → bypasses RLS,
-- but limited to published lessons here). correct_answer/explanation omitted.
create view public.quiz_questions_public
with (security_invoker = off) as
  select qq.id, qq.quiz_id, qq.type, qq.prompt, qq.options,
         qq.image_url, qq.points, qq.order_index
  from public.quiz_questions qq
  join public.quizzes qz on qz.id = qq.quiz_id
  join public.video_lessons l on l.id = qz.lesson_id
  where l.is_published = true;

grant select on public.quiz_questions_public to authenticated, anon;

-- ─── progress_tracking ────────────────────────────────────────────────────────
create policy progress_select on public.progress_tracking
  for select to authenticated
  using (
    user_id = auth.uid()
    or public.is_admin()
    or exists (select 1 from public.video_lessons l where l.id = lesson_id and l.created_by = auth.uid())
  );

create policy progress_insert on public.progress_tracking
  for insert to authenticated
  with check (user_id = auth.uid());

create policy progress_update on public.progress_tracking
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy progress_delete on public.progress_tracking
  for delete to authenticated
  using (public.is_admin());

-- ─── quiz_results (insert only via submit_quiz) ───────────────────────────────
create policy quiz_results_select on public.quiz_results
  for select to authenticated
  using (
    user_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.quizzes qz
      join public.video_lessons l on l.id = qz.lesson_id
      where qz.id = quiz_id and l.created_by = auth.uid()
    )
  );
-- No INSERT/UPDATE policy for clients: scores are written only by submit_quiz()
-- (SECURITY DEFINER, bypasses RLS), preventing score spoofing.
create policy quiz_results_delete on public.quiz_results
  for delete to authenticated
  using (public.is_admin());

-- ─── visualization_sessions ───────────────────────────────────────────────────
create policy viz_sessions_select on public.visualization_sessions
  for select to authenticated
  using (
    user_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.visualization_examples e
      join public.video_lessons l on l.id = e.lesson_id
      where e.id = example_id and l.created_by = auth.uid()
    )
  );

create policy viz_sessions_insert on public.visualization_sessions
  for insert to authenticated
  with check (user_id = auth.uid());

-- ─── notifications ────────────────────────────────────────────────────────────
create policy notifications_select on public.notifications
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

create policy notifications_update_own on public.notifications
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy notifications_insert_admin on public.notifications
  for insert to authenticated
  with check (public.is_admin());

create policy notifications_delete on public.notifications
  for delete to authenticated
  using (user_id = auth.uid() or public.is_admin());

-- ─── analytics_logs / error_logs (insert by self, read by admin) ──────────────
create policy analytics_logs_insert on public.analytics_logs
  for insert to authenticated
  with check (user_id = auth.uid() or user_id is null);

create policy analytics_logs_select on public.analytics_logs
  for select to authenticated
  using (public.is_admin());

create policy error_logs_insert on public.error_logs
  for insert to authenticated
  with check (user_id = auth.uid() or user_id is null);

create policy error_logs_select on public.error_logs
  for select to authenticated
  using (public.is_admin());

-- ─── audit_logs (written by trigger only, read by staff/admin) ────────────────
create policy audit_logs_select on public.audit_logs
  for select to authenticated
  using (public.is_staff());

-- ─── system_settings (admin only) ─────────────────────────────────────────────
create policy system_settings_all on public.system_settings
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());
