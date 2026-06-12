"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { BlockDiagram } from "./BlockDiagram";
import { useSequencer } from "@/lib/visualization/useSequencer";
import { getDiagram } from "@/lib/visualization/registry";
import type { Locale } from "@/lib/types";

interface VisualizationPanelProps {
  exampleId: string;
  title: string;
  description: string;
}

export function VisualizationPanel({ exampleId, title, description }: VisualizationPanelProps) {
  const t = useTranslations("Viz");
  const locale = useLocale() as Locale;
  const emptyText = { en: "", ru: "", uz: "" };
  const definition = getDiagram(exampleId);
  const [revealed, setRevealed] = useState(false);

  // User-editable inputs (e.g. a, b) that drive the computed values on the diagram.
  const [inputs, setInputs] = useState<Record<string, number>>(() =>
    Object.fromEntries((definition?.inputs ?? []).map((i) => [i.nodeId, i.default]))
  );
  const overrides = useMemo(
    () => (definition?.compute ? definition.compute(inputs) : {}),
    [definition, inputs]
  );

  const { isPlaying, isFinished, nodeStates, nodeValues, activeDots, speed, play, pause, restart, setSpeed } =
    useSequencer(
      definition ?? { id: "", title: emptyText, description: emptyText, canvasWidth: 760, canvasHeight: 300, nodes: [], wires: [], steps: [] },
      overrides
    );

  if (!definition) {
    return (
      <div className="rounded-xl border border-[#deedf7] bg-white p-6">
        <p className="text-sm text-[#8fa5bf]">{t("notFound", { id: exampleId })}</p>
      </div>
    );
  }

  const handleRun = () => {
    if (!revealed) { setRevealed(true); setTimeout(() => play(), 50); return; }
    if (isPlaying) { pause(); } else if (isFinished) { restart(); } else { play(); }
  };

  const buttonLabel = !revealed
    ? t("run")
    : isPlaying
    ? `⏸ ${t("pause")}`
    : isFinished
    ? `↺ ${t("replay")}`
    : `▶ ${t("resume")}`;

  const buttonColor = isPlaying
    ? "bg-[#162d5a] border-[#1e3f7a] text-[#8fa5bf] hover:text-white"
    : "bg-[#00b4d8] border-[#00b4d8] text-white hover:bg-[#0882a0] shadow-[0_2px_12px_rgba(0,180,216,0.35)]";

  return (
    <div className="rounded-xl border border-[#deedf7] bg-white overflow-hidden shadow-[0_2px_8px_rgba(13,27,53,0.06)]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#f0f6ff] flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#22d3ee] shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
            <span className="text-xs font-semibold text-[#22d3ee] tracking-wide uppercase">
              {t("badge")}
            </span>
          </div>
          <h3 className="text-sm font-bold text-[#0d1b35] font-[family-name:var(--font-outfit)]">
            {title}
          </h3>
          <p className="text-xs text-[#8fa5bf] mt-0.5 max-w-lg">{description}</p>
        </div>
      </div>

      {/* Interactive inputs */}
      {definition.inputs && definition.inputs.length > 0 && (
        <div className="px-5 py-3 bg-[#f4f9ff] border-b border-[#e4eef9] flex items-center gap-x-5 gap-y-2 flex-wrap">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#8fa5bf]">
            {t("inputsLabel")}
          </span>
          {definition.inputs.map((inp) => (
            <label key={inp.nodeId} className="inline-flex items-center gap-2 text-sm">
              <span className="font-bold text-[#00b4d8] font-[family-name:var(--font-outfit)]">{inp.label}</span>
              <span className="text-[#8fa5bf]">=</span>
              <input
                type="number"
                value={inputs[inp.nodeId] ?? inp.default}
                min={inp.min}
                max={inp.max}
                step={inp.step ?? 1}
                disabled={isPlaying}
                onChange={(e) => {
                  const raw = e.target.value;
                  const n = raw === "" ? 0 : parseFloat(raw);
                  setInputs((prev) => ({ ...prev, [inp.nodeId]: Number.isNaN(n) ? 0 : n }));
                }}
                className="w-16 h-8 px-2.5 rounded-lg border border-[#c8dff0] bg-white text-sm font-semibold text-[#0d1b35] tabular-nums outline-none focus:border-[#00b4d8] focus:ring-2 focus:ring-[rgba(0,180,216,0.15)] transition-[border-color,box-shadow] duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </label>
          ))}
        </div>
      )}

      {/* Diagram or placeholder */}
      <div className="bg-[#0a1628] relative">
        {revealed ? (
          <div className="p-3">
            <BlockDiagram
              definition={definition}
              nodeStates={nodeStates}
              nodeValues={nodeValues}
              activeDots={activeDots}
              locale={locale}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-8 gap-4">
            {/* Circuit preview decoration */}
            <svg width="200" height="80" viewBox="0 0 200 80" fill="none" opacity="0.35">
              <rect x="10" y="28" width="50" height="24" rx="4" stroke="#00b4d8" strokeWidth="1.5" />
              <rect x="90" y="18" width="40" height="44" rx="4" stroke="#00b4d8" strokeWidth="1.5" />
              <rect x="160" y="28" width="30" height="24" rx="4" stroke="#22d3ee" strokeWidth="1.5" />
              <polyline points="60,40 90,40" stroke="#8fa5bf" strokeWidth="1.2" />
              <polyline points="130,40 160,40" stroke="#8fa5bf" strokeWidth="1.2" />
              <circle cx="75" cy="40" r="3" fill="#00b4d8" />
              <circle cx="145" cy="40" r="3" fill="#22d3ee" />
            </svg>
            <p className="text-[#4a6080] text-sm text-center max-w-xs">
              {t.rich("placeholder", {
                strong: (chunks) => <strong className="text-[#22d3ee]">{chunks}</strong>,
              })}
            </p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="px-5 py-3.5 bg-[#f8faff] border-t border-[#edf4fc] flex items-center gap-4 flex-wrap">
        <button
          onClick={handleRun}
          className={[
            "inline-flex items-center gap-2 h-9 px-5 rounded-lg text-sm font-semibold border",
            "transition-[background-color,box-shadow,border-color,transform] duration-200",
            "active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2",
            "font-[family-name:var(--font-inter)]",
            buttonColor,
          ].join(" ")}
        >
          {buttonLabel}
        </button>

        {revealed && (
          <>
            <button
              onClick={restart}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg text-xs font-medium text-[#4a6080] border border-[#c8dff0] bg-white hover:border-[#00b4d8] hover:text-[#0d1b35] transition-colors duration-200 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 font-[family-name:var(--font-inter)]"
            >
              ↺ {t("restart")}
            </button>

            {/* Speed control */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-[#8fa5bf] font-medium">{t("speed")}</span>
              {[0.5, 1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={[
                    "h-7 px-2.5 rounded text-xs font-semibold border transition-colors duration-150",
                    "focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-1",
                    speed === s
                      ? "bg-[#00b4d8] text-white border-[#00b4d8]"
                      : "bg-white text-[#4a6080] border-[#c8dff0] hover:border-[#00b4d8] hover:text-[#0d1b35]",
                  ].join(" ")}
                >
                  {s}×
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
