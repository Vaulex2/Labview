"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#00b4d8] text-white border border-[#00b4d8] " +
    "hover:bg-[#0882a0] hover:border-[#0882a0] " +
    "focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 " +
    "active:scale-[0.97] " +
    "shadow-[0_2px_8px_rgba(0,180,216,0.30)]  hover:shadow-[0_4px_16px_rgba(0,180,216,0.40)]",
  secondary:
    "bg-[#0d1b35] text-white border border-[#162d5a] " +
    "hover:bg-[#162d5a] hover:border-[#1e3f7a] " +
    "focus-visible:ring-2 focus-visible:ring-[#00b4d8] focus-visible:ring-offset-2 " +
    "active:scale-[0.97]",
  outline:
    "bg-transparent text-[#00b4d8] border border-[#00b4d8] " +
    "hover:bg-[rgba(0,180,216,0.08)] " +
    "focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 " +
    "active:scale-[0.97]",
  ghost:
    "bg-transparent text-[#4a6080] border border-transparent " +
    "hover:bg-[#e4eef9] hover:text-[#0d1b35] hover:border-[#c8dff0] " +
    "focus-visible:ring-2 focus-visible:ring-[#00b4d8] focus-visible:ring-offset-2 " +
    "active:scale-[0.97]",
  danger:
    "bg-[#ef4444] text-white border border-[#ef4444] " +
    "hover:bg-[#dc2626] hover:border-[#dc2626] " +
    "focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 " +
    "active:scale-[0.97]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-12 px-7 text-base gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", loading, disabled, className = "", children, ...rest },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          "inline-flex items-center justify-center font-medium rounded-lg",
          "transition-[background-color,border-color,box-shadow,transform,opacity]",
          "duration-200 cursor-pointer",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
          "font-[family-name:var(--font-inter)]",
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(" ")}
        {...rest}
      >
        {loading && (
          <svg
            className="animate-spin -ml-0.5 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
