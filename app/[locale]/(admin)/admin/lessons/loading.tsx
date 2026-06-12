import { Skeleton } from "@/components/ui/Skeleton";

export default function LessonsLoading() {
  return (
    <div className="min-h-full bg-[#f0f6ff]">
      {/* Header */}
      <header className="bg-white border-b border-[#deedf7] px-8 py-4 flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-3 w-28" />
        </div>
        <Skeleton className="h-8 w-28 rounded-lg" />
      </header>

      <div className="p-8">
        <div className="bg-white border border-[#deedf7] rounded-xl shadow-[0_2px_8px_rgba(13,27,53,0.06)] overflow-hidden">
          {/* Table header */}
          <div className="px-6 py-3 border-b border-[#f0f6ff] grid grid-cols-[1fr_8rem_6rem_5rem] gap-4 items-center">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-10" />
          </div>
          {/* Rows */}
          <div className="divide-y divide-[#f0f6ff]">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="px-6 py-4 flex items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2 min-w-0">
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>
                  <Skeleton className="h-2 w-40 rounded-full" />
                </div>
                <div className="flex gap-2 shrink-0">
                  <Skeleton className="h-7 w-14 rounded-lg" />
                  <Skeleton className="h-7 w-14 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
