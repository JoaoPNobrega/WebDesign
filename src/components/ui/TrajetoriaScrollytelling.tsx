/**
 * TrajetoriaScrollytelling
 *
 * Horizontal scroll — Onde Estudei + Graduação panels.
 * CSS sticky keeps the container in view while wheel events are intercepted
 * to drive animated panel transitions. Career + CTA remain vertical below.
 */

import { useRef, useEffect, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lanyard from "@/components/Lanyard";

gsap.registerPlugin(ScrollTrigger);

/* ── Types ──────────────────────────────────────────────────────────────── */
export interface TrajetoriaCopy {
  timelineLabel: string;
  journeyTitle: string;
  sections: { education: string; graduation: string; career: string };
  alts: {
    kidPhoto: string;
    pinheirosLogo: string;
    motivoLogo: string;
    graduationPhoto: string;
    graduationOverlay: string;
    ajLogo: string;
    webStarLogo: string;
  };
  educationCards: {
    pinheirosName: string;
    pinheirosLevel: string;
    motivoName: string;
    motivoLevel: string;
  };
  career: {
    first:  { title: string; period: string; note: string; role: string; company: string };
    second: { title: string; period: string; note: string; role: string; company: string };
  };
  finalCta: { titleTop: string; titleAccent: string; description: string };
}

interface Props { copy: TrajetoriaCopy }

/**
 * Extra px added to the sticky wrapper beyond 100 vh.
 * While panels are active, wheel events are fully prevented so the page
 * never actually scrolls — this buffer is consumed only when the user
 * deliberately exits the last (or first) panel, giving the section a
 * smooth fade-out before the next content appears.
 */
const EXTRA_SCROLL = 600;

/* ── Component ──────────────────────────────────────────────────────────── */
export default function TrajetoriaScrollytelling({ copy }: Props) {
  const containerRef      = useRef<HTMLDivElement>(null);
  const stickyWrapperRef  = useRef<HTMLDivElement>(null);
  const horizontalRef     = useRef<HTMLDivElement>(null);
  const panelsRef         = useRef<HTMLDivElement>(null);
  const careerSectionRef  = useRef<HTMLElement>(null);

  const [ready, setReady] = useState(false);

  /* Wait one frame so the layout is fully measured before wiring scroll */
  useLayoutEffect(() => {
    requestAnimationFrame(() => setReady(true));
  }, []);

  /* ── Horizontal scroll + wheel brake ─────────────────────────────────── */
  useEffect(() => {
    if (!ready) return;

    const wrapper    = stickyWrapperRef.current;
    const horizontal = horizontalRef.current;
    const panels     = panelsRef.current;
    if (!wrapper || !horizontal || !panels) return;

    const totalPanels = panels.children.length;
    const progressBar = horizontal.querySelector<HTMLElement>(".hs-progress-fill");

    let panel         = 0;
    let acc           = 0;
    let lastDir       = 0;    // last non-zero direction (1 = down, -1 = up)
    let transitioning = false;
    let wasInZone     = false;
    let lastScrollY   = window.scrollY;

    /**
     * How many accumulated deltaY pixels before a panel advances.
     * ~3 typical mouse-wheel clicks (≈100 px each) = 300 px → brake holds.
     * One deliberate swipe on most trackpads easily exceeds this.
     */
    const THRESHOLD = 300;
    /** Cap per-event deltaY so a single high-velocity trackpad event can't
     *  blow past the threshold in one tick. */
    const MAX_DELTA = 100;
    const DURATION  = 0.6;

    /* True while the sticky container fills the viewport (panels "live"). */
    const isInZone = (): boolean => {
      const rect = wrapper.getBoundingClientRect();
      return rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
    };

    /* Instant reposition — no animation, no transition lock. */
    const jumpTo = (target: number) => {
      panel = target; acc = 0; lastDir = 0;
      gsap.set(panels, { x: -target * window.innerWidth });
      if (progressBar)
        gsap.set(progressBar, { scaleX: target / Math.max(1, totalPanels - 1) });
    };

    /* Animated advance to target panel. */
    const goTo = (target: number) => {
      if (transitioning || target < 0 || target >= totalPanels) return;
      transitioning = true;
      panel = target; acc = 0; lastDir = 0;
      gsap.to(panels, {
        x: -target * window.innerWidth,
        duration: DURATION,
        ease: "power2.inOut",
      });
      if (progressBar) {
        gsap.to(progressBar, {
          scaleX: target / Math.max(1, totalPanels - 1),
          duration: DURATION,
          ease: "power2.inOut",
        });
      }
      setTimeout(() => { transitioning = false; }, DURATION * 1000 + 100);
    };

    const onWheel = (e: WheelEvent) => {
      if (!isInZone()) return;

      const raw = e.deltaY;
      if (raw === 0) return;

      const dir   = raw > 0 ? 1 : -1;
      const delta = Math.min(Math.abs(raw), MAX_DELTA) * dir;

      /* Reset accumulator when the user reverses direction. */
      if (lastDir !== 0 && dir !== lastDir) acc = 0;
      lastDir = dir;

      /* ── Last panel + forward: brake, then release to natural scroll ── */
      if (dir > 0 && panel === totalPanels - 1) {
        acc += delta;
        if (acc < THRESHOLD) {
          e.preventDefault(); // hold
        } else {
          acc = 0; // threshold met — let page scroll through
        }
        return;
      }

      /* ── First panel + backward: release upward without accumulating ── */
      if (dir < 0 && panel === 0) {
        acc = 0;
        return; // don't prevent — let page scroll up naturally
      }

      /* ── Mid-panel: fully intercept + accumulate ─────────────────────── */
      e.preventDefault();
      if (transitioning) return;
      acc += delta;
      if (acc >  THRESHOLD) goTo(panel + 1);
      if (acc < -THRESHOLD) goTo(panel - 1);
    };

    /**
     * On every native scroll event, detect when the user enters the sticky
     * zone from above or below and snap to the correct edge panel.
     */
    const onScroll = () => {
      const inZone = isInZone();

      if (inZone && !wasInZone) {
        const scrollingUp = window.scrollY < lastScrollY;
        if (scrollingUp && panel !== totalPanels - 1) {
          // Entered from below — show the last panel.
          jumpTo(totalPanels - 1);
        } else if (!scrollingUp && panel !== 0) {
          // Entered from above — show the first panel.
          jumpTo(0);
        }
      }

      wasInZone  = inZone;
      lastScrollY = window.scrollY;
    };

    /* Keep panels aligned after viewport resize. */
    const onResize = () => {
      gsap.set(panels, { x: -panel * window.innerWidth });
    };

    window.addEventListener("wheel",  onWheel,  { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    /* ── Career branch scroll-triggered animations ─────────────────────── */
    const ctx = gsap.context(() => {
      const career = careerSectionRef.current;
      if (!career) return;

      /* 2025 branch — fade-up + AJ logo slides from behind text */
      const branch2025 = career.querySelector<HTMLElement>(".branch-2025");
      if (branch2025) {
        const ajLogo = branch2025.querySelector<HTMLElement>(".aj-logo-2025");
        gsap.set(branch2025, { opacity: 0, y: 24 });
        if (ajLogo) gsap.set(ajLogo, { opacity: 0, x: 120 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: branch2025,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        });
        tl.to(branch2025, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
        if (ajLogo)
          tl.to(ajLogo, { opacity: 1, x: 0, duration: 0.65, ease: "power2.out" }, 0.45);
      }

      /* 2026 branch — slides in from right + connector line grows */
      const branch2026 = career.querySelector<HTMLElement>(".branch-2026");
      const line2026   = career.querySelector<HTMLElement>(".branch-line-2026");
      if (branch2026) {
        gsap.set(branch2026, { opacity: 0, x: 56 });
        if (line2026) gsap.set(line2026, { scaleX: 0, transformOrigin: "left center" });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: branch2026,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        });
        tl.to(branch2026, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" });
        if (line2026)
          tl.to(line2026, { scaleX: 1, duration: 0.5, ease: "power2.out" }, 0.28);
      }
    }, containerRef);

    return () => {
      window.removeEventListener("wheel",  onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [ready]);

  /* ── JSX ────────────────────────────────────────────────────────────── */
  return (
    <div ref={containerRef} className="relative bg-black">

      {/* ═══ ENTRY — section title ═══════════════════════════════════════ */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        style={{ minHeight: "60vh", paddingTop: "7rem", paddingBottom: "7rem" }}
      >
        <span className="font-mono text-[#A7EF9E] text-xs uppercase tracking-[0.5em] mb-5 opacity-50">
          {copy.timelineLabel}
        </span>
        <h2
          className="font-black italic tracking-[-0.04em] text-white leading-none uppercase"
          style={{ fontSize: "clamp(3rem,9vw,8rem)" }}
        >
          {copy.journeyTitle}
        </h2>
        <div className="mt-6 h-px w-20 bg-[#A7EF9E]/30" />
        <div className="mt-10 flex flex-col items-center gap-1.5 opacity-25">
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">scroll</span>
          <div className="w-px h-8 bg-zinc-600" />
        </div>
      </div>

      {/* ═══ HORIZONTAL PANELS — sticky wrapper gives brake scroll room ══ */}
      <div
        ref={stickyWrapperRef}
        style={{ height: `calc(100vh + ${EXTRA_SCROLL}px)`, position: "relative" }}
      >
        <div ref={horizontalRef} className="sticky top-0 w-full h-screen overflow-hidden">

          {/* Progress bar */}
          <div className="absolute top-0 left-0 w-full h-[2px] z-50 bg-zinc-800/60">
            <div
              className="hs-progress-fill h-full bg-[#A7EF9E] origin-left shadow-[0_0_12px_rgba(167,239,158,0.5)]"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          {/* Panel navigation dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500 mr-2">01</span>
              <div className="w-8 h-[2px] bg-[#A7EF9E]/60 rounded-full" />
              <div className="w-8 h-[2px] bg-zinc-700 rounded-full" />
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500 ml-2">02</span>
            </div>
          </div>

          {/* Panels track */}
          <div ref={panelsRef} className="flex h-full" style={{ width: "200vw" }}>

            {/* ─── PANEL 1 — ONDE ESTUDEI ─────────────────────────────── */}
            <div className="hs-panel relative w-screen h-full flex-shrink-0 overflow-hidden bg-black">
              <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-16 lg:px-24">

                <div className="flex flex-col items-center text-center mb-12">
                  <span className="font-mono text-[#A7EF9E] text-xs uppercase tracking-[0.45em] mb-4 opacity-60">
                    Formação
                  </span>
                  <h3
                    className="font-black italic tracking-[-0.04em] text-white leading-[0.9] uppercase"
                    style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}
                  >
                    {copy.sections.education}
                  </h3>
                  <div className="mt-5 h-px w-16 bg-[#A7EF9E]/30" />
                </div>

                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

                  {/* LEFT — photo */}
                  <div className="flex justify-center md:justify-end">
                    <div
                      className="w-full max-w-[260px] border border-zinc-700/60 overflow-hidden
                                 shadow-[0_24px_64px_rgba(0,0,0,0.6)] relative group"
                      style={{ aspectRatio: "3/4" }}
                    >
                      <img
                        src="/assets/kid.JPG"
                        alt={copy.alts.kidPhoto}
                        className="w-full h-full object-cover object-[35%_center] transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>

                  {/* RIGHT — school cards */}
                  <div className="flex flex-col gap-5">
                    {[
                      {
                        logo:  "/assets/colegio-pinheiros-logo.svg",
                        alt:   copy.alts.pinheirosLogo,
                        name:  copy.educationCards.pinheirosName,
                        level: copy.educationCards.pinheirosLevel,
                        cls:   "object-contain p-1",
                      },
                      {
                        logo:  "/assets/colegio-motivo-logo.svg",
                        alt:   copy.alts.motivoLogo,
                        name:  copy.educationCards.motivoName,
                        level: copy.educationCards.motivoLevel,
                        cls:   "object-cover",
                      },
                    ].map((s) => (
                      <div
                        key={s.name}
                        className="border border-zinc-700/60 bg-zinc-900/80 p-6 flex items-center gap-5
                                   backdrop-blur-md hover:border-[#A7EF9E]/40 transition-all duration-300 group
                                   hover:bg-zinc-800/60 hover:shadow-[0_0_30px_rgba(167,239,158,0.08)]"
                      >
                        <div
                          className="w-16 h-16 bg-white rounded-md flex-shrink-0 overflow-hidden
                                     border border-zinc-600/60 flex items-center justify-center
                                     group-hover:border-[#A7EF9E]/30 transition-colors"
                        >
                          <img src={s.logo} alt={s.alt} className={`w-full h-full ${s.cls}`} loading="lazy" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-base md:text-lg leading-tight">{s.name}</p>
                          <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider mt-1.5">{s.level}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>

            {/* ─── PANEL 2 — CRACHÁ ───────────────────────────────────── */}
            <div className="hs-panel relative w-screen h-full flex-shrink-0 bg-black">
              <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />

              {/* Right — GRADUAÇÃO + logo + period */}
              <div className="absolute right-12 md:right-20 top-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center gap-6">
                <p
                  className="font-black italic tracking-[-0.04em] text-white uppercase"
                  style={{ fontSize: "clamp(1.6rem,3vw,2.6rem)" }}
                >
                  Graduação
                </p>
                <img
                  src="/assets/cesar-school-logo.png"
                  alt="CESAR School logo"
                  className="w-32 md:w-40 object-contain"
                  loading="lazy"
                />
                <p className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
                  2022 — andamento...
                </p>
              </div>

              {/* Left — graduation photos */}
              <div className="absolute left-12 md:left-20 top-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-start">
                <div className="relative" style={{ width: "24rem", height: "29rem" }}>
                  <div
                    className="absolute right-0 bottom-0 w-64 h-80 overflow-hidden border border-zinc-600/50
                                shadow-[0_24px_64px_rgba(0,0,0,0.7)]"
                  >
                    <img
                      src="/assets/graduacao-photo.jpg"
                      alt={copy.alts.graduationPhoto}
                      className="w-full h-full object-cover object-center [image-orientation:from-image]"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -top-10 -left-4 z-10 w-56">
                    <img
                      src="/assets/graduacao-overlay.png"
                      alt={copy.alts.graduationOverlay}
                      className="w-full h-auto object-contain -rotate-[6deg]
                                 drop-shadow-[16px_18px_20px_rgba(0,0,0,0.8)]"
                      loading="lazy"
                    />
                  </div>
                </div>
                <p className="mt-4 w-64 ml-auto text-center font-mono text-[10px] text-zinc-600 uppercase tracking-widest leading-relaxed">
                  fotos tiradas durante a semana<br />de imersão em 2022
                </p>
              </div>
            </div>

          </div>{/* /panels track */}
        </div>{/* /sticky horizontal */}
      </div>{/* /stickyWrapper */}

      {/* ═══ CHAPTER 3 — CAREER ══════════════════════════════════════════ */}
      <section ref={careerSectionRef} className="tl-career relative z-10" style={{ minHeight: "100vh" }}>
        <div className="h-screen overflow-hidden flex items-center justify-center relative bg-black">
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-6xl flex flex-col items-center">

              {/* Section header */}
              <div className="flex flex-col items-center text-center mb-12 px-4">
                <span className="font-mono text-xs uppercase tracking-[0.45em] mb-4 text-[#A7EF9E]">
                  Experiência
                </span>
                <h3
                  className="font-black italic tracking-[-0.04em] text-white leading-[0.9] uppercase"
                  style={{ fontSize: "clamp(2.2rem,6vw,5.5rem)" }}
                >
                  {copy.sections.career}
                </h3>
                <div className="mt-5 h-px w-16 bg-[#A7EF9E]/30" />
              </div>

              <div className="w-full flex flex-col gap-12">

                {/* 2025 — centered */}
                <div className="branch-2025 flex flex-col items-center text-center">
                  <span className="text-[#A7EF9E] font-mono text-[10px] uppercase tracking-[0.45em] mb-1 opacity-70">
                    {copy.career.first.title}
                  </span>
                  <span
                    className="text-white font-black leading-none tracking-[-0.04em]"
                    style={{ fontSize: "clamp(2.8rem,6vw,5rem)" }}
                  >
                    2025
                  </span>
                  <p className="text-[#A7EF9E]/60 font-mono text-[10px] uppercase tracking-widest mt-1">
                    {copy.career.first.period}
                  </p>

                  {/* Logo slides in from behind role/company text */}
                  <div className="relative flex items-center justify-center mt-4">
                    <div className="aj-logo-2025 absolute right-full mr-4 flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.6)] bg-white/10">
                        <img
                          src="/assets/aj-logo.svg"
                          alt={copy.alts.ajLogo}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-0.5">
                      <p className="text-zinc-300 text-sm leading-tight">{copy.career.first.role}</p>
                      <p className="text-zinc-600 text-[11px] leading-tight">{copy.career.first.company}</p>
                    </div>
                  </div>
                </div>

                {/* 2026 — slides from right */}
                <div className="branch-2026 grid grid-cols-2 gap-0">
                  <div />
                  <div className="flex items-start pl-10 md:pl-16">
                    <div className="flex items-center gap-1 mr-5 mt-[1.4rem] flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#A7EF9E] shadow-[0_0_8px_rgba(167,239,158,0.6)] flex-shrink-0" />
                      <div className="branch-line-2026 h-px w-10 bg-[#A7EF9E]/70" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[#A7EF9E] font-mono text-[10px] uppercase tracking-[0.45em] block mb-1 opacity-70">
                        {copy.career.second.title}
                      </span>
                      <span
                        className="text-white font-black leading-none tracking-[-0.04em] block"
                        style={{ fontSize: "clamp(2.8rem,6vw,5rem)" }}
                      >
                        2026
                      </span>
                      <p className="text-[#A7EF9E]/60 font-mono text-[10px] uppercase tracking-widest mt-1">
                        {copy.career.second.period}
                      </p>
                      <div className="flex items-center gap-3 mt-4">
                        <div className="w-9 h-9 rounded-lg overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.5)] flex-shrink-0 bg-white/10">
                          <img
                            src="/assets/w-symbol-logo.svg"
                            alt={copy.alts.webStarLogo}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <p className="text-zinc-300 text-xs leading-tight">{copy.career.second.role}</p>
                          <p className="text-zinc-600 text-[10px] leading-tight mt-0.5">{copy.career.second.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA — next chapter ══════════════════════════════════════════ */}
      <section
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 bg-zinc-950"
        style={{ minHeight: "72vh", paddingTop: "5rem", paddingBottom: "6rem" }}
      >
        <div className="flex flex-col items-center mt-10">
          <div className="relative w-8 h-8 mb-10">
            <div className="absolute inset-0 rounded-full bg-[#A7EF9E]/20 animate-ping" />
            <div className="absolute inset-2 rounded-full bg-[#A7EF9E]/10 animate-ping [animation-delay:0.4s]" />
            <div className="relative w-full h-full rounded-full bg-[#A7EF9E] shadow-[0_0_32px_rgba(167,239,158,0.65)]" />
          </div>

          <span className="font-mono text-[#A7EF9E] text-xs uppercase tracking-[0.5em] mb-5 opacity-40">
            ???
          </span>

          <h3
            className="font-black text-white leading-[0.95] tracking-[-0.04em] mb-6 px-4"
            style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)" }}
          >
            {copy.finalCta.titleTop}
            <br />
            <span className="text-[#A7EF9E] italic">{copy.finalCta.titleAccent}</span>
          </h3>

          <p className="text-zinc-500 text-base md:text-lg max-w-sm leading-relaxed">
            {copy.finalCta.description.split("\n")[0]}
            <br />
            {copy.finalCta.description.split("\n")[1]}
          </p>
        </div>
      </section>

    </div>
  );
}
