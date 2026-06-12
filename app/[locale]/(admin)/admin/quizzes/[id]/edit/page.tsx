import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { QuizEditor } from "@/components/studio/QuizEditor";
import { getQuizEditData, listManageableLessons } from "@/lib/data/admin";

export const dynamic = "force-dynamic";

export default async function EditQuizPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Studio");
  const [quiz, lessons] = await Promise.all([
    getQuizEditData(id),
    listManageableLessons(),
  ]);
  if (!quiz) notFound();

  return (
    <div className="min-h-full bg-[#f0f6ff]">
      <header className="bg-white border-b border-[#deedf7] px-4 md:px-8 py-4">
        <h1 className="text-lg font-bold text-[#0d1b35]" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>{t("editQuiz")}</h1>
        <p className="text-xs text-[#8fa5bf]">{t("quizEditorSubtitle")}</p>
      </header>
      <div className="p-4 md:p-8">
        <QuizEditor
          initial={quiz}
          lessons={lessons.map(({ lesson }) => ({ id: lesson.id, title: lesson.title }))}
        />
      </div>
    </div>
  );
}
