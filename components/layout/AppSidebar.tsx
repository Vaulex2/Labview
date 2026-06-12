"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRef, useTransition } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { signOut } from "@/lib/auth/actions";
import type { User } from "@/lib/types";

const navItems = [
  {
    key: "dashboard",
    href: "/dashboard",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    key: "library",
    href: "/library",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5z" />
        <path d="M20 15H6.5A2.5 2.5 0 004 17.5" />
      </svg>
    ),
  },
  {
    key: "progress",
    href: "/progress",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    key: "quizzes",
    href: "/quizzes",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
];

const studioItem = {
  key: "studio",
  href: "/admin",
  icon: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z" />
    </svg>
  ),
};

const settingsIcon = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const signOutIcon = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export function AppSidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Sidebar");
  const router = useRouter();
  const [signingOut, startSignOut] = useTransition();

  // Warm a nav target on hover so switching sections feels instant.
  const prefetched = useRef<Set<string>>(new Set());
  const warm = (href: string) => {
    if (href === "#" || prefetched.current.has(href)) return;
    prefetched.current.add(href);
    router.prefetch(href);
  };

  const initials =
    `${user.firstName?.[0] ?? ""}${user.surname?.[0] ?? ""}`.toUpperCase() || "U";
  const fullName = `${user.firstName} ${user.surname}`.trim() || user.email;
  const isStaff = user.role === "teacher" || user.role === "admin";

  return (
    <aside className="fixed left-0 top-0 h-full w-64 flex flex-col bg-[#0d1b35] border-r border-[#162d5a] z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[#162d5a]">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00b4d8] to-[#0882a0] flex items-center justify-center shadow-[0_0_12px_rgba(0,180,216,0.40)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
        <div>
          <span className="font-display text-white font-bold text-lg tracking-tight leading-none font-[family-name:var(--font-outfit)]">
            Graphi<span className="text-[#22d3ee]">Code</span>
          </span>
          <p className="text-[10px] text-[#8fa5bf] tracking-wider mt-0.5">{t("tagline")}</p>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="px-3 text-[10px] font-semibold text-[#8fa5bf] tracking-widest uppercase mb-2">
          {t("navigation")}
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.key}
              href={item.href}
              onMouseEnter={() => warm(item.href)}
              onFocus={() => warm(item.href)}
              className={[
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
                "transition-[background-color,color,border-color] duration-150",
                isActive
                  ? "bg-[rgba(0,180,216,0.12)] text-[#22d3ee] border-l-[3px] border-[#22d3ee] pl-[9px]"
                  : "text-[#8fa5bf] hover:text-white hover:bg-[rgba(255,255,255,0.06)] border-l-[3px] border-transparent",
              ].join(" ")}
            >
              <span className={isActive ? "text-[#22d3ee]" : ""}>{item.icon}</span>
              {t(item.key)}
            </Link>
          );
        })}

        {isStaff && (
          <Link
            href={studioItem.href}
            onMouseEnter={() => warm(studioItem.href)}
            onFocus={() => warm(studioItem.href)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#8fa5bf] hover:text-white hover:bg-[rgba(255,255,255,0.06)] border-l-[3px] border-transparent transition-[background-color,color,border-color] duration-150"
          >
            <span>{studioItem.icon}</span>
            {t("studio")}
          </Link>
        )}
      </nav>

      {/* User + bottom */}
      <div className="px-3 pb-4 border-t border-[#162d5a] pt-3 space-y-0.5">
        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8fa5bf] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-colors duration-150"
        >
          {settingsIcon}
          {t("settings")}
        </Link>
        <button
          type="button"
          onClick={() => startSignOut(() => signOut(locale))}
          disabled={signingOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8fa5bf] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1b35] active:scale-[0.98] disabled:opacity-50 text-left"
        >
          {signOutIcon}
          {signingOut ? t("signingOut") : t("signOut")}
        </button>

        {/* User chip */}
        <div className="flex items-center gap-3 px-3 py-2.5 mt-2 rounded-lg bg-[#162d5a]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00b4d8] to-[#0882a0] flex items-center justify-center text-white text-xs font-bold shrink-0">
            {initials}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">{fullName}</p>
            <p className="text-[10px] text-[#8fa5bf] truncate">
              {user.studentId || user.email}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
