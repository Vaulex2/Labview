import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AppTopBar } from "@/components/layout/AppTopBar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { getDashboard } from "@/lib/data/dashboard";
import { localize } from "@/lib/i18n/localize";
import type { Locale } from "@/lib/types";

/* ─── Inline icons (match the codebase's inline-SVG convention) ───────────── */
type IconProps = { className?: string };

const IconCheck = ({ className }: IconProps) => (
  <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);
const IconTarget = ({ className }: IconProps) => (
  <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" />
  </svg>
);
const IconFlame = ({ className }: IconProps) => (
  <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M12 2c1 3-2 4-2 7a2 2 0 0 0 4 0c2 1.5 3 3.5 3 6a5 5 0 1 1-10 0c0-3 2-4 2-7 0 0 2 .5 3-1 1-1.5 0-3 0-5z" />
  </svg>
);
const IconPlay = ({ className }: IconProps) => (
  <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <polygon points="6 4 20 12 6 20 6 4" />
  </svg>
);
const IconClock = ({ className }: IconProps) => (
  <svg className={className} width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
  </svg>
);
const IconTag = ({ className }: IconProps) => (
  <svg className={className} width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" /><circle cx="7.5" cy="7.5" r="1.3" />
  </svg>
);
const IconCompass = ({ className }: IconProps) => (
  <svg className={className} width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" /><polygon points="16 8 13 13 8 16 11 11 16 8" />
  </svg>
);
const IconClipboard = ({ className }: IconProps) => (
  <svg className={className} width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="3" width="8" height="4" rx="1" /><path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" />
  </svg>
);
const IconArrow = ({ className }: IconProps) => (
  <svg className={className} width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
  </svg>
);

/* ─── Stat card ───────────────────────────────────────────────────────────── */
type Tone = "electric" | "success" | "warning" | "navy";

const toneChip: Record<Tone, string> = {
  electric: "text-[#00b4d8] bg-[rgba(0,180,216,0.10)] border-[rgba(0,180,216,0.22)]",
  success:  "text-[#10b981] bg-[rgba(16,185,129,0.10)] border-[rgba(16,185,129,0.22)]",
  warning:  "text-[#f59e0b] bg-[rgba(245,158,11,0.12)] border-[rgba(245,158,11,0.24)]",
  navy:     "text-[#162d5a] bg-[#f0f6ff] border-[#deedf7]",
};

function StatCard({
  value, label, sub, icon, tone, delay,
}: {
  value: string | number; label: string; sub?: string; icon: React.ReactNode; tone: Tone; delay: number;
}) {
  return (
    <div
      className="card-surface hover-glow p-5 flex flex-col gap-3 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className={`flex items-center justify-center w-10 h-10 rounded-xl border ${toneChip[tone]}`}>
          {icon}
        </span>
        <span className="text-3xl font-bold tracking-tight text-[#0d1b35] leading-none" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>
          {value}
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-[#0d1b35]">{label}</span>
        {sub && <span className="text-xs text-[#8fa5bf]">{sub}</span>}
      </div>
    </div>
  );
}

const difficultyColors: Record<string, "electric" | "warning" | "danger"> = {
  beginner: "electric",
  intermediate: "warning",
  advanced: "danger",
};

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Dashboard");
  const tDifficulty = await getTranslations("Common.difficulty");
  const dash = await getDashboard();
  if (!dash) return null;
  const notStarted = dash.totalLessons - dash.completedLessons - dash.inProgressLessons;
  const overallProgress = dash.totalLessons
    ? Math.round((dash.completedLessons / dash.totalLessons) * 100)
    : 0;
  const isNewStudent = dash.completedLessons === 0 && dash.inProgressLessons === 0;
  const pathLessons = dash.recentLessons;
  const firstLessonId = dash.recommendedLessons[0]?.id ?? dash.recentLessons[0]?.id;

  const legend = [
    { label: t("completed"), count: dash.completedLessons, color: "#10b981" },
    { label: t("statusInProgress"), count: dash.inProgressLessons, color: "#00b4d8" },
    { label: t("notStarted"), count: notStarted, color: "#c8dff0" },
  ];

  return (
    <>
      <AppTopBar
        title={t("greeting", { name: dash.user.firstName })}
        subtitle={t("subtitle")}
      />
      <div className="p-6 md:p-8 space-y-8 flex-1">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard value={dash.completedLessons} label={t("lessonsCompleted")} sub={t("ofTotal", { count: dash.totalLessons })} icon={<IconCheck />} tone="success" delay={0} />
          <StatCard value={`${dash.averageQuizScore}%`} label={t("avgQuizScore")} sub={t("acrossQuizzes")} icon={<IconTarget />} tone="electric" delay={60} />
          <StatCard value={`${dash.currentStreak}`} label={t("dayStreak")} sub={t("keepItUp")} icon={<IconFlame />} tone="warning" delay={120} />
          <StatCard value={dash.inProgressLessons} label={t("inProgress")} sub={t("lessonsStarted")} icon={<IconPlay />} tone="navy" delay={180} />
        </div>

        {/* Overall progress — welcoming hero for a brand-new student */}
        {isNewStudent ? (
          <section className="grain relative overflow-hidden rounded-2xl border border-[#162d5a] p-6 md:p-8 animate-fade-up"
            style={{
              backgroundColor: "#0d1b35",
              backgroundImage:
                "radial-gradient(120% 140% at 0% 0%, rgba(0,180,216,0.22) 0%, transparent 45%)," +
                "radial-gradient(120% 140% at 100% 100%, rgba(34,211,238,0.16) 0%, transparent 50%)," +
                "linear-gradient(135deg, #0d1b35 0%, #162d5a 100%)",
            }}
          >
            <div className="relative flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="flex-1 min-w-0">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase text-[#22d3ee] bg-[rgba(34,211,238,0.10)] border border-[rgba(34,211,238,0.25)]">
                  {t("gettingStarted")}
                </span>
                <h2 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight text-white" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>
                  {t("getStartedTitle")}
                </h2>
                <p className="mt-2 text-sm text-[#8fa5bf] max-w-md leading-relaxed">{t("getStartedDesc")}</p>

                <div className="mt-5 max-w-md">
                  <ProgressBar value={overallProgress} size="lg" />
                  <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
                    {legend.map((s) => (
                      <div key={s.label} className="flex items-center gap-1.5 text-xs text-[#c8dff0]">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                        {s.count} {s.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {firstLessonId && (
                    <Link href={`/lessons/${firstLessonId}`}>
                      <Button size="md">
                        {t("startFirstLesson")}
                        <IconArrow />
                      </Button>
                    </Link>
                  )}
                  <Link
                    href="/library"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8fa5bf] hover:text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1b35] px-1 py-0.5"
                  >
                    {t("browseLibrary")}
                  </Link>
                </div>
              </div>

              {/* Decorative progress ring */}
              <div className="hidden lg:flex shrink-0 items-center justify-center">
                <div className="relative w-40 h-40 animate-float">
                  <svg viewBox="0 0 120 120" className="w-40 h-40 -rotate-90">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="52" fill="none" stroke="#22d3ee" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 52}
                      strokeDashoffset={2 * Math.PI * 52 * (1 - overallProgress / 100)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold text-white leading-none" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>
                      {overallProgress}%
                    </span>
                    <span className="mt-1 text-[11px] uppercase tracking-wider text-[#8fa5bf]">{t("complete")}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="card-surface p-6 animate-fade-up">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-[#0d1b35]" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>{t("overallProgress")}</h2>
                <p className="text-xs text-[#8fa5bf] mt-0.5">{t("track")}</p>
              </div>
              <span className="text-2xl font-extrabold text-[#00b4d8]" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>{overallProgress}%</span>
            </div>
            <ProgressBar value={overallProgress} size="lg" />
            <div className="flex gap-5 mt-4">
              {legend.map((s) => (
                <div key={s.label} className="flex items-center gap-1.5 text-xs text-[#4a6080]">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  {s.count} {s.label}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Learning path */}
          <div className="lg:col-span-2 card-surface p-6 animate-fade-up" style={{ animationDelay: "80ms" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-[#0d1b35]" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>
                {isNewStudent ? t("startLearning") : t("continueLearning")}
              </h2>
              <Link href="/library" className="inline-flex items-center gap-1 text-xs text-[#00b4d8] hover:text-[#0882a0] font-medium transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-1 px-1">
                {t("viewAll")}
              </Link>
            </div>
            <div className="space-y-3">
              {pathLessons.map((lesson, i) => {
                const prog = dash.lessonProgress.find((p) => p.lessonId === lesson.id);
                const statusLabel = prog?.status === "completed" ? t("statusCompleted") : prog?.status === "in-progress" ? t("statusInProgress") : t("statusStart");
                const statusVariant = prog?.status === "completed" ? "success" : prog?.status === "in-progress" ? "electric" : "default";
                const isFirst = i === 0;
                return (
                  <Link
                    key={lesson.id}
                    href={`/lessons/${lesson.id}`}
                    className={[
                      "flex items-center gap-4 p-3.5 rounded-xl border bg-[#f8faff] group",
                      "transition-[border-color,background-color,box-shadow,transform] duration-200",
                      "hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(13,27,53,0.10)] hover:border-[rgba(0,180,216,0.40)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2",
                      isFirst ? "border-[rgba(0,180,216,0.35)] ring-1 ring-[rgba(0,180,216,0.18)]" : "border-[#deedf7]",
                    ].join(" ")}
                  >
                    {/* Step number */}
                    <span className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-[#4a6080] bg-[#e4eef9] border border-[#c8dff0] group-hover:text-[#0882a0] group-hover:border-[rgba(0,180,216,0.35)] transition-colors" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>
                      {i + 1}
                    </span>
                    {/* Thumbnail */}
                    <div
                      className="w-14 h-10 rounded-lg flex items-center justify-center shrink-0 overflow-hidden border border-[#162d5a]"
                      style={{ backgroundImage: "linear-gradient(135deg, #0d1b35 0%, #162d5a 100%)" }}
                    >
                      <IconPlay className="text-[#22d3ee] w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-[#0d1b35] truncate group-hover:text-[#162d5a]">{localize(lesson.title, locale as Locale)}</p>
                        {isFirst && isNewStudent && (
                          <Badge variant="electric" className="shrink-0 hidden sm:inline-flex">{t("recommendedStart")}</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-[#8fa5bf]">
                        <span className="inline-flex items-center gap-1"><IconClock /> {t("minutes", { count: lesson.durationMinutes })}</span>
                        <span className="inline-flex items-center gap-1 truncate"><IconTag /> {lesson.category}</span>
                      </div>
                      {prog && prog.status === "in-progress" && (
                        <div className="mt-1.5">
                          <ProgressBar value={prog.progressPercent} size="sm" />
                        </div>
                      )}
                    </div>
                    <Badge variant={statusVariant as "success" | "electric" | "default"}>{statusLabel}</Badge>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Recommended */}
            <div className="card-surface p-5 animate-fade-up" style={{ animationDelay: "140ms" }}>
              <h2 className="text-sm font-bold text-[#0d1b35] mb-4" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>{t("recommendedNext")}</h2>
              {dash.recommendedLessons.length === 0 ? (
                <EmptyState
                  icon={<IconCompass />}
                  title={t("recommendedEmptyTitle")}
                  description={t("recommendedEmptyDesc")}
                />
              ) : (
                <div className="space-y-3">
                  {dash.recommendedLessons.slice(0, 3).map((l) => (
                    <Link key={l.id} href={`/lessons/${l.id}`} className="flex items-center gap-3 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]">
                      <div className="w-8 h-8 rounded-lg bg-[#f0f6ff] border border-[#deedf7] flex items-center justify-center shrink-0">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#00b4d8" strokeWidth="2">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#0d1b35] truncate group-hover:text-[#00b4d8] transition-colors">{localize(l.title, locale as Locale)}</p>
                        <p className="text-[10px] text-[#8fa5bf]">{t("minutes", { count: l.durationMinutes })}</p>
                      </div>
                      <Badge variant={difficultyColors[l.difficulty] as "electric" | "warning" | "danger"} className="shrink-0">
                        {tDifficulty(l.difficulty)}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Recent quiz */}
            <div className="card-surface p-5 animate-fade-up" style={{ animationDelay: "200ms" }}>
              <h2 className="text-sm font-bold text-[#0d1b35] mb-4" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>{t("recentQuizResults")}</h2>
              {dash.recentQuizResults.length === 0 ? (
                <EmptyState
                  icon={<IconClipboard />}
                  title={t("quizEmptyTitle")}
                  description={t("quizEmptyDesc")}
                  action={
                    <Link href="/library" className="inline-flex items-center gap-1 text-xs font-semibold text-[#00b4d8] hover:text-[#0882a0] transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-1 px-1">
                      {t("browseLibrary")} <IconArrow />
                    </Link>
                  }
                />
              ) : (
                dash.recentQuizResults.map((r) => (
                  <div key={r.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[#0d1b35]">{t("recentQuizName")}</p>
                      <p className="text-[10px] text-[#8fa5bf] mt-0.5">{t("points", { score: r.score, max: r.maxScore })}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-bold ${r.percentage >= 70 ? "text-[#10b981]" : "text-[#ef4444]"}`} style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>
                        {r.percentage}%
                      </p>
                      <Badge variant={r.passed ? "success" : "danger"}>{r.passed ? t("passed") : t("failed")}</Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
