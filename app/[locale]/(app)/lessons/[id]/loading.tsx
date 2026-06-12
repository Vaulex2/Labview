import { Skeleton, SkeletonTopBar } from "@/components/ui/Skeleton";
import { DidYouKnow } from "@/components/ui/DidYouKnow";

export default function LessonLoading() {
  return (
    <>
      <SkeletonTopBar />
      <div className="p-6 md:p-8 flex-1 w-full max-w-5xl">
        <DidYouKnow className="mb-8" />

        {/* Video */}
        <section className="mb-8 space-y-4">
          <Skeleton className="w-full aspect-video rounded-2xl" />
          <div className="flex items-center gap-3 flex-wrap">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </section>

        {/* Section blocks */}
        {Array.from({ length: 2 }).map((_, i) => (
          <section key={i} className="mb-8 space-y-5">
            <div className="flex items-center gap-2">
              <Skeleton className="w-1 h-6 rounded-full" />
              <Skeleton className="h-5 w-48" />
            </div>
            <div className="card-surface p-6 space-y-3">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
