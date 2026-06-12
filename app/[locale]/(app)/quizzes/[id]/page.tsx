import { getTranslations, setRequestLocale } from "next-intl/server";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { getQuizById } from "@/lib/data/quizzes";

interface Props { params: Promise<{ locale: string; id: string }> }

export default async function QuizPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const quiz = await getQuizById(id);

  if (!quiz) {
    const t = await getTranslations("Quiz");
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-[#8fa5bf]">{t("notFound")}</p>
      </div>
    );
  }

  return <QuizRunner quiz={quiz} />;
}
