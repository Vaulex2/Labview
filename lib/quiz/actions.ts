"use server";

import { createClient } from "@/lib/supabase/server";
import { mapQuizResult, asLocalized } from "@/lib/data/mappers";
import type { QuizResult, LocalizedText } from "@/lib/types";

export interface QuizReviewItem {
  questionId: string;
  correctAnswer: string | string[];
  explanation: LocalizedText;
}

export type SubmitQuizResult =
  | { ok: true; result: QuizResult; review: QuizReviewItem[] }
  | { ok: false; error: string };

/**
 * Grade and persist a quiz attempt. Scoring happens server-side in the
 * submit_quiz RPC (the only path that can read correct answers); the answer key
 * is then revealed for the result screen via get_quiz_review.
 */
export async function submitQuiz(
  quizId: string,
  answers: Record<string, string | string[]>,
  timeSpentSeconds: number
): Promise<SubmitQuizResult> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("submit_quiz", {
    p_quiz_id: quizId,
    p_answers: answers,
    p_time_spent: Math.max(0, Math.round(timeSpentSeconds)),
  });
  if (error || !data) return { ok: false, error: "submitFailed" };

  const { data: review } = await supabase.rpc("get_quiz_review", {
    p_quiz_id: quizId,
  });

  return {
    ok: true,
    result: mapQuizResult(data),
    review: (review ?? []).map((r) => ({
      questionId: r.question_id,
      correctAnswer: r.correct_answer as string | string[],
      explanation: asLocalized(r.explanation),
    })),
  };
}
