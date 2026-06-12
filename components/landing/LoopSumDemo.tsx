"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { BlockDiagram } from "@/components/visualization/BlockDiagram";
import { useSequencer } from "@/lib/visualization/useSequencer";
import { buildForLoopSumDiagram, MIN_N, MAX_N } from "@/lib/visualization/buildForLoopSum";
import type { DiagramDefinition, Locale } from "@/lib/types";

/* Interactive landing demo of the For-Loop-Sum VI. The user picks N, presses
   Run, and watches the running sum accumulate through the shift register.
   Reuses the real visualization engine (useSequencer + BlockDiagram) without
   touching the shared in-app VisualizationPanel. */

export function LoopSumDemo() {
  const t = useTranslations("Viz");
  const tL = useTranslations("Landing");
  const locale = useLocale() as Locale;

  const [n, setN] = useState(4);
  const [hasRun, setHasRun] = useState(false);
  const [speed, setSpeed] = useState(1);

  const definition = useMemo(() => buildForLoopSumDiagram(n), [n]);

  return (
    <div className="rounded-[28px] bg-[#fafdff] border border-[rgba(83,88,98,0.14)] overflow-hidden shadow-[rgba(4,69,144,0.08)_0px_14px_20px_4px]">
      {/* Header — title + N stepper */}
      <div className="px-5 md:px-6 py-4 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0099ff]" />
            <span className="text-[11px] font-semibold text-[#0099ff] tracking-widest uppercase">{t("badge")}</span>
          </div>
          <h3 className="text-base font-semibold text-[#0a0d12]" style={{ fontFamily: "'Satoshi', var(--font-geist), system-ui, sans-serif", letterSpacing: "-0.02em" }}>
            {definition.title[locale]}
          </h3>
          <p className="text-xs text-[#535862] mt-0.5 max-w-md leading-relaxed">{definition.description[locale]}</p>
        </div>

        {/* N stepper */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-[#535862]">{tL("demoNLabel")}</span>
          <div className="flex items-center gap-1 rounded-full bg-[#f6f7f8] border border-[rgba(83,88,98,0.16)] p-1">
            <button
              type="button"
              aria-label="decrease"
              onClick={() => setN((v) => Math.max(MIN_N, v - 1))}
              disabled={n <= MIN_N}
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#181d27] hover:bg-white disabled:opacity-35 disabled:hover:bg-transparent transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0099ff]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
            <span className="min-w-7 text-center text-sm font-semibold text-[#0a0d12] tabular-nums">{n}</span>
            <button
              type="button"
              aria-label="increase"
              onClick={() => setN((v) => Math.min(MAX_N, v + 1))}
              disabled={n >= MAX_N}
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#181d27] hover:bg-white disabled:opacity-35 disabled:hover:bg-transparent transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0099ff]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Runner — keyed by N so changing N gives a clean run with the new value */}
      <Runner
        key={n}
        definition={definition}
        autoRun={hasRun}
        speed={speed}
        locale={locale}
        onFirstRun={() => setHasRun(true)}
        onSpeed={setSpeed}
      />
    </div>
  );
}

function Runner({
  definition,
  autoRun,
  speed,
  locale,
  onFirstRun,
  onSpeed,
}: {
  definition: DiagramDefinition;
  autoRun: boolean;
  speed: number;
  locale: Locale;
  onFirstRun: () => void;
  onSpeed: (s: number) => void;
}) {
  const t = useTranslations("Viz");
  const { isPlaying, isFinished, nodeStates, nodeValues, activeDots, play, pause, restart, setSpeed } =
    useSequencer(definition);
  const [revealed, setRevealed] = useState(autoRun);

  // Apply the externally-controlled speed (persists across N changes).
  useEffect(() => { setSpeed(speed); }, [speed, setSpeed]);

  // Auto-play when this runner is (re)mounted after the user has already run once.
  useEffect(() => {
    if (!autoRun) return;
    const id = setTimeout(() => play(), 80);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRun = () => {
    if (!revealed) {
      setRevealed(true);
      onFirstRun();
      setTimeout(() => play(), 50);
      return;
    }
    if (isPlaying) pause();
    else if (isFinished) restart();
    else play();
  };

  const runLabel = !revealed ? t("run") : isPlaying ? `⏸ ${t("pause")}` : isFinished ? `↺ ${t("replay")}` : `▶ ${t("resume")}`;

  return (
    <>
      {/* Diagram / placeholder (dark canvas — nodes are designed for it) */}
      <div className="bg-[#0a1628] relative overflow-x-auto">
        {revealed ? (
          <div className="p-3 min-w-[680px]">
            <BlockDiagram definition={definition} nodeStates={nodeStates} nodeValues={nodeValues} activeDots={activeDots} locale={locale} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-8 gap-4">
            <svg width="200" height="80" viewBox="0 0 200 80" fill="none" opacity="0.4">
              <rect x="10" y="28" width="50" height="24" rx="4" stroke="#4fbeff" strokeWidth="1.5" />
              <rect x="90" y="18" width="40" height="44" rx="4" stroke="#4fbeff" strokeWidth="1.5" />
              <rect x="160" y="28" width="30" height="24" rx="4" stroke="#0099ff" strokeWidth="1.5" />
              <polyline points="60,40 90,40" stroke="#8fa5bf" strokeWidth="1.2" />
              <polyline points="130,40 160,40" stroke="#8fa5bf" strokeWidth="1.2" />
              <circle cx="75" cy="40" r="3" fill="#4fbeff" />
              <circle cx="145" cy="40" r="3" fill="#0099ff" />
            </svg>
            <p className="text-[#8fa5bf] text-sm text-center max-w-xs">
              {t.rich("placeholder", { strong: (chunks) => <strong className="text-[#4fbeff]">{chunks}</strong> })}
            </p>
          </div>
        )}
      </div>

      {/* Controls — Geniestudio light */}
      <div className="px-5 md:px-6 py-3.5 bg-[#f6f7f8] border-t border-[rgba(83,88,98,0.12)] flex items-center gap-3 flex-wrap">
        <button
          onClick={handleRun}
          className={[
            "inline-flex items-center gap-2 h-10 px-6 rounded-full text-sm font-medium transition-[background-color,transform] duration-200 active:scale-[0.97]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0099ff]",
            isPlaying
              ? "bg-white text-[#181d27] border border-[rgba(83,88,98,0.2)] hover:border-[rgba(83,88,98,0.4)]"
              : "bg-[#181d27] text-white hover:bg-[#0a0d12]",
          ].join(" ")}
        >
          {runLabel}
        </button>

        {revealed && (
          <button
            onClick={restart}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-xs font-medium text-[#535862] border border-[rgba(83,88,98,0.18)] bg-white hover:text-[#0a0d12] hover:border-[rgba(83,88,98,0.4)] transition-colors duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0099ff]"
          >
            ↺ {t("restart")}
          </button>
        )}

        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-xs text-[#93979f] font-medium mr-1">{t("speed")}</span>
          {[0.5, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => onSpeed(s)}
              className={[
                "h-8 px-3 rounded-full text-xs font-semibold border transition-colors duration-150",
                "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0099ff]",
                speed === s
                  ? "bg-[#0099ff] text-white border-[#0099ff]"
                  : "bg-white text-[#535862] border-[rgba(83,88,98,0.18)] hover:border-[#0099ff] hover:text-[#0a0d12]",
              ].join(" ")}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
