-- 0002_content.sql
-- Content tables: lessons + their child rows (summaries, visualization examples,
-- quizzes, quiz questions). Localized text is stored as jsonb {en,ru,uz}.

create type public.lesson_category as enum (
  'loops', 'arrays', 'clusters', 'arithmetic', 'boolean', 'events',
  'waveforms', 'subvi', 'structures', 'data-types', 'debugging'
);
create type public.lesson_difficulty as enum ('beginner', 'intermediate', 'advanced');
create type public.question_type as enum (
  'multiple-choice', 'drag-drop', 'output-prediction', 'labview-analysis'
);
create type public.viz_complexity as enum ('simple', 'advanced');

-- ─── video_lessons ────────────────────────────────────────────────────────────
create table public.video_lessons (
  id               uuid primary key default gen_random_uuid(),
  title            jsonb not null,                      -- LocalizedText
  slug             text unique not null,
  category         public.lesson_category not null,
  difficulty       public.lesson_difficulty not null default 'beginner',
  duration_minutes integer not null default 0 check (duration_minutes >= 0),
  thumbnail_url    text,                                -- storage path (thumbnails bucket)
  video_path       text,                                -- storage path (lesson-videos bucket)
  presentation_url text,
  tags             jsonb not null default '[]'::jsonb,  -- LocalizedText[]
  order_index      integer not null default 0,
  is_published     boolean not null default false,
  created_by       uuid references public.profiles (id) on delete set null,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index video_lessons_category_idx on public.video_lessons (category);
create index video_lessons_published_idx on public.video_lessons (is_published);
create index video_lessons_created_by_idx on public.video_lessons (created_by);
create index video_lessons_order_idx on public.video_lessons (order_index);

create trigger video_lessons_set_updated_at
  before update on public.video_lessons
  for each row execute function public.set_updated_at();

-- ─── lesson_summaries ─────────────────────────────────────────────────────────
create table public.lesson_summaries (
  id            uuid primary key default gen_random_uuid(),
  lesson_id     uuid not null references public.video_lessons (id) on delete cascade,
  section_title jsonb not null,                          -- LocalizedText
  paragraphs    jsonb not null default '[]'::jsonb,      -- LocalizedText[]
  order_index   integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index lesson_summaries_lesson_id_idx on public.lesson_summaries (lesson_id);

create trigger lesson_summaries_set_updated_at
  before update on public.lesson_summaries
  for each row execute function public.set_updated_at();

-- ─── visualization_examples ───────────────────────────────────────────────────
-- diagram_id maps to a key in lib/visualization/registry.ts (e.g. viz_for_loop_sum).
create table public.visualization_examples (
  id          uuid primary key default gen_random_uuid(),
  lesson_id   uuid not null references public.video_lessons (id) on delete cascade,
  title       jsonb not null,                            -- LocalizedText
  description jsonb not null,                            -- LocalizedText
  complexity  public.viz_complexity not null default 'simple',
  diagram_id  text not null,
  order_index integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index visualization_examples_lesson_id_idx on public.visualization_examples (lesson_id);

create trigger visualization_examples_set_updated_at
  before update on public.visualization_examples
  for each row execute function public.set_updated_at();

-- ─── quizzes ──────────────────────────────────────────────────────────────────
create table public.quizzes (
  id                 uuid primary key default gen_random_uuid(),
  lesson_id          uuid not null references public.video_lessons (id) on delete cascade,
  title              jsonb not null,                     -- LocalizedText
  description        jsonb not null,                     -- LocalizedText
  passing_score      integer not null default 70 check (passing_score between 0 and 100),
  time_limit_minutes integer check (time_limit_minutes is null or time_limit_minutes > 0),
  created_by         uuid references public.profiles (id) on delete set null,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index quizzes_lesson_id_idx on public.quizzes (lesson_id);
create index quizzes_created_by_idx on public.quizzes (created_by);

create trigger quizzes_set_updated_at
  before update on public.quizzes
  for each row execute function public.set_updated_at();

-- ─── quiz_questions ───────────────────────────────────────────────────────────
-- correct_answer is sensitive: never selected by students (see RLS / sanitized
-- access in 0005/0006). options is QuizOption[] {value, label:LocalizedText}.
create table public.quiz_questions (
  id             uuid primary key default gen_random_uuid(),
  quiz_id        uuid not null references public.quizzes (id) on delete cascade,
  type           public.question_type not null,
  prompt         jsonb not null,                          -- LocalizedText
  options        jsonb,                                   -- QuizOption[] | null
  correct_answer jsonb not null,                          -- string | string[]
  explanation    jsonb not null,                          -- LocalizedText
  image_url      text,
  points         integer not null default 1 check (points >= 0),
  order_index    integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index quiz_questions_quiz_id_idx on public.quiz_questions (quiz_id);

create trigger quiz_questions_set_updated_at
  before update on public.quiz_questions
  for each row execute function public.set_updated_at();
