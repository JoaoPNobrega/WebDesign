import { type SVGProps, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mail } from "lucide-react";

import AetherFlowHero from "@/components/ui/aether-flow-hero";
import VaporizeTextCycle, { Tag } from "@/components/ui/vaporize-text-cycle";
import WetPaintButton from "@/components/ui/wet-paint-button";
import type { SiteLanguage } from "@/lib/site-language";

type ProblemLayout = {
  top: string;
  left: string;
  width: number;
  height: number;
  rotation: number;
  fontSize: string;
};

type ProblemSpec = {
  id: string;
  text: string;
  color: string;
  desktop: ProblemLayout;
  mobile: ProblemLayout;
};

const problemTexts: Record<SiteLanguage, string[]> = {
  "pt-BR": [
    "header bugada",
    "layout quebrando no mobile",
    "site lento",
    "anima\u00E7\u00E3o travando",
    "visual sem impacto",
    "falta de convers\u00E3o",
    "c\u00F3digo bagun\u00E7ado",
    "UX confusa",
  ],
  "en-US": [
    "broken header",
    "mobile layout breaking",
    "slow website",
    "laggy animation",
    "low visual impact",
    "poor conversion",
    "messy code",
    "confusing UX",
  ],
};

const destructionCopy = {
  "pt-BR": {
    finalKicker: "Solu\u00E7\u00E3o definitiva",
    finalTitle: "Eu resolvo isso.",
    ctaKicker: "O fim da frustra\u00E7\u00E3o",
    ctaTitleFirst: "Voc\u00EA est\u00E1 enfrentando",
    ctaTitleSecond: "esses problemas?",
    ctaPrimary: "N\u00E3o aguento mais",
    ctaSecondary: "Me contate",
  },
  "en-US": {
    finalKicker: "Definitive solution",
    finalTitle: "I fix this.",
    ctaKicker: "The end of frustration",
    ctaTitleFirst: "Are you dealing with",
    ctaTitleSecond: "these problems?",
    ctaPrimary: "I am done with this",
    ctaSecondary: "Hire me",
  },
} as const;

function GithubMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .7C5.74.7.66 5.78.66 12.04c0 5.01 3.25 9.26 7.76 10.76.57.1.78-.25.78-.55v-2c-3.16.69-3.83-1.36-3.83-1.36-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.66 1.23 3.31.94.1-.73.4-1.23.72-1.52-2.52-.29-5.17-1.26-5.17-5.61 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.44.11-3 0 0 .96-.31 3.13 1.16.91-.25 1.88-.38 2.85-.38s1.94.13 2.85.38c2.17-1.47 3.13-1.16 3.13-1.16.62 1.56.23 2.71.11 3 .73.79 1.17 1.8 1.17 3.04 0 4.36-2.65 5.32-5.18 5.6.41.35.77 1.04.77 2.1v3.11c0 .31.21.66.78.55a11.35 11.35 0 0 0 7.76-10.76C23.34 5.78 18.26.7 12 .7Z" />
    </svg>
  );
}

function LinkedinMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

const finalContactItems = [
  { label: "GitHub", icon: GithubMark, href: "https://github.com/JoaoPNobrega" },
  { label: "LinkedIn", icon: LinkedinMark, href: "https://linkedin.com/in/joaopedro-nobrega" },
  { label: "jpan@cesar.school", icon: Mail, href: "mailto:jpan@cesar.school" },
] as const;

function buildProblems(language: SiteLanguage): ProblemSpec[] {
  const texts = problemTexts[language];

  return [
    {
      id: "header",
      text: texts[0],
      color: "rgb(255, 255, 255)",
      desktop: { top: "15%", left: "15%", width: 440, height: 70, rotation: 0, fontSize: "56px" },
      mobile: { top: "12%", left: "28%", width: 240, height: 50, rotation: 0, fontSize: "24px" },
    },
    {
      id: "mobile",
      text: texts[1],
      color: "rgb(202, 255, 202)",
      desktop: { top: "38%", left: "92%", width: 340, height: 50, rotation: 0, fontSize: "20px" },
      mobile: { top: "24%", left: "85%", width: 170, height: 40, rotation: 0, fontSize: "12px" },
    },
    {
      id: "slow",
      text: texts[2],
      color: "rgb(214, 255, 214)",
      desktop: { top: "38%", left: "8%", width: 200, height: 50, rotation: 0, fontSize: "24px" },
      mobile: { top: "24%", left: "15%", width: 120, height: 40, rotation: 0, fontSize: "16px" },
    },
    {
      id: "animation",
      text: texts[3],
      color: "rgb(241, 245, 249)",
      desktop: { top: "61%", left: "92%", width: 320, height: 70, rotation: 0, fontSize: "28px" },
      mobile: { top: "76%", left: "85%", width: 200, height: 46, rotation: 0, fontSize: "16px" },
    },
    {
      id: "impact",
      text: texts[4],
      color: "rgb(228, 255, 228)",
      desktop: { top: "61%", left: "8%", width: 300, height: 70, rotation: 0, fontSize: "28px" },
      mobile: { top: "76%", left: "15%", width: 180, height: 46, rotation: 0, fontSize: "18px" },
    },
    {
      id: "conversion",
      text: texts[5],
      color: "rgb(255, 255, 255)",
      desktop: { top: "84%", left: "85%", width: 240, height: 50, rotation: 0, fontSize: "22px" },
      mobile: { top: "88%", left: "72%", width: 150, height: 40, rotation: 0, fontSize: "14px" },
    },
    {
      id: "code",
      text: texts[6],
      color: "rgb(214, 255, 214)",
      desktop: { top: "84%", left: "15%", width: 240, height: 50, rotation: 0, fontSize: "22px" },
      mobile: { top: "88%", left: "28%", width: 150, height: 40, rotation: 0, fontSize: "14px" },
    },
    {
      id: "ux",
      text: texts[7],
      color: "rgb(241, 245, 249)",
      desktop: { top: "15%", left: "85%", width: 440, height: 70, rotation: 0, fontSize: "56px" },
      mobile: { top: "12%", left: "72%", width: 240, height: 50, rotation: 0, fontSize: "24px" },
    },
  ];
}

function ProblemText({
  problem,
  isMobile,
  activationKey,
  isClearing,
  onComplete,
  shouldReduceMotion,
}: {
  problem: ProblemSpec;
  isMobile: boolean;
  activationKey: number;
  isClearing: boolean;
  onComplete: (activationKey: number) => void;
  shouldReduceMotion: boolean | null;
}) {
  const layout = isMobile ? problem.mobile : problem.desktop;
  const vaporizeDirection = Number.parseFloat(layout.left) > 50 ? "right-to-left" : "left-to-right";

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        top: layout.top,
        left: layout.left,
        width: `${layout.width}px`,
        height: `${layout.height}px`,
      }}
      initial={{ opacity: 0, scale: 0.82, filter: "blur(12px)", x: "-50%", y: "-50%" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)", x: "-50%", y: "-50%" }}
      exit={{ opacity: 0, scale: 0.88, filter: "blur(18px)", x: "-50%", y: "-50%" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div
        className="h-full w-full"
        style={{
          transform: `rotate(${layout.rotation}deg)`,
          transformOrigin: "center",
        }}
      >
        {isClearing && !shouldReduceMotion ? (
          <VaporizeTextCycle
            texts={[problem.text]}
            font={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: layout.fontSize,
              fontWeight: 600,
            }}
            color={problem.color}
            spread={isMobile ? 1.65 : 2.1}
            density={isMobile ? 2.1 : 2.35}
            animation={{
              vaporizeDuration: isMobile ? 0.62 : 0.68,
            }}
            direction={vaporizeDirection}
            alignment="center"
            tag={Tag.P}
            activationKey={activationKey}
            onComplete={onComplete}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p
              className="whitespace-nowrap text-center font-semibold tracking-tight"
              style={{
                color: problem.color,
                fontSize: layout.fontSize,
              }}
            >
              {problem.text}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface DestructionSectionProps {
  language: SiteLanguage;
  backgroundClassName?: string;
  showAmbientBackground?: boolean;
}

export default function DestructionSection({
  language,
  backgroundClassName = "bg-black",
  showAmbientBackground = true,
}: DestructionSectionProps) {
  const copy = destructionCopy[language];
  const problems = useMemo(() => buildProblems(language), [language]);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );
  const [visibleCount, setVisibleCount] = useState(0);
  const [activationKey, setActivationKey] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [isClearing, setIsClearing] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const revealTimeoutRef = useRef<number | null>(null);
  const activeRunRef = useRef(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (showFinalMessage || isClearing || visibleCount >= problems.length) {
      return;
    }

    revealTimeoutRef.current = window.setTimeout(() => {
      setVisibleCount((current) => Math.min(current + 1, problems.length));
    }, visibleCount === 0 ? 260 : 140);

    return () => {
      if (revealTimeoutRef.current) {
        window.clearTimeout(revealTimeoutRef.current);
      }
    };
  }, [isClearing, problems.length, showFinalMessage, visibleCount]);

  useEffect(() => {
    return () => {
      if (revealTimeoutRef.current) {
        window.clearTimeout(revealTimeoutRef.current);
      }
    };
  }, []);

  const visibleProblems = useMemo(
    () => problems.slice(0, visibleCount),
    [problems, visibleCount],
  );

  const handleActivate = () => {
    if (isClearing || showFinalMessage) {
      return;
    }

    const trigger = () => {
      setCompletedCount(0);
      setIsClearing(true);
      setActivationKey((current) => {
        const next = current + 1;
        activeRunRef.current = next;
        return next;
      });
    };

    if (visibleCount < problems.length) {
      setVisibleCount(problems.length);
      window.setTimeout(trigger, 120);
      return;
    }

    trigger();
  };

  const scrollToPortfolioTop = () => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
  };

  useEffect(() => {
    if (!isClearing || !shouldReduceMotion) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setShowFinalMessage(true);
    }, 320);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isClearing, shouldReduceMotion]);

  const handleProblemComplete = useCallback((finishedRun: number) => {
    if (finishedRun !== activeRunRef.current) {
      return;
    }

    setCompletedCount((current) => current + 1);
  }, []);

  useEffect(() => {
    if (!isClearing || completedCount < problems.length) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setShowFinalMessage(true);
    }, 180);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [completedCount, isClearing, problems.length]);

  return (
    <section className={`relative min-h-screen overflow-hidden ${backgroundClassName}`}>
      {showAmbientBackground && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_34%),radial-gradient(circle_at_bottom,rgba(167,239,158,0.09),transparent_26%)]" />
      )}
      <AnimatePresence>
        {isClearing && !showFinalMessage && !shouldReduceMotion && (
          <motion.div
            key="snap-flash"
            className="pointer-events-none absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.34, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.78, times: [0, 0.12, 0.42, 1], ease: "easeOut" }}
          >
            <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/16 blur-3xl" />
            <motion.div
              className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#A7EF9E]/45"
              initial={{ scale: 0.28, opacity: 0.92 }}
              animate={{ scale: 9.5, opacity: 0 }}
              transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-px w-[min(78vw,52rem)] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent"
              initial={{ scaleX: 0.08, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.58, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showFinalMessage && (
          <motion.div
            key="aether-flow-background"
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <AetherFlowHero />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showFinalMessage && (
          <motion.p
            key="final-footer-signature"
            className="absolute inset-x-0 bottom-7 z-30 mx-auto w-[min(82vw,36rem)] text-center text-[8px] font-medium uppercase tracking-[0.24em] text-white/16 sm:bottom-8 sm:text-[9px]"
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 8, filter: "blur(8px)" }}
            transition={{ delay: 4.2, duration: 1.1, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={scrollToPortfolioTop}
              className="pointer-events-auto cursor-pointer uppercase text-white/16 transition hover:text-white/34 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A7EF9E]/45"
              aria-label="Voltar ao topo do portf&#243;lio"
            >
              Portf&#243;lio
            </button>{" "}
            desenvolvido por Jo&#227;o Pedro. Todos os direitos reservados.
          </motion.p>
        )}
      </AnimatePresence>
      <div className="relative flex min-h-screen items-center justify-center px-6 pb-32 pt-16">
        <div className="relative h-[min(78vh,760px)] w-full max-w-7xl">
          {!showFinalMessage &&
            visibleProblems.map((problem) => (
              <ProblemText
                key={problem.id}
                problem={problem}
                isMobile={isMobile}
                activationKey={activationKey}
                isClearing={isClearing}
                onComplete={handleProblemComplete}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}

          <div className="absolute left-1/2 top-1/2 z-20 flex w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col items-center px-6 text-center">
            <AnimatePresence mode="wait">
              {showFinalMessage ? (
                <motion.div
                  key="final-message"
                  initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="text-center"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.45em] text-[#A7EF9E] drop-shadow-sm">
                    {copy.finalKicker}
                  </p>
                  <h2 className="mt-4 bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-5xl font-bold tracking-tighter text-transparent sm:text-7xl">
                    {copy.finalTitle}
                  </h2>
                  <motion.ul
                    className="mt-10 flex flex-wrap items-center justify-center gap-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          delayChildren: 0.24,
                          staggerChildren: 0.14,
                        },
                      },
                    }}
                  >
                    {finalContactItems.map((item) => {
                      const Icon = item.icon;
                      const content = <Icon className="h-7 w-7" aria-hidden="true" />;
                      const itemClassName =
                        "group inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] border border-white/12 bg-white/[0.06] text-white/70 shadow-[0_20px_70px_rgba(0,0,0,0.32)] transition duration-300 hover:-translate-y-1 hover:border-[#A7EF9E]/45 hover:bg-white/[0.12] hover:text-white hover:shadow-[0_26px_90px_rgba(167,239,158,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/70 sm:h-[4.5rem] sm:w-[4.5rem] sm:rounded-[1.7rem]";

                      return (
                        <motion.li
                          key={item.label}
                          variants={{
                            hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                          }}
                          transition={{ duration: 0.48, ease: "easeOut" }}
                        >
                          {"href" in item ? (
                            <a
                              href={item.href}
                              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                              rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                              className={itemClassName}
                              aria-label={item.label}
                            >
                              {content}
                            </a>
                          ) : (
                            <span className={itemClassName} aria-label={item.label}>
                              {content}
                            </span>
                          )}
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                </motion.div>
              ) : (
                <motion.div
                  key="cta"
                  initial={{ opacity: 0, y: 18, scale: 0.92 }}
                  animate={{ opacity: isClearing ? 0.28 : 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -14, scale: 0.94 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col items-center"
                >
                  <div className="mb-6 flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-medium uppercase tracking-[0.25em] text-white/70 shadow-lg backdrop-blur-md">
                    <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#A7EF9E]"></span>
                    {copy.ctaKicker}
                  </div>
                  <h1 className="max-w-4xl bg-gradient-to-b from-white via-white to-white/40 bg-clip-text pb-4 text-center text-4xl font-bold leading-[1.1] tracking-tighter text-transparent sm:text-6xl md:text-7xl">
                    {copy.ctaTitleFirst}
                    <br />
                    {copy.ctaTitleSecond}
                  </h1>
                  <WetPaintButton
                    type="button"
                    className="mt-8 bg-white px-10 py-6 text-sm uppercase tracking-[0.3em] text-black shadow-[0_18px_50px_rgba(255,255,255,0.12)] transition-all duration-500 ease-out hover:bg-white/90 hover:px-20 hover:py-7 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isClearing}
                    onClick={handleActivate}
                  >
                    <span className="relative z-10 inline-flex h-8 min-w-[13rem] items-center justify-center overflow-hidden transition-all duration-500 group-hover:min-w-[16rem]">
                      <span className="transition-all duration-500 group-hover:-translate-y-10 group-hover:opacity-0 group-hover:blur-sm">
                        {copy.ctaPrimary}
                      </span>
                      <span className="absolute inset-0 flex translate-y-10 items-center justify-center text-xl font-black tracking-[0.22em] opacity-0 blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-0 sm:text-2xl">
                        {copy.ctaSecondary}
                      </span>
                    </span>
                  </WetPaintButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
