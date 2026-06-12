"use client";

import { useState } from "react";
import type { Locale, LocalizedText } from "@/lib/types";

const LOCALES: Locale[] = ["en", "ru", "uz"];

export function LocalizedField({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
  required = false,
}: {
  label?: string;
  value: LocalizedText;
  onChange: (next: LocalizedText) => void;
  multiline?: boolean;
  placeholder?: string;
  required?: boolean;
}) {
  const [active, setActive] = useState<Locale>("en");

  const baseInput =
    "w-full rounded-lg border bg-white text-[#0d1b35] text-sm placeholder:text-[#8fa5bf] px-3 py-2 outline-none transition-[border-color,box-shadow] duration-150 border-[#c8dff0] focus:border-[#00b4d8] focus:ring-2 focus:ring-[rgba(0,180,216,0.18)]";

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-[#0d1b35]">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
          <div className="flex gap-1">
            {LOCALES.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setActive(loc)}
                className={[
                  "px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide transition-colors",
                  active === loc
                    ? "bg-[#00b4d8] text-white"
                    : value[loc]
                      ? "bg-[#e4eef9] text-[#0882a0]"
                      : "bg-[#f0f6ff] text-[#8fa5bf]",
                ].join(" ")}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      )}
      {multiline ? (
        <textarea
          value={value[active]}
          onChange={(e) => onChange({ ...value, [active]: e.target.value })}
          placeholder={placeholder}
          rows={3}
          className={baseInput}
        />
      ) : (
        <input
          value={value[active]}
          onChange={(e) => onChange({ ...value, [active]: e.target.value })}
          placeholder={placeholder}
          className={baseInput}
        />
      )}
    </div>
  );
}

export const emptyLocalized = (): LocalizedText => ({ en: "", ru: "", uz: "" });
