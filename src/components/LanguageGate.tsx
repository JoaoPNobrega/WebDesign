import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { SiteLanguage } from "@/lib/site-language";

const prompts = [
  {
    id: "pt-BR",
    text: "Qual l\u00EDngua voc\u00EA prefere?",
  },
  {
    id: "en-US",
    text: "Which language do you prefer?",
  },
] as const;

function BrazilFlag() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="#149247" />
      <path d="M32 12 52 32 32 52 12 32Z" fill="#F6C744" />
      <circle cx="32" cy="32" r="11" fill="#2052B5" />
      <path
        d="M22 29.5c4.8-2.7 14.7-2.5 20.3.4"
        fill="none"
        stroke="#F8F8F8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UsaFlag() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
      <defs>
        <clipPath id="usa-circle">
          <circle cx="32" cy="32" r="30" />
        </clipPath>
      </defs>
      <g clipPath="url(#usa-circle)">
        <rect width="64" height="64" fill="#FFFFFF" />
        {[...Array.from({ length: 7 })].map((_, index) => (
          <rect
            key={index}
            y={index * 9}
            width="64"
            height="4.5"
            fill="#B22234"
          />
        ))}
        <rect width="30" height="26" fill="#3C3B6E" />
        {[8, 14, 20, 26].map((y) => (
          [7, 13, 19, 25].map((x) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.15" fill="#FFFFFF" />
          ))
        ))}
      </g>
      <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="2" />
    </svg>
  );
}

interface LanguageGateProps {
  onSelect: (language: SiteLanguage) => void;
}

export default function LanguageGate({ onSelect }: LanguageGateProps) {
  const [promptIndex, setPromptIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPromptIndex((current) => (current + 1) % prompts.length);
    }, 2200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-12 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(167,239,158,0.12),transparent_30%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.13),transparent_28%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.13)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
        <span className="mb-6 font-mono text-xs uppercase tracking-[0.45em] text-[#A7EF9E]/80">
          Language Setup
        </span>

        <div className="mb-12 min-h-[5.5rem] text-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={prompts[promptIndex].id}
              initial={{ opacity: 0, y: 22, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -22, filter: "blur(12px)" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="text-balance text-3xl font-black tracking-[-0.04em] text-white md:text-5xl"
            >
              {prompts[promptIndex].text}
            </motion.h1>
          </AnimatePresence>
        </div>

        <div className="grid w-full max-w-4xl gap-5 md:grid-cols-2">
          <motion.button
            type="button"
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => onSelect("pt-BR")}
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-emerald-500/22 via-zinc-950 to-zinc-950 p-8 text-left shadow-[0_22px_60px_rgba(0,0,0,0.35)] transition-colors hover:border-emerald-300/35"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.24),transparent_45%)]" />
            <div className="relative z-10 flex items-start justify-between gap-6">
              <div>
                <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.35em] text-white/45">
                  Brasil
                </span>
                <h2 className="text-3xl font-black tracking-[-0.04em] text-white">
                  Portugu\u00EAs
                </h2>
                <p className="mt-2 text-sm text-zinc-400">
                  Iniciar o site em portugu\u00EAs do Brasil.
                </p>
              </div>
              <BrazilFlag />
            </div>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => onSelect("en-US")}
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-sky-500/18 via-zinc-950 to-zinc-950 p-8 text-left shadow-[0_22px_60px_rgba(0,0,0,0.35)] transition-colors hover:border-sky-300/35"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.24),transparent_45%)]" />
            <div className="relative z-10 flex items-start justify-between gap-6">
              <div>
                <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.35em] text-white/45">
                  United States
                </span>
                <h2 className="text-3xl font-black tracking-[-0.04em] text-white">
                  English
                </h2>
                <p className="mt-2 text-sm text-zinc-400">
                  Start the site in American English.
                </p>
              </div>
              <UsaFlag />
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
