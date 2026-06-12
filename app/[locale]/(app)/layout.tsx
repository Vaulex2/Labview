import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { PageTransition } from "@/components/layout/PageTransition";
import { NavigationProgress } from "@/components/layout/NavigationProgress";
import { getSessionUser } from "@/lib/auth/session";

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Authoritative auth check (defense-in-depth alongside the proxy).
  const user = await getSessionUser();
  if (!user) redirect(`/${locale}/login`);

  return (
    <div className="min-h-screen bg-[#f0f6ff] flex">
      <AppSidebar user={user} />
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
