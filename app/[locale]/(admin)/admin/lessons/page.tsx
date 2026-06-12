import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { listManageableLessons } from "@/lib/data/admin";
import { localize } from "@/lib/i18n/localize";
import type { Locale } from "@/lib/types";

export default async function StudioLessonsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("Studio");
  const lessons = await listManageableLessons();

  return (
    <div className="min-h-full bg-[#f0f6ff]">
      <header className="bg-white border-b border-[#deedf7] px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-[#0d1b35]" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>{t("navLessons")}</h1>
          <p className="text-xs text-[#8fa5bf]">{t("lessonsSubtitle")}</p>
        </div>
        <Link href="/admin/lessons/new"><Button variant="primary" size="sm">{t("newLesson")}</Button></Link>
      </header>

      <div className="p-8">
        <div className="bg-white border border-[#deedf7] rounded-xl shadow-[0_2px_8px_rgba(13,27,53,0.06)] overflow-hidden">
          {lessons.length === 0 ? (
            <p className="px-6 py-12 text-center text-sm text-[#8fa5bf]">{t("noLessons")}</p>
          ) : (
            <div className="divide-y divide-[#f0f6ff]">
              {lessons.map(({ lesson, completionRate, studentCount }) => (
                <div key={lesson.id} className="px-6 py-4 flex items-center gap-4 hover:bg-[#f8faff] transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#0d1b35] flex items-center justify-center shrink-0">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#22d3ee" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3" fill="rgba(34,211,238,0.15)" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0d1b35] truncate">{localize(lesson.title, loc)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-[#8fa5bf]">{lesson.durationMinutes} min · {lesson.visualizationExamples.length} viz · {studentCount} {t("learners")}</p>
                      <Badge variant={lesson.isPublished ? "success" : "default"}>{lesson.isPublished ? t("published") : t("draft")}</Badge>
                    </div>
                    <div className="mt-2 max-w-xs"><ProgressBar value={completionRate} size="sm" label={t("completionLabel", { rate: completionRate })} /></div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Link href={`/admin/lessons/${lesson.id}/edit`}><Button variant="ghost" size="sm">{t("edit")}</Button></Link>
                    <Link href={`/lessons/${lesson.id}`}><Button variant="outline" size="sm">{t("view")}</Button></Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
