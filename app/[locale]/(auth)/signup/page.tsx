"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { signUp } from "@/lib/auth/actions";

export default function SignupPage() {
  const t = useTranslations("Signup");
  const tErr = useTranslations("AuthErrors");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "", surname: "", email: "",
    phone: "", studentId: "", password: "", confirm: "",
  });

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await signUp(form);
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0d1b35] tracking-tight mb-2" style={{fontFamily:"Outfit, system-ui, sans-serif"}}>
          {t("title")}
        </h1>
        <p className="text-sm text-[#8fa5bf]">
          {t("subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {error}
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label={t("firstName")}
            type="text"
            placeholder="Amir"
            value={form.firstName}
            onChange={set("firstName")}
            required
            autoComplete="given-name"
          />
          <Input
            label={t("surname")}
            type="text"
            placeholder="Karimov"
            value={form.surname}
            onChange={set("surname")}
            required
            autoComplete="family-name"
          />
        </div>

        <Input
          label={t("email")}
          type="email"
          placeholder="you@university.edu"
          value={form.email}
          onChange={set("email")}
          required
          autoComplete="email"
          leadingIcon={
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          }
        />

        <Input
          label={t("phone")}
          type="tel"
          placeholder="+998 90 123 4567"
          value={form.phone}
          onChange={set("phone")}
          required
          autoComplete="tel"
          leadingIcon={
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 11.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012.98 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
          }
        />

        <Input
          label={t("studentId")}
          type="text"
          placeholder="U2021-ECE-0042"
          value={form.studentId}
          onChange={set("studentId")}
          required
          hint={t("studentIdHint")}
          leadingIcon={
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
          }
        />

        <Input
          label={t("passwordLabel")}
          type="password"
          placeholder={t("passwordPlaceholder")}
          value={form.password}
          onChange={set("password")}
          required
          autoComplete="new-password"
          leadingIcon={
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          }
        />

        <Input
          label={t("confirmPassword")}
          type="password"
          placeholder={t("confirmPlaceholder")}
          value={form.confirm}
          onChange={set("confirm")}
          required
          autoComplete="new-password"
          error={form.confirm && form.password !== form.confirm ? t("passwordsNoMatch") : undefined}
        />

        <div className="pt-1">
          <Button type="submit" size="lg" className="w-full" loading={loading}>
            {loading ? t("creatingAccount") : t("createAccount")}
          </Button>
        </div>
      </form>

      <p className="text-center text-sm text-[#4a6080] mt-6">
        {t("haveAccount")}{" "}
        <Link href="/login" className="text-[#00b4d8] font-medium hover:text-[#0882a0] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#22d3ee]">
          {t("signIn")}
        </Link>
      </p>
    </div>
  );
}
