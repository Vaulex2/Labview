type BadgeVariant = "default" | "success" | "warning" | "danger" | "electric" | "navy";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:   "bg-[#e4eef9] text-[#4a6080] border border-[#c8dff0]",
  success:   "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warning:   "bg-amber-50 text-amber-700 border border-amber-200",
  danger:    "bg-red-50 text-red-600 border border-red-200",
  electric:  "bg-[rgba(0,180,216,0.10)] text-[#0882a0] border border-[rgba(0,180,216,0.25)]",
  navy:      "bg-[#0d1b35] text-white border border-[#162d5a]",
};

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
