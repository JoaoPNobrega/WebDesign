import { Suspense, lazy, type MouseEvent, type SVGProps, useEffect, useRef, useState } from "react";

import { AnimatePresence, LayoutGroup, animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Mail, X } from "lucide-react";
import DestructionSection from "@/components/DestructionSection";
import GlassSurface from "@/components/ui/GlassSurface";
import OrbitingSkills from "@/components/ui/orbiting-skills";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import ShinyText from "@/components/ui/ShinyText";
import TextType from "@/components/ui/TextType";
import { ZoomParallax, type ZoomMediaAsset } from "@/components/ui/zoom-parallax";

const Lanyard = lazy(() => import("@/components/Lanyard"));

const HERO_MORPH_SCROLL_DISTANCE = 860;
const FLOATING_NAV_SCROLL_OFFSET = 360;
const FLOATING_NAV_SCROLL_THRESHOLD = HERO_MORPH_SCROLL_DISTANCE + FLOATING_NAV_SCROLL_OFFSET;
const HERO_TEXT_EXIT_SCROLL_DELAY = 260;
const HERO_TEXT_EXIT_SCROLL_DISTANCE = 420;
const GITHUB_URL = "https://github.com/JoaoPNobrega";
const HERO_INTRO_TEXT = "Olá, me chamo João Pedro";
const HERO_DESCRIPTION_TEXT =
  "Crio sites que transformam identidade visual em presença digital. Do layout ao front-end, foco em páginas responsivas, claras e bem acabadas.";

function HeroIntroCopy() {
  const [hasTypedRole, setHasTypedRole] = useState(false);

  return (
    <div className="flex w-full max-w-2xl flex-col items-center text-center">
        <TextType
          as="p"
          text={HERO_INTRO_TEXT}
        typingSpeed={78}
        initialDelay={760}
        variableSpeed={{ min: 62, max: 118 }}
        loop={false}
          showCursor={false}
          cursorCharacter="_"
        cursorBlinkDuration={0.58}
        startOnVisible
        reserveSpace
        className="relative block min-h-16 w-full text-[2.6rem] font-medium normal-case leading-[0.94] tracking-[-0.075em] text-white drop-shadow-[0_18px_42px_rgba(0,0,0,0.52)] sm:text-[4.1rem] lg:min-h-24 lg:text-[5rem] xl:text-[5.45rem]"
        cursorClassName="text-white/48"
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      />
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.05, delay: 3.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-6 min-h-16 w-full text-center text-sm font-medium uppercase tracking-[0.24em] text-white/60 sm:text-base lg:min-h-24 lg:text-lg"
      >
        <TextType
          as="p"
          text="e eu sou Software Developer"
          typingSpeed={54}
          initialDelay={0}
          variableSpeed={{ min: 42, max: 84 }}
          loop={false}
          showCursor={false}
          cursorCharacter="_"
          cursorBlinkDuration={0.58}
          startOnVisible
          reserveSpace
          onSentenceComplete={() => setHasTypedRole(true)}
          className={`relative block w-full transition-opacity duration-500 ${
            hasTypedRole ? "opacity-0" : "opacity-100"
          }`}
          cursorClassName="text-white/48"
        />
        <motion.p
          aria-hidden={!hasTypedRole}
          initial={false}
          animate={{
            opacity: hasTypedRole ? 1 : 0,
            y: hasTypedRole ? 0 : 8,
            filter: hasTypedRole ? "blur(0px)" : "blur(8px)",
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-0 flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
        >
          <span>e eu sou</span>
          <ShinyText
            as="span"
            speed="2.05s"
            className="hero-role-shiny whitespace-nowrap text-2xl font-black tracking-[0.13em] drop-shadow-[0_0_34px_rgba(255,255,255,0.42)] sm:text-4xl lg:text-5xl"
          >
            Software Developer
          </ShinyText>
        </motion.p>
      </motion.div>
    </div>
  );
}

function HeroDescriptionCard() {
  const shouldReduceMotion = useReducedMotion();
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const smoothX = useSpring(magneticX, { stiffness: 170, damping: 22, mass: 0.55 });
  const smoothY = useSpring(magneticY, { stiffness: 170, damping: 22, mass: 0.55 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    magneticX.set(Math.max(-18, Math.min(18, offsetX * 0.06)));
    magneticY.set(Math.max(-18, Math.min(18, offsetY * 0.06)));
  };

  const handleMouseLeave = () => {
    magneticX.set(0);
    magneticY.set(0);
  };

  return (
    <LiquidGlassCard
      glowIntensity="sm"
      shadowIntensity="sm"
      borderRadius="2.6rem"
      blurIntensity="sm"
      className="hero-copy-glass flex min-h-[24rem] w-full max-w-[25rem] items-center px-7 py-10 text-center sm:min-h-[26rem] sm:px-9 sm:py-12 lg:min-h-[30rem] lg:px-10 lg:py-14"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
    >
      <div className="space-y-6">
        <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.32em] text-white/56">
          Web design + código
        </span>
        <p className="text-xl font-medium leading-9 text-white/94 drop-shadow-[0_3px_18px_rgba(0,0,0,0.6)] sm:text-2xl sm:leading-10 lg:text-[1.72rem] lg:leading-[3.1rem]">
          {HERO_DESCRIPTION_TEXT}
        </p>
      </div>
    </LiquidGlassCard>
  );
}

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

const navContactItems = [
  { label: "GitHub", icon: GithubMark, href: GITHUB_URL },
  { label: "LinkedIn", icon: LinkedinMark, href: "https://linkedin.com/in/joaopedro-nobrega" },
  { label: "Email", icon: Mail, href: "mailto:jpan@cesar.school" },
] as const;

const navProjectItems = [
  {
    title: "Dr Guilherme Maia",
    image: "/assets/dr-guilherme-preview.png",
    imageScale: "scale-[1.2] group-hover:scale-[1.28]",
    description: "Site desenvolvido para o urologista Dr. Guilherme Maia durante meu estágio na Web Star Studio. Uma landing page médica com foco em storytelling, atendimento ao público e simplicidade, fortalecendo a autoridade profissional.",
    partner: "Web Star Studio",
    href: "https://drguilhermemaia.com.br/",
  },
  {
    title: "FlyHigh",
    image: "/assets/flynotch.png",
    description: "App web mobile feito para gerenciar partidas e acompanhar estatísticas. Criei para ajudar no vôlei que jogo com meus primos, com inspiração no anime Haikyu!!.",
  },
  {
    title: "PetFeeder",
    image: "/assets/petfeeder-preview.webp",
    description: "Alimentador automático inteligente para pets, desenvolvido com ESP32, sensores e atuadores. O projeto integra um dashboard web em tempo real via Firebase, controle local por Access Point e API Gemini para sugerir rotinas de alimentação personalizadas.",
    href: "https://github.com/JoaoPNobrega/PetFeeder-Front",
    ctaLabel: "GitHub",
    partner: "CESAR School",
    partnerLogo: "/assets/cesar-school-logo.png",
    partnerLogoClassName: "h-5 w-auto object-contain sm:h-6",
  },
  {
    title: "Dr Daniel Pianetti",
    image: "/assets/daniel-notch.png",
    description: "Site desenvolvido para o urologista Dr. Daniel Pianetti durante meu estágio na Web Star Studio. A experiência combina logo animada, objeto 3D e uma narrativa visual voltada para cirurgia robótica, tecnologia e confiança.",
    partner: "Web Star Studio",
    href: "https://daniel.webstar.studio/",
  },
  {
    title: "Stephanie Bolsoni",
    image: "/assets/stephanie-bolsoni.png",
    imageScale: "scale-[1.2] group-hover:scale-[1.28]",
    description: "Site desenvolvido para a nutricionista Stephanie Bolsoni durante meu estágio na Web Star Studio. O projeto destaca avaliações em tempo real e uma presença internacional, com atendimento em Dublin e online.",
    partner: "Web Star Studio",
    href: "https://stephaniebolsoni.com/",
  },
] as const;

const portfolioZoomImages: ZoomMediaAsset[] = [
  {
    type: "image",
    src: "/assets/parallax-center-site.webp",
    fallbackSrc: "/assets/image.png",
    alt: "Center site preview",
  },
  {
    type: "image",
    src: "/assets/daniel-parallax.png",
    alt: "Preview do projeto Dr Daniel Pianetti",
  },
  {
    type: "image",
    src: "/assets/parallax-flyhigh.webp",
    fallbackSrc: "/assets/flyhigh.png",
    alt: "Left tall site preview",
  },
  {
    type: "image",
    src: "/assets/parallax-dr-guilherme-preview.webp",
    fallbackSrc: "/assets/dr-guilherme-preview.png",
    alt: "Preview do projeto Dr Guilherme Maia",
  },
  {
    type: "image",
    src: "/assets/parallax-delusional-preview.webp",
    fallbackSrc: "/assets/delusional-preview.jpg",
    alt: "Preview do projeto Delusional",
  },
  {
    type: "image",
    src: "/assets/parallax-stephanie-bolsoni.webp",
    fallbackSrc: "/assets/stephanie-bolsoni.png",
    alt: "Preview do projeto Stephanie Bolsoni",
  },
  {
    type: "image",
    src: "/assets/parallax-ouroverde-preview.webp",
    fallbackSrc: "/assets/ouroverde-preview.png",
    alt: "Preview do projeto Ouroverde",
    objectPosition: "top",
  },
];

function HeroEchoVisual() {
  return (
    <div className="relative h-full w-full overflow-visible">
      <div
        className="absolute left-1/2 top-1/2 h-screen w-screen origin-center overflow-hidden bg-[#050505] text-white"
        style={{ transform: "translate(-50%, -50%) scale(0.25)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-5 z-10 h-20 w-[96vw] max-w-[58rem] -translate-x-1/2 overflow-visible sm:top-6 lg:top-8"
        >
          <svg viewBox="0 0 460 392" preserveAspectRatio="none" className="h-full w-full overflow-visible">
            <path
              d="M0 0H92C111 0 123 22.79 131 72.93C140 132.22 145 196.05 148 259.87C152 341.86 164 382.85 182 382.85H278C296 382.85 308 341.86 312 259.87C315 196.05 320 132.22 329 72.93C337 22.79 349 0 368 0H460V0H0Z"
              fill="#050505"
            />
          </svg>
        </div>

        <div
          className="absolute inset-y-5 left-4 right-4 overflow-hidden border border-black/35 sm:inset-y-6 sm:left-6 sm:right-6 lg:inset-y-8 lg:left-10 lg:right-10"
          style={{
            borderTopLeftRadius: "3rem",
            borderTopRightRadius: "3rem",
            borderBottomLeftRadius: "3rem",
            borderBottomRightRadius: "3rem",
          }}
        >
          <img
            src="/portfolio/hero-risk-radar.png"
            alt="Hero do portfólio de João Pedro"
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(3,3,3,0.88)_0%,_rgba(3,3,3,0.55)_38%,_rgba(3,3,3,0.26)_62%,_rgba(3,3,3,0.6)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(5,5,5,0.1)_0%,_rgba(5,5,5,0)_28%,_rgba(5,5,5,0.12)_100%)]" />
          <div className="absolute left-6 top-6 z-10 font-mono text-[0.62rem] font-medium uppercase tracking-[0.3em] text-white/42 sm:left-8 sm:top-8">
            Meu portfólio
          </div>
          <div className="absolute right-6 top-6 z-10 text-right font-mono text-[0.62rem] font-medium uppercase tracking-[0.3em] text-white/38 sm:right-8 sm:top-8">
            Recife, Brasil
          </div>
        </div>

        <div className="absolute inset-x-4 bottom-5 h-40 bg-[linear-gradient(180deg,_rgba(5,5,5,0)_0%,_rgba(5,5,5,0.82)_100%)] sm:inset-x-6 sm:bottom-6 lg:inset-x-10 lg:bottom-8" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 pb-12 pt-28 sm:px-8 lg:px-12 lg:pb-16 lg:pt-36">
          <div className="w-full">
            <div className="grid w-full gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
              <div className="flex justify-center lg:-translate-x-24 xl:-translate-x-36">
                <HeroIntroCopy />
              </div>
              <div className="flex justify-center lg:translate-x-24 lg:justify-self-end xl:translate-x-36 2xl:translate-x-44">
                <HeroDescriptionCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    period: "Setembro \u2014 Dezembro 2025",
    description:
      "Desenvolvimento de software, automa\u00e7\u00f5es N8N e planilhas VBA.",
  },
  {
    role: "Desenvolvedor full stack",
    company: "Web Star Studio \u00b7 Est\u00e1gio",
    period: "Fevereiro 2026 \u2014 Hoje",
    description:
      "Desenvolvimento e manuten\u00e7\u00e3o de sites, com foco em \nlayouts responsivos, front-end e identidade visual.",
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
  const [isLanyardRequested, setIsLanyardRequested] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isJourneyNearViewport = useInView(sectionRef, { margin: "700px 0px" });
  const isJourneyVisible = useInView(sectionRef, { amount: 0.04 });
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
  const shouldRenderLanyard = isLanyardRequested && isJourneyNearViewport && isJourneyVisible;

  useEffect(() => {
    if (!isJourneyVisible) {
      setIsLanyardRequested(false);
    }
  }, [isJourneyVisible]);

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
                    Eu construo sites com presença, clareza e acabamento.
                  </h2>
                  <p className="mt-8 text-base leading-8 text-white/68 sm:text-lg">
                    Sou desenvolvedor de software com foco em experiências web. Hoje atuo no desenvolvimento
                    e manutenção de sites, criando páginas responsivas, ajustando front-end e traduzindo
                    identidade visual em interfaces claras, funcionais e bem acabadas.
                  </p>
                  <p className="mt-6 text-sm leading-7 text-white/48 sm:text-base">
                    Gosto de unir código, direção visual e senso de produto para entregar páginas que funcionam,
                    comunicam bem e passam confiança desde o primeiro contato.
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
              <AnimatePresence mode="wait">
                {shouldRenderLanyard ? (
                  <motion.div
                    key="lanyard-canvas"
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Suspense fallback={null}>
                      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} performanceMode />
                    </Suspense>
                  </motion.div>
                ) : (
                  <motion.button
                    key="lanyard-trigger"
                    type="button"
                    onClick={() => setIsLanyardRequested(true)}
                    className="pointer-events-auto relative z-20 inline-flex cursor-pointer items-center justify-center rounded-full border border-white/12 bg-white/[0.06] px-6 py-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-white/72 shadow-[0_22px_90px_rgba(0,0,0,0.42),0_0_48px_rgba(249,115,22,0.18)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[#F97316]/55 hover:bg-white/[0.11] hover:text-white hover:shadow-[0_22px_90px_rgba(0,0,0,0.42),0_0_68px_rgba(249,115,22,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/65"
                    initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                    transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Ver crach&#225; 3D
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              style={{ opacity: graduationOpacity }}
              className="pointer-events-none relative z-10 mx-auto grid h-full max-w-7xl gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center"
            >
              <motion.div
                style={{ y: graduationLeftY }}
                className="pointer-events-none relative mx-auto flex w-full max-w-[26rem] flex-col items-start lg:mx-0 lg:-translate-x-16 xl:-translate-x-28 2xl:-translate-x-36"
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
                className="pointer-events-none relative z-10 flex flex-col items-center gap-6 lg:translate-x-16 xl:translate-x-28 2xl:translate-x-36"
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
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.48em] text-white/36">
              Linha do tempo
            </p>
            <h2
              id="experience-heading"
              className="max-w-4xl text-6xl font-black uppercase leading-[0.9] tracking-[-0.085em] text-white sm:text-8xl lg:text-[7rem]"
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
              className="absolute right-[calc(50%+14.5rem)] top-[20%] max-w-[24rem] text-center"
            >
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-white/55">
                {experienceHighlights[0].company}
              </p>
              <h3 className="mt-3 text-2xl font-black uppercase leading-[0.96] tracking-[-0.065em] text-white lg:text-[2.15rem]">
                {experienceHighlights[0].role}
              </h3>
              <p className="mx-auto mt-4 inline-flex rounded-full border border-white/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/42">
                {experienceHighlights[0].period}
              </p>
              <p className="mx-auto mt-5 max-w-[20rem] text-base leading-7 text-white/52">
                {experienceHighlights[0].description}
              </p>
            </motion.article>

            <motion.article
              style={{ opacity: secondItemOpacity, x: secondItemX }}
              className="absolute left-[calc(50%+14.5rem)] top-[60%] max-w-[24rem] text-center"
            >
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-white/55">
                {experienceHighlights[1].company}
              </p>
              <h3 className="mt-3 text-2xl font-black uppercase leading-[0.96] tracking-[-0.065em] text-white lg:text-[2.15rem]">
                {experienceHighlights[1].role}
              </h3>
              <p className="mx-auto mt-4 inline-flex rounded-full border border-white/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/42">
                {experienceHighlights[1].period}
              </p>
              <p className="mx-auto mt-5 max-w-[21rem] whitespace-pre-line text-base leading-7 text-white/52">
                {experienceHighlights[1].description}
              </p>
            </motion.article>
          </div>

          <div className="mt-10 grid gap-4 md:hidden">
            {experienceHighlights.map((item) => (
              <article key={item.company} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/42">
                  {item.company}
                </p>
                <h3 className="mt-3 text-3xl font-black uppercase leading-[0.95] tracking-[-0.065em] text-white">
                  {item.role}
                </h3>
                <p className="mt-4 inline-flex rounded-full border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {item.period}
                </p>
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
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string | null>(null);
  const [projectsScrollEdges, setProjectsScrollEdges] = useState({ left: false, right: true });
  const heroRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const projectsScrollerRef = useRef<HTMLDivElement | null>(null);
  const contactEasterEggClicksRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const notchProgressRef = useRef(0);
  const autoMorphControlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const shouldReduceHeroTextMotion = useReducedMotion();
  const heroTextExitProgress = useMotionValue(0);
  const heroTextExitY = useTransform(heroTextExitProgress, [0, 1], shouldReduceHeroTextMotion ? [0, 0] : [0, -220]);
  const heroTextExitOpacity = useTransform(heroTextExitProgress, [0, 1], shouldReduceHeroTextMotion ? [1, 1] : [1, 0.04]);
  const heroTextExitBlur = useTransform(heroTextExitProgress, [0, 1], shouldReduceHeroTextMotion ? ["blur(0px)", "blur(0px)"] : ["blur(0px)", "blur(20px)"]);

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
      const textExitProgress = shouldReduceHeroTextMotion
        ? 0
        : Math.min(Math.max((heroScroll - FLOATING_NAV_SCROLL_THRESHOLD - HERO_TEXT_EXIT_SCROLL_DELAY) / HERO_TEXT_EXIT_SCROLL_DISTANCE, 0), 1);
      const isScrollingUp = scrollY < lastScrollYRef.current;

      heroTextExitProgress.set(textExitProgress);

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

  useEffect(() => {
    if (!isContactDropdownOpen && !isProjectsDropdownOpen && !selectedProjectTitle) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setIsContactDropdownOpen(false);
        setIsProjectsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedProjectTitle) {
          setSelectedProjectTitle(null);
        } else {
          setIsContactDropdownOpen(false);
          setIsProjectsDropdownOpen(false);
        }
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isContactDropdownOpen, isProjectsDropdownOpen, selectedProjectTitle]);

  useEffect(() => {
    if (!selectedProjectTitle) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProjectTitle]);

  useEffect(() => {
    const scroller = projectsScrollerRef.current;

    if (!isProjectsDropdownOpen || !scroller) {
      setProjectsScrollEdges({ left: false, right: true });
      return;
    }

    const updateProjectsScrollEdges = () => {
      const maxScrollLeft = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
      const nextEdges = {
        left: scroller.scrollLeft > 2,
        right: maxScrollLeft > 2 && scroller.scrollLeft < maxScrollLeft - 2,
      };

      setProjectsScrollEdges((currentEdges) =>
        currentEdges.left === nextEdges.left && currentEdges.right === nextEdges.right ? currentEdges : nextEdges,
      );
    };

    let scrollAnimationControls: ReturnType<typeof animate> | null = null;
    let targetScrollLeft = scroller.scrollLeft;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      const maxScrollLeft = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
      targetScrollLeft = Math.min(Math.max(targetScrollLeft + delta, 0), maxScrollLeft);
      scrollAnimationControls?.stop();
      scrollAnimationControls = animate(scroller.scrollLeft, targetScrollLeft, {
        duration: 0.34,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (value) => {
          scroller.scrollLeft = value;
        },
      });
    };

    const frameId = window.requestAnimationFrame(updateProjectsScrollEdges);
    updateProjectsScrollEdges();

    scroller.addEventListener("wheel", handleWheel, { passive: false });
    scroller.addEventListener("scroll", updateProjectsScrollEdges, { passive: true });
    window.addEventListener("resize", updateProjectsScrollEdges);

    return () => {
      scrollAnimationControls?.stop();
      window.cancelAnimationFrame(frameId);
      scroller.removeEventListener("wheel", handleWheel);
      scroller.removeEventListener("scroll", updateProjectsScrollEdges);
      window.removeEventListener("resize", updateProjectsScrollEdges);
    };
  }, [isProjectsDropdownOpen]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const openPage67EasterEgg = () => {
    window.history.pushState(null, "", "/67");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const selectedProject = navProjectItems.find((item) => item.title === selectedProjectTitle);
  const selectedProjectHref = selectedProject && "href" in selectedProject ? selectedProject.href : GITHUB_URL;
  const selectedProjectCtaLabel = selectedProject && "ctaLabel" in selectedProject ? selectedProject.ctaLabel : selectedProject && "href" in selectedProject ? "Ver site" : "GitHub";
  const selectedProjectPartner = selectedProject && "partner" in selectedProject ? selectedProject.partner : null;
  const selectedProjectPartnerLogo = selectedProject && "partnerLogo" in selectedProject ? selectedProject.partnerLogo : "/assets/webstar-logo-white.png";
  const selectedProjectPartnerLogoClassName =
    selectedProject && "partnerLogoClassName" in selectedProject
      ? selectedProject.partnerLogoClassName
      : "h-8 w-auto object-contain [filter:brightness(1.28)_contrast(1.25)_drop-shadow(0_0_10px_rgba(255,255,255,0.18))] sm:h-9";
  const projectsCarouselMaskImage = `linear-gradient(90deg, ${
    projectsScrollEdges.left ? "transparent 0%, black 7%" : "black 0%, black 7%"
  }, black 93%, ${projectsScrollEdges.right ? "transparent 100%" : "black 100%"})`;

  const isHeroContactDropdownOpen = isContactDropdownOpen && !isNavDetached;
  const isHeroProjectsDropdownOpen = isProjectsDropdownOpen && !isNavDetached;
  const notchDepth = 1 - notchProgress;
  const isHeroDropdownOpen = isHeroContactDropdownOpen || isHeroProjectsDropdownOpen;
  const visibleNotchDepth = isHeroDropdownOpen ? 1 : notchDepth;
  const notchDropdownExtraDepth = isHeroProjectsDropdownOpen ? 308 : isHeroContactDropdownOpen ? 54 : 0;
  const notchSourceHeight = isHeroContactDropdownOpen ? 142 : 86;
  const scaleNotchY = (value: number, sourceHeight: number) => ((value / sourceHeight) * 392).toFixed(2);
  const notchYValue = (value: number) => value * visibleNotchDepth + (value / 84) * notchDropdownExtraDepth;
  const projectNotchYValue = (value: number) => value * visibleNotchDepth + (value / 70) * 256;
  const notchY = (value: number) => scaleNotchY(notchYValue(value), notchSourceHeight);
  const projectNotchY = (value: number) => scaleNotchY(projectNotchYValue(value), 392);
  const notchPath = isHeroProjectsDropdownOpen
    ? `M0 0H6C38 0 62 ${projectNotchY(2)} 82 ${projectNotchY(8)}C101 ${projectNotchY(14)} 114 ${projectNotchY(28)} 126 ${projectNotchY(46)}C138 ${projectNotchY(63)} 154 ${projectNotchY(70)} 178 ${projectNotchY(70)}H282C306 ${projectNotchY(70)} 322 ${projectNotchY(63)} 334 ${projectNotchY(46)}C346 ${projectNotchY(28)} 359 ${projectNotchY(14)} 378 ${projectNotchY(8)}C398 ${projectNotchY(2)} 422 0 454 0H460V0H0Z`
    : `M0 0H92C111 0 123 ${notchY(5)} 131 ${notchY(16)}C140 ${notchY(29)} 145 ${notchY(43)} 148 ${notchY(57)}C152 ${notchY(75)} 164 ${notchY(84)} 182 ${notchY(84)}H278C296 ${notchY(84)} 308 ${notchY(75)} 312 ${notchY(57)}C315 ${notchY(43)} 320 ${notchY(29)} 329 ${notchY(16)}C337 ${notchY(5)} 349 0 368 0H460V0H0Z`;
  const notchVisualHeight = isHeroProjectsDropdownOpen ? "23.8rem" : isHeroContactDropdownOpen ? "7.35rem" : "5rem";
  const notchVisualWidth = isHeroProjectsDropdownOpen ? "142vw" : isHeroContactDropdownOpen ? "94vw" : "96vw";
  const notchVisualMaxWidth = isHeroProjectsDropdownOpen ? "112rem" : isHeroContactDropdownOpen ? "52rem" : "58rem";
  const navExitProgress = Math.min(Math.max((notchProgress - 0.04) / 0.42, 0), 1);
  const shouldKeepNavTextVisible = isNavDetached || isHeroDropdownOpen;
  const navTextOpacity = shouldKeepNavTextVisible ? "1" : (1 - navExitProgress).toFixed(2);
  const navTextTranslateY = shouldKeepNavTextVisible ? "0" : (-18 * navExitProgress).toFixed(2);
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
        <div className="sticky top-0 z-[200] h-screen overflow-visible">
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ height: notchVisualHeight, maxWidth: notchVisualMaxWidth, width: notchVisualWidth }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute left-1/2 top-5 z-10 -translate-x-1/2 overflow-visible sm:top-6 lg:top-8"
        >
          <svg
            viewBox="0 0 460 392"
            preserveAspectRatio="none"
            className="h-full w-full overflow-visible"
          >
            <motion.path
              initial={false}
              animate={{ d: notchPath }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              fill="#050505"
            />
          </svg>
        </motion.div>

        <div
          ref={navRef}
          className={`left-1/2 w-fit -translate-x-1/2 transition-[top] duration-500 ${
            isNavDetached ? "fixed top-5 z-[999]" : "absolute top-[1.82rem] z-30 sm:top-[2.14rem] lg:top-[2.62rem]"
          }`}
        >
          <LayoutGroup id="hero-notch-nav">
          <motion.nav
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ layout: { duration: 0.46, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.7, ease: "easeOut", delay: 0.15 }, y: { duration: 0.7, ease: "easeOut", delay: 0.15 } }}
            className={`flex flex-col items-center justify-center rounded-[1.65rem] transition-[background-color,border-color,box-shadow,padding] duration-500 ${
              isNavDetached
                ? "border border-white/10 bg-black px-2 py-2 shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
                : "border border-transparent bg-transparent px-0 py-0 shadow-none"
            }`}
          >
            <motion.div layout className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsContactDropdownOpen(false);
                  setIsProjectsDropdownOpen((current) => !current);
                }}
                aria-expanded={isProjectsDropdownOpen}
                className={`relative cursor-pointer rounded-full px-5 py-1 text-[1rem] font-medium uppercase tracking-[0.28em] drop-shadow-[0_0_8px_rgba(255,255,255,0.16)] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                  isProjectsDropdownOpen ? "text-white" : "text-white/90 hover:text-white"
                }`}
                style={{ opacity: navTextOpacity, transform: `translateY(${navTextTranslateY}px)` }}
              >
                <AnimatePresence>
                  {isProjectsDropdownOpen ? (
                    <motion.span
                      layoutId="hero-nav-active-glass"
                      className="pointer-events-none absolute inset-0"
                      initial={{ opacity: 0, scale: 0.86 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        layout: { duration: 0.24, ease: [0.32, 0.72, 0, 1] },
                        opacity: { duration: 0.22, ease: "easeOut" },
                        scale: { duration: 0.22, ease: "easeOut" },
                      }}
                    >
                      <GlassSurface
                        width="100%"
                        height="100%"
                        borderRadius={999}
                        borderWidth={0.12}
                        brightness={70}
                        opacity={0.88}
                        blur={8}
                        displace={0.45}
                        backgroundOpacity={0.08}
                        saturation={1.25}
                        distortionScale={-92}
                        mixBlendMode="screen"
                        className="h-full w-full"
                      />
                    </motion.span>
                  ) : null}
                </AnimatePresence>
                <span className="relative z-10">Projetos</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  contactEasterEggClicksRef.current += 1;
                  if (contactEasterEggClicksRef.current >= 5) {
                    contactEasterEggClicksRef.current = 0;
                    setIsProjectsDropdownOpen(false);
                    setIsContactDropdownOpen(false);
                    openPage67EasterEgg();
                    return;
                  }

                  setIsProjectsDropdownOpen(false);
                  setIsContactDropdownOpen((current) => !current);
                }}
                aria-expanded={isContactDropdownOpen}
                className={`relative cursor-pointer rounded-full px-5 py-1 text-[1rem] font-medium uppercase tracking-[0.28em] drop-shadow-[0_0_8px_rgba(255,255,255,0.16)] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                  isContactDropdownOpen ? "text-white" : "text-white/90 hover:text-white"
                }`}
                style={{ opacity: navTextOpacity, transform: `translateY(${navTextTranslateY}px)` }}
              >
                <AnimatePresence>
                  {isContactDropdownOpen ? (
                    <motion.span
                      layoutId="hero-nav-active-glass"
                      className="pointer-events-none absolute inset-0"
                      initial={{ opacity: 0, scale: 0.86 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        layout: { duration: 0.24, ease: [0.32, 0.72, 0, 1] },
                        opacity: { duration: 0.22, ease: "easeOut" },
                        scale: { duration: 0.22, ease: "easeOut" },
                      }}
                    >
                      <GlassSurface
                        width="100%"
                        height="100%"
                        borderRadius={999}
                        borderWidth={0.12}
                        brightness={70}
                        opacity={0.88}
                        blur={8}
                        displace={0.45}
                        backgroundOpacity={0.08}
                        saturation={1.25}
                        distortionScale={-92}
                        mixBlendMode="screen"
                        className="h-full w-full"
                      />
                    </motion.span>
                  ) : null}
                </AnimatePresence>
                <span className="relative z-10">Contato</span>
              </button>
            </motion.div>

            <AnimatePresence>
              {isProjectsDropdownOpen ? (
                <motion.div
                  layout
                  key="projects-dropdown"
                  initial={{
                    height: 0,
                    width: isNavDetached ? "18.5rem" : "auto",
                    opacity: 0,
                    y: -10,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    height: "auto",
                    width: isNavDetached ? "40rem" : "auto",
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    height: 0,
                    width: isNavDetached ? "18.5rem" : "auto",
                    opacity: 0,
                    y: -8,
                    filter: "blur(10px)",
                  }}
                  transition={{
                    height: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
                    width: { duration: 0.34, ease: [0.32, 0.72, 0, 1] },
                    opacity: { duration: 0.26, ease: "easeOut" },
                    y: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                    filter: { duration: 0.34, ease: "easeOut" },
                  }}
                  style={{ maxWidth: isNavDetached ? "82vw" : undefined }}
                  className="overflow-hidden"
                >
                  <div
                    ref={projectsScrollerRef}
                    className={`w-[min(82vw,40rem)] overflow-x-auto overflow-y-hidden overscroll-x-contain pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                      isHeroProjectsDropdownOpen ? "mt-2" : "mt-2 border-t border-white/10"
                    }`}
                    style={{
                      WebkitMaskImage: projectsCarouselMaskImage,
                      maskImage: projectsCarouselMaskImage,
                    }}
                  >
                    <div className="flex w-max gap-2.5 pr-2">
                      {navProjectItems.map((item, index) => (
                        <motion.article
                          key={item.title}
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.96, y: -8 }}
                          transition={{ duration: 0.34, delay: index * 0.045, ease: "easeOut" }}
                          className="group relative w-[calc((min(82vw,40rem)-0.625rem)/2)] flex-none overflow-hidden rounded-[1.15rem] border border-white/10 bg-white/[0.045] p-2 text-left shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition duration-300 hover:border-white/20 hover:bg-white/[0.075]"
                        >
                          <div className="h-28 overflow-hidden rounded-[0.85rem] bg-white/[0.04] sm:h-32">
                            <img
                              src={item.image}
                              alt={`Preview do projeto ${item.title}`}
                              className={`h-full w-full object-cover transition duration-500 ${
                                "imageScale" in item ? item.imageScale : "scale-110 group-hover:scale-[1.18]"
                              }`}
                              loading="lazy"
                            />
                          </div>
                          <div className="mt-2.5 flex items-center justify-between gap-3">
                            <h3 className="min-w-0 truncate text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-white/74">
                              {item.title}
                            </h3>
                            <button
                              type="button"
                              onClick={() => setSelectedProjectTitle(item.title)}
                              className="shrink-0 rounded-full border border-white/12 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/62 transition hover:border-[#A7EF9E]/45 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/60"
                            >
                              Ver
                            </button>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : null}

              {isContactDropdownOpen ? (
                <motion.div
                  layout
                  key="contact-dropdown"
                  initial={{ height: 0, opacity: 0, y: -8, filter: "blur(8px)" }}
                  animate={{ height: "auto", opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ height: 0, opacity: 0, y: -6, filter: "blur(8px)" }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className={`flex items-center justify-center gap-2 ${
                      isHeroContactDropdownOpen ? "mt-3 pt-0" : "mt-2 border-t border-white/10 pt-2"
                    }`}
                  >
                    {navContactItems.map((item, index) => {
                      const Icon = item.icon;
                      const className =
                        "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-[1rem] border border-white/10 bg-white/[0.055] text-white/62 transition duration-300 hover:-translate-y-0.5 hover:border-[#A7EF9E]/45 hover:bg-white/[0.105] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/60";

                      return (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, scale: 0.84, y: -6 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.88, y: -4 }}
                          transition={{ duration: 0.28, delay: index * 0.06, ease: "easeOut" }}
                        >
                          {"href" in item ? (
                            <a
                              href={item.href}
                              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                              rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                              aria-label={item.label}
                              className={className}
                            >
                              <Icon className="h-5 w-5" aria-hidden="true" />
                            </a>
                          ) : (
                            <button type="button" aria-label={item.label} className={className}>
                              <Icon className="h-5 w-5" aria-hidden="true" />
                            </button>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.nav>
          </LayoutGroup>
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
            src="/portfolio/hero-risk-radar.png"
            alt="Hero do portf&#243;lio de Jo&#227;o Pedro"
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{
              WebkitMaskImage: heroImageMask,
              maskImage: heroImageMask,
            }}
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(3,3,3,0.88)_0%,_rgba(3,3,3,0.55)_38%,_rgba(3,3,3,0.26)_62%,_rgba(3,3,3,0.6)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(5,5,5,0.1)_0%,_rgba(5,5,5,0)_28%,_rgba(5,5,5,0.12)_100%)]" />
          <div className="absolute left-6 top-6 z-10 font-mono text-[0.62rem] font-medium uppercase tracking-[0.3em] text-white/42 sm:left-8 sm:top-8">
            Meu portfólio
          </div>
          <div className="absolute right-6 top-6 z-10 text-right font-mono text-[0.62rem] font-medium uppercase tracking-[0.3em] text-white/38 sm:right-8 sm:top-8">
            Recife, Brasil
          </div>
        </div>

        <div className="absolute inset-x-4 bottom-5 h-40 bg-[linear-gradient(180deg,_rgba(5,5,5,0)_0%,_rgba(5,5,5,0.82)_100%)] sm:inset-x-6 sm:bottom-6 lg:inset-x-10 lg:bottom-8" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 pb-12 pt-28 sm:px-8 lg:px-12 lg:pb-16 lg:pt-36">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full"
          >
            <motion.div
              style={{
                y: heroTextExitY,
                opacity: heroTextExitOpacity,
                filter: heroTextExitBlur,
                willChange: "transform, opacity, filter",
              }}
              className="grid w-full gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center"
            >
            <div className="flex justify-center lg:-translate-x-24 xl:-translate-x-36">
              <HeroIntroCopy />
            </div>
            <div className="flex justify-center lg:translate-x-24 lg:justify-self-end xl:translate-x-36 2xl:translate-x-44">
              <HeroDescriptionCard />
            </div>
          </motion.div>
          </motion.div>
        </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            key="project-preview-modal"
            className="fixed inset-0 z-[1400] flex items-center justify-center px-5 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-preview-title"
            onClick={() => setSelectedProjectTitle(null)}
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-black/78 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.article
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[2.4rem] border border-white/12 bg-[#080808]/96 p-3 shadow-[0_40px_160px_rgba(0,0,0,0.72)]"
              initial={{ opacity: 0, y: 34, scale: 0.96, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 24, scale: 0.97, filter: "blur(12px)" }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Fechar preview do projeto"
                onClick={() => setSelectedProjectTitle(null)}
                className="absolute right-5 top-5 z-20 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/12 bg-black/60 text-white/62 transition hover:border-white/24 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="overflow-hidden rounded-[1.9rem] bg-white/[0.035]">
                <img
                  src={selectedProject.image}
                  alt={`Preview ampliado do projeto ${selectedProject.title}`}
                  className={`h-[18rem] w-full object-center sm:h-[24rem] lg:h-[28rem] ${
                    "object-cover"
                  }`}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="grid gap-7 px-4 pb-6 pt-7 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end lg:px-7">
                <div>
                  <p className="mb-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/36">
                    Projeto selecionado
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2
                      id="project-preview-title"
                      className="text-3xl font-black uppercase leading-[0.92] tracking-[-0.075em] text-white sm:text-5xl"
                    >
                      {selectedProject.title}
                    </h2>
                    {selectedProjectPartner ? (
                    <div className="group relative inline-flex">
                      <div
                        className="inline-flex cursor-help items-center rounded-full border border-white/20 bg-black/55 px-4 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_16px_45px_rgba(0,0,0,0.36)] transition duration-300 hover:border-[#A7EF9E]/45 hover:bg-black/70"
                        aria-label={`Projeto em parceria com ${selectedProjectPartner}`}
                      >
                        <img
                          src={selectedProjectPartnerLogo}
                          alt=""
                          aria-hidden="true"
                          className={selectedProjectPartnerLogoClassName}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="pointer-events-none absolute bottom-[calc(100%+0.65rem)] left-1/2 w-max -translate-x-1/2 rounded-full border border-white/10 bg-black/90 px-3 py-1.5 text-[0.68rem] font-medium text-white/72 opacity-0 shadow-[0_16px_50px_rgba(0,0,0,0.42)] transition duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
                        Parceria com {selectedProjectPartner}
                      </div>
                    </div>
                    ) : null}
                  </div>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-white/56 sm:text-lg sm:leading-8">
                    {selectedProject.description}
                  </p>
                </div>

                <a
                  href={selectedProjectHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-[3.25rem] cursor-pointer items-center justify-center gap-2 rounded-full border border-white/14 bg-white text-sm font-black uppercase tracking-[0.22em] text-black transition hover:-translate-y-0.5 hover:bg-[#A7EF9E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/70 lg:min-w-44"
                >
                  {selectedProjectCtaLabel === "GitHub" ? (
                    <GithubMark className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  )}
                  {selectedProjectCtaLabel}
                </a>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>

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

      <ZoomParallax lockThreshold={0.8} images={portfolioZoomImages} centerVisual={<HeroEchoVisual />} endBlend />

      <JourneyHorizontalSection />
      <ExperienceStackSection />
      <DestructionStackSection />
    </div>
  );
}
