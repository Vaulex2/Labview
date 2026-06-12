/**
 * Brand-tinted shimmer placeholder. Drives the moving highlight off the existing
 * `progress-shimmer` keyframe in globals.css so skeletons match the app's motion.
 */
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-md bg-[#e4eef9] ${className}`}>
      <div className="absolute inset-0 progress-shimmer" />
    </div>
  );
}

/** Placeholder mirroring AppTopBar so the sticky header doesn't jump on load. */
export function SkeletonTopBar() {
  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#deedf7] px-6 py-3.5 flex items-center justify-between gap-4">
      <div className="min-w-0 space-y-2">
        <Skeleton className="h-5 w-52" />
        <Skeleton className="h-3 w-36" />
      </div>
      <Skeleton className="h-9 w-28 rounded-lg" />
    </header>
  );
}
