"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leadingIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leadingIcon, className = "", id, ...rest }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[#0d1b35] font-[family-name:var(--font-inter)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leadingIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8fa5bf] pointer-events-none">
              {leadingIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={[
              "w-full h-11 rounded-lg border bg-white text-[#0d1b35] text-sm",
              "placeholder:text-[#8fa5bf]",
              leadingIcon ? "pl-10 pr-4" : "px-4",
              error
                ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200"
                : "border-[#c8dff0] focus:border-[#00b4d8] focus:ring-2 focus:ring-[rgba(0,180,216,0.20)]",
              "outline-none transition-[border-color,box-shadow] duration-200",
              "shadow-[inset_0_1px_3px_rgba(13,27,53,0.05)]",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#f0f6ff]",
              "font-[family-name:var(--font-inter)]",
              className,
            ].join(" ")}
            {...rest}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        {!error && hint && <p className="text-xs text-[#8fa5bf]">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
