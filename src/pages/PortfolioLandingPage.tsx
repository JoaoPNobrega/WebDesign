import { useEffect, useRef, useState } from "react";

import { animate, motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Lanyard from "@/components/Lanyard";
import DestructionSection from "@/components/DestructionSection";
import OrbitingSkills from "@/components/ui/orbiting-skills";
import { ZoomParallax, type ZoomMediaAsset } from "@/components/ui/zoom-parallax";

const HERO_MORPH_SCROLL_DISTANCE = 860;
const FLOATING_NAV_SCROLL_OFFSET = 360;
const FLOATING_NAV_SCROLL_THRESHOLD = HERO_MORPH_SCROLL_DISTANCE + FLOATING_NAV_SCROLL_OFFSET;

const portfolioZoomImages: ZoomMediaAsset[] = [
  {
    type: "image",
    src: "/assets/image.png",
    alt: "Center site preview",
  },
  {
    type: "video",
    src: "/assets/feedback.mp4",
    alt: "Top left site preview",
  },
  {
    type: "image",
    src: "/assets/flyhigh.png",
    alt: "Left tall site preview",
  },
  {
    type: "video",
    src: "/assets/norris.mp4",
    alt: "Center right site preview",
  },
  {
    type: "video",
    src: "/assets/delusional.mp4",
    alt: "Bottom left site preview",
  },
  {
    type: "video",
    src: "/assets/3d.mp4",
    alt: "Bottom wide site preview",
    objectPosition: "bottom",
  },
  {
    type: "video",
    src: "/assets/navbargeral.mp4",
    alt: "Final zoom site preview",
    objectPosition: "top",
  },
];

const profileHighlights = [
  {
    eyebrow: "01",
    title: "Full stack com vis\u00e3o de produto",
    description:
      "Construo do front ao back com arquitetura, performance e clareza de entrega. A interface nasce bonita porque o produto tamb\u00e9m \u00e9 bem pensado.",
  },
  {
    eyebrow: "02",
    title: "Front-end como experi\u00eancia",
    description:
      "Meu foco est\u00e1 em transformar layout em percep\u00e7\u00e3o de qualidade: responsividade, hierarquia, ritmo visual e intera\u00e7\u00f5es precisas.",
  },
  {
    eyebrow: "03",
    title: "Motion e interatividade",
    description:
      "Uso anima\u00e7\u00f5es, microintera\u00e7\u00f5es e scroll storytelling para criar experi\u00eancias fluidas, imersivas e memor\u00e1veis.",
  },
  {
    eyebrow: "04",
    title: "Acabamento premium",
    description:
      "Cuido dos detalhes que separam uma tela comum de uma execu\u00e7\u00e3o de alto n\u00edvel: fluidez, contraste, estados, transi\u00e7\u00f5es e polimento.",
  },
];

const experienceHighlights = [
  {
    role: "Desenvolvedor de software",
    company: "AJ Solu\u00e7\u00f5es & Sistemas \u00b7 Est\u00e1gio",
    period: "Agosto \u2014 Novembro 2025",
    description:
      "Primeiro est\u00e1gio profissional, com atua\u00e7\u00e3o em desenvolvimento de software e evolu\u00e7\u00e3o de base t\u00e9cnica em produto real.",
  },
  {
    role: "Desenvolvedor full stack",
    company: "Web Star Studio \u00b7 Est\u00e1gio",
    period: "Fevereiro 2026 \u2014 Hoje",
    description:
      "Atua\u00e7\u00e3o full stack em experi\u00eancias digitais, com foco em front-end, integra\u00e7\u00f5es e interfaces de alto acabamento.",
  },
  {
    role: "Full stack foundation",
    company: "Base t\u00e9cnica",
    period: "2022 \u2014 Presente",
    description:
      "Constru\u00e7\u00e3o de base s\u00f3lida em produto, l\u00f3gica, APIs e entrega completa do front ao back.",
  },
];

function JourneyHorizontalSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isJourneyNearViewport = useInView(sectionRef, { margin: "700px 0px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 96,
    damping: 28,
    mass: 0.7,
  });

  const trackX = useTransform(smoothProgress, [0, 0.72, 1], shouldReduceMotion ? ["0%", "0%", "0%"] : ["0%", "-50%", "-50%"]);
  const aboutScale = useTransform(smoothProgress, [0, 0.72, 1], shouldReduceMotion ? [1, 1, 1] : [1, 0.965, 0.965]);
  const graduationLeftY = useTransform(smoothProgress, [0.3, 0.72, 1], shouldReduceMotion ? [0, 0, 0] : [58, -8, -8]);
  const graduationRightY = useTransform(smoothProgress, [0.3, 0.72, 1], shouldReduceMotion ? [0, 0, 0] : [44, -2, -2]);
  const overlayY = useTransform(smoothProgress, [0.3, 0.72, 1], shouldReduceMotion ? [0, 0, 0] : [36, -8, -8]);
  const graduationOpacity = useTransform(smoothProgress, [0.38, 0.6, 1], shouldReduceMotion ? [1, 1, 1] : [0.28, 1, 1]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-label="Sobre mim e gradua&#231;&#227;o"
      className="relative h-[320vh] bg-[#050505]"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050505]">
        <motion.div
          style={{ x: trackX }}
          className="flex h-full w-[200vw] will-change-transform"
        >
          <section aria-labelledby="about-heading" className="relative h-full w-screen flex-shrink-0 overflow-hidden bg-[#050505] px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
            <motion.div
              style={{ scale: aboutScale }}
              className="relative mx-auto flex h-full max-w-7xl flex-col justify-center"
            >
              <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <motion.div
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.75, ease: "easeOut" }}
                  className="max-w-2xl"
                >
                  <p className="mb-5 text-xs font-medium uppercase tracking-[0.45em] text-white/40">
                    Sobre mim
                  </p>
                  <h2
                    id="about-heading"
                    className="text-4xl font-black uppercase tracking-[-0.075em] text-white sm:text-6xl lg:text-7xl"
                  >
                    Construo interfaces que parecem produto de alto n&#237;vel.
                  </h2>
                  <p className="mt-8 text-base leading-8 text-white/68 sm:text-lg">
                    Sou um desenvolvedor full stack com foco forte em front-end, unindo
                    base t&#233;cnica, sensibilidade visual e obsess&#227;o por acabamento. Meu
                    trabalho &#233; transformar ideias em experi&#234;ncias digitais fluidas,
                    responsivas e marcantes.
                  </p>
                  <p className="mt-6 text-sm leading-7 text-white/48 sm:text-base">
                    Da arquitetura ao motion, eu penso cada detalhe para que o produto
                    funcione bem, comunique valor e impressione pela execu&#231;&#227;o.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.85, ease: "easeOut", delay: 0.08 }}
                  className="relative overflow-hidden rounded-[3.25rem] border border-white/[0.08] bg-[#070707] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.42)] sm:p-8 lg:p-10"
                >
                  <div className="relative z-10 mb-6 flex items-center justify-between gap-6">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.38em] text-white/35">
                        Skills
                      </p>
                      <h3 className="mt-3 text-3xl font-black uppercase tracking-[-0.06em] text-white sm:text-5xl">
                        Stack em movimento
                      </h3>
                    </div>
                    <div className="hidden h-px flex-1 bg-white/12 sm:block" />
                  </div>

                  <div className="relative z-10 flex min-h-[360px] items-center justify-center rounded-[2.5rem] border border-white/[0.06] bg-[#050505] lg:min-h-[430px]">
                    <OrbitingSkills />
                  </div>
                </motion.div>
              </div>

              <div className="relative ml-auto mt-10 flex w-fit items-center gap-5 text-white/45 lg:mt-14">
                <span className="text-xs font-medium uppercase tracking-[0.5em]">
                  Meu trajeto
                </span>
                <span className="relative h-px w-24 bg-gradient-to-r from-white/45 to-white/0">
                  <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t border-white/45" />
                </span>
              </div>
            </motion.div>
          </section>

          <section aria-labelledby="graduation-heading" className="relative h-full w-screen flex-shrink-0 overflow-hidden bg-[#050505] px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
            <div className="pointer-events-auto absolute inset-0 z-0 flex items-center justify-center">
              {isJourneyNearViewport && (
                <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} performanceMode />
              )}
            </div>

            <motion.div
              style={{ opacity: graduationOpacity }}
              className="pointer-events-none relative z-10 mx-auto grid h-full max-w-7xl gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center"
            >
              <motion.div
                style={{ y: graduationLeftY }}
                className="pointer-events-none relative mx-auto flex w-full max-w-[26rem] flex-col items-start lg:mx-0"
              >
                <div className="relative h-[25rem] w-full sm:h-[29rem]">
                  <div className="absolute bottom-0 right-0 h-72 w-56 overflow-hidden border border-zinc-600/50 shadow-[0_24px_64px_rgba(0,0,0,0.7)] sm:h-80 sm:w-64">
                    <img
                      src="/assets/graduacao-photo.jpg"
                      alt="Foto da gradua&#231;&#227;o"
                      className="h-full w-full object-cover object-center [image-orientation:from-image]"
                      loading="lazy"
                    />
                  </div>
                  <motion.div style={{ y: overlayY }} className="absolute -left-2 top-0 z-10 w-48 sm:-left-4 sm:-top-10 sm:w-56">
                    <img
                      src="/assets/graduacao-overlay.png"
                      alt="Moldura da semana de imers&#227;o"
                      className="h-auto w-full -rotate-[6deg] object-contain drop-shadow-[16px_18px_20px_rgba(0,0,0,0.8)]"
                      loading="lazy"
                    />
                  </motion.div>
                </div>
                <p className="ml-auto mt-4 w-64 text-center font-mono text-[10px] uppercase leading-relaxed tracking-widest text-zinc-600">
                  fotos tiradas durante a semana<br />de imers&#227;o em 2022
                </p>
              </motion.div>

              <motion.div
                style={{ y: graduationRightY }}
                className="pointer-events-none relative z-10 flex flex-col items-center gap-6"
              >
                <h2
                  id="graduation-heading"
                  className="font-black uppercase italic tracking-[-0.04em] text-white"
                  style={{ fontSize: "clamp(1.6rem,3vw,2.6rem)" }}
                >
                  Gradua&#231;&#227;o
                </h2>
                <img
                  src="/assets/cesar-school-logo.png"
                  alt="CESAR School logo"
                  className="w-32 object-contain md:w-40"
                  loading="lazy"
                />
                <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  2022 &#8212; andamento...
                </p>
              </motion.div>
            </motion.div>
          </section>
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceStackSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.72,
  });

  const cardY = useTransform(smoothProgress, [0, 0.2, 1], shouldReduceMotion ? [0, 0, 0] : [220, 160, 0]);
  const cardScale = useTransform(smoothProgress, [0, 0.2, 1], shouldReduceMotion ? [1, 1, 1] : [0.94, 0.955, 1]);
  const cardRadius = useTransform(smoothProgress, [0, 0.2, 1], shouldReduceMotion ? [40, 40, 40] : [96, 88, 40]);
  const mainLineProgress = useTransform(smoothProgress, [0.28, 0.72], [0, 1]);
  const firstBranchProgress = useTransform(smoothProgress, [0.38, 0.56], [0, 1]);
  const secondBranchProgress = useTransform(smoothProgress, [0.58, 0.78], [0, 1]);
  const leftArrowOpacity = useTransform(smoothProgress, [0.5, 0.58], [0, 1]);
  const rightArrowOpacity = useTransform(smoothProgress, [0.72, 0.82], [0, 1]);
  const firstItemOpacity = useTransform(smoothProgress, [0.48, 0.6], [0, 1]);
  const secondItemOpacity = useTransform(smoothProgress, [0.72, 0.86], [0, 1]);
  const firstItemX = useTransform(smoothProgress, [0.48, 0.62], shouldReduceMotion ? [0, 0] : [-18, 0]);
  const secondItemX = useTransform(smoothProgress, [0.72, 0.88], shouldReduceMotion ? [0, 0] : [18, 0]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-heading"
      className="relative z-50 -mt-[65vh] h-[210vh] bg-[#070707]"
    >
      <motion.section
        style={{ y: cardY, scale: cardScale, borderTopLeftRadius: cardRadius, borderTopRightRadius: cardRadius }}
        className="sticky top-0 h-screen overflow-hidden border-t border-white/[0.08] bg-[#070707] px-6 py-24 text-white shadow-[0_-70px_160px_rgba(0,0,0,0.88)] sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="relative mx-auto h-full max-w-7xl">
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.48em] text-white/36">
              Linha do tempo
            </p>
            <h2
              id="experience-heading"
              className="max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.085em] text-white sm:text-7xl lg:text-[6rem]"
            >
              Experi&#234;ncia
            </h2>
          </div>

          <div className="absolute inset-x-0 bottom-12 top-[18rem] hidden md:block">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />
            <motion.div
              style={{ scaleY: mainLineProgress, transformOrigin: "top center" }}
              className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[#7c3cff]"
            />

            <div className="absolute left-1/2 top-[28%] h-12 w-12 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                style={{ opacity: leftArrowOpacity }}
                className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#7c3cff] bg-[#050505] shadow-[0_0_30px_rgba(124,60,255,0.35)]"
              />
              <motion.div
                style={{ scaleX: firstBranchProgress, transformOrigin: "right center" }}
                className="absolute right-1/2 top-1/2 h-[2px] w-44 -translate-y-1/2 bg-[#7c3cff]"
              />
              <motion.span
                style={{ opacity: leftArrowOpacity }}
                className="absolute right-[calc(50%+11rem)] top-1/2 h-4 w-4 -translate-y-1/2 -rotate-[135deg] border-r-2 border-t-2 border-[#7c3cff]"
              />
            </div>

            <div className="absolute left-1/2 top-[68%] h-12 w-12 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                style={{ opacity: rightArrowOpacity }}
                className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#7c3cff] bg-[#050505] shadow-[0_0_30px_rgba(124,60,255,0.35)]"
              />
              <motion.div
                style={{ scaleX: secondBranchProgress, transformOrigin: "left center" }}
                className="absolute left-1/2 top-1/2 h-[2px] w-44 -translate-y-1/2 bg-[#7c3cff]"
              />
              <motion.span
                style={{ opacity: rightArrowOpacity }}
                className="absolute left-[calc(50%+11rem)] top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-[#7c3cff]"
              />
            </div>

            <motion.article
              style={{ opacity: firstItemOpacity, x: firstItemX }}
              className="absolute right-[calc(50%+14.5rem)] top-[20%] max-w-[21rem] text-right"
            >
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.26em] text-white">
                {experienceHighlights[0].company}
              </p>
              <p className="mt-2 text-sm text-white/50">
                {experienceHighlights[0].role}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">
                {experienceHighlights[0].period}
              </p>
              <p className="mt-4 text-xs leading-6 text-white/42">
                {experienceHighlights[0].description}
              </p>
            </motion.article>

            <motion.article
              style={{ opacity: secondItemOpacity, x: secondItemX }}
              className="absolute left-[calc(50%+14.5rem)] top-[60%] max-w-[21rem]"
            >
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.26em] text-white">
                {experienceHighlights[1].company}
              </p>
              <p className="mt-2 text-sm text-white/50">
                {experienceHighlights[1].role}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">
                {experienceHighlights[1].period}
              </p>
              <p className="mt-4 text-xs leading-6 text-white/42">
                {experienceHighlights[1].description}
              </p>
            </motion.article>
          </div>

          <div className="mt-10 grid gap-4 md:hidden">
            {experienceHighlights.map((item) => (
              <article key={item.company} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
                  {item.period}
                </p>
                <h3 className="mt-3 text-xl font-black uppercase tracking-[-0.055em] text-white">
                  {item.company}
                </h3>
                <p className="mt-2 text-sm text-white/48">{item.role}</p>
              </article>
            ))}
          </div>
        </div>
      </motion.section>
    </section>
  );
}

function DestructionStackSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 96,
    damping: 30,
    mass: 0.78,
  });

  const cardY = useTransform(smoothProgress, [0, 0.32, 1], shouldReduceMotion ? [0, 0, 0] : [260, 150, 0]);
  const cardScale = useTransform(smoothProgress, [0, 0.42, 1], shouldReduceMotion ? [1, 1, 1] : [0.955, 0.975, 1]);
  const cardRadius = useTransform(smoothProgress, [0, 0.55, 1], shouldReduceMotion ? [40, 40, 40] : [92, 64, 34]);

  return (
    <section
      ref={sectionRef}
      aria-label="Problemas que resolvo"
      className="relative z-[60] -mt-[54vh] h-[170vh] bg-[#070707]"
    >
      <motion.div
        style={{
          y: cardY,
          scale: cardScale,
          borderTopLeftRadius: cardRadius,
          borderTopRightRadius: cardRadius,
        }}
        className="sticky top-0 h-screen overflow-hidden border-t border-white/[0.08] bg-[#070707] shadow-[0_-80px_180px_rgba(0,0,0,0.82)]"
      >
        <DestructionSection language="pt-BR" backgroundClassName="bg-[#070707]" showAmbientBackground={false} />
      </motion.div>
    </section>
  );
}

export default function PortfolioLandingPage() {
  const [isNavDetached, setIsNavDetached] = useState(false);
  const [notchProgress, setNotchProgress] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const lastScrollYRef = useRef(0);
  const notchProgressRef = useRef(0);
  const autoMorphControlsRef = useRef<ReturnType<typeof animate> | null>(null);

  const setSyncedNotchProgress = (progress: number) => {
    notchProgressRef.current = progress;
    setNotchProgress(progress);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroTop = heroRef.current?.offsetTop ?? 0;
      const heroScroll = Math.max(scrollY - heroTop, 0);
      const progress = Math.min(heroScroll / HERO_MORPH_SCROLL_DISTANCE, 1);
      const isScrollingUp = scrollY < lastScrollYRef.current;

      if (isScrollingUp && heroScroll <= FLOATING_NAV_SCROLL_THRESHOLD) {
        setIsNavDetached(false);
        autoMorphControlsRef.current?.stop();
        autoMorphControlsRef.current = animate(notchProgressRef.current, 0, {
          duration: 0.36,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: setSyncedNotchProgress,
        });
      } else {
        autoMorphControlsRef.current?.stop();
        setSyncedNotchProgress(progress);
        setIsNavDetached(heroScroll >= FLOATING_NAV_SCROLL_THRESHOLD);
      }

      lastScrollYRef.current = scrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      autoMorphControlsRef.current?.stop();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const notchDepth = 1 - notchProgress;
  const notchY = (value: number) => (value * notchDepth).toFixed(2);
  const notchPath = `M0 0H92C111 0 123 ${notchY(5)} 131 ${notchY(16)}C140 ${notchY(29)} 145 ${notchY(43)} 148 ${notchY(57)}C152 ${notchY(75)} 164 ${notchY(84)} 182 ${notchY(84)}H278C296 ${notchY(84)} 308 ${notchY(75)} 312 ${notchY(57)}C315 ${notchY(43)} 320 ${notchY(29)} 329 ${notchY(16)}C337 ${notchY(5)} 349 0 368 0H460V0H0Z`;
  const navExitProgress = Math.min(Math.max((notchProgress - 0.04) / 0.42, 0), 1);
  const navTextOpacity = isNavDetached ? "1" : (1 - navExitProgress).toFixed(2);
  const navTextTranslateY = isNavDetached ? "0" : (-18 * navExitProgress).toFixed(2);
  const heroImageScale = 1 + notchProgress * 0.045;
  const heroBottomOpenProgress = Math.min(Math.max((notchProgress - 0.08) / 0.76, 0), 1);
  const heroBottomRadius = `${3 - heroBottomOpenProgress * 1.75}rem`;
  const heroBottomFadeHeight = 16 + heroBottomOpenProgress * 18;
  const heroImageMask = `linear-gradient(to bottom, black 0%, black ${100 - heroBottomFadeHeight}%, transparent 100%)`;

  return (
    <div className="bg-[#050505] text-white">
      <section
        ref={heroRef}
        className="relative"
        style={{ height: `calc(100vh + ${FLOATING_NAV_SCROLL_THRESHOLD}px)` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-5 z-10 h-[4.55rem] w-[min(94vw,52rem)] -translate-x-1/2 overflow-visible sm:top-6 lg:top-8"
        >
          <svg
            viewBox="0 0 460 86"
            preserveAspectRatio="none"
            className="h-full w-full overflow-visible"
          >
            <path
              d={notchPath}
              fill="#050505"
            />
          </svg>
        </div>

        <div
          className={`left-1/2 w-fit -translate-x-1/2 transition-[top] duration-500 ${
            isNavDetached ? "fixed top-5 z-[120]" : "absolute top-[1.82rem] z-30 sm:top-[2.14rem] lg:top-[2.62rem]"
          }`}
        >
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className={`flex items-center justify-center gap-2 rounded-full transition-[background-color,border-color,box-shadow,padding] duration-500 ${
              isNavDetached
                ? "border border-white/10 bg-black px-1.5 py-1.5 shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
                : "border border-transparent bg-transparent px-0 py-0 shadow-none"
            }`}
          >
            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              className="cursor-pointer px-5 py-1 text-[1rem] font-medium uppercase tracking-[0.28em] text-white/80 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              style={{ opacity: navTextOpacity, transform: `translateY(${navTextTranslateY}px)` }}
            >
              Projetos
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="cursor-pointer px-5 py-1 text-[1rem] font-medium uppercase tracking-[0.28em] text-white/80 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              style={{ opacity: navTextOpacity, transform: `translateY(${navTextTranslateY}px)` }}
            >
              Contato
            </button>
          </motion.nav>
        </div>

        <div
          className="absolute inset-y-5 left-4 right-4 overflow-hidden border border-black/35 sm:inset-y-6 sm:left-6 sm:right-6 lg:inset-y-8 lg:left-10 lg:right-10"
          style={{
            borderTopLeftRadius: "3rem",
            borderTopRightRadius: "3rem",
            borderBottomLeftRadius: heroBottomRadius,
            borderBottomRightRadius: heroBottomRadius,
          }}
        >
          <motion.img
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ scale: heroImageScale, opacity: 1 }}
            transition={{ scale: { duration: 0.18, ease: "linear" }, opacity: { duration: 1.1, ease: "easeOut" } }}
            src="/portfolio/hero.jpeg"
            alt="Hero do portf&#243;lio de Jo&#227;o Pedro"
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{
              WebkitMaskImage: heroImageMask,
              maskImage: heroImageMask,
            }}
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(3,3,3,0.88)_0%,_rgba(3,3,3,0.55)_38%,_rgba(3,3,3,0.26)_62%,_rgba(3,3,3,0.6)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(5,5,5,0.1)_0%,_rgba(5,5,5,0)_28%,_rgba(5,5,5,0.12)_100%)]" />
        </div>

        <div className="absolute inset-x-4 bottom-5 h-40 bg-[linear-gradient(180deg,_rgba(5,5,5,0)_0%,_rgba(5,5,5,0.82)_100%)] sm:inset-x-6 sm:bottom-6 lg:inset-x-10 lg:bottom-8" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 pb-12 pt-28 sm:px-8 lg:px-12 lg:pb-16 lg:pt-36">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end"
          >
            <h1 className="max-w-2xl text-6xl font-black uppercase tracking-[-0.08em] text-white sm:text-7xl lg:-translate-y-28 lg:text-[8.5rem] lg:leading-[0.88]">
              Jo&#227;o Pedro
            </h1>
            <div className="max-w-xl lg:translate-y-16 lg:justify-self-end lg:text-right">
              <p className="text-xs font-medium uppercase tracking-[0.34em] text-white/72 sm:text-sm">
                Full Stack Developer focused on Front-end
              </p>
              <p className="mt-5 text-base leading-8 text-white/82 sm:text-lg">
                Desenvolvo experi&#234;ncias digitais com foco em interfaces de alto impacto,
                anima&#231;&#245;es refinadas e execu&#231;&#227;o visual de alta qualidade.
              </p>
            </div>
          </motion.div>
        </div>
        </div>
      </section>

      <section
        aria-labelledby="profile-heading"
        className="relative bg-[#050505] px-6 py-28 sm:px-8 lg:px-12 lg:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="grid gap-10 border-y border-white/[0.08] py-14 lg:grid-cols-[1fr_1.35fr] lg:items-end lg:py-20"
          >
            <div>
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.45em] text-white/40">
                Perfil profissional
              </p>
              <h2
                id="profile-heading"
                className="max-w-3xl text-4xl font-black uppercase tracking-[-0.075em] text-white sm:text-6xl lg:text-7xl"
              >
                Back-end s&#243;lido. Front-end que vira experi&#234;ncia.
              </h2>
            </div>

            <div className="lg:pb-2">
              <p className="max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
                Sou desenvolvedor full stack com foco forte em front-end. Crio
                interfaces de alta qualidade, experi&#234;ncias visuais imersivas,
                anima&#231;&#245;es refinadas e produtos que impressionam pela fluidez,
                execu&#231;&#227;o e aten&#231;&#227;o aos detalhes.
              </p>
              <p className="mt-8 text-xs font-medium uppercase tracking-[0.42em] text-white/35">
                Engenharia + sensibilidade visual
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.85, delay: 0.12, ease: "easeOut" }}
            className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
          >
            {profileHighlights.map((item) => (
              <article
                key={item.eyebrow}
                className="group relative min-h-[20rem] overflow-hidden rounded-[3.25rem] border border-white/[0.09] bg-[#050505] p-8 transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-[#090909]"
              >
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-white/15" />
                <div className="mb-16 flex items-center justify-between text-xs font-medium uppercase tracking-[0.34em] text-white/35">
                  <span>{item.eyebrow}</span>
                  <span className="h-px w-10 bg-white/18 transition-all duration-500 group-hover:w-16 group-hover:bg-white/40" />
                </div>
                <h3 className="text-2xl font-semibold leading-tight tracking-[-0.055em] text-white">
                  {item.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-white/58">
                  {item.description}
                </p>
              </article>
            ))}
          </motion.div>

          <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.08] pt-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>Uma ponte entre engenharia, interface e dire&#231;&#227;o visual.</p>
            <p className="uppercase tracking-[0.34em]">Projetos abaixo</p>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="relative z-20 flex w-full flex-col items-center bg-[#050505] px-6 pb-0 pt-24"
      >
        <motion.div
          className="max-w-4xl text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-sans text-4xl font-bold tracking-tighter text-white drop-shadow-xl md:text-6xl lg:text-7xl">
            conhe&#231;a meu <span className="text-[#A7EF9E]">trabalho</span>
          </h2>
        </motion.div>
      </section>

      <ZoomParallax lockThreshold={0.8} images={portfolioZoomImages} endBlend />

      <JourneyHorizontalSection />
      <ExperienceStackSection />
      <DestructionStackSection />
    </div>
  );
}
