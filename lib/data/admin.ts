import "server-only";

import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  mapLesson,
  mapQuiz,
  mapStaffQuestion,
  asLocalized,
  asLocalizedArray,
} from "@/lib/data/mappers";
import { cachedSignedUrl, BUCKETS } from "@/lib/data/storage";
import { getSessionUser } from "@/lib/auth/session";
import type { AnalyticsOverview, VideoLesson, Quiz, LocalizedText } from "@/lib/types";
import type { LessonInput, QuizInput } from "@/lib/validation/content";

export interface ManageableLesson {
  lesson: VideoLesson;
  completionRate: number;
  studentCount: number;
}

export interface ManageableQuiz {
  id: string;
  lessonId: string;
  lessonTitle: LocalizedText;
  title: LocalizedText;
  questionCount: number;
}

export interface AuditEntry {
  id: number;
  actor: string;
  action: string;
  entity: string;
  createdAt: string;
}

// ─── Analytics ────────────────────────────────────────────────────────────────

/** Platform analytics for the studio dashboard. Cached 2 min; invalidated on any studio write. */
export const getAnalyticsOverview = unstable_cache(
  async (): Promise<AnalyticsOverview> => {
    const admin = createAdminClient();
    const weekAgo = new Date(Date.now() - 7 * 86_400_000).toISOString();

    const [
      students,
      publishedLessons,
      totalProgress,
      completedProgress,
      activeRows,
      quizScores,
    ] = await Promise.all([
      admin.from("profiles").select("*", { count: "exact", head: true }).eq("role", "student"),
      admin.from("video_lessons").select("*", { count: "exact", head: true }).eq("is_published", true),
      admin.from("progress_tracking").select("*", { count: "exact", head: true }),
      admin.from("progress_tracking").select("*", { count: "exact", head: true }).eq("status", "completed"),
      admin.from("progress_tracking").select("user_id").gte("last_viewed_at", weekAgo),
      admin.from("quiz_results").select("percentage"),
    ]);

    const totalProg = totalProgress.count ?? 0;
    const completedProg = completedProgress.count ?? 0;
    const scores = quizScores.data ?? [];

    return {
      totalStudents: students.count ?? 0,
      activeThisWeek: new Set((activeRows.data ?? []).map((r) => r.user_id)).size,
      lessonsPublished: publishedLessons.count ?? 0,
      averageCompletionRate: totalProg ? Math.round((completedProg / totalProg) * 100) : 0,
      averageQuizScore: scores.length
        ? Math.round(scores.reduce((s, r) => s + (r.percentage ?? 0), 0) / scores.length)
        : 0,
    };
  },
  ["admin-analytics-overview"],
  { revalidate: 120, tags: ["admin-analytics"] }
);

// ─── Lessons ──────────────────────────────────────────────────────────────────

// Cached inner: stores raw DB rows + aggregation, no signed URLs (URLs expire).
const cachedLessonRows = unstable_cache(
  async (userId: string, isAdmin: boolean) => {
    const admin = createAdminClient();
    let query = admin
      .from("video_lessons")
      .select("*")
      .order("order_index", { ascending: true });
    if (!isAdmin) query = query.eq("created_by", userId);

    const { data: rows } = await query;
    const lessons = rows ?? [];
    if (lessons.length === 0) return [];

    const ids = lessons.map((l) => l.id);
    const { data: progress } = await admin
      .from("progress_tracking")
      .select("lesson_id, status")
      .in("lesson_id", ids);

    return lessons.map((row) => {
      const pRows = (progress ?? []).filter((p) => p.lesson_id === row.id);
      const completed = pRows.filter((p) => p.status === "completed").length;
      return {
        row,
        studentCount: pRows.length,
        completionRate: pRows.length ? Math.round((completed / pRows.length) * 100) : 0,
      };
    });
  },
  ["admin-lesson-rows"],
  { revalidate: 120, tags: ["admin-lessons"] }
);

/** Lessons the current staff member may manage (RLS: own for teachers, all for admins). */
export async function listManageableLessons(): Promise<ManageableLesson[]> {
  const user = await getSessionUser();
  if (!user) return [];

  const entries = await cachedLessonRows(user.id, user.role === "admin");

  return Promise.all(
    entries.map(async ({ row, studentCount, completionRate }) => ({
      lesson: mapLesson(row, {
        thumbnailUrl: await cachedSignedUrl(BUCKETS.thumbnails, row.thumbnail_url),
      }),
      studentCount,
      completionRate,
    }))
  );
}

/** Full lesson (incl. unpublished) for the studio editor. */
export async function getLessonForEdit(id: string): Promise<VideoLesson | null> {
  const supabase = await createClient();
  const { data: row } = await supabase
    .from("video_lessons")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!row) return null;

  const [{ data: summaries }, { data: viz }, thumbnailUrl, videoUrl] =
    await Promise.all([
      supabase.from("lesson_summaries").select("*").eq("lesson_id", id),
      supabase.from("visualization_examples").select("*").eq("lesson_id", id),
      cachedSignedUrl(BUCKETS.thumbnails, row.thumbnail_url),
      cachedSignedUrl(BUCKETS.videos, row.video_path),
    ]);

  return mapLesson(row, {
    summaries: summaries ?? [],
    viz: viz ?? [],
    thumbnailUrl,
    videoUrl,
  });
}

// ─── Quizzes ──────────────────────────────────────────────────────────────────

const cachedQuizRows = unstable_cache(
  async (userId: string, isAdmin: boolean): Promise<ManageableQuiz[]> => {
    const admin = createAdminClient();
    let query = admin
      .from("quizzes")
      .select("*, video_lessons(title)")
      .order("created_at", { ascending: false });
    if (!isAdmin) query = query.eq("created_by", userId);

    const { data: quizzes } = await query;
    if (!quizzes || quizzes.length === 0) return [];

    const counts = await Promise.all(
      quizzes.map((q) =>
        admin
          .from("quiz_questions")
          .select("*", { count: "exact", head: true })
          .eq("quiz_id", q.id)
      )
    );

    return quizzes.map((q, i) => ({
      id: q.id,
      lessonId: q.lesson_id,
      lessonTitle: asLocalized(
        (q as { video_lessons?: { title: unknown } }).video_lessons?.title
      ),
      title: asLocalized(q.title),
      questionCount: counts[i].count ?? 0,
    }));
  },
  ["admin-quiz-rows"],
  { revalidate: 120, tags: ["admin-quizzes"] }
);

/** Quizzes the current staff member may manage. */
export async function listManageableQuizzes(): Promise<ManageableQuiz[]> {
  const user = await getSessionUser();
  if (!user) return [];
  return cachedQuizRows(user.id, user.role === "admin");
}

/** Full quiz (incl. correct answers) for the studio editor. */
export async function getQuizForEdit(quizId: string): Promise<Quiz | null> {
  const supabase = await createClient();
  const { data: quiz } = await supabase
    .from("quizzes")
    .select("*")
    .eq("id", quizId)
    .maybeSingle();
  if (!quiz) return null;

  const { data: questions } = await supabase
    .from("quiz_questions")
    .select("*")
    .eq("quiz_id", quizId)
    .order("order_index", { ascending: true });

  return mapQuiz(quiz, (questions ?? []).map(mapStaffQuestion));
}

/** Raw lesson data (storage paths, not signed URLs) shaped for the editor form. */
export async function getLessonEditData(id: string): Promise<LessonInput | null> {
  const supabase = await createClient();
  const { data: row } = await supabase
    .from("video_lessons")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!row) return null;

  const [{ data: summaries }, { data: viz }] = await Promise.all([
    supabase.from("lesson_summaries").select("*").eq("lesson_id", id).order("order_index"),
    supabase.from("visualization_examples").select("*").eq("lesson_id", id).order("order_index"),
  ]);

  return {
    id: row.id,
    title: asLocalized(row.title),
    slug: row.slug,
    category: row.category,
    difficulty: row.difficulty,
    durationMinutes: row.duration_minutes,
    tags: asLocalizedArray(row.tags),
    orderIndex: row.order_index,
    isPublished: row.is_published,
    thumbnailPath: row.thumbnail_url,
    videoPath: row.video_path,
    presentationUrl: row.presentation_url,
    summaries: (summaries ?? []).map((s) => ({
      id: s.id,
      sectionTitle: asLocalized(s.section_title),
      paragraphs: asLocalizedArray(s.paragraphs),
      order: s.order_index,
    })),
    vizExamples: (viz ?? []).map((v) => ({
      id: v.id,
      title: asLocalized(v.title),
      description: asLocalized(v.description),
      complexity: v.complexity,
      diagramId: v.diagram_id,
      order: v.order_index,
    })),
  };
}

/** Raw quiz data (incl. answers) shaped for the editor form. */
export async function getQuizEditData(id: string): Promise<QuizInput | null> {
  const supabase = await createClient();
  const { data: quiz } = await supabase
    .from("quizzes")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!quiz) return null;

  const { data: questions } = await supabase
    .from("quiz_questions")
    .select("*")
    .eq("quiz_id", id)
    .order("order_index");

  return {
    id: quiz.id,
    lessonId: quiz.lesson_id,
    title: asLocalized(quiz.title),
    description: asLocalized(quiz.description),
    passingScore: quiz.passing_score,
    timeLimitMinutes: quiz.time_limit_minutes,
    questions: (questions ?? []).map((q) => ({
      id: q.id,
      type: q.type,
      prompt: asLocalized(q.prompt),
      options: Array.isArray(q.options)
        ? (q.options as { value: string; label: unknown }[]).map((o) => ({
            value: String(o.value),
            label: asLocalized(o.label),
          }))
        : [],
      correctAnswer: q.correct_answer as string | string[],
      explanation: asLocalized(q.explanation),
      imageUrl: q.image_url,
      points: q.points,
      order: q.order_index,
    })),
  };
}

// ─── Students ─────────────────────────────────────────────────────────────────

export interface StudentRow {
  id: string;
  firstName: string;
  surname: string;
  email: string;
  studentId: string;
  enrolledAt: string;
  completedLessons: number;
  totalLessons: number;
  completionPercent: number;
  avgQuizScore: number | null;
  lastActiveAt: string | null;
}

export interface StudentDetail {
  profile: {
    id: string;
    firstName: string;
    surname: string;
    email: string;
    studentId: string;
    enrolledAt: string;
  };
  stats: {
    completedLessons: number;
    totalLessons: number;
    avgQuizScore: number | null;
    lastActiveAt: string | null;
  };
  lessonProgress: Array<{
    lessonId: string;
    lessonTitle: LocalizedText;
    orderIndex: number;
    status: "not-started" | "in-progress" | "completed";
    progressPercent: number;
    watchedSeconds: number;
    quizBestScore: number | null;
    lastViewedAt: string | null;
    completedAt: string | null;
  }>;
  quizAttempts: Array<{
    id: string;
    quizId: string;
    quizTitle: LocalizedText;
    lessonTitle: LocalizedText;
    score: number;
    maxScore: number;
    percentage: number;
    passed: boolean;
    timeSpentSeconds: number;
    completedAt: string;
  }>;
}

/** All enrolled students with aggregate metrics. Cached 5 min; invalidated on studio writes. */
export const listStudents = unstable_cache(
  async (): Promise<StudentRow[]> => {
    const admin = createAdminClient();

    const [totalLessonsRes, profilesRes, progressRes, scoresRes] = await Promise.all([
      admin.from("video_lessons").select("*", { count: "exact", head: true }).eq("is_published", true),
      admin.from("profiles").select("id, first_name, surname, email, student_id, enrolled_at").eq("role", "student").order("enrolled_at", { ascending: false }),
      admin.from("progress_tracking").select("user_id, status, last_viewed_at"),
      admin.from("quiz_results").select("user_id, percentage"),
    ]);

    const totalLessons = totalLessonsRes.count ?? 0;
    const profiles = profilesRes.data ?? [];
    const allProgress = progressRes.data ?? [];
    const allScores = scoresRes.data ?? [];

    return profiles.map((p) => {
      const progress = allProgress.filter((r) => r.user_id === p.id);
      const scores = allScores.filter((r) => r.user_id === p.id);

      const completedLessons = progress.filter((r) => r.status === "completed").length;
      const dates = progress.map((r) => r.last_viewed_at).filter((d): d is string => d !== null);
      const lastActiveAt = dates.length > 0 ? dates.reduce((max, d) => (d > max ? d : max)) : null;
      const avgQuizScore = scores.length
        ? Math.round(scores.reduce((sum, r) => sum + (r.percentage ?? 0), 0) / scores.length)
        : null;
      const completionPercent = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;

      return {
        id: p.id,
        firstName: p.first_name ?? "",
        surname: p.surname ?? "",
        email: p.email ?? "",
        studentId: p.student_id ?? "",
        enrolledAt: p.enrolled_at ?? "",
        completedLessons,
        totalLessons,
        completionPercent,
        avgQuizScore,
        lastActiveAt,
      };
    });
  },
  ["admin-list-students"],
  { revalidate: 300, tags: ["admin-students"] }
);

const cachedStudentDetail = unstable_cache(
  async (userId: string): Promise<StudentDetail | null> => {
    const admin = createAdminClient();

    const [profileRes, lessonsRes, progressRes, quizRes] = await Promise.all([
      admin.from("profiles").select("id, first_name, surname, email, student_id, enrolled_at").eq("id", userId).maybeSingle(),
      admin.from("video_lessons").select("id, title, order_index").eq("is_published", true).order("order_index", { ascending: true }),
      admin.from("progress_tracking").select("lesson_id, status, progress_percent, watched_seconds, quiz_best_score, last_viewed_at, completed_at").eq("user_id", userId),
      admin.from("quiz_results").select("id, quiz_id, score, max_score, percentage, passed, time_spent_seconds, completed_at, quizzes(title, lesson_id, video_lessons(title))").eq("user_id", userId).order("completed_at", { ascending: false }),
    ]);

    if (!profileRes.data) return null;
    const p = profileRes.data;

    const lessons = lessonsRes.data ?? [];
    const progressRows = progressRes.data ?? [];
    const quizRows = quizRes.data ?? [];

    const lessonProgress = lessons.map((l) => {
      const row = progressRows.find((r) => r.lesson_id === l.id);
      return {
        lessonId: l.id,
        lessonTitle: asLocalized(l.title),
        orderIndex: l.order_index,
        status: (row?.status ?? "not-started") as "not-started" | "in-progress" | "completed",
        progressPercent: row?.progress_percent ?? 0,
        watchedSeconds: row?.watched_seconds ?? 0,
        quizBestScore: row?.quiz_best_score ?? null,
        lastViewedAt: row?.last_viewed_at ?? null,
        completedAt: row?.completed_at ?? null,
      };
    });

    const completedLessons = lessonProgress.filter((l) => l.status === "completed").length;
    const dates = progressRows.map((r) => r.last_viewed_at).filter((d): d is string => d !== null);
    const lastActiveAt = dates.length > 0 ? dates.reduce((max, d) => (d > max ? d : max)) : null;
    const scores = quizRows.map((r) => r.percentage).filter((v): v is number => v !== null);
    const avgQuizScore = scores.length ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length) : null;

    const quizAttempts = quizRows.map((row) => {
      const q = (row as { quizzes?: { title: unknown; lesson_id: string; video_lessons?: { title: unknown } } }).quizzes;
      return {
        id: row.id,
        quizId: row.quiz_id,
        quizTitle: asLocalized(q?.title),
        lessonTitle: asLocalized(q?.video_lessons?.title),
        score: row.score ?? 0,
        maxScore: row.max_score ?? 0,
        percentage: row.percentage ?? 0,
        passed: row.passed ?? false,
        timeSpentSeconds: row.time_spent_seconds ?? 0,
        completedAt: row.completed_at ?? "",
      };
    });

    return {
      profile: {
        id: p.id,
        firstName: p.first_name ?? "",
        surname: p.surname ?? "",
        email: p.email ?? "",
        studentId: p.student_id ?? "",
        enrolledAt: p.enrolled_at ?? "",
      },
      stats: { completedLessons, totalLessons: lessons.length, avgQuizScore, lastActiveAt },
      lessonProgress,
      quizAttempts,
    };
  },
  ["admin-student-detail"],
  { revalidate: 180, tags: ["admin-students"] }
);

/** Full progress and quiz history for a single student (admin-client). Returns null if not found. */
export async function getStudentDetail(userId: string): Promise<StudentDetail | null> {
  return cachedStudentDetail(userId);
}

// ─── Audit ────────────────────────────────────────────────────────────────────

/** Recent audit activity for the studio dashboard feed (always fresh — per-session). */
export async function getRecentAudit(limit = 6): Promise<AuditEntry[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("audit_logs")
    .select("id, action, entity, created_at, profiles:actor_id(first_name, surname)")
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data ?? []).map((row) => {
    const actor = (row as { profiles?: { first_name?: string; surname?: string } })
      .profiles;
    return {
      id: row.id,
      actor: actor ? `${actor.first_name ?? ""} ${actor.surname ?? ""}`.trim() || "System" : "System",
      action: row.action,
      entity: row.entity,
      createdAt: row.created_at,
    };
  });
}
