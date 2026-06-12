import "server-only";

import { createClient } from "@/lib/supabase/server";
import { mapProgress, mapQuizResult } from "@/lib/data/mappers";
import type { LessonProgress, QuizResult } from "@/lib/types";

/** All progress rows for the current user. */
export async function getMyProgress(): Promise<LessonProgress[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("progress_tracking")
    .select("*")
    .eq("user_id", user.id);
  return (data ?? []).map(mapProgress);
}

/** Recent quiz results for the current user. */
export async function getMyRecentQuizResults(limit = 5): Promise<QuizResult[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("quiz_results")
    .select("*")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(limit);
  return (data ?? []).map(mapQuizResult);
}
