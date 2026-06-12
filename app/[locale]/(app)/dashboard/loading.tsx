import { Skeleton, SkeletonTopBar } from "@/components/ui/Skeleton";
import { DidYouKnow } from "@/components/ui/DidYouKnow";

export default function DashboardLoading() {
  return (
    <>
      <SkeletonTopBar />
      <div className="p-6 md:p-8 space-y-8 flex-1">
        <DidYouKnow />

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card-surface p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <Skeleton className="w-10 h-10 rounded-xl" />
                <Skeleton className="h-8 w-12" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>

        {/* Overall progress card */}
        <div className="card-surface p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-28" />
            </div>
            <Skeleton className="h-7 w-14" />
          </div>
          <Skeleton className="h-3 w-full rounded-full" />
          <div className="flex gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-20" />
            ))}
          </div>
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card-surface p-6 space-y-4">
            <Skeleton className="h-5 w-44" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-3.5 rounded-xl border border-[#deedf7] bg-[#f8faff]">
                <Skeleton className="w-6 h-6 rounded-lg" />
                <Skeleton className="w-14 h-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
          </div>
          <div className="space-y-5">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="card-surface p-5 space-y-4">
                <Skeleton className="h-4 w-32" />
                {Array.from({ length: 3 }).map((__, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <Skeleton className="w-8 h-8 rounded-lg" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-2.5 w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
