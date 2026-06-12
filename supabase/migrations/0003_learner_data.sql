-- 0003_learner_data.sql
-- Per-learner data: progress, quiz results, visualization sessions, notifications.

create type public.progress_status as enum ('not-started', 'in-progress', 'completed');

-- ─── progress_tracking ────────────────────────────────────────────────────────
create table public.progress_tracking (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references public.profiles (id) on delete cascade,
  lesson_id        uuid not null references public.video_lessons (id) on delete cascade,
  status           public.progress_status not null default 'not-started',
  progress_percent integer not null default 0 check (progress_percent between 0 and 100),
  watched_seconds  integer not null default 0 check (watched_seconds >= 0),
  quiz_best_score  integer check (quiz_best_score between 0 and 100),
  last_viewed_at   timestamptz,
  completed_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create index progress_tracking_user_id_idx on public.progress_tracking (user_id);
create index progress_tracking_lesson_id_idx on public.progress_tracking (lesson_id);

create trigger progress_tracking_set_updated_at
  before update on public.progress_tracking
  for each row execute function public.set_updated_at();

-- ─── quiz_results ─────────────────────────────────────────────────────────────
-- Written only by the submit_quiz() RPC (0005), never directly by clients.
create table public.quiz_results (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references public.profiles (id) on delete cascade,
  quiz_id            uuid not null references public.quizzes (id) on delete cascade,
  score              integer not null,
  max_score          integer not null,
  percentage         integer not null,
  passed             boolean not null,
  answers            jsonb not null default '{}'::jsonb,   -- Record<questionId, answer>
  time_spent_seconds integer not null default 0,
  completed_at       timestamptz not null default now()
);

create index quiz_results_user_id_idx on public.quiz_results (user_id);
create index quiz_results_quiz_id_idx on public.quiz_results (quiz_id);

-- ─── visualization_sessions ───────────────────────────────────────────────────
create table public.visualization_sessions (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references public.profiles (id) on delete cascade,
  example_id       uuid not null references public.visualization_examples (id) on delete cascade,
  duration_seconds integer not null default 0,
  animation_speed  numeric(4,2) not null default 1.0,
  interactions     jsonb not null default '{}'::jsonb,
  created_at       timestamptz not null default now()
);

create index visualization_sessions_user_id_idx on public.visualization_sessions (user_id);
create index visualization_sessions_example_id_idx on public.visualization_sessions (example_id);

-- ─── notifications ────────────────────────────────────────────────────────────
create table public.notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles (id) on delete cascade,
  payload    jsonb not null default '{}'::jsonb,
  read_at    timestamptz,
  created_at timestamptz not null default now()
);

create index notifications_user_id_idx on public.notifications (user_id);
