import "server-only";

import type { Tables } from "@/lib/supabase/database.types";
import type {
  LocalizedText,
  User,
  VideoLesson,
  LessonSummary,
  VisualizationExampleMeta,
  Quiz,
  QuizQuestion,
  QuizResult,
  LessonProgress,
} from "@/lib/types";

// ─── jsonb → typed helpers ────────────────────────────────────────────────────
const EMPTY_LOCALIZED: LocalizedText = { en: "", ru: "", uz: "" };

export function asLocalized(value: unknown): LocalizedText {
  if (value && typeof value === "object") {
    const v = value as Record<string, unknown>;
    return {
      en: typeof v.en === "string" ? v.en : "",
      ru: typeof v.ru === "string" ? v.ru : "",
      uz: typeof v.uz === "string" ? v.uz : "",
    };
  }
  return { ...EMPTY_LOCALIZED };
}

export function asLocalizedArray(value: unknown): LocalizedText[] {
  return Array.isArray(value) ? value.map(asLocalized) : [];
}

// ─── Row mappers ──────────────────────────────────────────────────────────────
export function mapProfileToUser(row: Tables<"profiles">): User {
  return {
    id: row.id,
    email: row.email,
    phone: row.phone ?? "",
    studentId: row.student_id ?? "",
    firstName: row.first_name,
    surname: row.surname,
    role: row.role,
    avatarUrl: row.avatar_url ?? undefined,
    enrolledAt: row.enrolled_at,
  };
}

export function mapSummary(row: Tables<"lesson_summaries">): LessonSummary {
  return {
    id: row.id,
    lessonId: row.lesson_id,
    sectionTitle: asLocalized(row.section_title),
    paragraphs: asLocalizedArray(row.paragraphs),
    order: row.order_index,
  };
}

export function mapViz(row: Tables<"visualization_examples">): VisualizationExampleMeta {
  return {
    // The UI resolves the diagram via this id against the visualization registry,
    // so the registry key (diagram_id) is the meaningful identifier here.
    id: row.diagram_id,
    lessonId: row.lesson_id,
    title: asLocalized(row.title),
    description: asLocalized(row.description),
    complexity: row.complexity,
    order: row.order_index,
  };
}

export function mapLesson(
  row: Tables<"video_lessons">,
  opts: {
    summaries?: Tables<"lesson_summaries">[];
    viz?: Tables<"visualization_examples">[];
    thumbnailUrl?: string;
    videoUrl?: string;
  } = {}
): VideoLesson {
  return {
    id: row.id,
    title: asLocalized(row.title),
    slug: row.slug,
    category: row.category,
    difficulty: row.difficulty,
    durationMinutes: row.duration_minutes,
    thumbnailUrl:
      opts.thumbnailUrl ??
      row.thumbnail_url ??
      "https://placehold.co/640x360?text=Lesson",
    videoUrl: opts.videoUrl ?? undefined,
    presentationUrl: row.presentation_url ?? undefined,
    order: row.order_index,
    isPublished: row.is_published,
    createdAt: row.created_at,
    tags: asLocalizedArray(row.tags),
    summaries: (opts.summaries ?? []).map(mapSummary).sort((a, b) => a.order - b.order),
    visualizationExamples: (opts.viz ?? [])
      .map(mapViz)
      .sort((a, b) => a.order - b.order),
  };
}

/** Public question shape (no answer/explanation) returned by get_quiz_questions. */
type PublicQuestionRow = {
  id: string;
  quiz_id: string;
  type: Tables<"quiz_questions">["type"];
  prompt: unknown;
  options: unknown;
  image_url: string | null;
  points: number;
  order_index: number;
};

export function mapPublicQuestion(row: PublicQuestionRow): QuizQuestion {
  const options = Array.isArray(row.options)
    ? (row.options as { value: string; label: unknown }[]).map((o) => ({
        value: String(o.value),
        label: asLocalized(o.label),
      }))
    : undefined;
  return {
    id: row.id,
    type: row.type,
    prompt: asLocalized(row.prompt),
    imageUrl: row.image_url ?? undefined,
    options,
    // Answers are never sent to the client during a quiz; the result screen
    // hydrates these from get_quiz_review after submission.
    correctAnswer: "",
    explanation: { ...EMPTY_LOCALIZED },
    points: row.points,
  };
}

/** Full question shape (incl. answer) for staff editing in the studio. */
export function mapStaffQuestion(row: Tables<"quiz_questions">): QuizQuestion {
  const options = Array.isArray(row.options)
    ? (row.options as { value: string; label: unknown }[]).map((o) => ({
        value: String(o.value),
        label: asLocalized(o.label),
      }))
    : undefined;
  return {
    id: row.id,
    type: row.type,
    prompt: asLocalized(row.prompt),
    imageUrl: row.image_url ?? undefined,
    options,
    correctAnswer: row.correct_answer as string | string[],
    explanation: asLocalized(row.explanation),
    points: row.points,
  };
}

export function mapQuiz(
  row: Tables<"quizzes">,
  questions: QuizQuestion[]
): Quiz {
  return {
    id: row.id,
    lessonId: row.lesson_id,
    title: asLocalized(row.title),
    description: asLocalized(row.description),
    questions,
    passingScore: row.passing_score,
    timeLimitMinutes: row.time_limit_minutes ?? undefined,
  };
}

export function mapQuizResult(row: Tables<"quiz_results">): QuizResult {
  return {
    id: row.id,
    userId: row.user_id,
    quizId: row.quiz_id,
    score: row.score,
    maxScore: row.max_score,
    percentage: row.percentage,
    passed: row.passed,
    answers: (row.answers as Record<string, string | string[]>) ?? {},
    completedAt: row.completed_at,
    timeSpentSeconds: row.time_spent_seconds,
  };
}

export function mapProgress(row: Tables<"progress_tracking">): LessonProgress {
  return {
    lessonId: row.lesson_id,
    userId: row.user_id,
    status: row.status,
    progressPercent: row.progress_percent,
    lastViewedAt: row.last_viewed_at ?? undefined,
    completedAt: row.completed_at ?? undefined,
    watchedSeconds: row.watched_seconds,
    quizBestScore: row.quiz_best_score ?? undefined,
  };
}
