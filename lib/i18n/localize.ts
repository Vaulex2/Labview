import type { Locale, LocalizedText } from "@/lib/types";

/**
 * Resolve a piece of localized content to a plain string for the active locale.
 * Falls back to English if the requested locale is missing a value.
 */
export function localize(text: LocalizedText, locale: Locale): string {
  // Use `||` (not `??`) so an empty translation falls back to English — content
  // authored only in `en` still renders in the ru/uz locales.
  return text[locale] || text.en || "";
}
