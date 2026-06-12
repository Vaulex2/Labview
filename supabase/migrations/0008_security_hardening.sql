-- 0008_security_hardening.sql
-- Resolves advisor findings from 0001-0007:
--   * Replace the SECURITY DEFINER view (lint ERROR) with an answer-free RPC.
--   * Pin search_path on the two remaining trigger functions.
--   * Revoke PostgreSQL's default PUBLIC execute grant so anon cannot reach
--     internal/definer functions it was never meant to call.

-- ── 1. Drop the definer view; expose published questions via a definer RPC ─────
drop view if exists public.quiz_questions_public;

-- Returns published quiz questions WITHOUT correct_answer / explanation.
-- Students take quizzes through this; answers are revealed only post-attempt
-- via get_quiz_review() and grading runs server-side in submit_quiz().
create or replace function public.get_quiz_questions(p_quiz_id uuid)
returns table (
  id          uuid,
  quiz_id     uuid,
  type        public.question_type,
  prompt      jsonb,
  options     jsonb,
  image_url   text,
  points      integer,
  order_index integer
)
language sql
stable
security definer
set search_path = ''
as $$
  select qq.id, qq.quiz_id, qq.type, qq.prompt, qq.options,
         qq.image_url, qq.points, qq.order_index
  from public.quiz_questions qq
  join public.quizzes qz on qz.id = qq.quiz_id
  join public.video_lessons l on l.id = qz.lesson_id
  where qq.quiz_id = p_quiz_id and l.is_published = true
  order by qq.order_index;
$$;

-- ── 2. Pin search_path on the remaining mutable functions ─────────────────────
alter function public.set_updated_at() set search_path = '';
alter function public.prevent_role_escalation() set search_path = '';

-- ── 3. Lock down EXECUTE: drop the implicit PUBLIC grant, then grant precisely ─
-- Internal helpers used by RLS — authenticated only (required for policy eval).
revoke execute on function public.current_user_role() from public;
revoke execute on function public.is_admin() from public;
revoke execute on function public.is_staff() from public;
grant execute on function public.current_user_role() to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_staff() to authenticated;

-- App RPCs — authenticated only.
revoke execute on function public.submit_quiz(uuid, jsonb, integer) from public;
revoke execute on function public.get_quiz_review(uuid) from public;
revoke execute on function public.get_quiz_questions(uuid) from public;
grant execute on function public.submit_quiz(uuid, jsonb, integer) to authenticated;
grant execute on function public.get_quiz_review(uuid) to authenticated;
grant execute on function public.get_quiz_questions(uuid) to authenticated;

-- Login resolver — intentionally callable by anon (pre-auth student-id login).
revoke execute on function public.get_email_for_student_id(text) from public;
grant execute on function public.get_email_for_student_id(text) to anon, authenticated;

-- Trigger-only functions must never be callable as RPCs.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.audit_trigger() from public, anon, authenticated;
revoke execute on function public.prevent_role_escalation() from public, anon, authenticated;
