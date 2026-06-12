import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getStudentDetail } from "@/lib/data/admin";
import { localize } from "@/lib/i18n/localize";
import type { Locale } from "@/lib/types";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-[#deedf7] rounded-xl p-5 shadow-[0_2px_8px_rgba(13,27,53,0.06)]">
      <p className="text-xs font-medium text-[#4a6080] mb-1">{label}</p>
      <p
        className="text-2xl font-extrabold text-[#0d1b35]"
        style={{ fontFamily: "Outfit, system-ui, sans-serif" }}
      >
        {value}
      </p>
    </div>
  );
}

function formatTime(seconds: number): string {
  if (seconds < 60) return "< 1m";
  return `${Math.floor(seconds / 60)}m`;
}

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("Studio");

  const detail = await getStudentDetail(id);
  if (!detail) notFound();

  const { profile, stats, lessonProgress, quizAttempts } = detail;
  const initials =
    `${profile.firstName?.[0] ?? ""}${profile.surname?.[0] ?? ""}`.toUpperCase() || "?";
  const fullName = `${profile.firstName} ${profile.surname}`.trim() || profile.email;

  return (
    <div className="min-h-full bg-[#f0f6ff]">
      <header className="bg-white border-b border-[#deedf7] px-8 py-4 flex items-center gap-4">
        <Link
          href="/admin/students"
          className="text-xs text-[#8fa5bf] hover:text-[#0d1b35] transition-colors flex items-center gap-1.5"
        >
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/>
          </svg>
          {t("backToStudents")}
        </Link>
        <span className="text-[#deedf7]">/</span>
        <h1
          className="text-sm font-bold text-[#0d1b35]"
          style={{ fontFamily: "Outfit, system-ui, sans-serif" }}
        >
          {fullName}
        </h1>
      </header>

      <div className="p-8 space-y-6">
        {/* Profile card */}
        <div className="bg-white border border-[#deedf7] rounded-xl p-6 shadow-[0_2px_8px_rgba(13,27,53,0.06)]">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00b4d8] to-[#0882a0] flex items-center justify-center text-white text-xl font-bold shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  className="text-xl font-bold text-[#0d1b35]"
                  style={{ fontFamily: "Outfit, system-ui, sans-serif" }}
                >
                  {fullName}
                </h2>
                {profile.studentId && (
                  <Badge variant="electric">{t("studentIdLabel")}: {profile.studentId}</Badge>
                )}
              </div>
              <p className="text-sm text-[#8fa5bf] mt-0.5">{profile.email}</p>
              {profile.enrolledAt && (
                <p className="text-xs text-[#b0c4d8] mt-1">
                  {t("enrolledLabel")}: {new Date(profile.enrolledAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard
            label={t("colProgress")}
            value={`${stats.completedLessons} / ${stats.totalLessons}`}
          />
          <StatCard
            label={t("colBestScore")}
            value={stats.avgQuizScore !== null ? `${stats.avgQuizScore}%` : "—"}
          />
          <StatCard
            label={t("colLastViewed")}
            value={
              stats.lastActiveAt
                ? new Date(stats.lastActiveAt).toLocaleDateString()
                : "—"
            }
          />
        </div>

        {/* Lesson progress */}
        <div className="bg-white border border-[#deedf7] rounded-xl shadow-[0_2px_8px_rgba(13,27,53,0.06)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#f0f6ff]">
            <h2
              className="text-sm font-bold text-[#0d1b35]"
              style={{ fontFamily: "Outfit, system-ui, sans-serif" }}
            >
              {t("lessonProgress")}
            </h2>
          </div>
          {lessonProgress.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-[#8fa5bf]">{t("noStudents")}</p>
          ) : (
            <>
              <div className="px-6 py-2.5 border-b border-[#f0f6ff] grid grid-cols-[1fr_6rem_7rem_5rem_7rem] gap-4 items-center">
                <span className="text-[10px] font-semibold text-[#8fa5bf] uppercase tracking-wider">{t("colLesson")}</span>
                <span className="text-[10px] font-semibold text-[#8fa5bf] uppercase tracking-wider">{t("colStatus")}</span>
                <span className="text-[10px] font-semibold text-[#8fa5bf] uppercase tracking-wider">{t("colProgress")}</span>
                <span className="text-[10px] font-semibold text-[#8fa5bf] uppercase tracking-wider">{t("colBestScore")}</span>
                <span className="text-[10px] font-semibold text-[#8fa5bf] uppercase tracking-wider">{t("colLastViewed")}</span>
              </div>
              <div className="divide-y divide-[#f0f6ff]">
                {lessonProgress.map((row) => (
                  <div
                    key={row.lessonId}
                    className="px-6 py-3.5 grid grid-cols-[1fr_6rem_7rem_5rem_7rem] gap-4 items-center hover:bg-[#f8faff] transition-colors"
                  >
                    <p className="text-sm text-[#0d1b35] truncate font-medium">
                      {localize(row.lessonTitle, loc)}
                    </p>
                    <div>
                      {row.status === "completed" && (
                        <Badge variant="success">{t("statusCompleted")}</Badge>
                      )}
                      {row.status === "in-progress" && (
                        <Badge variant="electric">{t("statusInProgress")}</Badge>
                      )}
                      {row.status === "not-started" && (
                        <Badge variant="default">{t("statusNotStarted")}</Badge>
                      )}
                    </div>
                    <div>
                      <ProgressBar value={row.progressPercent} size="sm" />
                    </div>
                    <p className="text-xs text-[#4a6080] font-medium">
                      {row.quizBestScore !== null ? `${row.quizBestScore}%` : "—"}
                    </p>
                    <p className="text-xs text-[#8fa5bf]">
                      {row.lastViewedAt
                        ? new Date(row.lastViewedAt).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Quiz attempts */}
        <div className="bg-white border border-[#deedf7] rounded-xl shadow-[0_2px_8px_rgba(13,27,53,0.06)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#f0f6ff]">
            <h2
              className="text-sm font-bold text-[#0d1b35]"
              style={{ fontFamily: "Outfit, system-ui, sans-serif" }}
            >
              {t("quizAttempts")}
            </h2>
          </div>
          {quizAttempts.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-[#8fa5bf]">
              {t("noQuizAttempts")}
            </p>
          ) : (
            <>
              <div className="px-6 py-2.5 border-b border-[#f0f6ff] grid grid-cols-[1fr_1fr_5rem_5rem_4rem_7rem] gap-4 items-center">
                <span className="text-[10px] font-semibold text-[#8fa5bf] uppercase tracking-wider">{t("colQuiz")}</span>
                <span className="text-[10px] font-semibold text-[#8fa5bf] uppercase tracking-wider">{t("colLesson")}</span>
                <span className="text-[10px] font-semibold text-[#8fa5bf] uppercase tracking-wider">{t("colScore")}</span>
                <span className="text-[10px] font-semibold text-[#8fa5bf] uppercase tracking-wider">{t("colResult")}</span>
                <span className="text-[10px] font-semibold text-[#8fa5bf] uppercase tracking-wider">{t("colTime")}</span>
                <span className="text-[10px] font-semibold text-[#8fa5bf] uppercase tracking-wider">{t("colDate")}</span>
              </div>
              <div className="divide-y divide-[#f0f6ff]">
                {quizAttempts.map((attempt) => (
                  <div
                    key={attempt.id}
                    className="px-6 py-3.5 grid grid-cols-[1fr_1fr_5rem_5rem_4rem_7rem] gap-4 items-center hover:bg-[#f8faff] transition-colors"
                  >
                    <p className="text-sm text-[#0d1b35] truncate font-medium">
                      {localize(attempt.quizTitle, loc)}
                    </p>
                    <p className="text-xs text-[#8fa5bf] truncate">
                      {localize(attempt.lessonTitle, loc)}
                    </p>
                    <p className="text-xs font-semibold text-[#4a6080]">
                      {attempt.score}/{attempt.maxScore}
                      <span className="text-[10px] text-[#8fa5bf] ml-1">({attempt.percentage}%)</span>
                    </p>
                    <div>
                      <Badge variant={attempt.passed ? "success" : "danger"}>
                        {attempt.passed ? t("passed") : t("failed")}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#8fa5bf]">{formatTime(attempt.timeSpentSeconds)}</p>
                    <p className="text-xs text-[#8fa5bf]">
                      {new Date(attempt.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
