import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AppTopBar } from "@/components/layout/AppTopBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { VisualizationPanel } from "@/components/visualization/VisualizationPanel";
import { getLessonById } from "@/lib/data/lessons";
import { getQuizByLessonId } from "@/lib/data/quizzes";
import { getMyProgress } from "@/lib/data/progress";
import { localize } from "@/lib/i18n/localize";
import type { Locale } from "@/lib/types";

interface Props { params: Promise<{ locale: string; id: string }> }

/**
 * Lessons store an external video link in `video_path` (passed through the
 * signed-URL layer untouched). When that link points at YouTube we embed the
 * player via an iframe rather than the native `<video>` element. Returns a
 * privacy-friendly embed URL, or null for non-YouTube sources.
 */
function youTubeEmbedUrl(url: string | undefined): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  if (!match) return null;
  return `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0&modestbranding=1`;
}

export default async function LessonPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("Lesson");
  const tCat = await getTranslations("Library.categories");
  const tDifficulty = await getTranslations("Common.difficulty");
  const lesson = await getLessonById(id);
  if (!lesson) notFound();

  const [allProgress, quiz] = await Promise.all([
    getMyProgress(),
    getQuizByLessonId(id),
  ]);
  const progress = allProgress.find((p) => p.lessonId === id);

  const diffBadge: Record<string, "electric" | "warning" | "danger"> = {
    beginner: "electric", intermediate: "warning", advanced: "danger",
  };
  const lessonTitle = localize(lesson.title, loc);
  const embedUrl = youTubeEmbedUrl(lesson.videoUrl);

  return (
    <>
      <AppTopBar
        title={lessonTitle}
        subtitle={`${t("minutes", { count: lesson.durationMinutes })} · ${tCat(lesson.category)} · ${tDifficulty(lesson.difficulty)}`}
        actions={
          quiz ? (
            <Link href={`/quizzes/${quiz.id}`}>
              <Button variant="primary" size="sm">{t("takeQuiz")}</Button>
            </Link>
          ) : undefined
        }
      />
      <div className="p-6 md:p-8 flex-1 w-full max-w-5xl">

        {/* Video player */}
        <section className="mb-8">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={lessonTitle}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full aspect-video rounded-2xl border border-[#162d5a] bg-[#0d1b35] shadow-[0_8px_24px_rgba(13,27,53,0.12)] block"
            />
          ) : lesson.videoUrl ? (
            <video
              controls
              poster={lesson.thumbnailUrl}
              src={lesson.videoUrl}
              className="w-full aspect-video rounded-2xl border border-[#162d5a] bg-[#0d1b35] shadow-[0_8px_24px_rgba(13,27,53,0.12)] block"
            />
          ) : (
          <div className="relative rounded-2xl overflow-hidden bg-[#0d1b35] aspect-video flex items-center justify-center border border-[#162d5a] shadow-[0_8px_24px_rgba(13,27,53,0.12)]">
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 800 450" fill="none" preserveAspectRatio="xMidYMid slice">
              <circle cx="100" cy="100" r="8" stroke="#22d3ee" strokeWidth="1.5" fill="none"/>
              <circle cx="400" cy="225" r="8" stroke="#22d3ee" strokeWidth="1.5" fill="none"/>
              <circle cx="700" cy="100" r="8" stroke="#22d3ee" strokeWidth="1.5" fill="none"/>
              <polyline points="100,100 100,225 400,225" stroke="#22d3ee" strokeWidth="1" strokeDasharray="12 5"/>
              <polyline points="400,225 700,225 700,100" stroke="#22d3ee" strokeWidth="1" strokeDasharray="12 5"/>
            </svg>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-[rgba(0,180,216,0.12)] border border-[rgba(0,180,216,0.30)] flex items-center justify-center cursor-pointer hover:bg-[rgba(0,180,216,0.20)] transition-colors duration-200 group">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" fill="#22d3ee" stroke="#22d3ee" strokeWidth="1.5" className="group-hover:fill-white group-hover:stroke-white transition-colors duration-200"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-white font-semibold text-sm">{lessonTitle}</p>
                <p className="text-[#4a6080] text-xs mt-1">{t("lessonVideo", { count: lesson.durationMinutes })}</p>
              </div>
            </div>
            {/* Fake progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[rgba(0,0,0,0.5)]">
              <div className="h-full bg-[#00b4d8] w-0" />
            </div>
          </div>
          )}

          {/* Lesson meta */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <Badge variant={diffBadge[lesson.difficulty]}>{tDifficulty(lesson.difficulty)}</Badge>
            <Badge variant="default">{tCat(lesson.category)}</Badge>
            {lesson.tags.slice(0, 3).map((tag, i) => (
              <Badge key={i} variant="default">{localize(tag, loc)}</Badge>
            ))}
            {progress?.status === "completed" && <Badge variant="success">{t("completed")}</Badge>}
          </div>
        </section>

        {/* Presentation slides */}
        {lesson.presentationUrl && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-6 bg-gradient-to-b from-[#00b4d8] to-[#0882a0] rounded-full" />
              <h2 className="text-lg font-bold text-[#0d1b35]" style={{fontFamily:"Outfit, system-ui, sans-serif"}}>{t("presentation")}</h2>
            </div>
            <div className="rounded-2xl overflow-hidden border border-[#162d5a] bg-[#0d1b35] shadow-[0_8px_24px_rgba(13,27,53,0.12)]">
              {/* Toolbar */}
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[rgba(0,180,216,0.18)]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-8 h-8 rounded-lg bg-[rgba(0,180,216,0.12)] border border-[rgba(0,180,216,0.25)] flex items-center justify-center shrink-0">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#22d3ee" strokeWidth="1.8">
                      <rect x="3" y="4" width="18" height="13" rx="1.5"/>
                      <line x1="8" y1="21" x2="16" y2="21"/>
                      <line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                  </span>
                  <p className="text-xs text-[#8fa5bf] truncate">{t("presentationHint")}</p>
                </div>
                <a href={lesson.presentationUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
                  <Button variant="secondary" size="sm">{t("openPdf")}</Button>
                </a>
              </div>
              {/* Embedded PDF */}
              <iframe
                src={`${lesson.presentationUrl}#view=FitH`}
                title={`${lessonTitle} — ${t("presentation")}`}
                className="w-full h-[480px] md:h-[600px] bg-white block"
              />
            </div>
          </section>
        )}

        {/* Lesson summaries */}
        {lesson.summaries.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-6 bg-gradient-to-b from-[#00b4d8] to-[#0882a0] rounded-full" />
              <h2 className="text-lg font-bold text-[#0d1b35]" style={{fontFamily:"Outfit, system-ui, sans-serif"}}>{t("lessonSummary")}</h2>
            </div>
            <div className="space-y-6">
              {lesson.summaries.map(summary => (
                <div key={summary.id} className="card-surface p-6">
                  <h3 className="text-sm font-bold text-[#0d1b35] mb-4 flex items-center gap-2" style={{fontFamily:"Outfit, system-ui, sans-serif"}}>
                    <span className="w-5 h-5 rounded bg-[rgba(0,180,216,0.12)] flex items-center justify-center text-[#00b4d8] text-xs font-bold">
                      {summary.order}
                    </span>
                    {localize(summary.sectionTitle, loc)}
                  </h3>
                  <div className="space-y-3">
                    {summary.paragraphs.map((para, i) => (
                      <p key={i} className="text-sm text-[#4a6080] leading-relaxed">{localize(para, loc)}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Visualization demos */}
        {lesson.visualizationExamples.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-6 bg-gradient-to-b from-[#22d3ee] to-[#00b4d8] rounded-full" />
              <h2 className="text-lg font-bold text-[#0d1b35]" style={{fontFamily:"Outfit, system-ui, sans-serif"}}>
                {t("interactiveViz")}
              </h2>
            </div>
            <p className="text-sm text-[#4a6080] mb-5">
              {t.rich("vizIntro", {
                strong: (chunks) => <strong className="text-[#0d1b35]">{chunks}</strong>,
              })}
            </p>
            <div className="space-y-5">
              {lesson.visualizationExamples.map(viz => (
                <VisualizationPanel
                  key={viz.id}
                  exampleId={viz.id}
                  title={localize(viz.title, loc)}
                  description={localize(viz.description, loc)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Quiz CTA */}
        {quiz && (
          <section>
            <div className="rounded-2xl bg-gradient-to-br from-[#0d1b35] to-[#162d5a] border border-[rgba(0,180,216,0.20)] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#22d3ee] font-semibold tracking-wide uppercase mb-1">{t("readyToTest")}</p>
                <h3 className="text-base font-bold text-white" style={{fontFamily:"Outfit, system-ui, sans-serif"}}>{localize(quiz.title, loc)}</h3>
                <p className="text-sm text-[#8fa5bf] mt-1">
                  {t("quizMeta", { questions: quiz.questions.length, minutes: quiz.timeLimitMinutes ?? 0, score: quiz.passingScore })}
                </p>
              </div>
              <Link href={`/quizzes/${quiz.id}`} className="shrink-0">
                <Button variant="primary">{t("takeQuizArrow")}</Button>
              </Link>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
