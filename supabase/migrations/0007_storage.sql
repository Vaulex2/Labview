-- 0007_storage.sql
-- Private storage buckets + RLS. Learner playback uses short-lived signed URLs
-- minted server-side with the service-role client (lib/data, server-only), so
-- students never need direct SELECT on storage.objects. Staff manage files via
-- the studio (these policies). Uploads are MIME/size-validated in server actions
-- before the object is written.

insert into storage.buckets (id, name, public)
values
  ('lesson-videos', 'lesson-videos', false),
  ('thumbnails',    'thumbnails',    false),
  ('materials',     'materials',     false)
on conflict (id) do nothing;

-- storage.objects already has RLS enabled by Supabase; add scoped policies.
create policy "studio staff read content objects" on storage.objects
  for select to authenticated
  using (bucket_id in ('lesson-videos', 'thumbnails', 'materials') and public.is_staff());

create policy "studio staff upload content objects" on storage.objects
  for insert to authenticated
  with check (bucket_id in ('lesson-videos', 'thumbnails', 'materials') and public.is_staff());

create policy "studio staff update content objects" on storage.objects
  for update to authenticated
  using (bucket_id in ('lesson-videos', 'thumbnails', 'materials') and public.is_staff())
  with check (bucket_id in ('lesson-videos', 'thumbnails', 'materials') and public.is_staff());

create policy "studio staff delete content objects" on storage.objects
  for delete to authenticated
  using (bucket_id in ('lesson-videos', 'thumbnails', 'materials') and public.is_staff());
