"use server";

import { revalidatePath, updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  lessonSchema,
  quizSchema,
  UPLOAD_LIMITS,
  type LessonInput,
  type QuizInput,
  type UploadBucket,
} from "@/lib/validation/content";

export type SaveResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

async function requireStaff() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null };
  const { data } = await supabase.rpc("is_staff");
  return { supabase, user: data ? user : null };
}

function revalidateStudio() {
  // Admin writes are infrequent; refresh all locale-prefixed routes…
  revalidatePath("/", "layout");
  // …and drop the cross-request catalog caches so edits surface immediately.
  // updateTag (vs revalidateTag) gives read-your-own-writes from these Server
  // Actions with immediate expiration.
  updateTag("lessons");
  updateTag("quizzes");
  updateTag("media");
  // Admin-panel caches — list pages and analytics.
  updateTag("admin-lessons");
  updateTag("admin-quizzes");
  updateTag("admin-students");
  updateTag("admin-analytics");
}

// ─── Lessons ──────────────────────────────────────────────────────────────────
export async function saveLesson(input: LessonInput): Promise<SaveResult> {
  const parsed = lessonSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "invalidInput" };
  }
  const d = parsed.data;

  const { supabase, user } = await requireStaff();
  if (!user) return { ok: false, error: "unauthorized" };

  const core = {
    title: d.title,
    slug: d.slug,
    category: d.category,
    difficulty: d.difficulty,
    duration_minutes: d.durationMinutes,
    tags: d.tags,
    order_index: d.orderIndex,
    is_published: d.isPublished,
    thumbnail_url: d.thumbnailPath ?? null,
    video_path: d.videoPath ?? null,
    presentation_url: d.presentationUrl ?? null,
  };

  let lessonId = d.id;
  if (lessonId) {
    const { error } = await supabase.from("video_lessons").update(core).eq("id", lessonId);
    if (error) return { ok: false, error: dbError(error.message) };
  } else {
    const { data, error } = await supabase
      .from("video_lessons")
      .insert({ ...core, created_by: user.id })
      .select("id")
      .single();
    if (error || !data) return { ok: false, error: dbError(error?.message) };
    lessonId = data.id;
  }

  // Replace children (simple, deterministic sync).
  await supabase.from("lesson_summaries").delete().eq("lesson_id", lessonId);
  if (d.summaries.length) {
    const { error } = await supabase.from("lesson_summaries").insert(
      d.summaries.map((s, i) => ({
        lesson_id: lessonId!,
        section_title: s.sectionTitle,
        paragraphs: s.paragraphs,
        order_index: s.order || i,
      }))
    );
    if (error) return { ok: false, error: dbError(error.message) };
  }

  await supabase.from("visualization_examples").delete().eq("lesson_id", lessonId);
  if (d.vizExamples.length) {
    const { error } = await supabase.from("visualization_examples").insert(
      d.vizExamples.map((v, i) => ({
        lesson_id: lessonId!,
        title: v.title,
        description: v.description,
        complexity: v.complexity,
        diagram_id: v.diagramId,
        order_index: v.order || i,
      }))
    );
    if (error) return { ok: false, error: dbError(error.message) };
  }

  revalidateStudio();
  return { ok: true, id: lessonId! };
}

export async function setLessonPublished(
  id: string,
  published: boolean
): Promise<SaveResult> {
  const { supabase, user } = await requireStaff();
  if (!user) return { ok: false, error: "unauthorized" };
  const { error } = await supabase
    .from("video_lessons")
    .update({ is_published: published })
    .eq("id", id);
  if (error) return { ok: false, error: dbError(error.message) };
  revalidateStudio();
  return { ok: true, id };
}

export async function deleteLesson(id: string): Promise<SaveResult> {
  const { supabase, user } = await requireStaff();
  if (!user) return { ok: false, error: "unauthorized" };
  const { error } = await supabase.from("video_lessons").delete().eq("id", id);
  if (error) return { ok: false, error: dbError(error.message) };
  revalidateStudio();
  return { ok: true, id };
}

// ─── Quizzes ──────────────────────────────────────────────────────────────────
export async function saveQuiz(input: QuizInput): Promise<SaveResult> {
  const parsed = quizSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "invalidInput" };
  }
  const d = parsed.data;

  const { supabase, user } = await requireStaff();
  if (!user) return { ok: false, error: "unauthorized" };

  const core = {
    lesson_id: d.lessonId,
    title: d.title,
    description: d.description,
    passing_score: d.passingScore,
    time_limit_minutes: d.timeLimitMinutes ?? null,
  };

  let quizId = d.id;
  if (quizId) {
    const { error } = await supabase.from("quizzes").update(core).eq("id", quizId);
    if (error) return { ok: false, error: dbError(error.message) };
  } else {
    const { data, error } = await supabase
      .from("quizzes")
      .insert({ ...core, created_by: user.id })
      .select("id")
      .single();
    if (error || !data) return { ok: false, error: dbError(error?.message) };
    quizId = data.id;
  }

  await supabase.from("quiz_questions").delete().eq("quiz_id", quizId);
  if (d.questions.length) {
    const { error } = await supabase.from("quiz_questions").insert(
      d.questions.map((q, i) => ({
        quiz_id: quizId!,
        type: q.type,
        prompt: q.prompt,
        options: q.options.length ? q.options : null,
        correct_answer: q.correctAnswer,
        explanation: q.explanation,
        image_url: q.imageUrl ?? null,
        points: q.points,
        order_index: q.order || i,
      }))
    );
    if (error) return { ok: false, error: dbError(error.message) };
  }

  revalidateStudio();
  return { ok: true, id: quizId! };
}

export async function deleteQuiz(id: string): Promise<SaveResult> {
  const { supabase, user } = await requireStaff();
  if (!user) return { ok: false, error: "unauthorized" };
  const { error } = await supabase.from("quizzes").delete().eq("id", id);
  if (error) return { ok: false, error: dbError(error.message) };
  revalidateStudio();
  return { ok: true, id };
}

// ─── Media upload (validated, to private buckets) ─────────────────────────────
export type UploadResult =
  | { ok: true; path: string }
  | { ok: false; error: string };

export async function uploadMedia(formData: FormData): Promise<UploadResult> {
  const { supabase, user } = await requireStaff();
  if (!user) return { ok: false, error: "unauthorized" };

  const file = formData.get("file");
  const bucket = String(formData.get("bucket") ?? "") as UploadBucket;
  const limit = UPLOAD_LIMITS[bucket];
  if (!limit) return { ok: false, error: "invalidBucket" };
  if (!(file instanceof File)) return { ok: false, error: "noFile" };
  if (!(limit.mime as readonly string[]).includes(file.type)) {
    return { ok: false, error: "invalidType" };
  }
  if (file.size > limit.maxBytes) return { ok: false, error: "tooLarge" };

  const ext = file.name.includes(".") ? file.name.split(".").pop() : "bin";
  const path = `${user.id}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) return { ok: false, error: "uploadFailed" };

  return { ok: true, path };
}

function dbError(message?: string): string {
  if (!message) return "saveFailed";
  if (/duplicate|unique/i.test(message)) return "slugTaken";
  if (/row-level security|policy/i.test(message)) return "forbidden";
  return "saveFailed";
}
