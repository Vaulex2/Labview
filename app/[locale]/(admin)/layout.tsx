import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { getSessionUser, isStaff } from "@/lib/auth/session";
import { AdminShell } from "@/components/layout/AdminShell";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Studio");

  const user = await getSessionUser();
  if (!user) redirect(`/${locale}/login`);
  if (!isStaff(user)) redirect(`/${locale}/dashboard`);

  const nav = [
    {
      label: t("navDashboard"),
      href: "/admin",
      icon: (
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
          <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
        </svg>
      ),
    },
    {
      label: t("navLessons"),
      href: "/admin/lessons",
      icon: (
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3" fill="rgba(34,211,238,0.12)"/>
        </svg>
      ),
    },
    {
      label: t("navQuizzes"),
      href: "/admin/quizzes",
      icon: (
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/>
        </svg>
      ),
    },
    {
      label: t("navStudents"),
      href: "/admin/students",
      icon: (
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
  ];

  const initials =
    `${user.firstName?.[0] ?? ""}${user.surname?.[0] ?? ""}`.toUpperCase() || "U";

  return (
    <AdminShell
      initials={initials}
      fullName={`${user.firstName} ${user.surname}`.trim() || user.email}
      role={user.role}
      roleLabel={user.role === "admin" ? t("roleAdmin") : t("roleTeacher")}
      backLabel={t("backToApp")}
      panelTitle={t("panelTitle")}
      nav={nav}
    >
      {children}
    </AdminShell>
  );
}
