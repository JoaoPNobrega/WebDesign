import { type SVGProps, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { AnimatePresence, LayoutGroup, animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ExternalLink, Mail } from "lucide-react";
import DestructionSection from "@/components/DestructionSection";
import SkillsSection from "@/components/SkillsSection";
import StoryTimeline from "@/components/StoryTimeline";
import AetherFlowHero from "@/components/ui/aether-flow-hero";
import BlurText from "@/components/ui/BlurText";
import CvButton from "@/components/ui/CvButton";
import CvModal from "@/components/ui/CvModal";
import ParallaxPhoto from "@/components/ui/ParallaxPhoto";
import GlassSurface from "@/components/ui/GlassSurface";
import ShinyText from "@/components/ui/ShinyText";
import { ZoomParallax, type ZoomMediaAsset } from "@/components/ui/zoom-parallax";
import { useLang } from "@/lib/i18n";
import { copy } from "@/lib/portfolio-copy";
import { navProjectItems, projectSlug } from "@/lib/projects";

const HERO_MORPH_SCROLL_DISTANCE = 860;
const FLOATING_NAV_SCROLL_OFFSET = 360;
const FLOATING_NAV_SCROLL_THRESHOLD = HERO_MORPH_SCROLL_DISTANCE + FLOATING_NAV_SCROLL_OFFSET;
const HERO_TEXT_EXIT_SCROLL_DELAY = 260;
const HERO_TEXT_EXIT_SCROLL_DISTANCE = 420;
const GITHUB_URL = "https://github.com/JoaoPNobrega";
const CV_PDF_URL = "/curriculo-joao-pedro.pdf";
const CV_DOWNLOAD_NAME = "Curriculo_Joao_Pedro.pdf";
const PARTNER_URLS: Record<string, string> = {
  "Web Star Studio": "https://www.webstar.studio/",
  "CESAR School": "https://www.cesar.school/",
  "Delusional": "https://delusionalstudio.vercel.app/",
};

function HeroIntroCopy({ onOpenCv, staticDisplay = false }: { onOpenCv?: () => void; staticDisplay?: boolean }) {
  const { lang, tx } = useLang();

  return (
    <div className="flex w-full max-w-2xl flex-col items-center text-center">
        {staticDisplay ? (
          <p
            className="relative block min-h-16 w-full text-[2.6rem] font-medium normal-case leading-[0.96] tracking-[-0.04em] text-white drop-shadow-[0_18px_42px_rgba(0,0,0,0.52)] sm:text-[4.1rem] lg:min-h-20 lg:text-[4.2rem] xl:min-h-24 xl:text-[5rem] 2xl:text-[5.45rem]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {tx(copy.hero.intro)}
          </p>
        ) : (
          <BlurText
            key={`intro-${lang}`}
            tag="p"
            text={tx(copy.hero.intro)}
            animateBy="letters"
            direction="top"
            delay={70}
            stepDuration={0.4}
            className="relative min-h-16 w-full justify-center text-[2.6rem] font-medium normal-case leading-[0.96] tracking-[-0.04em] text-white drop-shadow-[0_18px_42px_rgba(0,0,0,0.52)] sm:text-[4.1rem] lg:min-h-20 lg:text-[4.2rem] xl:min-h-24 xl:text-[5rem] 2xl:text-[5.45rem]"
            style={{ fontFamily: "var(--font-sans)" }}
          />
        )}
      {staticDisplay ? (
        <p className="mt-5 w-full text-center text-lg font-light uppercase tracking-[0.42em] text-white/75 sm:text-2xl lg:text-3xl">
          {tx(copy.hero.roleTitle)}
        </p>
      ) : (
        <BlurText
          key={`role-${lang}`}
          tag="p"
          text={tx(copy.hero.roleTitle)}
          animateBy="words"
          direction="bottom"
          delay={220}
          stepDuration={0.45}
          animationFrom={{ filter: "blur(10px)", opacity: 0, y: 24 }}
          animationTo={[
            { filter: "blur(4px)", opacity: 0.6, y: -4 },
            { filter: "blur(0px)", opacity: 1, y: 0 },
          ]}
          className="mt-5 w-full justify-center text-lg font-light uppercase tracking-[0.42em] text-white/75 sm:text-2xl lg:text-3xl"
        />
      )}

    </div>
  );
}

function HeroDescriptionPanel() {
  const { tx } = useLang();

  return (
    <div className="flex w-full max-w-[27rem] items-stretch gap-4 rounded-2xl bg-black/25 p-5 text-left ring-1 ring-white/10 backdrop-blur-md sm:p-6">
      <div className="w-[3px] shrink-0 self-stretch rounded-full bg-gradient-to-b from-[#A7EF9E] via-[#A7EF9E]/55 to-transparent" />
      <p className="text-[0.97rem] leading-7 text-white/85 lg:text-[1.06rem] lg:leading-8">
        {tx(copy.hero.panelBody)}
      </p>
    </div>
  );
}

const CV_ICON_MASK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/%3E%3Cpolyline points='14 2 14 8 20 8'/%3E%3Cline x1='16' y1='13' x2='8' y2='13'/%3E%3Cline x1='16' y1='17' x2='8' y2='17'/%3E%3Cpolyline points='10 9 9 9 8 9'/%3E%3C/svg%3E")`;
const LANG_ICON_MASK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cline x1='2' y1='12' x2='22' y2='12'/%3E%3Cpath d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'/%3E%3C/svg%3E")`;

function ShinyIcon({ maskUrl, size = 18, speed = "2.6s" }: { maskUrl: string; size?: number; speed?: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block flex-shrink-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.54)_0%,rgba(255,255,255,0.96)_38%,rgba(167,239,158,0.92)_50%,rgba(255,255,255,0.96)_62%,rgba(255,255,255,0.54)_100%)] bg-[length:240%_100%] motion-safe:animate-[shiny-text_var(--shiny-speed)_linear_infinite]"
      style={{
        width: size,
        height: size,
        WebkitMaskImage: maskUrl,
        maskImage: maskUrl,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        "--shiny-speed": speed,
      } as React.CSSProperties}
    />
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

const portfolioZoomImages: ZoomMediaAsset[] = [
  {
    type: "image",
    src: "/assets/parallax-center-site.webp",
    fallbackSrc: "/assets/image.jpg",
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
    fallbackSrc: "/assets/flyhigh.jpg",
    alt: "Left tall site preview",
  },
  {
    type: "image",
    src: "/assets/parallax-dr-guilherme-preview.webp",
    fallbackSrc: "/assets/dr-guilherme-preview.jpg",
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
    fallbackSrc: "/assets/stephanie-bolsoni.jpg",
    alt: "Stephanie Bolsoni project preview",
  },
  {
    type: "image",
    src: "/assets/parallax-ouroverde-preview.webp",
    fallbackSrc: "/assets/ouroverde-preview.jpg",
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
              d="M0 0H72C91 0 103 22.79 111 72.93C120 132.22 125 196.05 128 259.87C132 341.86 144 382.85 162 382.85H298C316 382.85 328 341.86 332 259.87C335 196.05 340 132.22 349 72.93C357 22.79 369 0 388 0H460V0H0Z"
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
            style={{
              WebkitMaskImage:
                "linear-gradient(180deg, #000 0%, #000 55%, rgba(0,0,0,0.45) 82%, transparent 100%)",
              maskImage:
                "linear-gradient(180deg, #000 0%, #000 55%, rgba(0,0,0,0.45) 82%, transparent 100%)",
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
          <div className="w-full">
            <div className="grid w-full gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
              <div className="flex justify-center lg:-translate-y-10 xl:-translate-y-14 2xl:-translate-x-24 2xl:-translate-y-20">
                <HeroIntroCopy staticDisplay />
              </div>
              <div className="flex justify-center lg:translate-y-6 lg:justify-self-end xl:translate-y-9 2xl:translate-x-20 2xl:translate-y-12">
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
        className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16"
      >
        {/* Foto */}
        <div className="group relative mx-auto w-full max-w-[22rem] lg:mx-0">
          {/* moldura deslocada (outline) atrás, em acento */}
          <div className="pointer-events-none absolute -bottom-3 -left-3 -z-10 h-full w-full rounded-[1.75rem] border border-[#A7EF9E]/35 transition-[bottom,left] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-bottom-2 group-hover:-left-2" />
          {/* moldura com borda em gradiente */}
          <div className="relative rounded-[1.85rem] bg-gradient-to-br from-white/25 via-white/5 to-transparent p-px shadow-[0_40px_100px_-28px_rgba(0,0,0,0.8)]">
            <div className="relative overflow-hidden rounded-[1.8rem] ring-1 ring-white/10">
              <ParallaxPhoto
                src="/assets/joao-pedro-about-clean.webp"
                alt="João Pedro"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-[center_28%]"
              />
              {/* borda interna fininha */}
              <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] ring-1 ring-inset ring-white/[0.08]" />
            </div>
          </div>
          {/* cantos de acento */}
          <span className="pointer-events-none absolute -left-2 -top-2 h-6 w-6 rounded-tl-lg border-l-2 border-t-2 border-[#A7EF9E]/70" />
          <span className="pointer-events-none absolute -right-2 -bottom-2 h-6 w-6 rounded-br-lg border-b-2 border-r-2 border-[#A7EF9E]/70" />
        </div>

        {/* Texto */}
        <div className="text-left">
          <ShinyText
            as="p"
            text={tx(copy.about.eyebrow)}
            speed="2.6s"
            className="mb-5 text-xs font-medium uppercase tracking-[0.45em] [filter:drop-shadow(0_0_8px_rgba(167,239,158,0.45))]"
          />
          <BlurText
            key={`about-title-${lang}`}
            tag="h2"
            text={tx(copy.about.title)}
            id="about-heading"
            className="justify-start text-4xl font-extrabold uppercase tracking-[-0.01em] text-white sm:text-5xl lg:text-6xl"
            animateBy="words"
            direction="top"
            delay={130}
            stepDuration={0.35}
            threshold={0.2}
            rootMargin="-80px"
          />
          <p className="mt-8 max-w-xl text-base leading-8 text-white/68 sm:text-lg">
            {tx(copy.about.paragraphOne)}
          </p>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/48 sm:text-base">
            {tx(copy.about.paragraphTwo)}
          </p>
        </div>
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

function ProjectImageCarousel({ images, title }: { images: readonly string[], title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-white/[0.04] group/carousel">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} - view ${currentIndex + 1}`}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2 opacity-0 transition-opacity duration-300 group-hover/carousel:opacity-100">
        <button
          type="button"
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to image ${i + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function PortfolioLandingPage({ runEntranceHint = false }: { runEntranceHint?: boolean }) {
  const { tx, lang, toggle } = useLang();
  const [isNavDetached, setIsNavDetached] = useState(false);
  // Dica de onboarding: revela os rótulos dos ícones (currículo/idioma) por um
  // instante quando a intro termina, como se o mouse passasse por cima.
  const [showIconHint, setShowIconHint] = useState(false);
  const [notchProgress, setNotchProgress] = useState(0);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isCvDropdownOpen, setIsCvDropdownOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isProjectsNotchExpanded, setIsProjectsNotchExpanded] = useState(false);
  const [carouselActiveIdx, setCarouselActiveIdx] = useState(0);
  // trackX = vw * (0.32 - activeIdx * 0.40): centers card at activeIdx
  const carouselTrackX = useMotionValue(typeof window !== "undefined" ? window.innerWidth * 0.32 : 0);
  const carouselAnimating = useRef(false);
  const [projectsScrollEdges, setProjectsScrollEdges] = useState({ left: false, right: true });
  const heroRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const projectsOverlayRef = useRef<HTMLDivElement | null>(null);
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
    if (!runEntranceHint) {
      return;
    }
    // Depois que a intro sai: pisca os rótulos dos ícones e esconde de novo.
    const showTimer = window.setTimeout(() => setShowIconHint(true), 450);
    const hideTimer = window.setTimeout(() => setShowIconHint(false), 450 + 1900);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [runEntranceHint]);

  // Voltando da página /projetos, reabrir o popup de projetos (viemos de lá).
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window.sessionStorage.getItem("jp-open-projetos") === "1") {
      window.sessionStorage.removeItem("jp-open-projetos");
      setIsProjectsDropdownOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!isCvDropdownOpen && !isContactDropdownOpen && !isProjectsDropdownOpen && !isLangDropdownOpen) {
      return;
    }

    const closeAll = () => {
      setIsCvDropdownOpen(false);
      setIsContactDropdownOpen(false);
      setIsProjectsDropdownOpen(false);
      setIsLangDropdownOpen(false);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node) && !projectsOverlayRef.current?.contains(event.target as Node)) {
        closeAll();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAll();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCvDropdownOpen, isContactDropdownOpen, isProjectsDropdownOpen, isLangDropdownOpen]);

  useEffect(() => {
    if (!isProjectsDropdownOpen || isNavDetached) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isProjectsDropdownOpen, isNavDetached]);

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

  // Pré-carrega (e pré-decodifica) as miniaturas dos projetos assim que o
  // navegador fica ocioso, para que a abertura do dropdown não trave
  // decodificando imagens no meio da animação.
  useEffect(() => {
    const preload = () => {
      for (const item of navProjectItems) {
        const img = new Image();
        img.decoding = "async";
        img.src = "image" in item ? item.image : item.images[0];
      }
    };
    const ric = (window as typeof window & {
      requestIdleCallback?: (cb: () => void) => number;
    }).requestIdleCallback;
    if (ric) {
      ric(preload);
    } else {
      const timeout = window.setTimeout(preload, 600);
      return () => window.clearTimeout(timeout);
    }
  }, []);

  // Notch expansion state: opens immediately, closes only after content fade (320ms delay)
  useEffect(() => {
    const isOpen = isProjectsDropdownOpen && !isNavDetached;
    if (isOpen) {
      setIsProjectsNotchExpanded(true);
    } else {
      const t = setTimeout(() => setIsProjectsNotchExpanded(false), 300);
      return () => clearTimeout(t);
    }
  }, [isProjectsDropdownOpen, isNavDetached]);

  // Reset carousel when fullscreen overlay closes
  useEffect(() => {
    if (!isProjectsDropdownOpen || isNavDetached) {
      setCarouselActiveIdx(0);
      carouselTrackX.set(window.innerWidth * 0.32);
      carouselAnimating.current = false;
    }
  }, [isProjectsDropdownOpen, isNavDetached, carouselTrackX]);

  const carouselGoNext = () => {
    if (carouselAnimating.current) return;
    carouselAnimating.current = true;
    const newIdx = carouselActiveIdx + 1;
    setCarouselActiveIdx(newIdx);
    animate(carouselTrackX, window.innerWidth * (0.32 - newIdx * 0.40), {
      type: "spring",
      stiffness: 340,
      damping: 38,
      mass: 0.8,
      onComplete: () => { carouselAnimating.current = false; },
    });
  };

  const carouselGoPrev = () => {
    if (carouselAnimating.current) return;
    carouselAnimating.current = true;
    const newIdx = carouselActiveIdx - 1;
    setCarouselActiveIdx(newIdx);
    animate(carouselTrackX, window.innerWidth * (0.32 - newIdx * 0.40), {
      type: "spring",
      stiffness: 340,
      damping: 38,
      mass: 0.8,
      onComplete: () => { carouselAnimating.current = false; },
    });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const projectsCarouselMaskImage = `linear-gradient(90deg, ${
    projectsScrollEdges.left ? "transparent 0%, black 7%" : "black 0%, black 7%"
  }, black 93%, ${projectsScrollEdges.right ? "transparent 100%" : "black 100%"})`;

  const isHeroCvDropdownOpen = isCvDropdownOpen && !isNavDetached;
  const isHeroContactDropdownOpen = isContactDropdownOpen && !isNavDetached;
  const isHeroProjectsDropdownOpen = isProjectsDropdownOpen && !isNavDetached;
  const isHeroLangDropdownOpen = isLangDropdownOpen && !isNavDetached;
  const notchDepth = 1 - notchProgress;
  const isHeroDropdownOpen = isHeroCvDropdownOpen || isHeroContactDropdownOpen || isHeroProjectsDropdownOpen || isHeroLangDropdownOpen;
  const isHeroSubDropdownOpen = isHeroCvDropdownOpen || isHeroContactDropdownOpen || isHeroLangDropdownOpen;
  // Nav destacada (a que "flutua" ao sair da hero): qualquer dropdown aberto nela.
  const isDetachedDropdownOpen =
    isNavDetached && (isCvDropdownOpen || isContactDropdownOpen || isProjectsDropdownOpen || isLangDropdownOpen);
  const visibleNotchDepth = isHeroDropdownOpen ? 1 : notchDepth;
  const notchDropdownExtraDepth = isHeroSubDropdownOpen ? 54 : 0;
  const notchSourceHeight = isHeroSubDropdownOpen ? 142 : 86;
  const scaleNotchY = (value: number, sourceHeight: number) => ((value / sourceHeight) * 392).toFixed(2);
  const notchYValue = (value: number) => value * visibleNotchDepth + (value / 84) * notchDropdownExtraDepth;
  const notchY = (value: number) => scaleNotchY(notchYValue(value), notchSourceHeight);
  // Fullscreen: walls sweep outward (left x→0, right x→460) while pocket deepens to y=392.
  // Same 14-command topology — Framer Motion interpolates every coordinate for a smooth morph.
  const notchPath = isProjectsNotchExpanded
    ? `M0 0H0C0 0 0 23.33 0 74.67C0 135.33 0 200.57 0 265.90C0 350 0 392 0 392H460C460 392 460 350 460 265.90C460 200.57 460 135.33 460 74.67C460 23.33 460 0 460 0H460V0H0V0Z`
    : `M0 0H72C91 0 103 ${notchY(5)} 111 ${notchY(16)}C120 ${notchY(29)} 125 ${notchY(43)} 128 ${notchY(57)}C132 ${notchY(75)} 144 ${notchY(84)} 162 ${notchY(84)}H298C316 ${notchY(84)} 328 ${notchY(75)} 332 ${notchY(57)}C335 ${notchY(43)} 340 ${notchY(29)} 349 ${notchY(16)}C357 ${notchY(5)} 369 0 388 0H460V0H0V0Z`;
  const notchVisualHeight = isProjectsNotchExpanded ? "100vh" : isHeroSubDropdownOpen ? "7.35rem" : "5rem";
  const notchVisualWidth = isProjectsNotchExpanded ? "100vw" : isHeroSubDropdownOpen ? "94vw" : "96vw";
  const notchVisualMaxWidth = isProjectsNotchExpanded ? "100vw" : isHeroSubDropdownOpen ? "52rem" : "58rem";
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
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <motion.path
              initial={false}
              animate={{ d: notchPath }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              fill="#050505"
            />
          </svg>

          <AnimatePresence>
            {isHeroProjectsDropdownOpen && (
              <motion.div
                key="projects-carousel"
                ref={projectsOverlayRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.28, ease: "easeOut" } }}
                exit={{ opacity: 0, transition: { duration: 0.28, ease: "easeOut" } }}
                className="pointer-events-auto absolute inset-0 overflow-hidden"
                onWheel={(e) => {
                  e.preventDefault();
                  const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
                  if (Math.abs(delta) < 15) return;
                  if (delta > 0) carouselGoNext();
                  else carouselGoPrev();
                }}
              >
                {/* Ver todos os projetos → /projetos (canto superior esquerdo).
                    Hover: sobe + glow menta + os 4 quadrados "pulam" em cascata. */}
                <a
                  href="/projetos"
                  aria-label={tx(copy.projects.viewAll)}
                  className="group absolute left-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.07] text-white/65 ring-1 ring-white/10 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-white/[0.14] hover:text-[#A7EF9E] hover:shadow-[0_0_22px_-4px_rgba(167,239,158,0.55)] active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/40 sm:left-8 sm:top-8"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="7" height="7" rx="1.6" className="origin-center scale-100 transition-transform duration-300 ease-out [transform-box:fill-box] [transition-delay:0ms] group-hover:scale-[1.22]" />
                    <rect x="14" y="3" width="7" height="7" rx="1.6" className="origin-center scale-100 transition-transform duration-300 ease-out [transform-box:fill-box] [transition-delay:70ms] group-hover:scale-[1.22]" />
                    <rect x="14" y="14" width="7" height="7" rx="1.6" className="origin-center scale-100 transition-transform duration-300 ease-out [transform-box:fill-box] [transition-delay:140ms] group-hover:scale-[1.22]" />
                    <rect x="3" y="14" width="7" height="7" rx="1.6" className="origin-center scale-100 transition-transform duration-300 ease-out [transform-box:fill-box] [transition-delay:210ms] group-hover:scale-[1.22]" />
                  </svg>
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute left-[calc(100%+0.5rem)] top-1/2 z-50 w-max -translate-x-1 -translate-y-1/2 rounded-full bg-black/90 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/80 opacity-0 shadow-[0_14px_40px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
                  >
                    {tx(copy.projects.viewAll)}
                  </span>
                </a>

                {/* Close Button (canto superior direito — convenção) */}
                <button
                  onClick={() => setIsProjectsDropdownOpen(false)}
                  aria-label="Fechar projetos"
                  className="group absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.07] text-white/60 ring-1 ring-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/[0.14] hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 sm:right-8 sm:top-8"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:rotate-90">
                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                  </svg>
                </button>

                {/* Infinite track: cards at absolute position pos*40vw. Track x never resets.
                    trackX = vw*(0.32 - activeIdx*0.40) centers the active card. */}
                <motion.div
                  className="absolute inset-0"
                  style={{ x: carouselTrackX }}
                >
                  {[-2, -1, 0, 1, 2].map((offset) => {
                    const pos = carouselActiveIdx + offset;
                    const n = navProjectItems.length;
                    const projectIdx = ((pos % n) + n) % n;
                    const dist = Math.abs(offset);
                    const isCenterSlot = offset === 0;
                    const item = navProjectItems[projectIdx];
                    const partnerLogo = "partnerLogo" in item ? item.partnerLogo : "/assets/webstar-logo-white.png";
                    const partnerLogoClass = "partnerLogoClassName" in item ? item.partnerLogoClassName : "h-[0.85rem] w-auto object-contain opacity-90";
                    const partnerUrl = "partner" in item ? PARTNER_URLS[item.partner] : undefined;

                    return (
                      <motion.div
                        key={pos}
                        style={{
                          position: "absolute",
                          top: "3.75rem",
                          bottom: "3.5rem",
                          width: "36vw",
                          left: `${pos * 40}vw`,
                          display: "flex",
                          alignItems: "center",
                        }}
                        animate={{
                          scale: dist === 0 ? 1 : dist === 1 ? 0.88 : 0.76,
                          opacity: dist === 0 ? 1 : dist === 1 ? 0.45 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 340, damping: 38, mass: 0.8 }}
                      >
                        <div
                          className="flex w-full flex-col gap-3"
                          onClick={dist > 0 ? (offset < 0 ? carouselGoPrev : carouselGoNext) : undefined}
                          style={{ cursor: isCenterSlot ? "default" : "pointer" }}
                        >
                          {/* Image */}
                          {"images" in item && Array.isArray(item.images) ? (
                            <ProjectImageCarousel images={item.images} title={item.title} />
                          ) : (
                            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-white/[0.04]">
                              <img
                                src={"image" in item ? item.image : ""}
                                alt={`${tx(copy.projects.thumbAlt)} ${item.title}`}
                                className="h-full w-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          )}

                          {/* Content */}
                          <div className="flex flex-col gap-2 px-1 sm:flex-row sm:items-end sm:gap-6">
                            <div className="flex flex-1 flex-col gap-2">
                              {"partner" in item && (
                                partnerUrl ? (
                                  <a
                                    href={partnerUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-1 ring-1 ring-white/10 transition hover:ring-[#A7EF9E]/40"
                                  >
                                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/40">{tx(copy.projects.partnership)}</span>
                                    <img src={partnerLogo} alt={item.partner} className={partnerLogoClass} loading="lazy" />
                                  </a>
                                ) : (
                                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-1 ring-1 ring-white/10">
                                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/40">{tx(copy.projects.partnership)}</span>
                                    <img src={partnerLogo} alt={item.partner} className={partnerLogoClass} loading="lazy" />
                                  </span>
                                )
                              )}
                              <h2 className="text-base font-extrabold uppercase tracking-[0.11em] text-white sm:text-lg lg:text-xl">{item.title}</h2>
                              <p className="text-xs leading-[1.7] text-white/55 sm:text-[0.8rem] lg:text-sm">{tx(item.description)}</p>
                            </div>
                            {isCenterSlot && (
                              <a
                                href={`/projetos/${projectSlug(item.title)}`}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex h-9 w-fit flex-shrink-0 items-center gap-2 rounded-full bg-white/[0.08] px-5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/70 ring-1 ring-white/10 transition hover:bg-[#A7EF9E] hover:text-black hover:ring-[#A7EF9E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/60"
                              >
                                {tx(copy.projects.learnMore)}
                                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Navegação do carrossel: setas + indicador juntos no rodapé.
                    Distância do fundo é responsiva à ALTURA da viewport: baixa em
                    notebook (não bate nos cards) e mais folgada em desktop alto. */}
                <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 [@media(min-height:760px)]:bottom-10 [@media(min-height:950px)]:bottom-16">
                  <button
                    onClick={carouselGoPrev}
                    aria-label="Projeto anterior"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.07] text-white/60 ring-1 ring-white/10 transition hover:bg-white/[0.14] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M10 13L5 8l5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {navProjectItems.map((_, i) => {
                      const n = navProjectItems.length;
                      const activeProjectIdx = ((carouselActiveIdx % n) + n) % n;
                      return (
                        <div
                          key={i}
                          className={`rounded-full transition-all duration-300 ${i === activeProjectIdx ? "h-1.5 w-4 bg-white/70" : "h-1.5 w-1.5 bg-white/20"}`}
                        />
                      );
                    })}
                  </div>

                  <button
                    onClick={carouselGoNext}
                    aria-label="Próximo projeto"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.07] text-white/60 ring-1 ring-white/10 transition hover:bg-white/[0.14] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Backdrop embaçado: quando a navbar destacada (a que flutua ao sair
            da hero) expande qualquer dropdown, todo o fundo atrás dela desfoca.
            z-[990] fica abaixo da nav (z-[999]) e acima do resto da página. */}
        <AnimatePresence>
          {isDetachedDropdownOpen ? (
            <motion.div
              key="detached-nav-backdrop"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none fixed inset-0 z-[990] bg-[#050505]/25 backdrop-blur-[10px]"
            />
          ) : null}
        </AnimatePresence>
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
              <span className="group relative inline-flex">
                <button
                  type="button"
                  onClick={() => {
                    setIsContactDropdownOpen(false);
                    setIsProjectsDropdownOpen(false);
                    setIsLangDropdownOpen(false);
                    setIsCvDropdownOpen((current) => !current);
                  }}
                  aria-expanded={isCvDropdownOpen}
                  aria-label={tx(copy.cv.title)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                    isCvDropdownOpen ? "bg-white/10" : "hover:bg-white/10"
                  }`}
                  style={{ opacity: navTextOpacity, transform: `translateY(${navTextTranslateY}px)` }}
                >
                  <ShinyIcon maskUrl={CV_ICON_MASK} />
                </button>
                {/* Rótulo no hover/foco: ícone sozinho não comunica bem. */}
                {!isCvDropdownOpen ? (
                  <span
                    role="tooltip"
                    className={`pointer-events-none absolute left-1/2 top-[calc(100%+0.5rem)] z-50 w-max -translate-x-1/2 rounded-full bg-black/90 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/80 shadow-[0_14px_40px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 ${showIconHint ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}
                  >
                    {tx(copy.cv.title)}
                  </span>
                ) : null}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsCvDropdownOpen(false);
                  setIsContactDropdownOpen(false);
                  setIsLangDropdownOpen(false);
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
                  setIsCvDropdownOpen(false);
                  setIsProjectsDropdownOpen(false);
                  setIsLangDropdownOpen(false);
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
              <span className="group relative inline-flex">
                <button
                  type="button"
                  onClick={() => {
                    setIsCvDropdownOpen(false);
                    setIsContactDropdownOpen(false);
                    setIsProjectsDropdownOpen(false);
                    setIsLangDropdownOpen((current) => !current);
                  }}
                  aria-expanded={isLangDropdownOpen}
                  aria-label={tx(copy.language.label)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                    isLangDropdownOpen ? "bg-white/10" : "hover:bg-white/10"
                  }`}
                  style={{ opacity: navTextOpacity, transform: `translateY(${navTextTranslateY}px)` }}
                >
                  <ShinyIcon maskUrl={LANG_ICON_MASK} />
                </button>
                {/* Rótulo no hover/foco: ícone sozinho não comunica bem. */}
                {!isLangDropdownOpen ? (
                  <span
                    role="tooltip"
                    className={`pointer-events-none absolute left-1/2 top-[calc(100%+0.5rem)] z-50 w-max -translate-x-1/2 rounded-full bg-black/90 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/80 shadow-[0_14px_40px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 ${showIconHint ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}
                  >
                    {tx(copy.language.label)}
                  </span>
                ) : null}
              </span>
            </motion.div>

            <AnimatePresence>
              {isProjectsDropdownOpen && isNavDetached ? (
                <motion.div
                  layout
                  key="projects-dropdown"
                  initial={{
                    height: 0,
                    width: "18.5rem",
                    opacity: 0,
                    y: -10,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    height: "auto",
                    width: "40rem",
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    height: 0,
                    width: "18.5rem",
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
                  style={{ maxWidth: "82vw", willChange: "height, opacity, filter, transform" }}
                  className="overflow-hidden [contain:layout_paint]"
                >
                  <div
                    ref={projectsScrollerRef}
                    className="mt-2 w-[min(82vw,40rem)] overflow-x-auto overflow-y-hidden overscroll-x-contain pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                          className="group relative w-[calc((min(82vw,40rem)-0.625rem)/2)] flex-none overflow-hidden rounded-[1.15rem] bg-white/[0.04] p-2 text-left shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07]"
                        >
                          <div className="h-28 overflow-hidden rounded-[0.85rem] bg-white/[0.04] sm:h-32">
                            <img
                              src={"image" in item ? item.image : item.images[0]}
                              alt={`${tx(copy.projects.thumbAlt)} ${item.title}`}
                              className={`h-full w-full object-cover transition duration-500 ${
                                "imageScale" in item ? item.imageScale : "scale-110 group-hover:scale-[1.18]"
                              }`}
                              loading="lazy"
                            />
                          </div>
                          <div className="mt-2.5 px-1 pb-1">
                            <h3 className="truncate text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-white/74">
                              {item.title}
                            </h3>
                            {"partner" in item && (
                              <p className="mt-1 truncate font-mono text-[0.56rem] uppercase tracking-[0.18em] text-white/36">
                                {item.partner}
                              </p>
                            )}
                            <p className="mt-1.5 line-clamp-2 text-[0.65rem] leading-4 text-white/45">
                              {tx(item.description)}
                            </p>
                            <a
                              href={`/projetos/${projectSlug(item.title)}`}
                              onClick={(e) => e.stopPropagation()}
                              className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/[0.07] px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-white/60 transition hover:bg-[#A7EF9E] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/60"
                            >
                              {tx(copy.projects.learnMore)}
                            </a>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-3 pb-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const s = projectsScrollerRef.current;
                        if (s) s.scrollBy({ left: -Math.round(s.clientWidth * 0.6), behavior: "smooth" });
                      }}
                      disabled={!projectsScrollEdges.left}
                      aria-label={tx({ "pt-BR": "Projetos anteriores", "en-US": "Previous projects" })}
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/[0.07] text-white/65 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/[0.14] hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </button>

                    <a
                      href="/projetos"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={tx(copy.projects.viewAll)}
                      className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-[#A7EF9E]/[0.10] text-[#A7EF9E]/85 ring-1 ring-[#A7EF9E]/25 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#A7EF9E] hover:text-black hover:shadow-[0_0_22px_-4px_rgba(167,239,158,0.6)] active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/50"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="3" width="7" height="7" rx="1.6" className="origin-center transition-transform duration-300 ease-out [transform-box:fill-box] [transition-delay:0ms] group-hover:scale-[1.22]" />
                        <rect x="14" y="3" width="7" height="7" rx="1.6" className="origin-center transition-transform duration-300 ease-out [transform-box:fill-box] [transition-delay:70ms] group-hover:scale-[1.22]" />
                        <rect x="14" y="14" width="7" height="7" rx="1.6" className="origin-center transition-transform duration-300 ease-out [transform-box:fill-box] [transition-delay:140ms] group-hover:scale-[1.22]" />
                        <rect x="3" y="14" width="7" height="7" rx="1.6" className="origin-center transition-transform duration-300 ease-out [transform-box:fill-box] [transition-delay:210ms] group-hover:scale-[1.22]" />
                      </svg>
                    </a>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const s = projectsScrollerRef.current;
                        if (s) s.scrollBy({ left: Math.round(s.clientWidth * 0.6), behavior: "smooth" });
                      }}
                      disabled={!projectsScrollEdges.right}
                      aria-label={tx({ "pt-BR": "Próximos projetos", "en-US": "Next projects" })}
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/[0.07] text-white/65 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/[0.14] hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ) : null}

              {isCvDropdownOpen ? (
                <motion.div
                  layout
                  key="cv-dropdown"
                  initial={{ height: 0, opacity: 0, y: -8, filter: "blur(8px)" }}
                  animate={{ height: "auto", opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ height: 0, opacity: 0, y: -6, filter: "blur(8px)" }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className={`flex items-center justify-center gap-2 ${
                      isHeroCvDropdownOpen ? "mt-3 pt-0" : "mt-2 border-t border-white/10 pt-2"
                    }`}
                  >
                    {([
                      {
                        key: "open",
                        label: tx(copy.nav.cvOpen),
                        icon: (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                          </svg>
                        ),
                        onClick: () => { setIsCvOpen(true); setIsCvDropdownOpen(false); },
                      },
                      {
                        key: "download",
                        label: tx(copy.nav.cvDownload),
                        icon: (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                          </svg>
                        ),
                        href: CV_PDF_URL,
                        download: CV_DOWNLOAD_NAME,
                      },
                    ] as const).map((item, index) => (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, scale: 0.84, y: -6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.88, y: -4 }}
                        transition={{ duration: 0.28, delay: index * 0.06, ease: "easeOut" }}
                      >
                        {"href" in item ? (
                          <a
                            href={item.href}
                            download={item.download}
                            className="inline-flex h-11 items-center gap-2 rounded-full bg-white/[0.06] px-5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/60 ring-1 ring-white/10 transition-colors duration-300 hover:bg-[#A7EF9E]/[0.18] hover:text-[#A7EF9E] focus-visible:outline-none"
                          >
                            {item.icon}
                            {item.label}
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={item.onClick}
                            className="inline-flex h-11 items-center gap-2 rounded-full bg-white/[0.06] px-5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/60 ring-1 ring-white/10 transition-colors duration-300 hover:bg-[#A7EF9E]/[0.18] hover:text-[#A7EF9E] focus-visible:outline-none"
                          >
                            {item.icon}
                            {item.label}
                          </button>
                        )}
                      </motion.div>
                    ))}
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
                        "group/contact inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/[0.06] text-white/60 transition-colors duration-300 hover:bg-[#A7EF9E]/[0.18] hover:text-[#A7EF9E] focus-visible:outline-none";

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

              {isLangDropdownOpen ? (
                <motion.div
                  layout
                  key="lang-dropdown"
                  initial={{ height: 0, opacity: 0, y: -8, filter: "blur(8px)" }}
                  animate={{ height: "auto", opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ height: 0, opacity: 0, y: -6, filter: "blur(8px)" }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className={`flex items-center justify-center ${
                      isHeroLangDropdownOpen ? "mt-3 pt-0" : "mt-2 border-t border-white/10 pt-2"
                    }`}
                  >
                    <div className="flex items-center gap-1 rounded-full bg-white/[0.06] p-1 ring-1 ring-white/10">
                      {(["pt-BR", "en-US"] as const).map((code, index) => {
                        const isActive = lang === code;
                        const label = code === "pt-BR" ? "PT-BR" : "EN";
                        return (
                          <motion.button
                            key={code}
                            type="button"
                            onClick={!isActive ? toggle : undefined}
                            // Só fade: o transform (y/scale) era desacoplado pela
                            // layout projection da pílula `layoutId` no botão ativo,
                            // fazendo o PT-BR "colar" no lugar e só o EN descer. O
                            // grupo já desce pela animação do container pai.
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.24, delay: index * 0.05, ease: "easeOut" }}
                            className={`relative h-9 rounded-full px-5 text-[0.7rem] font-bold uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/60 ${
                              isActive
                                ? "bg-[#A7EF9E]/[0.16] text-[#A7EF9E] cursor-default"
                                : "cursor-pointer text-white/50 hover:text-white"
                            }`}
                          >
                            {isActive && (
                              <motion.span
                                layoutId="lang-active-pill"
                                className="pointer-events-none absolute inset-0 rounded-full bg-[#A7EF9E]/[0.12]"
                                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                              />
                            )}
                            <span className="relative z-10">{label}</span>
                          </motion.button>
                        );
                      })}
                    </div>
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
          <motion.img
            aria-hidden="true"
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ scale: heroImageScale, opacity: isHeroProjectsDropdownOpen ? 1 : 0 }}
            transition={{ scale: { duration: 0.18, ease: "linear" }, opacity: { duration: 0.36, ease: "easeOut" } }}
            src="/portfolio/hero-risk-radar-blur.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{
              WebkitMaskImage: heroImageMask,
              maskImage: heroImageMask,
            }}
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(3,3,3,0.88)_0%,_rgba(3,3,3,0.55)_38%,_rgba(3,3,3,0.26)_62%,_rgba(3,3,3,0.6)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(5,5,5,0.1)_0%,_rgba(5,5,5,0)_28%,_rgba(5,5,5,0.12)_100%)]" />
          {/* Badges do hero: somem quando o popup de projetos abre (as setas
              ocupam o lugar). pointer-events-none para não bloquear os cliques. */}
          <div className={`pointer-events-none absolute left-6 top-6 z-10 font-mono text-[0.62rem] font-medium uppercase tracking-[0.3em] text-white/42 transition-opacity duration-300 sm:left-8 sm:top-8 ${isHeroProjectsDropdownOpen ? "opacity-0" : "opacity-100"}`}>
            {tx(copy.hero.badgePortfolio)}
          </div>
          <div className={`pointer-events-none absolute right-6 top-6 z-10 hidden text-right font-mono text-[0.62rem] font-medium uppercase tracking-[0.3em] text-white/38 transition-opacity duration-300 sm:right-8 sm:top-8 sm:block ${isHeroProjectsDropdownOpen ? "opacity-0" : "opacity-100"}`}>
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
              <motion.div
                animate={{
                  filter: isHeroProjectsDropdownOpen ? "blur(10px)" : "blur(0px)",
                  opacity: isHeroProjectsDropdownOpen ? 0.42 : 1,
                  y: isHeroProjectsDropdownOpen ? 10 : 0,
                }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="grid w-full gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center"
                style={{
                  pointerEvents: isHeroProjectsDropdownOpen ? "none" : "auto",
                  willChange: "transform, opacity, filter",
                }}
              >
                <div className="flex justify-center lg:-translate-y-10 xl:-translate-y-14 2xl:-translate-x-24 2xl:-translate-y-20">
                  <HeroIntroCopy onOpenCv={() => setIsCvOpen(true)} />
                </div>
                <div className="flex justify-center lg:translate-y-6 lg:justify-self-end xl:translate-y-9 2xl:translate-x-20 2xl:translate-y-12">
                  <HeroDescriptionPanel />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
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
          <h2 className="font-sans text-4xl font-bold tracking-[-0.03em] text-white drop-shadow-xl md:text-6xl lg:text-7xl">
            {tx(copy.projects.headingLead)} <span className="text-[#A7EF9E]">{tx(copy.projects.headingAccent)}</span>
          </h2>
        </motion.div>
      </section>

      <ZoomParallax lockThreshold={0.8} images={portfolioZoomImages} centerVisual={<HeroEchoVisual />} endBlend />

      <div className="relative bg-[linear-gradient(180deg,#050505_0%,#08080d_22%,#0d0e16_48%,#0a0c0b_72%,#050505_100%)]">
        {/* Campo de partículas bem sutil (mesmo efeito da intro), atrás das seções */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <div className="sticky top-0 h-screen w-full opacity-[0.35]">
            <AetherFlowHero transparent colorRgb="167, 239, 158" />
          </div>
        </div>
        <div className="relative z-10">
          <JourneyHorizontalSection />
          <SkillsSection />
          <StoryTimeline />
          <DestructionStackSection />
        </div>
      </div>
    </div>
  );
}
