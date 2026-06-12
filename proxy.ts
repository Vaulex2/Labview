import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import {
  createMiddlewareClient,
  roleFromAccessToken,
} from "./lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

// Sections (first path segment after the locale) that never require a session.
const PUBLIC_SECTIONS = new Set(["", "login", "signup"]);
const AUTH_SECTIONS = new Set(["login", "signup"]);

export default async function proxy(request: NextRequest) {
  // Server Actions are POST requests with a `Next-Action` header. Skip the
  // intl middleware for these — it would return a locale redirect response,
  // which the client interprets as "unexpected response from server".
  const isServerAction = request.headers.has("next-action");

  // 1. Let next-intl resolve the locale and build the base response.
  const response = isServerAction ? NextResponse.next() : intlMiddleware(request);

  // 2. Refresh the Supabase session (writes refreshed cookies onto `response`).
  const supabase = createMiddlewareClient(request, response);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 3. Work out the locale-stripped section being requested.
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  const hasLocale = routing.locales.includes(segments[0] as never);
  const locale = hasLocale ? segments[0] : routing.defaultLocale;
  const section = (hasLocale ? segments[1] : segments[0]) ?? "";

  const redirectTo = (path: string) => {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${path}`;
    url.search = "";
    const redirect = NextResponse.redirect(url);
    // preserve the refreshed auth cookies across the redirect
    response.cookies.getAll().forEach((c) => redirect.cookies.set(c));
    return redirect;
  };

  // 4. Unauthenticated users may only see public sections.
  if (!user && !PUBLIC_SECTIONS.has(section)) {
    return redirectTo("/login");
  }

  if (user) {
    // Signed-in users shouldn't sit on the auth screens.
    if (AUTH_SECTIONS.has(section)) {
      return redirectTo("/dashboard");
    }

    // Staff-only studio. Soft-gate at the edge using the JWT role claim; the
    // (admin) layout performs the authoritative DB role check as defense-in-depth.
    if (section === "admin") {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const role = roleFromAccessToken(session?.access_token);
      if (role && role !== "teacher" && role !== "admin") {
        return redirectTo("/dashboard");
      }
    }
  }

  return response;
}

export const config = {
  // Match all pathnames except API routes, Next internals, and files with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
