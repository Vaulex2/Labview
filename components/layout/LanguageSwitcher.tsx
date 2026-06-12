"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/types";

interface LanguageSwitcherProps {
  /** "dark" for the navy landing nav, "light" for the in-app top bar. */
  tone?: "dark" | "light";
}

export function LanguageSwitcher({ tone = "light" }: LanguageSwitcherProps) {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onChange = (next: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: next as Locale });
    });
  };

  const dark = tone === "dark";

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{t("label")}</span>
      <svg
        aria-hidden
        className={`pointer-events-none absolute left-2.5 ${dark ? "text-[#8fa5bf]" : "text-[#8fa5bf]"}`}
        width="14"
        height="14"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <select
        value={locale}
        disabled={isPending}
        onChange={(e) => onChange(e.target.value)}
        aria-label={t("label")}
        className={[
          "h-9 pl-8 pr-7 rounded-lg text-sm font-medium appearance-none cursor-pointer outline-none",
          "transition-[border-color,background-color,box-shadow] duration-200",
          "focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2",
          dark
            ? "bg-transparent text-[#8fa5bf] border border-[rgba(255,255,255,0.12)] hover:text-white hover:border-[rgba(255,255,255,0.25)] focus-visible:ring-offset-[#0d1b35]"
            : "bg-white text-[#0d1b35] border border-[#c8dff0] hover:border-[#00b4d8] focus-visible:ring-offset-white",
          isPending ? "opacity-60" : "",
        ].join(" ")}
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc} className="text-[#0d1b35]">
            {t(loc)}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        className="pointer-events-none absolute right-2.5 text-[#8fa5bf]"
        width="12"
        height="12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </label>
  );
}
