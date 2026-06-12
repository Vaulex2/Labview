import { Skeleton } from "@/components/ui/Skeleton";

export default function StudentDetailLoading() {
  return (
    <div className="min-h-full bg-[#f0f6ff]">
      {/* Header */}
      <header className="bg-white border-b border-[#deedf7] px-8 py-4 flex items-center gap-4">
        <Skeleton className="h-7 w-20 rounded-lg shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-6 w-24 rounded-full shrink-0" />
      </header>

      <div className="p-8 space-y-8">
        {/* 4 stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white border border-[#deedf7] rounded-xl p-5 shadow-[0_2px_8px_rgba(13,27,53,0.06)] space-y-3">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lesson progress */}
          <div className="bg-white border border-[#deedf7] rounded-xl shadow-[0_2px_8px_rgba(13,27,53,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#f0f6ff]">
              <Skeleton className="h-4 w-36" />
            </div>
            <div className="divide-y divide-[#f0f6ff]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="px-6 py-4 flex items-center gap-4">
                  <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2 min-w-0">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Quiz attempts */}
          <div className="bg-white border border-[#deedf7] rounded-xl shadow-[0_2px_8px_rgba(13,27,53,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#f0f6ff]">
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="divide-y divide-[#f0f6ff]">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-6 py-4 flex items-center gap-4">
                  <div className="flex-1 space-y-2 min-w-0">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <div className="shrink-0 space-y-1.5 text-right">
                    <Skeleton className="h-6 w-12 rounded-full ml-auto" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
