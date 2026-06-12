import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LessonEditor } from "@/components/studio/LessonEditor";
import { getLessonEditData } from "@/lib/data/admin";
import { listDiagramIds } from "@/lib/visualization/registry";

export const dynamic = "force-dynamic";

export default async function EditLessonPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Studio");
  const lesson = await getLessonEditData(id);
  if (!lesson) notFound();

  return (
    <div className="min-h-full bg-[#f0f6ff]">
      <header className="bg-white border-b border-[#deedf7] px-4 md:px-8 py-4">
        <h1 className="text-lg font-bold text-[#0d1b35]" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>{t("editLesson")}</h1>
        <p className="text-xs text-[#8fa5bf]">{t("lessonEditorSubtitle")}</p>
      </header>
      <div className="p-4 md:p-8">
        <LessonEditor initial={lesson} diagramIds={listDiagramIds()} />
      </div>
    </div>
  );
}
