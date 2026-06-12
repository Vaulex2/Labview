"use client";

import { LanguageSwitcher } from "./LanguageSwitcher";

interface AppTopBarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function AppTopBar({ title, subtitle, actions }: AppTopBarProps) {
  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#deedf7] px-6 py-3.5 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-lg font-bold text-[#0d1b35] leading-tight font-[family-name:var(--font-outfit)] truncate">
          {title}
        </h1>
        {subtitle && <p className="text-xs text-[#8fa5bf] mt-0.5 truncate">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {actions}
        <LanguageSwitcher tone="light" />
      </div>
    </header>
  );
}
