import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { SiteLanguage } from "@/lib/site-language";

const prompts = [
  { id: "pt-BR", text: "Qual língua você prefere?" },
  { id: "en-US", text: "Which language do you prefer?" },
] as const;

/* ── SVG Flags ─────────────────────────────────────────────────────────── */
function BrazilFlag() {
  return (
    <svg viewBox="0 0 60 60" className="h-12 w-12 flex-shrink-0" aria-hidden="true">
      <clipPath id="br-clip">
        <circle cx="30" cy="30" r="29" />
      </clipPath>
      <g clipPath="url(#br-clip)">
        {/* Green field */}
        <rect width="60" height="60" fill="#009C3B" />
        {/* Yellow rhombus */}
        <path d="M30 8 L54 30 L30 52 L6 30 Z" fill="#FFDF00" />
        {/* Blue circle */}
        <circle cx="30" cy="30" r="11.5" fill="#002776" />
        {/* White equator band */}
        <path
          d="M19.5 32.5 Q30 27.5 40.5 32.5"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>
      <circle cx="30" cy="30" r="29" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
    </svg>
  );
}

function UsaFlag() {
  const stripes = Array.from({ length: 13 }, (_, i) => i);
  const stripeH = 60 / 13;
  return (
    <svg viewBox="0 0 60 60" className="h-12 w-12 flex-shrink-0" aria-hidden="true">
      <clipPath id="us-clip">
        <circle cx="30" cy="30" r="29" />
      </clipPath>
      <g clipPath="url(#us-clip)">
        {/* Stripes */}
        {stripes.map((i) => (
          <rect key={i} y={i * stripeH} width="60" height={stripeH} fill={i % 2 === 0 ? "#B22234" : "#fff"} />
        ))}
        {/* Canton */}
        <rect width="28" height={stripeH * 7} fill="#3C3B6E" />
        {/* Stars — 5×4 + 4×3 grid approximation */}
        {[
          [5,4],[5,8],[5,12],[5,16],[5,20],[5,24],
          [9,6],[9,10],[9,14],[9,18],[9,22],
          [13,4],[13,8],[13,12],[13,16],[13,20],[13,24],
          [17,6],[17,10],[17,14],[17,18],[17,22],
          [21,4],[21,8],[21,12],[21,16],[21,20],[21,24],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.1" fill="#fff" />
        ))}
      </g>
      <circle cx="30" cy="30" r="29" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
    </svg>
  );
}

/* ── Component ─────────────────────────────────────────────────────────── */
interface LanguageGateProps {
  onSelect: (language: SiteLanguage) => void;
}

export default function LanguageGate({ onSelect }: LanguageGateProps) {
  const [promptIndex, setPromptIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPromptIndex((c) => (c + 1) % prompts.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-12 text-white">

      {/* Background glow — matches site palette */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A7EF9E]/[0.06] blur-[120px]" />
      </div>

      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">

        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col items-center gap-3"
        >
          <img src="/jp-mark.svg" alt="JP" className="h-10 w-10 opacity-80" />
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#A7EF9E]/60">
            Portfólio — João Pedro
          </span>
        </motion.div>

        {/* Cycling question */}
        <div className="mb-14 flex min-h-[4rem] items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={prompts[promptIndex].id}
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-black italic tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}
            >
              {prompts[promptIndex].text}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Language cards */}
        <motion.div
          className="grid w-full gap-4 md:grid-cols-2"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          {/* PT-BR */}
          <motion.button
            type="button"
            onClick={() => onSelect("pt-BR")}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group relative overflow-hidden border border-zinc-700/60 bg-zinc-900/60 p-8 text-left
                       backdrop-blur-sm transition-colors duration-300
                       hover:border-[#A7EF9E]/50 hover:bg-zinc-900/80"
          >
            {/* Hover glow */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100
                            bg-[radial-gradient(ellipse_at_top_left,rgba(167,239,158,0.08),transparent_60%)]" />

            <div className="relative z-10 flex items-center justify-between gap-6">
              <div>
                <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.45em] text-zinc-500">
                  Brasil
                </span>
                <h2 className="font-black tracking-[-0.04em] text-white" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>
                  Português
                </h2>
                <p className="mt-2 font-mono text-xs text-zinc-500 uppercase tracking-wider">
                  Iniciar em português do Brasil
                </p>
              </div>
              <BrazilFlag />
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#A7EF9E] transition-all duration-500 group-hover:w-full" />
          </motion.button>

          {/* EN-US */}
          <motion.button
            type="button"
            onClick={() => onSelect("en-US")}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group relative overflow-hidden border border-zinc-700/60 bg-zinc-900/60 p-8 text-left
                       backdrop-blur-sm transition-colors duration-300
                       hover:border-[#A7EF9E]/50 hover:bg-zinc-900/80"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100
                            bg-[radial-gradient(ellipse_at_top_left,rgba(167,239,158,0.08),transparent_60%)]" />

            <div className="relative z-10 flex items-center justify-between gap-6">
              <div>
                <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.45em] text-zinc-500">
                  United States
                </span>
                <h2 className="font-black tracking-[-0.04em] text-white" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>
                  English
                </h2>
                <p className="mt-2 font-mono text-xs text-zinc-500 uppercase tracking-wider">
                  Start the site in American English
                </p>
              </div>
              <UsaFlag />
            </div>

            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#A7EF9E] transition-all duration-500 group-hover:w-full" />
          </motion.button>
        </motion.div>

        {/* Footer hint */}
        <motion.p
          className="mt-10 font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Você pode trocar o idioma a qualquer momento
        </motion.p>

      </div>
    </section>
  );
}
