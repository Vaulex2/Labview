"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { DataflowLoader } from "@/components/ui/DataflowLoader";

/**
 * Branded "Did you know?" strip shown on slow route loads. Turns dead wait time
 * into a micro-learning moment: an animated dataflow motif plus LabVIEW tips that
 * rotate every few seconds. Layered on top of the existing skeletons (it never
 * replaces them), so there's no layout shift when the real content arrives.
 *
 * Tips live in the `Loading.tips` i18n array, so they're localized per locale.
 * Honors reduced-motion by holding a single static tip with no auto-rotation.
 */
export function DidYouKnow({ className = "" }: { className?: string }) {
  const t = useTranslations("Loading");
  const reduce = useReducedMotion();

  const tips = useMemo(() => {
    const raw = t.raw("tips");
    return Array.isArray(raw) ? (raw as string[]) : [];
  }, [t]);

  // Random starting tip so it varies per load.
  const [index, setIndex] = useState(() =>
    tips.length ? Math.floor(Math.random() * tips.length) : 0
  );

  useEffect(() => {
    if (reduce || tips.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % tips.length);
    }, 5000);
    return () => clearInterval(id);
  }, [reduce, tips.length]);

  if (tips.length === 0) return null;

  return (
    <div
      className={`card-surface flex items-center gap-4 px-5 py-4 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="shrink-0 grid place-items-center w-14 h-10 rounded-lg bg-[#f0f6ff] border border-[#deedf7]">
        <DataflowLoader animated={!reduce} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-display text-[11px] font-semibold uppercase tracking-widest text-[#00b4d8] mb-1">
          {t("didYouKnow")}
        </p>
        <div className="relative min-h-[2.5rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={index}
              className="text-sm leading-relaxed text-[#4a6080]"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={
                reduce
                  ? { duration: 0.15 }
                  : { type: "spring", stiffness: 360, damping: 34, mass: 0.9 }
              }
            >
              {tips[index]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
