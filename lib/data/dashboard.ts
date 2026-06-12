import "server-only";

import { getSessionUser } from "@/lib/auth/session";
import { listLessons } from "@/lib/data/lessons";
import { getMyProgress, getMyRecentQuizResults } from "@/lib/data/progress";
import type { UserDashboard } from "@/lib/types";

/** Aggregated dashboard for the current learner. Returns null if unauthenticated. */
export async function getDashboard(): Promise<UserDashboard | null> {
  const user = await getSessionUser();
  if (!user) return null;

  const [lessons, progress, recentQuizResults] = await Promise.all([
    listLessons(),
    getMyProgress(),
    getMyRecentQuizResults(5),
  ]);

  const completedLessons = progress.filter((p) => p.status === "completed").length;
  const inProgressLessons = progress.filter((p) => p.status === "in-progress").length;

  const scored = recentQuizResults.length
    ? Math.round(
        recentQuizResults.reduce((sum, r) => sum + r.percentage, 0) /
          recentQuizResults.length
      )
    : 0;

  const startedIds = new Set(progress.map((p) => p.lessonId));
  const recommendedLessons = lessons.filter((l) => !startedIds.has(l.id)).slice(0, 3);
  const recentLessons = lessons.slice(0, 3);

  return {
    user,
    totalLessons: lessons.length,
    completedLessons,
    inProgressLessons,
    averageQuizScore: scored,
    currentStreak: 0,
    recentLessons,
    recommendedLessons,
    lessonProgress: progress,
    recentQuizResults,
  };
}
