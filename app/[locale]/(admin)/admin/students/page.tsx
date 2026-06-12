import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { listStudents } from "@/lib/data/admin";

type ScoreVariant = "default" | "success" | "warning" | "danger";

function scoreBadgeVariant(score: number | null): ScoreVariant {
  if (score === null) return "default";
  if (score >= 70) return "success";
  if (score >= 40) return "warning";
  return "danger";
}

export default async function StudentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Studio");
  const students = await listStudents();

  return (
    <div className="min-h-full bg-[#f0f6ff]">
      <header className="bg-white border-b border-[#deedf7] px-8 py-4 flex items-center justify-between">
        <div>
          <h1
            className="text-lg font-bold text-[#0d1b35]"
            style={{ fontFamily: "Outfit, system-ui, sans-serif" }}
          >
            {t("navStudents")}
          </h1>
          <p className="text-xs text-[#8fa5bf]">{t("studentsSubtitle")}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f0f6ff] border border-[#deedf7] rounded-lg">
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#8fa5bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span className="text-xs font-semibold text-[#4a6080]">{students.length}</span>
        </div>
      </header>

      <div className="p-8">
        <div className="bg-white border border-[#deedf7] rounded-xl shadow-[0_2px_8px_rgba(13,27,53,0.06)] overflow-hidden">
          {/* Table header */}
          {students.length > 0 && (
            <div className="px-6 py-3 border-b border-[#f0f6ff] grid grid-cols-[1fr_9rem_5rem_7rem_5rem] gap-4 items-center">
              <span className="text-[10px] font-semibold text-[#8fa5bf] uppercase tracking-wider">{t("studentProfile")}</span>
              <span className="text-[10px] font-semibold text-[#8fa5bf] uppercase tracking-wider">{t("colProgress")}</span>
              <span className="text-[10px] font-semibold text-[#8fa5bf] uppercase tracking-wider text-center">{t("colScore")}</span>
              <span className="text-[10px] font-semibold text-[#8fa5bf] uppercase tracking-wider">{t("colLastViewed")}</span>
              <span className="text-[10px] font-semibold text-[#8fa5bf] uppercase tracking-wider"></span>
            </div>
          )}

          {students.length === 0 ? (
            <div className="px-6 py-16 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#f0f6ff] border border-[#deedf7] flex items-center justify-center">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#8fa5bf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <p className="text-sm text-[#8fa5bf]">{t("noStudents")}</p>
            </div>
          ) : (
            <div className="divide-y divide-[#f0f6ff]">
              {students.map((student) => {
                const initials =
                  `${student.firstName?.[0] ?? ""}${student.surname?.[0] ?? ""}`.toUpperCase() || "?";
                const fullName = `${student.firstName} ${student.surname}`.trim() || student.email;
                return (
                  <div
                    key={student.id}
                    className="px-6 py-4 grid grid-cols-[1fr_9rem_5rem_7rem_5rem] gap-4 items-center hover:bg-[#f8faff] transition-colors"
                  >
                    {/* Profile */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00b4d8] to-[#0882a0] flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#0d1b35] truncate">{fullName}</p>
                        <p className="text-xs text-[#8fa5bf] truncate">{student.email}</p>
                        {student.studentId && (
                          <p className="text-[10px] text-[#b0c4d8]">
                            {t("studentIdLabel")}: {student.studentId}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Completion */}
                    <div>
                      <p className="text-[10px] text-[#8fa5bf] mb-1">
                        {student.completedLessons}/{student.totalLessons} {t("lessonsLabel")}
                      </p>
                      <ProgressBar value={student.completionPercent} size="sm" />
                    </div>

                    {/* Avg quiz score */}
                    <div className="flex justify-center">
                      <Badge variant={scoreBadgeVariant(student.avgQuizScore)}>
                        {student.avgQuizScore !== null ? `${student.avgQuizScore}%` : "—"}
                      </Badge>
                    </div>

                    {/* Last active */}
                    <div>
                      <p className="text-xs text-[#8fa5bf]">
                        {student.lastActiveAt
                          ? new Date(student.lastActiveAt).toLocaleDateString()
                          : "—"}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="flex justify-end">
                      <Link href={`/admin/students/${student.id}`}>
                        <Button variant="ghost" size="sm">{t("viewDetails")}</Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
