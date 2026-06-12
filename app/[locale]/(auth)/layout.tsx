import { getTranslations } from "next-intl/server";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations("Auth");
  const highlightIcons = ["◈", "▶", "◇", "⬡"];
  const highlights = t.raw("highlights") as string[];
  return (
    <div className="min-h-screen flex">
      {/* Left — brand panel */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] flex-col justify-between bg-[#0d1b35] relative overflow-hidden grain p-12">
        {/* Background radial gradients */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 20% 20%, rgba(0,180,216,0.18) 0%, transparent 70%), " +
              "radial-gradient(ellipse 50% 50% at 80% 80%, rgba(30,63,122,0.50) 0%, transparent 65%)",
          }}
        />

        {/* SVG circuit decoration */}
        <svg
          className="absolute bottom-0 left-0 w-full opacity-10"
          viewBox="0 0 440 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="80" cy="240" r="6" stroke="#00b4d8" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="6" stroke="#00b4d8" strokeWidth="1.5" />
          <circle cx="340" cy="260" r="6" stroke="#00b4d8" strokeWidth="1.5" />
          <polyline points="80,240 80,200 200,200" stroke="#00b4d8" strokeWidth="1.2" strokeDasharray="8 4" />
          <polyline points="200,200 340,200 340,260" stroke="#00b4d8" strokeWidth="1.2" strokeDasharray="8 4" />
          <polyline points="80,240 20,240 20,280" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="8 4" />
        </svg>

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00b4d8] to-[#0882a0] flex items-center justify-center shadow-[0_0_20px_rgba(0,180,216,0.50)]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-white font-[family-name:var(--font-outfit)] tracking-tight leading-none">
                Graphi<span className="text-[#22d3ee]">Code</span>
              </p>
              <p className="text-[10px] text-[#8fa5bf] tracking-[0.2em] uppercase mt-0.5">
                {t("brandTagline")}
              </p>
            </div>
          </div>
        </div>

        {/* Center content */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white leading-tight font-[family-name:var(--font-outfit)] mb-4">
              {t("platformTitleLine1")}<br />
              <span className="text-[#22d3ee]">{t("platformTitleLine2")}</span>
            </h2>
            <p className="text-[#8fa5bf] text-sm leading-relaxed max-w-sm">
              {t("platformBlurb")}
            </p>
          </div>
          <div className="space-y-3">
            {highlights.map((label, i) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-[#22d3ee] text-base w-5">{highlightIcons[i]}</span>
                <span className="text-[#c8dff0] text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-10 text-[11px] text-[#4a6080] tracking-wider uppercase">
          {t("bottomTagline")}
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex-1 flex items-center justify-center bg-white p-8 overflow-y-auto">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
