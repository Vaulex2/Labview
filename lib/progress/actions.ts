"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Record/refresh a learner's progress on a lesson. Runs under the user's RLS
 * (progress_insert / progress_update enforce user_id = auth.uid()).
 */
export async function updateLessonProgress(input: {
  lessonId: string;
  progressPercent?: number;
  watchedSeconds?: number;
  completed?: boolean;
}): Promise<{ ok: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false };

  const percent = Math.min(100, Math.max(0, Math.round(input.progressPercent ?? 0)));
  const status = input.completed
    ? "completed"
    : percent > 0
      ? "in-progress"
      : "not-started";

  const { error } = await supabase.from("progress_tracking").upsert(
    {
      user_id: user.id,
      lesson_id: input.lessonId,
      status,
      progress_percent: input.completed ? 100 : percent,
      watched_seconds: Math.max(0, Math.round(input.watchedSeconds ?? 0)),
      last_viewed_at: new Date().toISOString(),
      completed_at: input.completed ? new Date().toISOString() : null,
    },
    { onConflict: "user_id,lesson_id" }
  );

  return { ok: !error };
}
