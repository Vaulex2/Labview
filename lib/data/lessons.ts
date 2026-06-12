import "server-only";

import { unstable_cache } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { mapLesson } from "@/lib/data/mappers";
import { cachedSignedUrl, BUCKETS } from "@/lib/data/storage";
import type { Tables } from "@/lib/supabase/database.types";
import type { VideoLesson } from "@/lib/types";

/**
 * The published catalog is identical for every learner and every locale, so the
 * rows are read with the service-role client (cookie-free) and cached across
 * requests — a language switch re-renders from cache instead of re-querying.
 * The `is_published` filter preserves the boundary RLS used to enforce, since
 * the admin client bypasses RLS. Per-user state (progress) stays in progress.ts,
 * cookie-bound and uncached. Signed media URLs are minted via cachedSignedUrl so
 * they keep their own short TTL rather than living as long as the row cache.
 */
const getPublishedLessonRows = unstable_cache(
  async (): Promise<Tables<"video_lessons">[]> => {
    const admin = createAdminClient();
    const { data } = await admin
      .from("video_lessons")
      .select("*")
      .eq("is_published", true)
      .order("order_index", { ascending: true });
    return data ?? [];
  },
  ["published-lessons"],
  { revalidate: 3600, tags: ["lessons"] }
);

type LessonDetail = {
  row: Tables<"video_lessons">;
  summaries: Tables<"lesson_summaries">[];
  viz: Tables<"visualization_examples">[];
};

const getLessonDetailRows = unstable_cache(
  async (id: string): Promise<LessonDetail | null> => {
    const admin = createAdminClient();
    const { data: row } = await admin
      .from("video_lessons")
      .select("*")
      .eq("id", id)
      .eq("is_published", true)
      .maybeSingle();
    if (!row) return null;

    const [{ data: summaries }, { data: viz }] = await Promise.all([
      admin.from("lesson_summaries").select("*").eq("lesson_id", id),
      admin.from("visualization_examples").select("*").eq("lesson_id", id),
    ]);
    return { row, summaries: summaries ?? [], viz: viz ?? [] };
  },
  ["lesson-detail"],
  { revalidate: 3600, tags: ["lessons"] }
);

/** Published lessons for the library / dashboard (cards — no children loaded). */
export async function listLessons(): Promise<VideoLesson[]> {
  const rows = await getPublishedLessonRows();
  return Promise.all(
    rows.map(async (row) =>
      mapLesson(row, {
        thumbnailUrl: await cachedSignedUrl(BUCKETS.thumbnails, row.thumbnail_url),
      })
    )
  );
}

/** A single lesson with summaries, visualization examples and signed media URLs. */
export async function getLessonById(id: string): Promise<VideoLesson | null> {
  const detail = await getLessonDetailRows(id);
  if (!detail) return null;

  const [thumbnailUrl, videoUrl] = await Promise.all([
    cachedSignedUrl(BUCKETS.thumbnails, detail.row.thumbnail_url),
    cachedSignedUrl(BUCKETS.videos, detail.row.video_path),
  ]);

  return mapLesson(detail.row, {
    summaries: detail.summaries,
    viz: detail.viz,
    thumbnailUrl,
    videoUrl,
  });
}
