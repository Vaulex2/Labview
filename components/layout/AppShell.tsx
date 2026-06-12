"use client";

import { SidebarProvider, useSidebar } from "./SidebarContext";
import { AppSidebar } from "./AppSidebar";
import { NavigationProgress } from "./NavigationProgress";
import { PageTransition } from "./PageTransition";
import { Suspense } from "react";
import type { User } from "@/lib/types";

function ShellInner({ user, children }: { user: User; children: React.ReactNode }) {
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

      <AppSidebar user={user} />

      <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <PageTransition>{children}</PageTransition>
      </main>
    </>
  );
}

export function AppShell({ user, children }: { user: User; children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#f0f6ff] flex">
        <ShellInner user={user}>{children}</ShellInner>
      </div>
    </SidebarProvider>
  );
}
