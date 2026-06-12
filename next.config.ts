import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const SUPABASE_ORIGIN = "https://cawwdnnmoeleaqhinksp.supabase.co";
const SUPABASE_WS = "wss://cawwdnnmoeleaqhinksp.supabase.co";

// Content Security Policy. 'unsafe-inline' is required for Next's inline bootstrap
// scripts and the app's inline styles; everything else is locked to self + Supabase.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://placehold.co " + SUPABASE_ORIGIN,
  "media-src 'self' blob: " + SUPABASE_ORIGIN,
  // Lesson videos are embedded from YouTube's privacy-enhanced player.
  "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
  "font-src 'self' data:",
  `connect-src 'self' ${SUPABASE_ORIGIN} ${SUPABASE_WS}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cawwdnnmoeleaqhinksp.supabase.co" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
