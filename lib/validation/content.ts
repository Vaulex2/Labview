import { z } from "zod";

// Localized text: English required; ru/uz optional (fall back to en at render).
const localized = z.object({
  en: z.string().trim().min(1, "required").max(2000),
  ru: z.string().trim().max(2000).default(""),
  uz: z.string().trim().max(2000).default(""),
});
const localizedOptional = z.object({
  en: z.string().trim().max(4000).default(""),
  ru: z.string().trim().max(4000).default(""),
  uz: z.string().trim().max(4000).default(""),
});

const LESSON_CATEGORIES = [
  "loops", "arrays", "clusters", "arithmetic", "boolean", "events",
  "waveforms", "subvi", "structures", "data-types", "debugging",
] as const;

export const summarySchema = z.object({
  id: z.string().uuid().optional(),
  sectionTitle: localized,
  paragraphs: z.array(localizedOptional).default([]),
  order: z.number().int().nonnegative().default(0),
});

export const vizSchema = z.object({
  id: z.string().uuid().optional(),
  title: localized,
  description: localizedOptional,
  complexity: z.enum(["simple", "advanced"]).default("simple"),
  diagramId: z.string().trim().min(1, "required"),
  order: z.number().int().nonnegative().default(0),
});

export const lessonSchema = z.object({
  id: z.string().uuid().optional(),
  title: localized,
  slug: z
    .string()
    .trim()
    .min(1, "required")
    .max(120)
    .regex(/^[a-z0-9-]+$/, "slugFormat"),
  category: z.enum(LESSON_CATEGORIES),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  durationMinutes: z.number().int().min(0).max(100000).default(0),
  tags: z.array(localizedOptional).default([]),
  orderIndex: z.number().int().default(0),
  isPublished: z.boolean().default(false),
  thumbnailPath: z.string().max(500).nullish(),
  videoPath: z.string().max(500).nullish(),
  presentationUrl: z.string().max(1000).nullish(),
  summaries: z.array(summarySchema).default([]),
  vizExamples: z.array(vizSchema).default([]),
});

export const questionSchema = z.object({
  id: z.string().uuid().optional(),
  type: z.enum([
    "multiple-choice",
    "drag-drop",
    "output-prediction",
    "labview-analysis",
  ]),
  prompt: localized,
  options: z
    .array(z.object({ value: z.string().trim().min(1), label: localized }))
    .default([]),
  correctAnswer: z.union([z.string(), z.array(z.string())]),
  explanation: localizedOptional,
  imageUrl: z.string().max(1000).nullish(),
  points: z.number().int().min(0).max(100).default(1),
  order: z.number().int().default(0),
});

export const quizSchema = z.object({
  id: z.string().uuid().optional(),
  lessonId: z.string().uuid("required"),
  title: localized,
  description: localizedOptional,
  passingScore: z.number().int().min(0).max(100).default(70),
  timeLimitMinutes: z.number().int().positive().nullish(),
  questions: z.array(questionSchema).default([]),
});

export type LessonInput = z.input<typeof lessonSchema>;
export type QuizInput = z.input<typeof quizSchema>;
export type QuestionInput = z.input<typeof questionSchema>;
export type SummaryInput = z.input<typeof summarySchema>;
export type VizInput = z.input<typeof vizSchema>;

export const UPLOAD_LIMITS = {
  thumbnails: { mime: ["image/png", "image/jpeg", "image/webp"], maxBytes: 5 * 1024 * 1024 },
  "lesson-videos": { mime: ["video/mp4", "video/webm", "video/quicktime"], maxBytes: 500 * 1024 * 1024 },
  materials: { mime: ["application/pdf"], maxBytes: 25 * 1024 * 1024 },
} as const;

export type UploadBucket = keyof typeof UPLOAD_LIMITS;
