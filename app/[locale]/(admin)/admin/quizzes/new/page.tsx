import { getTranslations, setRequestLocale } from "next-intl/server";
import { QuizEditor } from "@/components/studio/QuizEditor";
import { listManageableLessons } from "@/lib/data/admin";
import type { QuizInput } from "@/lib/validation/content";

export const dynamic = "force-dynamic";

const blankQuiz: QuizInput = {
  lessonId: "",
  title: { en: "", ru: "", uz: "" },
  description: { en: "", ru: "", uz: "" },
  passingScore: 70,
  timeLimitMinutes: null,
  questions: [],
};

export default async function NewQuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Studio");
  const lessons = await listManageableLessons();

  return (
    <div className="min-h-full bg-[#f0f6ff]">
      <header className="bg-white border-b border-[#deedf7] px-8 py-4">
        <h1 className="text-lg font-bold text-[#0d1b35]" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>{t("newQuiz")}</h1>
        <p className="text-xs text-[#8fa5bf]">{t("quizEditorSubtitle")}</p>
      </header>
      <div className="p-8">
        <QuizEditor
          initial={blankQuiz}
          lessons={lessons.map(({ lesson }) => ({ id: lesson.id, title: lesson.title }))}
        />
      </div>
    </div>
  );
}
