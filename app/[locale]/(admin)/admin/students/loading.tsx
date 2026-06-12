import { Skeleton } from "@/components/ui/Skeleton";

export default function StudentsLoading() {
  return (
    <div className="min-h-full bg-[#f0f6ff]">
      {/* Header */}
      <header className="bg-white border-b border-[#deedf7] px-8 py-4 flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-3 w-40" />
        </div>
        <Skeleton className="h-7 w-10 rounded-lg" />
      </header>

      <div className="p-8">
        <div className="bg-white border border-[#deedf7] rounded-xl shadow-[0_2px_8px_rgba(13,27,53,0.06)] overflow-hidden">
          {/* Table header */}
          <div className="px-6 py-3 border-b border-[#f0f6ff] grid grid-cols-[1fr_9rem_5rem_7rem_5rem] gap-4 items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-16" />
            ))}
          </div>
          {/* Rows */}
          <div className="divide-y divide-[#f0f6ff]">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="px-6 py-4 grid grid-cols-[1fr_9rem_5rem_7rem_5rem] gap-4 items-center">
                {/* Profile */}
                <div className="flex items-center gap-3 min-w-0">
                  <Skeleton className="w-9 h-9 rounded-full shrink-0" />
                  <div className="space-y-1.5 min-w-0">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
                {/* Progress */}
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
                {/* Score badge */}
                <div className="flex justify-center">
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>
                {/* Last active */}
                <Skeleton className="h-3 w-20" />
                {/* Action */}
                <div className="flex justify-end">
                  <Skeleton className="h-7 w-16 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
