import { Skeleton } from "@/components/ui/Skeleton";

export default function QuizzesLoading() {
  return (
    <div className="min-h-full bg-[#f0f6ff]">
      {/* Header */}
      <header className="bg-white border-b border-[#deedf7] px-8 py-4 flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-28" />
        </div>
        <Skeleton className="h-8 w-24 rounded-lg" />
      </header>

      <div className="p-8">
        <div className="bg-white border border-[#deedf7] rounded-xl shadow-[0_2px_8px_rgba(13,27,53,0.06)] overflow-hidden">
          {/* Table header */}
          <div className="px-6 py-3 border-b border-[#f0f6ff] grid grid-cols-[1fr_1fr_7rem_5rem] gap-4 items-center">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-10" />
          </div>
          {/* Rows */}
          <div className="divide-y divide-[#f0f6ff]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="px-6 py-4 grid grid-cols-[1fr_1fr_7rem_5rem] gap-4 items-center">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <div className="flex justify-end">
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
