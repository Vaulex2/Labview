interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Calm, encouraging placeholder for sections that have nothing to show yet.
 * Dashed tinted frame + soft surface so it reads as "intentionally empty,"
 * not "failed to load." Mirrors the ui/ component language (Badge/ProgressBar).
 */
export function EmptyState({ icon, title, description, action, className = "" }: EmptyStateProps) {
  return (
    <div
      className={[
        "flex flex-col items-center text-center gap-2.5",
        "rounded-xl border border-dashed border-[#c8dff0] bg-[#f8faff]",
        "px-5 py-7",
        className,
      ].join(" ")}
    >
      <span
        className="flex items-center justify-center w-11 h-11 rounded-xl text-[#00b4d8] bg-[rgba(0,180,216,0.08)] border border-[rgba(0,180,216,0.18)]"
        aria-hidden="true"
      >
        {icon}
      </span>
      <p className="text-sm font-semibold text-[#0d1b35]" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>
        {title}
      </p>
      <p className="text-xs leading-relaxed text-[#8fa5bf] max-w-[34ch]">{description}</p>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
