"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  signInSchema,
  signUpSchema,
  resetRequestSchema,
  isEmail,
} from "@/lib/validation/auth";

export type ActionResult = { ok?: true; error?: string };

// ─── Lightweight per-IP throttle (best-effort, on top of Supabase limits) ─────
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 10;
const attempts = new Map<string, { count: number; resetAt: number }>();

async function clientIp(): Promise<string> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

function throttle(ip: string): boolean {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || now > rec.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  rec.count += 1;
  return rec.count <= MAX_ATTEMPTS;
}

// ─── Sign in by email OR student id ───────────────────────────────────────────
export async function signIn(input: {
  identifier: string;
  password: string;
}): Promise<ActionResult> {
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success) return { error: "invalidCredentials" };

  if (!throttle(await clientIp())) return { error: "rateLimited" };

  const supabase = await createClient();
  let email = parsed.data.identifier;

  if (!isEmail(email)) {
    const { data, error } = await supabase.rpc("get_email_for_student_id", {
      p_student_id: parsed.data.identifier,
    });
    if (error || !data) return { error: "invalidCredentials" };
    email = data;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: parsed.data.password,
  });
  if (error) return { error: "invalidCredentials" };

  return { ok: true };
}

// ─── Sign up a new student ────────────────────────────────────────────────────
export async function signUp(input: {
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  studentId: string;
  password: string;
  confirm: string;
}): Promise<ActionResult> {
  const parsed = signUpSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "invalidInput" };
  }

  if (!throttle(await clientIp())) return { error: "rateLimited" };

  const supabase = await createClient();

  // Pre-check student id uniqueness for a friendly message (the DB also enforces it).
  const { data: existing } = await supabase.rpc("get_email_for_student_id", {
    p_student_id: parsed.data.studentId,
  });
  if (existing) return { error: "studentIdTaken" };

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        first_name: parsed.data.firstName,
        surname: parsed.data.surname,
        phone: parsed.data.phone,
        student_id: parsed.data.studentId,
      },
    },
  });

  if (error) {
    if (/registered|already/i.test(error.message)) return { error: "emailTaken" };
    if (/student_id|duplicate|unique/i.test(error.message))
      return { error: "studentIdTaken" };
    if (/password/i.test(error.message)) return { error: "weakPassword" };
    return { error: "signupFailed" };
  }

  return { ok: true };
}

// ─── Sign out ─────────────────────────────────────────────────────────────────
export async function signOut(locale: string): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(`/${locale}/login`);
}

// ─── Password reset request ───────────────────────────────────────────────────
export async function requestPasswordReset(
  input: { email: string },
  locale: string
): Promise<ActionResult> {
  const parsed = resetRequestSchema.safeParse(input);
  if (!parsed.success) return { error: "invalidEmail" };
  if (!throttle(await clientIp())) return { error: "rateLimited" };

  const supabase = await createClient();
  const h = await headers();
  const origin = h.get("origin") ?? "";
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${origin}/${locale}/login`,
  });
  // Always report success to avoid email enumeration.
  return { ok: true };
}
