import { getTranslations, setRequestLocale } from "next-intl/server";
import { AppTopBar } from "@/components/layout/AppTopBar";
import { LessonLibrary } from "@/components/library/LessonLibrary";
import { listLessons } from "@/lib/data/lessons";
import { getMyProgress } from "@/lib/data/progress";

export default async function LibraryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Library");
  const [lessons, progress] = await Promise.all([listLessons(), getMyProgress()]);

  return (
    <>
      <AppTopBar title={t("title")} subtitle={t("subtitle")} />
      <div className="p-6 md:p-8 flex-1">
        <LessonLibrary lessons={lessons} progress={progress} />
      </div>
    </>
  );
}
