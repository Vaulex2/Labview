import "server-only";

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { mapProfileToUser } from "@/lib/data/mappers";
import type { User } from "@/lib/types";

/**
 * The authoritative, server-side identity of the current request. Verifies the
 * session with the auth server (getUser) then loads the profile row. Memoized
 * per-request so layouts, pages and the data layer share one lookup.
 */
export const getSessionUser = cache(async (): Promise<User | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return profile ? mapProfileToUser(profile) : null;
});

export function isStaff(user: User | null): boolean {
  return user?.role === "teacher" || user?.role === "admin";
}

export function isAdmin(user: User | null): boolean {
  return user?.role === "admin";
}
