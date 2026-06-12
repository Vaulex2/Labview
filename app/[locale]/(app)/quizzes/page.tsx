import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AppTopBar } from "@/components/layout/AppTopBar";
import { Badge } from "@/components/ui/Badge";
import { listPublishedQuizzes } from "@/lib/data/quizzes";
import { localize } from "@/lib/i18n/localize";
import type { Locale } from "@/lib/types";

const diffBadge: Record<string, "electric" | "warning" | "danger"> = {
  beginner: "electric", intermediate: "warning", advanced: "danger",
};

export const dynamic = "force-dynamic";

export default async function QuizzesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("Quiz");
  const tCat = await getTranslations("Library.categories");
  const tDifficulty = await getTranslations("Common.difficulty");

  const entries = await listPublishedQuizzes();

  return (
    <>
      <AppTopBar title={t("allTitle")} subtitle={t("allSubtitle")} />
      <div className="p-6 md:p-8 flex-1">
        {entries.length === 0 ? (
          <p className="text-sm text-[#8fa5bf]">{t("empty")}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {entries.map((entry) => (
              <Link
                key={entry.quizId}
                href={`/quizzes/${entry.quizId}`}
                className="card-surface hover-glow flex flex-col overflow-hidden group transition-[box-shadow,border-color] duration-200"
              >
                {/* Header band */}
                <div className="relative h-28 bg-gradient-to-br from-[#0d1b35] to-[#162d5a] flex items-center justify-center overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 320 112" fill="none" preserveAspectRatio="xMidYMid slice">
                    <circle cx="40" cy="30" r="4" stroke="#22d3ee" strokeWidth="1.2" fill="none" />
                    <circle cx="160" cy="60" r="4" stroke="#22d3ee" strokeWidth="1.2" fill="none" />
                    <circle cx="280" cy="30" r="4" stroke="#22d3ee" strokeWidth="1.2" fill="none" />
                    <polyline points="40,30 40,60 160,60" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="7 3" />
                    <polyline points="160,60 280,60 280,30" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="7 3" />
                  </svg>
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-[rgba(0,180,216,0.12)] border border-[rgba(0,180,216,0.30)] flex items-center justify-center group-hover:bg-[rgba(0,180,216,0.22)] transition-colors duration-200">
                    <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#22d3ee" strokeWidth="1.8">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <Badge variant={diffBadge[entry.difficulty]} className="absolute top-3 right-3">
                    {tDifficulty(entry.difficulty)}
                  </Badge>
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="text-sm font-bold text-[#0d1b35] leading-snug group-hover:text-[#162d5a] transition-colors" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>
                      {localize(entry.quizTitle, loc)}
                    </h3>
                    <p className="text-xs text-[#8fa5bf] mt-1">{localize(entry.lessonTitle, loc)}</p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#8fa5bf]">
                    <span className="flex items-center gap-1">
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>
                      {t("cardMeta", { questions: entry.questionCount, minutes: entry.timeLimitMinutes ?? 0 })}
                    </span>
                    <Badge variant="default" className="capitalize">{tCat(entry.category)}</Badge>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-1">
                    <span className="text-xs text-[#8fa5bf]">{t("passLabel", { score: entry.passingScore })}</span>
                    <span className="text-xs font-semibold text-[#00b4d8] flex items-center gap-1 group-hover:gap-1.5 transition-[gap]">
                      {t("startQuiz")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
