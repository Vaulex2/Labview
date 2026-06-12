interface ProgressBarProps {
  value: number;        // 0–100
  label?: string;
  showPercent?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success";
}

const trackHeight = { sm: "h-1.5", md: "h-2.5", lg: "h-3.5" };

export function ProgressBar({
  value,
  label,
  showPercent = false,
  size = "md",
  variant = "default",
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));
  const fillColor =
    variant === "success"
      ? "bg-[#10b981]"
      : "bg-gradient-to-r from-[#00b4d8] to-[#22d3ee]";

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {(label || showPercent) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-xs font-medium text-[#4a6080]">{label}</span>}
          {showPercent && (
            <span className="text-xs font-semibold text-[#0d1b35]">{pct}%</span>
          )}
        </div>
      )}
      <div
        className={[
          "w-full rounded-full bg-[#e4eef9] overflow-hidden",
          trackHeight[size],
        ].join(" ")}
      >
        <div
          className={["h-full rounded-full relative overflow-hidden", fillColor].join(" ")}
          style={{ width: `${pct}%`, transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)" }}
        >
          {pct > 20 && (
            <span
              className="progress-shimmer absolute inset-0 rounded-full"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </div>
  );
}
