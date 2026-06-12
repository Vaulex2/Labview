"use client";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { useSidebar } from "./SidebarContext";

interface AppTopBarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function AppTopBar({ title, subtitle, actions }: AppTopBarProps) {
  const { toggle } = useSidebar();

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#deedf7] px-4 md:px-6 py-3.5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger — mobile only */}
        <button
          type="button"
          onClick={toggle}
          aria-label="Open navigation"
          className="md:hidden shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-[#4a6080] hover:bg-[#f0f6ff] hover:text-[#0d1b35] transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-1 active:scale-95"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="min-w-0">
          <h1 className="text-lg font-bold text-[#0d1b35] leading-tight font-[family-name:var(--font-outfit)] truncate">
            {title}
          </h1>
          {subtitle && <p className="text-xs text-[#8fa5bf] mt-0.5 truncate">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {actions}
        <LanguageSwitcher tone="light" />
      </div>
    </header>
  );
}
