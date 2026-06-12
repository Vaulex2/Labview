"use client";

import { useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { localize } from "@/lib/i18n/localize";
import type { Locale, VideoLesson, LessonProgress } from "@/lib/types";

const diffBadge: Record<string, "electric" | "warning" | "danger"> = {
  beginner: "electric", intermediate: "warning", advanced: "danger",
};

export function LessonLibrary({
  lessons,
  progress,
}: {
  lessons: VideoLesson[];
  progress: LessonProgress[];
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("Library");
  const tCat = useTranslations("Library.categories");
  const tDifficulty = useTranslations("Common.difficulty");
  const router = useRouter();

  const [activeCat, setActiveCat] = useState<string>("all");
  const [query, setQuery] = useState("");

  // Warm a lesson route on hover/focus so the click feels near-instant. Each id
  // is prefetched at most once per mount.
  const prefetched = useRef<Set<string>>(new Set());
  const warm = (id: string) => {
    if (prefetched.current.has(id)) return;
    prefetched.current.add(id);
    router.prefetch(`/lessons/${id}`);
  };

  const categories = useMemo(
    () => Array.from(new Set(lessons.map((l) => l.category))),
    [lessons]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return lessons.filter((lesson) => {
      const matchesCat = activeCat === "all" || lesson.category === activeCat;
      if (!matchesCat) return false;
      if (!q) return true;
      const title = localize(lesson.title, locale).toLowerCase();
      const tags = lesson.tags.map((tg) => localize(tg, locale).toLowerCase()).join(" ");
      const cat = tCat(lesson.category).toLowerCase();
      return title.includes(q) || tags.includes(q) || cat.includes(q);
    });
  }, [activeCat, query, locale, tCat]);

  const chipBase =
    "px-4 py-1.5 rounded-full text-xs font-medium border transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 active:scale-[0.97]";
  const chipActive =
    "bg-[#00b4d8] text-white border-[#00b4d8] font-semibold shadow-[0_2px_8px_rgba(0,180,216,0.25)]";
  const chipIdle =
    "text-[#4a6080] border-[#c8dff0] bg-white hover:border-[#00b4d8] hover:text-[#0d1b35]";

  return (
    <>
      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCat("all")}
          className={[chipBase, activeCat === "all" ? chipActive : chipIdle].join(" ")}
        >
          {t("all")}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={[chipBase, activeCat === cat ? chipActive : chipIdle].join(" ")}
          >
            {tCat(cat)}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className="relative mb-8 max-w-lg">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8fa5bf] pointer-events-none" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full h-11 pl-10 pr-4 rounded-lg border border-[#c8dff0] bg-white text-sm text-[#0d1b35] placeholder:text-[#8fa5bf] focus:border-[#00b4d8] focus:ring-2 focus:ring-[rgba(0,180,216,0.15)] outline-none transition-[border-color,box-shadow] duration-200 shadow-[inset_0_1px_3px_rgba(13,27,53,0.04)]"
        />
      </div>

      {/* Lesson grid */}
      {filtered.length === 0 ? (
        <p className="text-sm text-[#8fa5bf]">{t("noResults")}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((lesson) => {
            const prog = progress.find((p) => p.lessonId === lesson.id);
            const isCompleted = prog?.status === "completed";
            const isInProgress = prog?.status === "in-progress";

            return (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                onMouseEnter={() => warm(lesson.id)}
                onFocus={() => warm(lesson.id)}
                className="card-surface hover-glow flex flex-col overflow-hidden group transition-[box-shadow,border-color] duration-200"
              >
                {/* Thumbnail */}
                <div className="relative h-40 bg-[#0d1b35] flex items-center justify-center overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 320 160" fill="none" preserveAspectRatio="xMidYMid slice">
                    <circle cx="40" cy="40" r="5" stroke="#22d3ee" strokeWidth="1.2" fill="none" />
                    <circle cx="160" cy="80" r="5" stroke="#22d3ee" strokeWidth="1.2" fill="none" />
                    <circle cx="280" cy="40" r="5" stroke="#22d3ee" strokeWidth="1.2" fill="none" />
                    <polyline points="40,40 40,80 160,80" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="8 3" />
                    <polyline points="160,80 280,80 280,40" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="8 3" />
                  </svg>
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-[rgba(0,180,216,0.10)] border border-[rgba(0,180,216,0.25)] flex items-center justify-center group-hover:bg-[rgba(0,180,216,0.20)] transition-colors duration-200">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#22d3ee" strokeWidth="1.8">
                      <polygon points="5 3 19 12 5 21 5 3" fill="rgba(34,211,238,0.15)" />
                    </svg>
                  </div>
                  {isCompleted && (
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#10b981] flex items-center justify-center">
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                  {isInProgress && prog && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[rgba(0,0,0,0.3)]">
                      <div className="h-full bg-[#00b4d8]" style={{ width: `${prog.progressPercent}%` }} />
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-[#0d1b35] leading-snug group-hover:text-[#162d5a] transition-colors" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>
                      {localize(lesson.title, locale)}
                    </h3>
                    <Badge variant={diffBadge[lesson.difficulty]} className="shrink-0">{tDifficulty(lesson.difficulty)}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#8fa5bf]">
                    <span className="flex items-center gap-1">
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      {t("minutes", { count: lesson.durationMinutes })}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                      {t("vizCount", { count: lesson.visualizationExamples.length })}
                    </span>
                    <Badge variant="default" className="capitalize">{tCat(lesson.category)}</Badge>
                  </div>
                  {prog && prog.status !== "not-started" && (
                    <div className="mt-auto">
                      <ProgressBar value={prog.progressPercent} size="sm" showPercent />
                    </div>
                  )}
                  {(!prog || prog.status === "not-started") && (
                    <div className="mt-auto text-xs text-[#8fa5bf] flex items-center gap-1">
                      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                      {t("startLesson")}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
