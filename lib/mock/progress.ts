import type { LessonProgress, UserDashboard } from "@/lib/types";
import { MOCK_USER } from "./users";
import { MOCK_LESSONS } from "./lessons";
import { MOCK_QUIZ_RESULTS } from "./quizzes";

export const MOCK_PROGRESS: LessonProgress[] = [];

export const MOCK_DASHBOARD: UserDashboard = {
  user: MOCK_USER,
  totalLessons: MOCK_LESSONS.length,
  completedLessons: 0,
  inProgressLessons: 0,
  averageQuizScore: 0,
  currentStreak: 0,
  recentLessons: [],
  recommendedLessons: [],
  lessonProgress: MOCK_PROGRESS,
  recentQuizResults: MOCK_QUIZ_RESULTS,
};

export function getProgressForLesson(lessonId: string): LessonProgress | undefined {
  return MOCK_PROGRESS.find((p) => p.lessonId === lessonId);
}
