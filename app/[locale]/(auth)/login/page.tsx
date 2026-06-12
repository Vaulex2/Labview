"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { signIn } from "@/lib/auth/actions";

export default function LoginPage() {
  const t = useTranslations("Login");
  const tErr = useTranslations("AuthErrors");
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await signIn({ identifier, password });
    if (result.error) {
      setError(tErr(result.error));
      setLoading(false);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="animate-fade-up" style={{animationDuration:"0.45s"}}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0d1b35] tracking-tight mb-2" style={{fontFamily:"Outfit, system-ui, sans-serif"}}>
          {t("title")}
        </h1>
        <p className="text-sm text-[#8fa5bf]">
          {t("subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {error}
          </div>
        )}
        <Input
          label={t("identifierLabel")}
          type="text"
          placeholder="email@university.edu or U2021-ECE-0042"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          autoComplete="username"
          leadingIcon={
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          }
        />
        <Input
          label={t("passwordLabel")}
          type="password"
          placeholder={t("passwordPlaceholder")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          leadingIcon={
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          }
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-[#c8dff0] accent-[#00b4d8]" />
            <span className="text-[#4a6080]">{t("rememberMe")}</span>
          </label>
          <a href="#" className="text-[#00b4d8] hover:text-[#0882a0] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#22d3ee]">
            {t("forgotPassword")}
          </a>
        </div>

        <Button type="submit" size="lg" className="w-full mt-2" loading={loading}>
          {loading ? t("signingIn") : t("signIn")}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-7">
        <div className="flex-1 h-px bg-[#e4eef9]" />
        <span className="text-xs text-[#8fa5bf] font-medium">{t("or")}</span>
        <div className="flex-1 h-px bg-[#e4eef9]" />
      </div>

      <p className="text-center text-sm text-[#4a6080]">
        {t("noAccount")}{" "}
        <Link href="/signup" className="text-[#00b4d8] font-medium hover:text-[#0882a0] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#22d3ee]">
          {t("createOne")}
        </Link>
      </p>
    </div>
  );
}
