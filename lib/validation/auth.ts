import { z } from "zod";

/** Password policy enforced server-side (Supabase also checks length/leaks). */
const password = z
  .string()
  .min(8, "passwordTooShort")
  .max(72, "passwordTooLong")
  .regex(/[a-z]/, "passwordNeedsLower")
  .regex(/[A-Z]/, "passwordNeedsUpper")
  .regex(/[0-9]/, "passwordNeedsDigit");

export const signUpSchema = z
  .object({
    firstName: z.string().trim().min(1, "required").max(80),
    surname: z.string().trim().min(1, "required").max(80),
    email: z.string().trim().toLowerCase().email("invalidEmail"),
    phone: z.string().trim().min(5, "required").max(30),
    studentId: z.string().trim().min(2, "required").max(40),
    password,
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "passwordsNoMatch",
    path: ["confirm"],
  });

export const signInSchema = z.object({
  identifier: z.string().trim().min(1, "required").max(254),
  password: z.string().min(1, "required").max(72),
});

export const resetRequestSchema = z.object({
  email: z.string().trim().toLowerCase().email("invalidEmail"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;

/** Is the identifier an email (vs a student id)? */
export function isEmail(identifier: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
}
