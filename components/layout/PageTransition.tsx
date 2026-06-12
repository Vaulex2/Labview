"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

/**
 * Animated wrapper for in-app route changes. Keyed on the full pathname (which
 * includes the `/[locale]` segment), so it re-runs on both navigation AND a
 * language switch — the two cases that felt abrupt before.
 *
 * Per the project's anti-generic guardrails, only `opacity` and `transform`
 * animate, with spring easing (never `transition-all`). When the visitor prefers
 * reduced motion we collapse to a quick fade.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="flex flex-1 flex-col min-h-0"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
        transition={
          reduce
            ? { duration: 0.15 }
            : { type: "spring", stiffness: 360, damping: 34, mass: 0.9 }
        }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
