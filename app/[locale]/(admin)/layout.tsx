import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getSessionUser, isStaff } from "@/lib/auth/session";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Studio");

  // Authoritative staff check (defense-in-depth alongside the proxy).
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
    <div className="min-h-screen bg-[#f0f6ff] flex">
      <aside className="fixed left-0 top-0 h-full w-60 bg-[#0d1b35] flex flex-col border-r border-[#162d5a]">
        <div className="px-5 py-5 border-b border-[#162d5a]">
          <p className="text-white font-bold text-lg font-[family-name:var(--font-outfit)]">
            Graphi<span className="text-[#22d3ee]">Code</span>
          </p>
          <p className="text-[10px] text-[#8fa5bf] tracking-wider mt-0.5">{t("panelTitle")}</p>
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
              <p className="text-xs font-semibold text-white truncate">
                {`${user.firstName} ${user.surname}`.trim() || user.email}
              </p>
              <p className="text-[10px] text-[#22d3ee] uppercase tracking-wider">
                {user.role === "admin" ? t("roleAdmin") : t("roleTeacher")}
              </p>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="block px-2 text-xs text-[#8fa5bf] hover:text-white transition-colors"
          >
            {t("backToApp")}
          </Link>
        </div>
      </aside>
      <main className="flex-1 ml-60 min-h-screen">{children}</main>
    </div>
  );
}
