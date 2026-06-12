import "server-only";

import { unstable_cache } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Mint a short-lived signed URL for a private Storage object. Runs with the
 * service-role client so learners never need direct SELECT on storage.objects.
 * Absolute URLs (legacy/placeholder values) are passed through untouched.
 */
export async function signedUrl(
  bucket: string,
  path: string | null | undefined,
  expiresIn = 60 * 60
): Promise<string | undefined> {
  if (!path) return undefined;
  if (/^https?:\/\//.test(path)) return path;
  const admin = createAdminClient();
  const { data } = await admin.storage.from(bucket).createSignedUrl(path, expiresIn);
  return data?.signedUrl ?? undefined;
}

/**
 * Cached variant of {@link signedUrl}. The same (bucket, path) reuses a minted
 * URL across requests, so re-rendering a page — e.g. on a language switch —
 * doesn't re-hit Storage for every thumbnail. `revalidate` is held safely under
 * the 1-hour token expiry so a cached URL never outlives its signature, and the
 * `media` tag lets admin writes drop everything at once.
 */
export function cachedSignedUrl(
  bucket: string,
  path: string | null | undefined
): Promise<string | undefined> {
  if (!path) return Promise.resolve(undefined);
  if (/^https?:\/\//.test(path)) return Promise.resolve(path);
  return unstable_cache(
    async () => {
      const admin = createAdminClient();
      const { data } = await admin.storage
        .from(bucket)
        .createSignedUrl(path, 60 * 60);
      return data?.signedUrl ?? undefined;
    },
    ["signed-url", bucket, path],
    { revalidate: 3000, tags: ["media"] }
  )();
}

export const BUCKETS = {
  videos: "lesson-videos",
  thumbnails: "thumbnails",
  materials: "materials",
} as const;
