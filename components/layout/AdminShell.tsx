"use client";

import { SidebarProvider, useSidebar } from "./SidebarContext";
import { AdminSidebar } from "./AdminSidebar";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface AdminShellProps {
  initials: string;
  fullName: string;
  role: string;
  roleLabel: string;
  backLabel: string;
  panelTitle: string;
  nav: NavItem[];
  children: React.ReactNode;
}

function HamburgerButton() {
  const { toggle } = useSidebar();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Open navigation"
      className="md:hidden fixed top-3.5 left-4 z-40 w-9 h-9 flex items-center justify-center rounded-lg bg-[#0d1b35] text-[#8fa5bf] hover:text-white shadow-[0_2px_8px_rgba(13,27,53,0.3)] transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#22d3ee] active:scale-95"
    >
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  );
}

function ShellInner({
  initials,
  fullName,
  role,
  roleLabel,
  backLabel,
  panelTitle,
  nav,
  children,
}: AdminShellProps) {
  const { isOpen, close } = useSidebar();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <HamburgerButton />

      <AdminSidebar
        initials={initials}
        fullName={fullName}
        role={role}
        roleLabel={roleLabel}
        backLabel={backLabel}
        panelTitle={panelTitle}
        nav={nav}
      />

      <main className="flex-1 md:ml-60 min-h-screen">{children}</main>
    </>
  );
}

export function AdminShell(props: AdminShellProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#f0f6ff] flex">
        <ShellInner {...props} />
      </div>
    </SidebarProvider>
  );
}
