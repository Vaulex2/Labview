import { Skeleton, SkeletonTopBar } from "@/components/ui/Skeleton";
import { DidYouKnow } from "@/components/ui/DidYouKnow";

export default function LibraryLoading() {
  return (
    <>
      <SkeletonTopBar />
      <div className="p-6 md:p-8 flex-1 space-y-6">
        <DidYouKnow />

        {/* Filter / search bar */}
        <div className="flex flex-wrap items-center gap-3">
          <Skeleton className="h-10 w-full max-w-sm rounded-xl" />
          <Skeleton className="h-10 w-32 rounded-xl" />
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>

        {/* Lesson card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card-surface overflow-hidden">
              <Skeleton className="aspect-video rounded-none" />
              <div className="p-4 space-y-3">
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-2.5 w-full rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
