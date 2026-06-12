import { Skeleton } from "@/components/ui/Skeleton";

export default function AdminDashboardLoading() {
  return (
    <div className="min-h-full bg-[#f0f6ff]">
      {/* Header */}
      <header className="bg-white border-b border-[#deedf7] px-8 py-4 flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-8 w-28 rounded-lg" />
      </header>

      <div className="p-8 space-y-8">
        {/* 5 stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white border border-[#deedf7] rounded-xl p-5 shadow-[0_2px_8px_rgba(13,27,53,0.06)] space-y-3">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lesson table – 2/3 width */}
          <div className="lg:col-span-2 bg-white border border-[#deedf7] rounded-xl shadow-[0_2px_8px_rgba(13,27,53,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#f0f6ff] flex items-center justify-between">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-7 w-16 rounded-lg" />
            </div>
            <div className="divide-y divide-[#f0f6ff]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="px-6 py-4 flex items-center gap-4">
                  <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2 min-w-0">
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-5 w-14 rounded-full" />
                    </div>
                    <Skeleton className="h-2 w-48 rounded-full" />
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Skeleton className="h-7 w-12 rounded-lg" />
                    <Skeleton className="h-7 w-12 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Quick actions card */}
            <div className="bg-white border border-[#deedf7] rounded-xl p-5 shadow-[0_2px_8px_rgba(13,27,53,0.06)] space-y-4">
              <Skeleton className="h-4 w-28" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-7 h-7 rounded-lg shrink-0" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ))}
            </div>
            {/* Recent activity card */}
            <div className="bg-white border border-[#deedf7] rounded-xl p-5 shadow-[0_2px_8px_rgba(13,27,53,0.06)] space-y-4">
              <Skeleton className="h-4 w-32" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Skeleton className="w-6 h-6 rounded-full shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-2.5 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Completion by topic */}
        <div className="bg-white border border-[#deedf7] rounded-xl p-6 shadow-[0_2px_8px_rgba(13,27,53,0.06)] space-y-4">
          <Skeleton className="h-4 w-40" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-3 w-48 shrink-0" />
              <Skeleton className="flex-1 h-2 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
