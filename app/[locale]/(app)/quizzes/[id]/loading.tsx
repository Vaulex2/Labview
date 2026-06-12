import { Skeleton, SkeletonTopBar } from "@/components/ui/Skeleton";
import { DidYouKnow } from "@/components/ui/DidYouKnow";

export default function QuizLoading() {
  return (
    <>
      <SkeletonTopBar />
      <div className="p-6 md:p-8 flex-1 w-full max-w-3xl space-y-6">
        <DidYouKnow />

        {/* Progress / meta */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />

        {/* Question card */}
        <div className="card-surface p-6 space-y-5">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="space-y-3 pt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-xl" />
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>
    </>
  );
}
