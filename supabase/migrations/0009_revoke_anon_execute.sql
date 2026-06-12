-- 0009_revoke_anon_execute.sql
-- Supabase default privileges grant EXECUTE directly to anon/authenticated on
-- functions owned by postgres, so revoking PUBLIC (0008) was insufficient.
-- Explicitly revoke anon from every definer function that must require a session.
-- get_email_for_student_id stays anon-callable (pre-auth student-id login).

revoke execute on function public.current_user_role() from anon;
revoke execute on function public.is_admin() from anon;
revoke execute on function public.is_staff() from anon;
revoke execute on function public.submit_quiz(uuid, jsonb, integer) from anon;
revoke execute on function public.get_quiz_review(uuid) from anon;
revoke execute on function public.get_quiz_questions(uuid) from anon;

-- Event-trigger helper: not meant to be invoked as an RPC by anyone.
revoke execute on function public.rls_auto_enable() from anon, authenticated, public;
