import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import VaporizeTextCycle, { Tag } from "@/components/ui/vaporize-text-cycle";

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

const PROBLEMS: ProblemSpec[] = [
  {
    id: "header",
    text: "header bugada",
    color: "rgb(255, 255, 255)",
    desktop: { top: "15%", left: "15%", width: 440, height: 70, rotation: 0, fontSize: "56px" },
    mobile: { top: "12%", left: "28%", width: 240, height: 50, rotation: 0, fontSize: "24px" },
  },
  {
    id: "mobile",
    text: "layout quebrando no mobile",
    color: "rgb(202, 255, 202)",
    desktop: { top: "38%", left: "92%", width: 340, height: 50, rotation: 0, fontSize: "20px" },
    mobile: { top: "24%", left: "85%", width: 170, height: 40, rotation: 0, fontSize: "12px" },
  },
  {
    id: "slow",
    text: "site lento",
    color: "rgb(214, 255, 214)",
    desktop: { top: "38%", left: "8%", width: 200, height: 50, rotation: 0, fontSize: "24px" },
    mobile: { top: "24%", left: "15%", width: 120, height: 40, rotation: 0, fontSize: "16px" },
  },
  {
    id: "animation",
    text: "animação travando",
    color: "rgb(241, 245, 249)",
    desktop: { top: "61%", left: "92%", width: 320, height: 70, rotation: 0, fontSize: "28px" },
    mobile: { top: "76%", left: "85%", width: 200, height: 46, rotation: 0, fontSize: "16px" },
  },
  {
    id: "impact",
    text: "visual sem impacto",
    color: "rgb(228, 255, 228)",
    desktop: { top: "61%", left: "8%", width: 300, height: 70, rotation: 0, fontSize: "28px" },
    mobile: { top: "76%", left: "15%", width: 180, height: 46, rotation: 0, fontSize: "18px" },
  },
  {
    id: "conversion",
    text: "falta de conversão",
    color: "rgb(255, 255, 255)",
    desktop: { top: "84%", left: "85%", width: 240, height: 50, rotation: 0, fontSize: "22px" },
    mobile: { top: "88%", left: "72%", width: 150, height: 40, rotation: 0, fontSize: "14px" },
  },
  {
    id: "code",
    text: "código bagunçado",
    color: "rgb(214, 255, 214)",
    desktop: { top: "84%", left: "15%", width: 240, height: 50, rotation: 0, fontSize: "22px" },
    mobile: { top: "88%", left: "28%", width: 150, height: 40, rotation: 0, fontSize: "14px" },
  },
  {
    id: "ux",
    text: "UX confusa",
    color: "rgb(241, 245, 249)",
    desktop: { top: "15%", left: "85%", width: 440, height: 70, rotation: 0, fontSize: "56px" },
    mobile: { top: "12%", left: "72%", width: 240, height: 50, rotation: 0, fontSize: "24px" },
  },
];

function ProblemText({
  problem,
  isMobile,
  activationKey,
  isClearing,
  onComplete,
}: {
  problem: ProblemSpec;
  isMobile: boolean;
  activationKey: number;
  isClearing: boolean;
  onComplete: (activationKey: number) => void;
}) {
  const layout = isMobile ? problem.mobile : problem.desktop;

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
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div
        className="h-full w-full"
        style={{
          transform: `rotate(${layout.rotation}deg)`,
          transformOrigin: "center",
        }}
      >
        {isClearing ? (
          <VaporizeTextCycle
            texts={[problem.text]}
            font={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: layout.fontSize,
              fontWeight: 600,
            }}
            color={problem.color}
            spread={2.6}
            density={2.8}
            animation={{
              vaporizeDuration: 0.8,
            }}
            direction="left-to-right"
            alignment="center"
            tag={Tag.P}
            activationKey={activationKey}
            onComplete={onComplete}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p
              className="text-center font-semibold tracking-tight whitespace-nowrap"
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

export default function DestructionPage() {
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
    if (showFinalMessage || isClearing || visibleCount >= PROBLEMS.length) {
      return;
    }

    revealTimeoutRef.current = window.setTimeout(() => {
      setVisibleCount((current) => Math.min(current + 1, PROBLEMS.length));
    }, visibleCount === 0 ? 260 : 140);

    return () => {
      if (revealTimeoutRef.current) {
        window.clearTimeout(revealTimeoutRef.current);
      }
    };
  }, [isClearing, showFinalMessage, visibleCount]);

  useEffect(() => {
    return () => {
      if (revealTimeoutRef.current) {
        window.clearTimeout(revealTimeoutRef.current);
      }
    };
  }, []);

  const visibleProblems = useMemo(() => PROBLEMS.slice(0, visibleCount), [visibleCount]);

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

    if (visibleCount < PROBLEMS.length) {
      setVisibleCount(PROBLEMS.length);
      window.setTimeout(trigger, 120);
      return;
    }

    trigger();
  };

  const handleProblemComplete = useCallback((finishedRun: number) => {
    if (finishedRun !== activeRunRef.current) {
      return;
    }

    setCompletedCount((current) => current + 1);
  }, []);

  useEffect(() => {
    if (!isClearing || completedCount < PROBLEMS.length) {
      return;
    }

    const timeout = window.setTimeout(() => {
      // Do not revert isClearing to false so the text stays fully vaporized forever
      setShowFinalMessage(true);
    }, 180);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [completedCount, isClearing]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_34%),radial-gradient(circle_at_bottom,rgba(167,239,158,0.09),transparent_26%)]" />
      <div className="relative flex min-h-screen items-center justify-center px-6 pb-32 pt-16">
        <div className="relative h-[min(78vh,760px)] w-full max-w-7xl">
          {!showFinalMessage && visibleProblems.map((problem) => (
            <ProblemText
              key={problem.id}
              problem={problem}
              isMobile={isMobile}
              activationKey={activationKey}
              isClearing={isClearing}
              onComplete={handleProblemComplete}
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
                  <p className="text-sm font-semibold uppercase tracking-[0.45em] text-[#A7EF9E] drop-shadow-sm">Solução Definitiva</p>
                  <h2 className="mt-4 bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-5xl font-bold tracking-tighter text-transparent sm:text-7xl">
                    Eu resolvo isso.
                  </h2>
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
                    O fim da frustração
                  </div>
                  <h1 className="max-w-4xl text-center bg-gradient-to-b from-white via-white to-white/40 bg-clip-text pb-4 text-4xl font-bold leading-[1.1] tracking-tighter text-transparent sm:text-6xl md:text-7xl">
                    Você está enfrentando <br />
                    esses problemas?
                  </h1>
                  <Button
                    type="button"
                    size="lg"
                    className="group relative flex items-center justify-center mt-8 overflow-hidden rounded-full bg-white px-10 py-6 text-sm uppercase tracking-[0.3em] text-black transition-all duration-500 ease-out hover:px-16 hover:bg-white/90"
                    disabled={isClearing}
                    onClick={handleActivate}
                  >
                    <span className="transition-all duration-500 group-hover:-translate-y-8 group-hover:opacity-0 group-hover:blur-sm">
                      Não aguento mais
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center translate-y-8 opacity-0 blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-0">
                      Me contrate
                    </span>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
