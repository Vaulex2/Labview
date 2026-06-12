"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useReducedMotion } from "motion/react";

/**
 * Global navigation progress bar. Gives every in-app click an instant, branded
 * acknowledgement so slow route loads never feel like a frozen tab.
 *
 * Next's App Router has no public navigation-event API, so we detect the *start*
 * of a navigation by patching `history.pushState`/`replaceState` and watching
 * in-app anchor clicks (covers the next-intl `Link`) plus `popstate`. The
 * *finish* is the route actually committing — observed via a `pathname` /
 * `searchParams` change.
 *
 * Per the project guardrails only `transform` (scaleX) and `opacity` animate,
 * never `transition-all`. Reduced-motion collapses the trickle to a quick fill.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reduce = useReducedMotion();

  // 0 = idle/hidden, 0→1 = scaleX of the fill.
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const trickle = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeOut = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRef = useRef(false);

  const clearTimers = () => {
    if (trickle.current) clearInterval(trickle.current);
    if (fadeOut.current) clearTimeout(fadeOut.current);
    trickle.current = null;
    fadeOut.current = null;
  };

  const start = () => {
    if (activeRef.current) return;
    activeRef.current = true;
    clearTimers();
    // Next's router calls history.replaceState inside a useInsertionEffect, where
    // React forbids scheduling state updates. Defer the actual setState out of
    // that phase via a microtask; bail if the navigation already finished.
    queueMicrotask(() => {
      if (!activeRef.current) return;
      setVisible(true);
      setProgress(0.3);
      if (reduce) return; // hold a solid bar; completion fills it.
      // Trickle toward 90%, slowing as it approaches — classic "almost there" feel.
      trickle.current = setInterval(() => {
        setProgress((p) => (p >= 0.9 ? p : p + (0.9 - p) * 0.12));
      }, 240);
    });
  };

  const done = () => {
    if (!activeRef.current) return;
    activeRef.current = false;
    clearTimers();
    setProgress(1);
    fadeOut.current = setTimeout(() => {
      setVisible(false);
      // Reset width only after the fade has hidden it, so it never rewinds on screen.
      setTimeout(() => setProgress(0), 200);
    }, 220);
  };

  // ── Start detection: patch history + listen for clicks / back-forward ──
  useEffect(() => {
    const origPush = history.pushState;
    const origReplace = history.replaceState;

    history.pushState = function (...args) {
      start();
      return origPush.apply(this, args as Parameters<typeof origPush>);
    };
    history.replaceState = function (...args) {
      start();
      return origReplace.apply(this, args as Parameters<typeof origReplace>);
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      // Same-origin, real navigation (not an in-page hash or external link).
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      start();
    };

    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("popstate", start);

    return () => {
      history.pushState = origPush;
      history.replaceState = origReplace;
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("popstate", start);
      clearTimers();
    };
    // start/done are stable enough for this lifecycle; intentional one-time setup.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  // ── Finish detection: the committed route changed ──
  useEffect(() => {
    done();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s ease" }}
    >
      <div
        className="h-full origin-left rounded-r-full bg-gradient-to-r from-[#00b4d8] to-[#22d3ee]"
        style={{
          transform: `scaleX(${progress})`,
          transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: "0 0 10px 2px rgba(0,180,216,0.55), 0 0 4px 1px rgba(34,211,238,0.45)",
        }}
      />
    </div>
  );
}
