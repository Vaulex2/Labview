import "server-only";

import { unstable_cache } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { mapQuiz, mapPublicQuestion, asLocalized } from "@/lib/data/mappers";
import type { Tables } from "@/lib/supabase/database.types";
import type { Quiz, LocalizedText, LessonCategory } from "@/lib/types";

export interface QuizListEntry {
  quizId: string;
  lessonId: string;
  quizTitle: LocalizedText;
  lessonTitle: LocalizedText;
  category: LessonCategory;
  difficulty: "beginner" | "intermediate" | "advanced";
  questionCount: number;
  passingScore: number;
  timeLimitMinutes?: number;
}

// Quiz content is answer-free and identical for everyone, so — like the lesson
// catalog — it's read cookie-free with the service-role client and cached across
// requests. The `is_published` join filter preserves the boundary RLS enforced
// (the admin client bypasses RLS). Per-user grades live in progress.ts.

/** Quizzes whose lesson is published, paired with lesson info, in curriculum order. */
export const listPublishedQuizzes = unstable_cache(
  async (): Promise<QuizListEntry[]> => {
    const admin = createAdminClient();
    const { data } = await admin
      .from("quizzes")
      .select("*, video_lessons!inner(title, category, difficulty, order_index, is_published)")
      .eq("video_lessons.is_published", true);

    type QuizRow = {
      id: string;
      lesson_id: string;
      title: unknown;
      passing_score: number;
      time_limit_minutes: number | null;
      video_lessons: {
        title: unknown;
        category: LessonCategory;
        difficulty: "beginner" | "intermediate" | "advanced";
        order_index: number;
      };
    };
    const rows = (data ?? []) as unknown as QuizRow[];

    const counts = await Promise.all(
      rows.map((q) => admin.rpc("get_quiz_questions", { p_quiz_id: q.id }))
    );

    return rows
      .map((q, i) => ({
        quizId: q.id,
        lessonId: q.lesson_id,
        quizTitle: asLocalized(q.title),
        lessonTitle: asLocalized(q.video_lessons.title),
        category: q.video_lessons.category,
        difficulty: q.video_lessons.difficulty,
        questionCount: counts[i].data?.length ?? 0,
        passingScore: q.passing_score,
        timeLimitMinutes: q.time_limit_minutes ?? undefined,
        _order: q.video_lessons.order_index,
      }))
      .sort((a, b) => a._order - b._order)
      .map(({ _order, ...e }) => e);
  },
  ["published-quizzes"],
  { revalidate: 3600, tags: ["quizzes"] }
);

/** Answer-free quiz for a learner to take, fetched via the get_quiz_questions RPC. */
export const getQuizById = unstable_cache(
  async (quizId: string): Promise<Quiz | null> => {
    const admin = createAdminClient();
    // Quiz row (guarded to published lessons) and questions run in parallel —
    // both key off quizId, so there's no need to wait for the row first.
    const [{ data: quiz }, { data: questions }] = await Promise.all([
      admin
        .from("quizzes")
        .select("*, video_lessons!inner(is_published)")
        .eq("id", quizId)
        .eq("video_lessons.is_published", true)
        .maybeSingle(),
      admin.rpc("get_quiz_questions", { p_quiz_id: quizId }),
    ]);
    if (!quiz) return null;
    return mapQuiz(quiz as unknown as Tables<"quizzes">, (questions ?? []).map(mapPublicQuestion));
  },
  ["quiz-by-id"],
  { revalidate: 3600, tags: ["quizzes"] }
);

/** The quiz attached to a lesson (answer-free). */
export const getQuizByLessonId = unstable_cache(
  async (lessonId: string): Promise<Quiz | null> => {
    const admin = createAdminClient();
    const { data: quiz } = await admin
      .from("quizzes")
      .select("*, video_lessons!inner(is_published)")
      .eq("lesson_id", lessonId)
      .eq("video_lessons.is_published", true)
      .maybeSingle();
    if (!quiz) return null;

    const { data: questions } = await admin.rpc("get_quiz_questions", {
      p_quiz_id: quiz.id,
    });
    return mapQuiz(quiz as unknown as Tables<"quizzes">, (questions ?? []).map(mapPublicQuestion));
  },
  ["quiz-by-lesson"],
  { revalidate: 3600, tags: ["quizzes"] }
);
