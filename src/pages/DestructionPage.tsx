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
    desktop: { top: "18%", left: "16%", width: 250, height: 72, rotation: -8, fontSize: "30px" },
    mobile: { top: "21%", left: "24%", width: 170, height: 56, rotation: -6, fontSize: "19px" },
  },
  {
    id: "mobile",
    text: "layout quebrando no mobile",
    color: "rgb(255, 226, 202)",
    desktop: { top: "24%", left: "78%", width: 360, height: 82, rotation: 7, fontSize: "26px" },
    mobile: { top: "32%", left: "70%", width: 210, height: 60, rotation: 6, fontSize: "17px" },
  },
  {
    id: "slow",
    text: "site lento",
    color: "rgb(255, 242, 214)",
    desktop: { top: "41%", left: "12%", width: 190, height: 64, rotation: -10, fontSize: "28px" },
    mobile: { top: "44%", left: "24%", width: 135, height: 50, rotation: -7, fontSize: "18px" },
  },
  {
    id: "animation",
    text: "anima\u00E7\u00E3o travando",
    color: "rgb(241, 245, 249)",
    desktop: { top: "35%", left: "84%", width: 300, height: 72, rotation: 10, fontSize: "24px" },
    mobile: { top: "54%", left: "75%", width: 190, height: 54, rotation: 8, fontSize: "16px" },
  },
  {
    id: "impact",
    text: "visual sem impacto",
    color: "rgb(255, 238, 228)",
    desktop: { top: "61%", left: "18%", width: 280, height: 72, rotation: 6, fontSize: "24px" },
    mobile: { top: "63%", left: "28%", width: 175, height: 52, rotation: 5, fontSize: "16px" },
  },
  {
    id: "conversion",
    text: "falta de convers\u00E3o",
    color: "rgb(255, 255, 255)",
    desktop: { top: "69%", left: "78%", width: 280, height: 72, rotation: -7, fontSize: "24px" },
    mobile: { top: "72%", left: "70%", width: 180, height: 54, rotation: -5, fontSize: "16px" },
  },
  {
    id: "code",
    text: "c\u00F3digo bagun\u00E7ado",
    color: "rgb(255, 231, 214)",
    desktop: { top: "78%", left: "28%", width: 250, height: 68, rotation: -5, fontSize: "22px" },
    mobile: { top: "80%", left: "32%", width: 165, height: 50, rotation: -4, fontSize: "15px" },
  },
  {
    id: "ux",
    text: "UX confusa",
    color: "rgb(241, 245, 249)",
    desktop: { top: "80%", left: "72%", width: 220, height: 68, rotation: 5, fontSize: "24px" },
    mobile: { top: "86%", left: "70%", width: 140, height: 48, rotation: 5, fontSize: "16px" },
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
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        top: layout.top,
        left: layout.left,
        width: `${layout.width}px`,
        height: `${layout.height}px`,
      }}
      initial={{ opacity: 0, scale: 0.82, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
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
              className="text-center font-semibold tracking-tight"
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
      setIsClearing(false);
      setShowFinalMessage(true);
    }, 180);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [completedCount, isClearing]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_34%),radial-gradient(circle_at_bottom,rgba(255,116,48,0.09),transparent_26%)]" />
      <div className="relative flex min-h-screen items-center justify-center px-6 pb-32 pt-16">
        <div className="relative h-[min(78vh,760px)] w-full max-w-7xl">
          {visibleProblems.map((problem) => (
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
                  <p className="text-sm uppercase tracking-[0.45em] text-white/35">Resultado</p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
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
                  <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                    {"Voc\u00EA est\u00E1 enfrentando esses problemas?"}
                  </h1>
                  <Button
                    type="button"
                    size="lg"
                    className="mt-8 rounded-full bg-white px-8 py-6 text-sm uppercase tracking-[0.3em] text-black hover:bg-white/90"
                    disabled={isClearing}
                    onClick={handleActivate}
                  >
                    Me contrate
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
