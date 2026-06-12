import { getTranslations, setRequestLocale } from "next-intl/server";
import { LessonEditor } from "@/components/studio/LessonEditor";
import { listDiagramIds } from "@/lib/visualization/registry";
import type { LessonInput } from "@/lib/validation/content";

const blankLesson: LessonInput = {
  title: { en: "", ru: "", uz: "" },
  slug: "",
  category: "loops",
  difficulty: "beginner",
  durationMinutes: 0,
  orderIndex: 0,
  isPublished: false,
  thumbnailPath: null,
  videoPath: null,
  presentationUrl: "",
  tags: [],
  summaries: [],
  vizExamples: [],
};

export default async function NewLessonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Studio");

  return (
    <div className="min-h-full bg-[#f0f6ff]">
      <header className="bg-white border-b border-[#deedf7] px-4 md:px-8 py-4">
        <h1 className="text-lg font-bold text-[#0d1b35]" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>{t("newLesson")}</h1>
        <p className="text-xs text-[#8fa5bf]">{t("lessonEditorSubtitle")}</p>
      </header>
      <div className="p-4 md:p-8">
        <LessonEditor initial={blankLesson} diagramIds={listDiagramIds()} />
      </div>
    </div>
  );
}
