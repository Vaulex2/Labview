import "server-only";

import { getSessionUser } from "@/lib/auth/session";
import type { User } from "@/lib/types";

/** The current user's profile, or null when unauthenticated. */
export async function getProfile(): Promise<User | null> {
  return getSessionUser();
}
