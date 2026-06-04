import { motion, useReducedMotion } from "framer-motion";

import { useLang } from "@/lib/i18n";
import { copy } from "@/lib/portfolio-copy";
import type { SiteLanguage } from "@/lib/site-language";

const OPTIONS: { code: SiteLanguage; short: string }[] = [
  { code: "pt-BR", short: "PT" },
  { code: "en-US", short: "EN" },
];

const SEGMENT_WIDTH = 40;

export default function LanguageToggle() {
  const { lang, setLang, tx } = useLang();
  const shouldReduceMotion = useReducedMotion();
  const activeIndex = lang === "pt-BR" ? 0 : 1;

  return (
    <div className="fixed right-4 top-4 z-[1000] sm:right-6 sm:top-6">
      <div
        role="group"
        aria-label={tx(copy.language.label)}
        className="relative flex items-center rounded-full border border-white/[0.06] bg-black/55 p-1 shadow-[0_18px_60px_rgba(0,0,0,0.5)] backdrop-blur-md"
      >
        <motion.span
          aria-hidden="true"
          className="absolute bottom-1 left-1 top-1 rounded-full bg-[#A7EF9E] shadow-[0_0_22px_rgba(167,239,158,0.4)]"
          style={{ width: SEGMENT_WIDTH }}
          initial={false}
          animate={{ x: activeIndex * SEGMENT_WIDTH }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 420, damping: 34 }
          }
        />
        {OPTIONS.map((option) => {
          const isActive = lang === option.code;
          return (
            <button
              key={option.code}
              type="button"
              onClick={() => setLang(option.code)}
              aria-pressed={isActive}
              className={`relative z-10 h-8 cursor-pointer rounded-full font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/70 ${
                isActive ? "text-black" : "text-white/55 hover:text-white"
              }`}
              style={{ width: SEGMENT_WIDTH }}
            >
              {option.short}
            </button>
          );
        })}
      </div>
    </div>
  );
}
