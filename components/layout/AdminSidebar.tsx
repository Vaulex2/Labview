"use client";

import { Link } from "@/i18n/navigation";
import { useSidebar } from "./SidebarContext";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface AdminSidebarProps {
  initials: string;
  fullName: string;
  role: string;
  roleLabel: string;
  backLabel: string;
  panelTitle: string;
  nav: NavItem[];
}

export function AdminSidebar({
  initials,
  fullName,
  role,
  roleLabel,
  backLabel,
  panelTitle,
  nav,
}: AdminSidebarProps) {
  const { isOpen } = useSidebar();

  return (
    <aside
      className={[
        "fixed left-0 top-0 h-full w-60 bg-[#0d1b35] flex flex-col border-r border-[#162d5a] z-30",
        "transition-transform duration-300 ease-in-out",
        "md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      ].join(" ")}
    >
      <div className="px-5 py-5 border-b border-[#162d5a]">
        <p className="text-white font-bold text-lg font-[family-name:var(--font-outfit)]">
          Graphi<span className="text-[#22d3ee]">Code</span>
        </p>
        <p className="text-[10px] text-[#8fa5bf] tracking-wider mt-0.5">{panelTitle}</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8fa5bf] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-colors duration-150"
          >
            <span className="shrink-0 opacity-50">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="px-3 pb-4 border-t border-[#162d5a] pt-3 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00b4d8] to-[#0882a0] flex items-center justify-center text-white text-xs font-bold shrink-0">
            {initials}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">{fullName}</p>
            <p className="text-[10px] text-[#22d3ee] uppercase tracking-wider">{roleLabel}</p>
          </div>
        </div>
        <Link
          href="/dashboard"
          className="block px-2 text-xs text-[#8fa5bf] hover:text-white transition-colors"
        >
          {backLabel}
        </Link>
      </div>
    </aside>
  );
}
