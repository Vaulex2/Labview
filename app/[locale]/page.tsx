import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { HeroDataflow } from "@/components/landing/HeroDataflow";
import { LoopSumDemo } from "@/components/landing/LoopSumDemo";

// Display (Aeonik substitute) + body (Geist) font stacks per the Geniestudio system.
const display = { fontFamily: "'Satoshi', var(--font-geist), system-ui, sans-serif" } as const;

const featureIcons = [
  (
    <svg key="video" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <polygon points="5 3 19 12 5 21 5 3" fill="rgba(0,105,224,0.12)" stroke="currentColor" />
    </svg>
  ),
  (
    <svg key="anim" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" />
    </svg>
  ),
  (
    <svg key="quiz" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" stroke="currentColor" />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  (
    <svg key="progress" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <polyline points="18 20 18 10" stroke="currentColor"/><polyline points="12 20 12 4"/><polyline points="6 20 6 14"/>
    </svg>
  ),
];

const aboutIcons = [
  (
    // Graphical dataflow — nodes wired together
    <svg key="flow" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="4.5" cy="12" r="2.25" fill="rgba(255,255,255,0.25)" />
      <circle cx="19.5" cy="5.5" r="2.25" fill="rgba(255,255,255,0.25)" />
      <circle cx="19.5" cy="18.5" r="2.25" fill="rgba(255,255,255,0.25)" />
      <path d="M6.75 12h4.25M11 12l5.4-5.6M11 12l5.4 5.6" />
    </svg>
  ),
  (
    // Virtual Instrument — front panel + block diagram window
    <svg key="vi" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4.5" width="18" height="15" rx="2" fill="rgba(255,255,255,0.22)" />
      <line x1="3" y1="9.5" x2="21" y2="9.5" />
      <path d="M7 14.5h4M7 16.5h7" strokeWidth="1.5" />
    </svg>
  ),
  (
    // Built for the real world — hardware / chip
    <svg key="chip" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="7" width="10" height="10" rx="1.5" fill="rgba(255,255,255,0.22)" />
      <path d="M10 3.5v3M14 3.5v3M10 17.5v3M14 17.5v3M3.5 10h3M3.5 14h3M17.5 10h3M17.5 14h3" strokeWidth="1.5" />
    </svg>
  ),
];

// Tinted callout wash + icon-tile colour for the "What is LabVIEW" cards.
const aboutStyles = [
  { wash: "linear-gradient(180deg, #e5f6ff 0%, #c2e9ff 100%)", tile: "#4fbeff" }, // sky / cornflower
  { wash: "linear-gradient(180deg, #f4ebff 0%, #e4ccff 100%)", tile: "#9552e0" }, // lilac / amethyst
  { wash: "linear-gradient(180deg, #fff2eb 0%, #ffd1b8 100%)", tile: "#f26110" }, // sunset / tangerine
];

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Landing");
  const tNav = await getTranslations("Nav");

  const features = t.raw("features") as { title: string; body: string }[];
  const aboutCards = t.raw("whatCards") as { title: string; body: string }[];
  const outcomes = t.raw("outcomes") as string[];

  return (
    <div
      className="min-h-screen bg-[#ebf5ff] text-[#0a0d12] overflow-x-hidden"
      style={{ fontFamily: "var(--font-geist), 'Geist', system-ui, sans-serif", letterSpacing: "-0.01em" }}
    >
      {/* Nav — transparent, floating */}
      <nav className="relative z-20 max-w-[1200px] mx-auto flex items-center justify-between px-6 md:px-10 py-6">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-[9px] rotate-45 flex items-center justify-center shadow-[rgba(4,69,144,0.18)_0px_6px_14px_-2px]" style={{background:"linear-gradient(135deg, #479dff, #0069e0)"}}>
            <svg className="-rotate-45" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </span>
          <span className="text-[18px] font-semibold tracking-[-0.02em] text-[#0a0d12]" style={display}>
            Graphi<span className="text-[#0099ff]">Code</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher tone="light" />
          <Link href="/login" className="hidden sm:flex h-9 px-4 rounded-full text-sm font-medium text-[#535862] hover:text-[#0a0d12] hover:bg-[rgba(83,88,98,0.06)] transition-colors duration-200 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0099ff]">
            {tNav("signIn")}
          </Link>
          <Link href="/signup" className="h-9 px-4 rounded-full text-sm font-medium bg-[#181d27] text-white hover:bg-[#0a0d12] transition-[background-color,transform] duration-200 flex items-center active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0099ff]">
            {tNav("getStarted")}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 md:px-16 pt-16 pb-28 text-center overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{background:"radial-gradient(ellipse 75% 55% at 50% 0%, rgba(79,190,255,0.20) 0%, transparent 62%)"}} />
        <HeroDataflow />
        {/* floating doodles */}
        <span className="hidden md:block absolute left-[8%] top-[34%] w-3.5 h-3.5 rounded-full bg-[#f26110] opacity-70 animate-float z-[1]" style={{animationDelay:"0.4s"}} />
        <span className="hidden md:block absolute right-[10%] top-[24%] w-4 h-4 rounded-[6px] rotate-12 bg-[#9552e0] opacity-60 animate-float z-[1]" style={{animationDelay:"1.1s"}} />
        <span className="hidden md:block absolute right-[16%] bottom-[20%] w-3 h-3 rounded-full bg-[#bb9915] opacity-70 animate-float z-[1]" style={{animationDelay:"0.8s"}} />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="animate-fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#cce7ff] text-[#0069e0] text-xs font-semibold tracking-wide mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0099ff]" />
            {t("badge")}
          </div>
          <h1 className="animate-fade-up text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-[-0.03em] mb-6 text-[#0a0d12]" style={{...display, animationDelay:"80ms"}}>
            {t("heroEngineer")}{" "}
            <span style={{backgroundImage:"linear-gradient(135deg, #479dff, #0069e0)", WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent"}}>
              {t("heroVisualize")}
            </span>{" "}
            {t("heroUnderstand")}
          </h1>
          <p className="animate-fade-up text-lg text-[#535862] max-w-xl mx-auto leading-relaxed mb-9" style={{animationDelay:"160ms"}}>
            {t.rich("heroSubtitle", {
              em: (chunks) => <em className="text-[#0a0d12] not-italic font-semibold">{chunks}</em>,
            })}
          </p>
          <div className="animate-fade-up flex items-center justify-center" style={{animationDelay:"240ms"}}>
            <Link href="/signup" className="inline-flex items-center gap-2 h-12 px-7 rounded-full text-base font-medium bg-[#181d27] text-white hover:bg-[#0a0d12] transition-[background-color,box-shadow,transform] duration-200 shadow-[rgba(4,69,144,0.18)_0px_10px_24px_-6px] hover:shadow-[rgba(4,69,144,0.28)_0px_14px_30px_-6px] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0099ff]">
              {t("startLearning")}
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-7 mt-12 flex-wrap">
            {["CODE","EXECUTE","VISUALIZE","SIMULATE"].map(tag=>(
              <div key={tag} className="flex items-center gap-1.5 text-[11px] text-[#93979f] tracking-widest font-semibold">
                <span className="w-1 h-1 rounded-full bg-[#4fbeff]"/>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is LabVIEW */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-xs text-[#0099ff] font-semibold tracking-widest uppercase mb-3">{t("whatLabel")}</p>
            <h2 className="text-3xl md:text-[40px] font-medium tracking-[-0.02em] leading-[1.1] mb-5 text-[#0a0d12]" style={display}>{t("whatTitle")}</h2>
            <p className="text-[#535862] text-lg leading-relaxed">{t("whatIntro")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aboutCards.map((c, i)=>(
              <div key={c.title} className="p-8 rounded-[32px]" style={{background:aboutStyles[i].wash}}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white" style={{background:aboutStyles[i].tile}}>{aboutIcons[i]}</div>
                <h3 className="text-xl font-medium tracking-[-0.02em] text-[#0a0d12] mb-2.5" style={display}>{c.title}</h3>
                <p className="text-sm text-[#535862] leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-[#0099ff] font-semibold tracking-widest uppercase mb-3">{t("featuresLabel")}</p>
            <h2 className="text-3xl md:text-[40px] font-medium tracking-[-0.02em] leading-[1.1] text-[#0a0d12]" style={display}>{t("featuresTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i)=>(
              <div key={f.title} className="p-7 rounded-[28px] bg-[#fafdff] border border-[rgba(83,88,98,0.14)] hover:border-[rgba(83,88,98,0.28)] hover:-translate-y-1 hover:shadow-[rgba(4,69,144,0.08)_0px_14px_20px_4px] transition-[border-color,box-shadow,transform] duration-200">
                <div className="w-11 h-11 rounded-2xl bg-[#cce7ff] text-[#0069e0] flex items-center justify-center mb-5">{featureIcons[i]}</div>
                <h3 className="text-[17px] font-medium tracking-[-0.02em] text-[#0a0d12] mb-2" style={display}>{f.title}</h3>
                <p className="text-sm text-[#535862] leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-xs text-[#0099ff] font-semibold tracking-widest uppercase mb-3">{t("learnLabel")}</p>
            <h2 className="text-3xl md:text-[40px] font-medium tracking-[-0.02em] leading-[1.1] mb-4 text-[#0a0d12]" style={display}>{t("learnTitle")}</h2>
            <p className="text-[#535862] text-lg leading-relaxed">{t("learnIntro")}</p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {outcomes.map((o)=>(
              <li key={o} className="flex items-start gap-3.5">
                <span className="mt-0.5 shrink-0 w-6 h-6 rounded-lg bg-[#cce7ff] flex items-center justify-center">
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#0069e0" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span className="text-[15px] text-[#181d27] leading-relaxed">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Interactive demo */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-[920px] mx-auto">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <p className="text-xs text-[#0099ff] font-semibold tracking-widest uppercase mb-3">{t("demoLabel")}</p>
            <h2 className="text-3xl md:text-[40px] font-medium tracking-[-0.02em] leading-[1.1] text-[#0a0d12]" style={display}>{t("demoTitle")}</h2>
          </div>
          <LoopSumDemo />
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-[1200px] mx-auto px-6 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-3 border-t border-[rgba(83,88,98,0.14)]">
        <span className="text-sm font-semibold tracking-[-0.02em] text-[#0a0d12]" style={display}>Graphi<span className="text-[#0099ff]">Code</span></span>
        <p className="text-xs text-[#93979f]">{t("footerTagline")}</p>
      </footer>
    </div>
  );
}
