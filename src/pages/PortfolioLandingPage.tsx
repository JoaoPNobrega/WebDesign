import { type SVGProps, useEffect, useRef, useState } from "react";

import { AnimatePresence, LayoutGroup, animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { Mail } from "lucide-react";
import DestructionSection from "@/components/DestructionSection";
import SkillsSection from "@/components/SkillsSection";
import BlurText from "@/components/ui/BlurText";
import CvButton from "@/components/ui/CvButton";
import CvModal from "@/components/ui/CvModal";
import ProjectDetailModal from "@/components/ui/ProjectDetailModal";
import GlassSurface from "@/components/ui/GlassSurface";
import ShinyText from "@/components/ui/ShinyText";
import TextType from "@/components/ui/TextType";
import { ZoomParallax, type ZoomMediaAsset } from "@/components/ui/zoom-parallax";
import { useLang, type LocalizedText } from "@/lib/i18n";
import { copy } from "@/lib/portfolio-copy";

const HERO_MORPH_SCROLL_DISTANCE = 860;
const FLOATING_NAV_SCROLL_OFFSET = 360;
const FLOATING_NAV_SCROLL_THRESHOLD = HERO_MORPH_SCROLL_DISTANCE + FLOATING_NAV_SCROLL_OFFSET;
const HERO_TEXT_EXIT_SCROLL_DELAY = 260;
const HERO_TEXT_EXIT_SCROLL_DISTANCE = 420;
const GITHUB_URL = "https://github.com/JoaoPNobrega";
const CV_PDF_URL = "/curriculo-joao-pedro.pdf";
const CV_DOWNLOAD_NAME = "Curriculo_Joao_Pedro.pdf";

function HeroIntroCopy({ onOpenCv }: { onOpenCv?: () => void }) {
  const { lang, tx } = useLang();
  const [hasTypedRole, setHasTypedRole] = useState(false);

  useEffect(() => {
    setHasTypedRole(false);
  }, [lang]);

  return (
    <div className="flex w-full max-w-2xl flex-col items-center text-center">
        <TextType
          key={`intro-${lang}`}
          as="p"
          text={tx(copy.hero.intro)}
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
          key={`role-${lang}`}
          as="p"
          text={tx(copy.hero.roleTyped)}
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
          <span>{tx(copy.hero.rolePrefix)}</span>
          <ShinyText
            as="span"
            speed="2.05s"
            className="hero-role-shiny whitespace-nowrap text-2xl font-black tracking-[0.13em] drop-shadow-[0_0_34px_rgba(255,255,255,0.42)] sm:text-4xl lg:text-5xl"
          >
            {tx(copy.hero.roleTitle)}
          </ShinyText>
        </motion.p>
      </motion.div>

      {onOpenCv ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-28 flex w-full translate-y-8 justify-center sm:mt-32 lg:mt-36"
        >
          <CvButton label={tx(copy.hero.resumeCta)} onClick={onOpenCv} />
        </motion.div>
      ) : null}
    </div>
  );
}

function HeroDescriptionPanel() {
  const { tx } = useLang();

  return (
    <div className="flex w-full max-w-[32rem] flex-col items-start text-left">
      <span className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-white/48">
        {tx(copy.hero.eyebrow)}
      </span>
      <div className="mt-5 h-px w-24 bg-white/16" />
      <h2 className="mt-7 max-w-[12ch] text-[2.25rem] font-semibold leading-[0.92] tracking-[-0.085em] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.34)] sm:text-[2.9rem] lg:text-[3.9rem]">
        {tx(copy.hero.panelTitle)}
      </h2>
      <p className="mt-6 max-w-[29rem] text-lg leading-8 text-white/72 sm:text-xl sm:leading-9 lg:text-[1.12rem] lg:leading-9">
        {tx(copy.hero.panelBody)}
      </p>
    </div>
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
    description: {
      "pt-BR": "Site desenvolvido para o urologista Dr. Guilherme Maia durante meu estágio na Web Star Studio. Uma landing page médica com foco em storytelling, atendimento ao público e simplicidade, fortalecendo a autoridade profissional.",
      "en-US": "Website built for urologist Dr. Guilherme Maia during my internship at Web Star Studio. A medical landing page focused on storytelling, patient care and simplicity, reinforcing professional authority.",
    },
    partner: "Web Star Studio",
    href: "https://drguilhermemaia.com.br/",
  },
  {
    title: "FlyHigh",
    image: "/assets/flynotch.png",
    description: {
      "pt-BR": "App web mobile feito para gerenciar partidas e acompanhar estatísticas. Criei para ajudar no vôlei que jogo com meus primos, com inspiração no anime Haikyu!!.",
      "en-US": "A mobile web app to manage matches and track statistics. I built it for the volleyball games I play with my cousins, inspired by the anime Haikyu!!.",
    },
  },
  {
    title: "PetFeeder",
    image: "/assets/petfeeder-preview.webp",
    description: {
      "pt-BR": "Alimentador automático inteligente para pets, desenvolvido com ESP32, sensores e atuadores. O projeto integra um dashboard web em tempo real via Firebase, controle local por Access Point e API Gemini para sugerir rotinas de alimentação personalizadas.",
      "en-US": "A smart automatic pet feeder built with ESP32, sensors and actuators. The project integrates a real-time web dashboard via Firebase, local control through an Access Point and the Gemini API to suggest personalized feeding routines.",
    },
    href: "https://github.com/JoaoPNobrega/PetFeeder-Front",
    ctaLabel: "GitHub",
    partner: "CESAR School",
    partnerLogo: "/assets/cesar-school-logo.png",
    partnerLogoClassName: "h-5 w-auto object-contain sm:h-6",
  },
  {
    title: "Dr Daniel Pianetti",
    image: "/assets/daniel-notch.png",
    description: {
      "pt-BR": "Site desenvolvido para o urologista Dr. Daniel Pianetti durante meu estágio na Web Star Studio. A experiência combina logo animada, objeto 3D e uma narrativa visual voltada para cirurgia robótica, tecnologia e confiança.",
      "en-US": "Website built for urologist Dr. Daniel Pianetti during my internship at Web Star Studio. The experience combines an animated logo, a 3D object and a visual narrative centered on robotic surgery, technology and trust.",
    },
    partner: "Web Star Studio",
    href: "https://daniel.webstar.studio/",
  },
  {
    title: "Stephanie Bolsoni",
    image: "/assets/stephanie-bolsoni.png",
    imageScale: "scale-[1.2] group-hover:scale-[1.28]",
    description: {
      "pt-BR": "Site desenvolvido para a nutricionista Stephanie Bolsoni durante meu estágio na Web Star Studio. O projeto destaca avaliações em tempo real e uma presença internacional, com atendimento em Dublin e online.",
      "en-US": "Website built for nutritionist Stephanie Bolsoni during my internship at Web Star Studio. The project highlights real-time reviews and an international presence, with appointments in Dublin and online.",
    },
    partner: "Web Star Studio",
    href: "https://stephaniebolsoni.com/",
  },
  {
    title: "Izi Solutions",
    image: "/assets/izi-solutions-preview.png",
    description: {
      "pt-BR": "Site desenvolvido para a Izi Solutions durante meu estágio na Web Star Studio. A landing page apresenta serviços de limpeza em São Paulo com uma experiência objetiva, moderna e voltada para conversão.",
      "en-US": "Website built for Izi Solutions during my internship at Web Star Studio. The landing page presents cleaning services in São Paulo with an objective, modern and conversion-focused experience.",
    },
    partner: "Web Star Studio",
    href: "https://izisolutions.com.br/",
  },
  {
    title: "Ines Knoden",
    image: "/assets/ines-preview.png",
    description: {
      "pt-BR": "Site desenvolvido para a coach Inês Knoden durante meu estágio na Web Star Studio. O projeto comunica acolhimento, carreira e bem-estar para mulheres, com uma identidade visual elegante e internacional.",
      "en-US": "Website built for coach Inês Knoden during my internship at Web Star Studio. The project conveys warmth, career and well-being for women, with an elegant, international visual identity.",
    },
    partner: "Web Star Studio",
    href: "https://ines.webstarstudio.site/",
  },
  {
    title: "Dr Dimas Antunes",
    image: "/assets/dimas-preview.png",
    description: {
      "pt-BR": "Site desenvolvido para o urologista Dr. Dimas Antunes durante meu estágio na Web Star Studio. A experiência reforça autoridade médica, cuidado e clareza para pacientes em Recife.",
      "en-US": "Website built for urologist Dr. Dimas Antunes during my internship at Web Star Studio. The experience reinforces medical authority, care and clarity for patients in Recife.",
    },
    partner: "Web Star Studio",
    href: "https://dimas.webstarstudio.site/",
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
    alt: "Dr Daniel Pianetti project preview",
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
    alt: "Dr Guilherme Maia project preview",
  },
  {
    type: "image",
    src: "/assets/parallax-delusional-preview.webp",
    fallbackSrc: "/assets/delusional-preview.jpg",
    alt: "Delusional project preview",
  },
  {
    type: "image",
    src: "/assets/parallax-stephanie-bolsoni.webp",
    fallbackSrc: "/assets/stephanie-bolsoni.png",
    alt: "Stephanie Bolsoni project preview",
  },
  {
    type: "image",
    src: "/assets/parallax-ouroverde-preview.webp",
    fallbackSrc: "/assets/ouroverde-preview.png",
    alt: "Ouroverde project preview",
    objectPosition: "top",
  },
];

function HeroEchoVisual() {
  const { tx } = useLang();

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
            alt={tx(copy.hero.imageAlt)}
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(3,3,3,0.88)_0%,_rgba(3,3,3,0.55)_38%,_rgba(3,3,3,0.26)_62%,_rgba(3,3,3,0.6)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(5,5,5,0.1)_0%,_rgba(5,5,5,0)_28%,_rgba(5,5,5,0.12)_100%)]" />
          <div className="absolute left-6 top-6 z-10 font-mono text-[0.62rem] font-medium uppercase tracking-[0.3em] text-white/42 sm:left-8 sm:top-8">
            {tx(copy.hero.badgePortfolio)}
          </div>
          <div className="absolute right-6 top-6 z-10 hidden text-right font-mono text-[0.62rem] font-medium uppercase tracking-[0.3em] text-white/38 sm:right-8 sm:top-8 sm:block">
            {tx(copy.hero.badgeLocation)}
          </div>
        </div>

        <div className="absolute inset-x-4 bottom-5 h-40 bg-[linear-gradient(180deg,_rgba(5,5,5,0)_0%,_rgba(5,5,5,0.82)_100%)] sm:inset-x-6 sm:bottom-6 lg:inset-x-10 lg:bottom-8" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 pb-12 pt-28 sm:px-8 lg:px-12 lg:pb-16 lg:pt-36">
          <div className="w-full">
            <div className="grid w-full gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
              <div className="flex justify-center lg:-translate-x-32 lg:-translate-y-14 xl:-translate-x-44 xl:-translate-y-20">
                <HeroIntroCopy />
              </div>
              <div className="flex justify-center lg:translate-x-28 lg:translate-y-16 lg:justify-self-end xl:translate-x-40 xl:translate-y-24 2xl:translate-x-48">
                <HeroDescriptionPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function JourneyHorizontalSection() {
  const { lang, tx } = useLang();

  return (
    <section
      id="contact"
      aria-labelledby="about-heading"
      className="relative bg-transparent px-6 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.45em] text-white/40">
          {tx(copy.about.eyebrow)}
        </p>
        <BlurText
          key={`about-title-${lang}`}
          tag="h2"
          text={tx(copy.about.title)}
          id="about-heading"
          className="justify-center text-4xl font-black uppercase tracking-[-0.075em] text-white sm:text-6xl lg:text-7xl"
          animateBy="words"
          direction="top"
          delay={130}
          stepDuration={0.35}
          threshold={0.2}
          rootMargin="-80px"
        />
        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
          {tx(copy.about.paragraphOne)}
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/48 sm:text-base">
          {tx(copy.about.paragraphTwo)}
        </p>
      </motion.div>
    </section>
  );
}

function DestructionStackSection() {
  const { lang } = useLang();

  return (
    <section
      aria-label="Problemas que resolvo"
      className="relative bg-transparent"
    >
      <DestructionSection language={lang} backgroundClassName="bg-transparent" showAmbientBackground={false} />
    </section>
  );
}

const workHistory: { role: LocalizedText; company: LocalizedText; period: LocalizedText; description: LocalizedText }[] = [
  {
    role: { "pt-BR": "Desenvolvedor full stack", "en-US": "Full stack developer" },
    company: { "pt-BR": "Web Star Studio · Estágio", "en-US": "Web Star Studio · Internship" },
    period: { "pt-BR": "Fevereiro 2026 — Hoje", "en-US": "February 2026 — Present" },
    description: {
      "pt-BR": "Desenvolvimento e manutenção de sites, com foco em layouts responsivos, front-end e identidade visual.",
      "en-US": "Building and maintaining websites, focused on responsive layouts, front-end and visual identity.",
    },
  },
  {
    role: { "pt-BR": "Desenvolvedor web freelancer", "en-US": "Freelance web developer" },
    company: { "pt-BR": "Autônomo", "en-US": "Self-employed" },
    period: { "pt-BR": "Abril 2026 — Hoje", "en-US": "April 2026 — Present" },
    description: {
      "pt-BR": "Criação de sites e landing pages sob demanda para clientes, do briefing à entrega — direção visual, front-end e acabamento.",
      "en-US": "Building websites and landing pages on demand for clients, from briefing to delivery — visual direction, front-end and polish.",
    },
  },
  {
    role: { "pt-BR": "Desenvolvedor de software", "en-US": "Software developer" },
    company: { "pt-BR": "AJ Soluções & Sistemas · Estágio", "en-US": "AJ Soluções & Sistemas · Internship" },
    period: { "pt-BR": "Setembro — Dezembro 2025", "en-US": "September — December 2025" },
    description: {
      "pt-BR": "Desenvolvimento de software, automações N8N e planilhas VBA.",
      "en-US": "Software development, N8N automations and VBA spreadsheets.",
    },
  },
];

function ExperienceTimelineSection() {
  const { tx } = useLang();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative overflow-hidden bg-transparent px-6 py-24 text-white sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute right-8 top-28 h-64 w-64 rounded-full bg-[#A7EF9E]/[0.06] blur-3xl" />

      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:sticky lg:top-24"
        >
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.48em] text-white/38">
            {tx(copy.experience.eyebrow)}
          </p>
          <h2
            id="experience-heading"
            className="max-w-[11ch] text-5xl font-black uppercase leading-[0.88] tracking-[-0.085em] text-white sm:text-7xl lg:text-8xl"
          >
            {tx(copy.experience.title)}
          </h2>
          <div className="mt-8 flex items-end gap-4 border-l border-[#A7EF9E]/45 pl-5">
            <span className="font-mono text-5xl font-semibold leading-none tracking-[-0.05em] text-[#A7EF9E]">
              03
            </span>
            <span className="pb-1 font-mono text-[11px] font-semibold uppercase leading-5 tracking-[0.28em] text-white/42">
              {tx(copy.experience.eyebrow)}
            </span>
          </div>
        </motion.div>

        <div className="relative pl-7 sm:pl-10">
          <div className="absolute bottom-8 left-[0.34rem] top-2 w-px bg-gradient-to-b from-[#A7EF9E]/75 via-white/18 to-transparent sm:left-[0.58rem]" />
          <div className="flex flex-col gap-5 sm:gap-6">
            {workHistory.map((item, index) => (
              <motion.article
                key={item.company["pt-BR"]}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-[8px] border border-white/[0.09] bg-white/[0.035] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.22)] transition duration-300 hover:border-[#A7EF9E]/35 hover:bg-white/[0.055] sm:p-6 lg:p-7"
              >
                <span className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[#A7EF9E] via-[#A7EF9E]/45 to-transparent opacity-65 transition group-hover:opacity-100" />
                <span className="absolute -left-[1.92rem] top-7 h-3.5 w-3.5 rounded-full border-2 border-[#A7EF9E] bg-[#050505] shadow-[0_0_30px_rgba(167,239,158,0.45)] sm:-left-[2.38rem]" />
                <span className="absolute right-5 top-5 font-mono text-[2.55rem] font-semibold leading-none tracking-[-0.08em] text-white/[0.035] transition group-hover:text-[#A7EF9E]/10 sm:right-6 sm:top-6">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <p className="max-w-[20rem] font-mono text-[12px] font-semibold uppercase leading-5 tracking-[0.26em] text-[#A7EF9E]/85">
                    {tx(item.company)}
                  </p>
                  <p className="w-fit border border-white/10 bg-black/20 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                    {tx(item.period)}
                  </p>
                </div>

                <h3 className="relative mt-5 max-w-[32rem] text-2xl font-black uppercase leading-[0.96] tracking-[-0.055em] text-white sm:text-[2rem] lg:text-[2.25rem]">
                  {tx(item.role)}
                </h3>
                <p className="relative mt-5 max-w-[35rem] text-base leading-7 text-white/62">
                  {tx(item.description)}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const educationInfo: { degree: LocalizedText; school: string; location: LocalizedText; period: LocalizedText } = {
  degree: { "pt-BR": "Bacharelado em Ciência da Computação", "en-US": "Bachelor's in Computer Science" },
  school: "CESAR School",
  location: { "pt-BR": "Recife, PE · Brasil", "en-US": "Recife, PE · Brazil" },
  period: { "pt-BR": "2022 — em andamento", "en-US": "2022 — in progress" },
};

const spokenLanguages: { name: LocalizedText; level: LocalizedText }[] = [
  { name: { "pt-BR": "Português", "en-US": "Portuguese" }, level: { "pt-BR": "Nativo", "en-US": "Native" } },
  { name: { "pt-BR": "Inglês", "en-US": "English" }, level: { "pt-BR": "Avançado", "en-US": "Advanced" } },
];

function EducationLanguagesSection() {
  const { tx } = useLang();

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative bg-transparent px-6 py-24 text-white sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-white/40">
            {tx(copy.education.eyebrow)}
          </p>
          <h2
            id="education-heading"
            className="text-4xl font-black uppercase tracking-[-0.075em] text-white sm:text-6xl"
          >
            {tx(copy.education.title)}
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="[perspective:1000px]"
          >
            <article className="group relative h-full cursor-pointer overflow-hidden rounded-[8px] bg-white/[0.055] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.32)] backdrop-blur-2xl transition duration-300 ease-out [transform-style:preserve-3d] hover:[transform:translateY(-8px)_rotateX(1.4deg)_rotateY(-1.4deg)] hover:shadow-[0_34px_110px_rgba(0,0,0,0.42)] sm:p-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(167,239,158,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.035)_38%,rgba(255,255,255,0.015))] opacity-80 transition duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#A7EF9E]/18 blur-3xl transition duration-500 group-hover:-translate-x-7 group-hover:translate-y-8" />
              <div className="pointer-events-none absolute bottom-0 left-10 h-px w-36 bg-gradient-to-r from-transparent via-white/26 to-transparent transition duration-500 group-hover:translate-x-12 group-hover:opacity-80" />

              <div className="relative z-10 transition duration-500 group-hover:-translate-y-1">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#A7EF9E]">
                    {tx(copy.education.educationLabel)}
                  </p>
                  <img
                    src="/assets/cesar-school-logo.png"
                    alt="CESAR School logo"
                    className="h-7 w-auto object-contain opacity-85 transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-6 text-2xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-[1.7rem]">
                  {tx(educationInfo.degree)}
                </h3>
                <p className="mt-3 font-mono text-sm text-white/76">{educationInfo.school}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-white/46">
                  {tx(educationInfo.location)} &#183; {tx(educationInfo.period)}
                </p>
              </div>
            </article>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="[perspective:1000px]"
          >
            <article className="group relative h-full cursor-pointer overflow-hidden rounded-[8px] bg-white/[0.055] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.32)] backdrop-blur-2xl transition duration-300 ease-out [transform-style:preserve-3d] hover:[transform:translateY(-8px)_rotateX(1.4deg)_rotateY(1.4deg)] hover:shadow-[0_34px_110px_rgba(0,0,0,0.42)] sm:p-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_8%,rgba(167,239,158,0.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.11),rgba(255,255,255,0.035)_42%,rgba(255,255,255,0.014))] opacity-80 transition duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute -bottom-14 -left-12 h-44 w-44 rounded-full bg-white/10 blur-3xl transition duration-500 group-hover:translate-x-7 group-hover:-translate-y-8" />
              <div className="pointer-events-none absolute right-10 top-0 h-px w-32 bg-gradient-to-r from-transparent via-[#A7EF9E]/50 to-transparent transition duration-500 group-hover:-translate-x-10 group-hover:opacity-90" />

              <div className="relative z-10 transition duration-500 group-hover:-translate-y-1">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#A7EF9E]">
                  {tx(copy.education.languagesLabel)}
                </p>
                <ul className="mt-7 flex flex-col gap-3">
                  {spokenLanguages.map((language, index) => (
                    <li
                      key={language.name["pt-BR"]}
                      className="flex items-center justify-between rounded-[8px] bg-black/18 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 group-hover:bg-black/24"
                      style={{ transform: `translateZ(${20 + index * 10}px)` }}
                    >
                      <span className="text-lg font-semibold text-white sm:text-xl">{tx(language.name)}</span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/58">
                        {tx(language.level)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function PortfolioLandingPage() {
  const { tx } = useLang();
  const [isNavDetached, setIsNavDetached] = useState(false);
  const [notchProgress, setNotchProgress] = useState(0);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string | null>(null);
  const [projectsScrollEdges, setProjectsScrollEdges] = useState({ left: false, right: true });
  const heroRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const projectsScrollerRef = useRef<HTMLDivElement | null>(null);
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

  const selectedProject = navProjectItems.find((item) => item.title === selectedProjectTitle);
  const selectedProjectHref = selectedProject && "href" in selectedProject ? selectedProject.href : GITHUB_URL;
  const selectedProjectCtaLabel = selectedProject && "ctaLabel" in selectedProject ? selectedProject.ctaLabel : selectedProject && "href" in selectedProject ? tx(copy.projects.viewSite) : "GitHub";
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
      <CvModal
        open={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        pdfUrl={CV_PDF_URL}
        downloadName={CV_DOWNLOAD_NAME}
      />
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
                <span className="relative z-10">{tx(copy.nav.projects)}</span>
              </button>
              <button
                type="button"
                onClick={() => {
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
                <span className="relative z-10">{tx(copy.nav.contact)}</span>
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
                              alt={`${tx(copy.projects.thumbAlt)} ${item.title}`}
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
                              {tx(copy.nav.view)}
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
            alt={tx(copy.hero.imageAlt)}
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{
              WebkitMaskImage: heroImageMask,
              maskImage: heroImageMask,
            }}
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(3,3,3,0.88)_0%,_rgba(3,3,3,0.55)_38%,_rgba(3,3,3,0.26)_62%,_rgba(3,3,3,0.6)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(5,5,5,0.1)_0%,_rgba(5,5,5,0)_28%,_rgba(5,5,5,0.12)_100%)]" />
          <div className="absolute left-6 top-6 z-10 font-mono text-[0.62rem] font-medium uppercase tracking-[0.3em] text-white/42 sm:left-8 sm:top-8">
            {tx(copy.hero.badgePortfolio)}
          </div>
          <div className="absolute right-6 top-6 z-10 hidden text-right font-mono text-[0.62rem] font-medium uppercase tracking-[0.3em] text-white/38 sm:right-8 sm:top-8 sm:block">
            {tx(copy.hero.badgeLocation)}
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
              className="w-full"
            >
              <div className="grid w-full gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
                <div className="flex justify-center lg:-translate-x-32 lg:-translate-y-14 xl:-translate-x-44 xl:-translate-y-20">
                  <HeroIntroCopy onOpenCv={() => setIsCvOpen(true)} />
                </div>
                <div className="flex justify-center lg:translate-x-28 lg:translate-y-16 lg:justify-self-end xl:translate-x-40 xl:translate-y-24 2xl:translate-x-48">
                  <HeroDescriptionPanel />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject ? (
          <ProjectDetailModal
            key="project-detail"
            onClose={() => setSelectedProjectTitle(null)}
            title={selectedProject.title}
            image={selectedProject.image}
            description={selectedProject.description}
            href={selectedProjectHref}
            ctaLabel={selectedProjectCtaLabel}
            ctaIsGithub={selectedProjectCtaLabel === "GitHub"}
            partner={selectedProjectPartner}
            partnerLogo={selectedProjectPartnerLogo}
            partnerLogoClassName={selectedProjectPartnerLogoClassName}
          />
        ) : null}
      </AnimatePresence>

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
            {tx(copy.projects.headingLead)} <span className="text-[#A7EF9E]">{tx(copy.projects.headingAccent)}</span>
          </h2>
        </motion.div>
      </section>

      <ZoomParallax lockThreshold={0.8} images={portfolioZoomImages} centerVisual={<HeroEchoVisual />} endBlend />

      <div className="relative bg-[linear-gradient(180deg,#050505_0%,#08080d_22%,#0d0e16_48%,#0a0c0b_72%,#050505_100%)]">
        <JourneyHorizontalSection />
        <SkillsSection />
        <ExperienceTimelineSection />
        <EducationLanguagesSection />
        <DestructionStackSection />
      </div>
    </div>
  );
}
