// ─── Localization ──────────────────────────────────────────────────────────

export type Locale = "en" | "ru" | "uz";

/** A piece of human-readable content authored in every supported language. */
export type LocalizedText = Record<Locale, string>;

// ─── Domain Types ─────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  phone: string;
  studentId: string;  // stored as string to support varied university formats
  firstName: string;
  surname: string;
  role: "student" | "teacher" | "admin";
  avatarUrl?: string;
  enrolledAt: string;
}

export interface VideoLesson {
  id: string;
  title: LocalizedText;
  slug: string;
  category: LessonCategory;
  difficulty: "beginner" | "intermediate" | "advanced";
  durationMinutes: number;
  thumbnailUrl: string;
  videoUrl?: string;
  presentationUrl?: string; // path to slides PDF served from /public
  order: number;
  isPublished: boolean;
  createdAt: string;
  tags: LocalizedText[];
  summaries: LessonSummary[];
  visualizationExamples: VisualizationExampleMeta[];
}

export type LessonCategory =
  | "loops"
  | "arrays"
  | "clusters"
  | "arithmetic"
  | "boolean"
  | "events"
  | "waveforms"
  | "subvi"
  | "structures"
  | "data-types"
  | "debugging";

export interface LessonSummary {
  id: string;
  lessonId: string;
  sectionTitle: LocalizedText;
  paragraphs: LocalizedText[];
  order: number;
}

export interface VisualizationExampleMeta {
  id: string;
  lessonId: string;
  title: LocalizedText;
  description: LocalizedText;
  complexity: "simple" | "advanced";
  order: number;
}

// ─── Quiz Types ────────────────────────────────────────────────────────────

export type QuestionType =
  | "multiple-choice"
  | "drag-drop"
  | "output-prediction"
  | "labview-analysis";

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  prompt: LocalizedText;
  imageUrl?: string;
  /** Answer options. `value` is the locale-independent key compared against
   *  `correctAnswer`; `label` is what the learner sees in the active locale. */
  options?: QuizOption[];
  correctAnswer: string | string[];
  explanation: LocalizedText;
  points: number;
}

export interface QuizOption {
  value: string;
  label: LocalizedText;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: LocalizedText;
  description: LocalizedText;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimitMinutes?: number;
}

export interface QuizResult {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  answers: Record<string, string | string[]>;
  completedAt: string;
  timeSpentSeconds: number;
}

// ─── Progress Types ────────────────────────────────────────────────────────

export interface LessonProgress {
  lessonId: string;
  userId: string;
  status: "not-started" | "in-progress" | "completed";
  progressPercent: number;
  lastViewedAt?: string;
  completedAt?: string;
  watchedSeconds: number;
  quizBestScore?: number;
}

export interface UserDashboard {
  user: User;
  totalLessons: number;
  completedLessons: number;
  inProgressLessons: number;
  averageQuizScore: number;
  currentStreak: number;
  recentLessons: VideoLesson[];
  recommendedLessons: VideoLesson[];
  lessonProgress: LessonProgress[];
  recentQuizResults: QuizResult[];
}

// ─── Visualization Engine Types ───────────────────────────────────────────

export type NodeKind =
  | "control"
  | "indicator"
  | "function"
  | "loop-index"
  | "shift-register"
  | "constant";

export type NodeHighlightState = "idle" | "active" | "success" | "reading" | "writing";

export interface DiagramNode {
  id: string;
  /** Symbolic terminal label (e.g. "N", "+", "SR") — language-independent. */
  label: string;
  /** Descriptive caption shown under the node — localized. */
  sublabel?: LocalizedText;
  kind: NodeKind;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DiagramWire {
  id: string;
  points: [number, number][];
  label?: LocalizedText;
}

export interface LoopBound {
  x: number;
  y: number;
  width: number;
  height: number;
  label: LocalizedText;
}

export type StepAction =
  | { kind: "highlight"; nodeId: string; state: NodeHighlightState }
  | { kind: "unhighlight"; nodeId: string }
  | { kind: "dot"; wireId: string; color: string; durationMs: number }
  | { kind: "wait"; durationMs: number }
  | { kind: "set-value"; nodeId: string; value: string }
  | { kind: "reset" };

/** A user-editable numeric input mapped to a control node on the diagram. */
export interface DiagramInput {
  /** id of the control node this input drives */
  nodeId: string;
  /** short, language-independent symbol shown next to the field (e.g. "a") */
  label: string;
  default: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface DiagramDefinition {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  canvasWidth: number;
  canvasHeight: number;
  loopBounds?: LoopBound;
  nodes: DiagramNode[];
  wires: DiagramWire[];
  steps: StepAction[];
  /** Optional interactive inputs. When present, the panel renders number fields
   *  and `compute` derives the value shown on every node from them.
   *  (Code-only — not serialized to the DB.) */
  inputs?: DiagramInput[];
  /** Maps user input values → display string for each node id touched by a
   *  `set-value` step. Overrides the literal `value` baked into the steps. */
  compute?: (inputs: Record<string, number>) => Record<string, string>;
}

// ─── Admin Types ──────────────────────────────────────────────────────────

export interface AnalyticsOverview {
  totalStudents: number;
  activeThisWeek: number;
  lessonsPublished: number;
  averageCompletionRate: number;
  averageQuizScore: number;
}
