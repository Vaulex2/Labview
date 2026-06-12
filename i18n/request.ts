import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

// Dictionaries are static, so resolve each locale's JSON once per server process
// and reuse it — repeated requests (and every language switch) skip re-importing.
type Messages = Record<string, unknown>;
const messagesCache = new Map<string, Messages>();

async function loadMessages(locale: string): Promise<Messages> {
  const cached = messagesCache.get(locale);
  if (cached) return cached;
  const messages = (await import(`../messages/${locale}.json`)).default;
  messagesCache.set(locale, messages);
  return messages;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
