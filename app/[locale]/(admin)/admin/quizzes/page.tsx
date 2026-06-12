import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { listManageableQuizzes } from "@/lib/data/admin";
import { localize } from "@/lib/i18n/localize";
import type { Locale } from "@/lib/types";

export default async function StudioQuizzesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("Studio");
  const quizzes = await listManageableQuizzes();

  return (
    <div className="min-h-full bg-[#f0f6ff]">
      <header className="bg-white border-b border-[#deedf7] px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-[#0d1b35]" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>{t("navQuizzes")}</h1>
          <p className="text-xs text-[#8fa5bf]">{t("quizzesSubtitle")}</p>
        </div>
        <Link href="/admin/quizzes/new"><Button variant="primary" size="sm">{t("newQuiz")}</Button></Link>
      </header>

      <div className="p-8">
        <div className="bg-white border border-[#deedf7] rounded-xl shadow-[0_2px_8px_rgba(13,27,53,0.06)] overflow-hidden">
          {quizzes.length === 0 ? (
            <p className="px-6 py-12 text-center text-sm text-[#8fa5bf]">{t("noQuizzes")}</p>
          ) : (
            <div className="divide-y divide-[#f0f6ff]">
              {quizzes.map((q) => (
                <div key={q.id} className="px-6 py-4 flex items-center gap-4 hover:bg-[#f8faff] transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#0d1b35] flex items-center justify-center shrink-0">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#22d3ee" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0d1b35] truncate">{localize(q.title, loc)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-[#8fa5bf] truncate">{localize(q.lessonTitle, loc)}</p>
                      <Badge variant="default">{t("questionCount", { count: q.questionCount })}</Badge>
                    </div>
                  </div>
                  <Link href={`/admin/quizzes/${q.id}/edit`} className="shrink-0"><Button variant="ghost" size="sm">{t("edit")}</Button></Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
