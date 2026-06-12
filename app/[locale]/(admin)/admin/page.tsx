import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  getAnalyticsOverview,
  listManageableLessons,
  getRecentAudit,
} from "@/lib/data/admin";
import { localize } from "@/lib/i18n/localize";
import type { Locale } from "@/lib/types";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-[#deedf7] rounded-xl p-5 shadow-[0_2px_8px_rgba(13,27,53,0.06)]">
      <p className="text-xs font-medium text-[#4a6080] mb-1">{label}</p>
      <p className="text-3xl font-extrabold text-[#0d1b35]" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>{value}</p>
    </div>
  );
}

export default async function StudioDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("Studio");

  const [overview, lessons, activity] = await Promise.all([
    getAnalyticsOverview(),
    listManageableLessons(),
    getRecentAudit(6),
  ]);

  const stats = [
    { label: t("statStudents"), value: String(overview.totalStudents) },
    { label: t("statActive"), value: String(overview.activeThisWeek) },
    { label: t("statPublished"), value: String(overview.lessonsPublished) },
    { label: t("statCompletion"), value: `${overview.averageCompletionRate}%` },
    { label: t("statQuizScore"), value: `${overview.averageQuizScore}%` },
  ];

  return (
    <div className="min-h-full bg-[#f0f6ff]">
      <header className="bg-white border-b border-[#deedf7] px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-[#0d1b35]" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>{t("dashboardTitle")}</h1>
          <p className="text-xs text-[#8fa5bf]">{t("dashboardSubtitle")}</p>
        </div>
        <Link href="/admin/lessons/new">
          <Button variant="primary" size="sm">{t("newLesson")}</Button>
        </Link>
      </header>

      <div className="p-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
          {stats.map((s) => <StatCard key={s.label} {...s} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lesson management */}
          <div className="lg:col-span-2 bg-white border border-[#deedf7] rounded-xl shadow-[0_2px_8px_rgba(13,27,53,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#f0f6ff] flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0d1b35]" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>{t("lessonManagement")}</h2>
              <Link href="/admin/lessons"><Button variant="outline" size="sm">{t("viewAll")}</Button></Link>
            </div>
            {lessons.length === 0 ? (
              <p className="px-6 py-10 text-center text-sm text-[#8fa5bf]">{t("noLessons")}</p>
            ) : (
              <div className="divide-y divide-[#f0f6ff]">
                {lessons.slice(0, 6).map(({ lesson, completionRate }) => (
                  <div key={lesson.id} className="px-6 py-4 flex items-center gap-4 hover:bg-[#f8faff] transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#0d1b35] flex items-center justify-center shrink-0">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#22d3ee" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3" fill="rgba(34,211,238,0.15)" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0d1b35] truncate">{localize(lesson.title, loc)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-[#8fa5bf]">{lesson.durationMinutes} min · {lesson.visualizationExamples.length} viz</p>
                        <Badge variant={lesson.isPublished ? "success" : "default"}>
                          {lesson.isPublished ? t("published") : t("draft")}
                        </Badge>
                      </div>
                      <div className="mt-2 max-w-xs">
                        <ProgressBar value={completionRate} size="sm" label={t("completionLabel", { rate: completionRate })} />
                      </div>
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

          {/* Right column */}
          <div className="space-y-5">
            <div className="bg-white border border-[#deedf7] rounded-xl p-5 shadow-[0_2px_8px_rgba(13,27,53,0.06)]">
              <h2 className="text-sm font-bold text-[#0d1b35] mb-4" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>{t("quickActions")}</h2>
              <div className="space-y-2">
                {[
                  { label: t("newLesson"), href: "/admin/lessons/new", icon: "+" },
                  { label: t("newQuiz"), href: "/admin/quizzes/new", icon: "+" },
                  { label: t("manageLessons"), href: "/admin/lessons", icon: "+" },
                  { label: t("manageQuizzes"), href: "/admin/quizzes", icon: "+" },
                  { label: t("viewStudents"), href: "/admin/students", icon: "students" },
                ].map((a) => (
                  <Link key={a.href} href={a.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#4a6080] hover:bg-[#f0f6ff] hover:text-[#0d1b35] transition-colors font-medium focus-visible:ring-2 focus-visible:ring-[#22d3ee]">
                    <span className="w-7 h-7 rounded-lg bg-[rgba(0,180,216,0.08)] border border-[rgba(0,180,216,0.15)] flex items-center justify-center text-[#00b4d8] shrink-0">
                      {a.icon === "students" ? (
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      ) : (
                        <span className="text-sm font-bold">+</span>
                      )}
                    </span>
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#deedf7] rounded-xl p-5 shadow-[0_2px_8px_rgba(13,27,53,0.06)]">
              <h2 className="text-sm font-bold text-[#0d1b35] mb-4" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>{t("recentActivity")}</h2>
              {activity.length === 0 ? (
                <p className="text-xs text-[#8fa5bf]">{t("noActivity")}</p>
              ) : (
                <div className="space-y-3">
                  {activity.map((a) => (
                    <div key={a.id} className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#0d1b35] flex items-center justify-center text-[9px] text-[#22d3ee] font-bold shrink-0 mt-0.5">
                        {a.actor.split(" ").map((n) => n[0]).join("").slice(0, 2) || "·"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#0d1b35]">
                          <span className="font-semibold">{a.actor}</span>{" "}
                          <span className="text-[#00b4d8]">{a.action}</span>
                        </p>
                        <p className="text-[10px] text-[#8fa5bf] mt-0.5">
                          {new Date(a.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Completion by topic */}
        {lessons.length > 0 && (
          <div className="bg-white border border-[#deedf7] rounded-xl p-6 shadow-[0_2px_8px_rgba(13,27,53,0.06)]">
            <h2 className="text-sm font-bold text-[#0d1b35] mb-5" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>{t("completionByTopic")}</h2>
            <div className="space-y-3">
              {lessons.map(({ lesson, completionRate }) => (
                <div key={lesson.id} className="flex items-center gap-4">
                  <span className="text-xs text-[#4a6080] w-48 truncate shrink-0">{localize(lesson.title, loc)}</span>
                  <div className="flex-1"><ProgressBar value={completionRate} size="sm" /></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
