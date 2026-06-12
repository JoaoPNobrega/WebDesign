import { type SVGProps, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Mail } from "lucide-react";

import AetherFlowHero from "@/components/ui/aether-flow-hero";
import ImmersiveBadge from "@/components/ImmersiveBadge";
import type { SiteLanguage } from "@/lib/site-language";

const destructionCopy = {
  "pt-BR": {
    futureTitleFirst: "Faça parte",
    futureTitleSecond: "do meu futuro.",
    futureSub: "Vamos construir a próxima etapa juntos.",
    footerName: "João Pedro — Software Developer",
    footerText: "Portfólio desenvolvido por João Pedro. Todos os direitos reservados.",
    backToTopAria: "Voltar ao topo do portfólio",
    backToTopLabel: "Voltar ao topo",
  },
  "en-US": {
    futureTitleFirst: "Be part",
    futureTitleSecond: "of my future.",
    futureSub: "Let's build what comes next, together.",
    footerName: "João Pedro — Software Developer",
    footerText: "Portfolio developed by João Pedro. All rights reserved.",
    backToTopAria: "Back to top of portfolio",
    backToTopLabel: "Back to top",
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

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

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
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isSectionInView, setIsSectionInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.5 });
  const titleY = useTransform(smoothProgress, [0, 0.55], ["90px", "0px"]);
  const subY = useTransform(smoothProgress, [0, 0.55], ["130px", "0px"]);
  const titleScale = useTransform(smoothProgress, [0, 0.55], [0.94, 1]);
  const parallaxStyle = shouldReduceMotion ? undefined : { y: titleY, scale: titleScale };
  const subParallaxStyle = shouldReduceMotion ? undefined : { y: subY };

  const scrollToPortfolioTop = () => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
  };

  return (
    <section ref={sectionRef} className={`relative overflow-hidden ${backgroundClassName}`}>
      {showAmbientBackground && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_34%),radial-gradient(circle_at_bottom,rgba(167,239,158,0.09),transparent_26%)]" />
          <div className="pointer-events-none absolute inset-0">
            <AetherFlowHero />
          </div>
        </>
      )}

      <ImmersiveBadge visible={isSectionInView} />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-10 sm:pt-12">
        {/* ── Convite: o futuro ─────────────────────────────────────────── */}
        <motion.div
          className="pb-12 text-center sm:pb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.h2
            style={parallaxStyle}
            className="text-4xl font-extrabold uppercase leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                variants={{
                  hidden: { y: "110%", opacity: 0, rotate: 2 },
                  visible: { y: "0%", opacity: 1, rotate: 0 },
                }}
                transition={{ duration: 0.9, ease: easeOutExpo }}
              >
                {copy.futureTitleFirst}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block bg-gradient-to-r from-[#A7EF9E] via-[#d8ffd0] to-[#A7EF9E] bg-clip-text text-transparent"
                variants={{
                  hidden: { y: "110%", opacity: 0, rotate: -2 },
                  visible: { y: "0%", opacity: 1, rotate: 0 },
                }}
                transition={{ duration: 0.9, delay: 0.12, ease: easeOutExpo }}
              >
                {copy.futureTitleSecond}
              </motion.span>
            </span>
          </motion.h2>
          <motion.p
            style={subParallaxStyle}
            variants={{
              hidden: { opacity: 0, filter: "blur(8px)" },
              visible: { opacity: 1, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.8, delay: 0.32, ease: "easeOut" }}
            className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/50 sm:text-base"
          >
            {copy.futureSub}
          </motion.p>

          <motion.ul
            style={subParallaxStyle}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
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

              return (
                <motion.li
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                  }}
                  transition={{ duration: 0.48, ease: "easeOut" }}
                >
                  <a
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    className="fx-contact"
                    aria-label={item.label}
                  >
                    <Icon className="fx-icon h-7 w-7" aria-hidden="true" />
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>

        {/* ── Ato 3: footer integrado ───────────────────────────────────── */}
        <motion.footer
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full border-t border-white/[0.06] pb-8 pt-8 sm:pb-9"
        >
          <div className="flex flex-col items-center gap-6">
            <button
              type="button"
              onClick={scrollToPortfolioTop}
              className="to-top pointer-events-auto"
              aria-label={copy.backToTopAria}
            >
              <svg className="svgIcon" viewBox="0 0 384 512" aria-hidden="true">
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
              </svg>
              <span className="to-top__label">{copy.backToTopLabel}</span>
            </button>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {finalContactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-white/35 transition hover:text-[#A7EF9E] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A7EF9E]/45"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="text-center">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-white/40">
                {copy.footerName}
              </p>
              <p className="mt-2 text-[8px] font-medium uppercase tracking-[0.24em] text-white/16 sm:text-[9px]">
                {copy.footerText}
              </p>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
