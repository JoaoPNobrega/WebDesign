import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FaultyTerminal from "@/components/ui/FaultyTerminal";
import TextType from "@/components/ui/TextType";
import ScrollVelocity from "@/components/ui/ScrollVelocity";
import { ZoomParallax, type ZoomMediaAsset } from "@/components/ui/zoom-parallax";
import { StaggeredMenu } from "@/components/ui/StaggeredMenu";
import { ProjectModal } from "@/components/ui/ProjectModal";
import ScrollFloat from "@/components/ui/ScrollFloat";
import type { SiteLanguage } from "@/lib/site-language";

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

const portfolioCopy = {
  "pt-BR": {
    menuToggle: {
      menu: "Menu",
      close: "Fechar",
      openAria: "Abrir menu",
      closeAria: "Fechar menu",
    },
    projectAriaLabel: (name: string) => `Ver projeto ${name}`,
    heroText: `Ol\u00E1...${"\u200B".repeat(25)}\n\nMeu nome \u00E9 Jo\u00E3o Pedro,\nE esse \u00E9 meu portf\u00F3lio.`,
    workIntroLead: "conhe\u00E7a meu",
    workIntroAccent: "trabalho",
    impactKicker: "Design de Impacto",
    impactTitle: ["TRANSFORMANDO", "IDEIAS", "EM", "REALIDADE."],
    impactDescription:
      "Meu trabalho foca na intersec\u00E7\u00E3o entre est\u00E9tica moderna e funcionalidade absoluta. Cada projeto \u00E9 uma nova oportunidade de desafiar o comum.",
    projectsButton: "PROJETOS",
    timelineLabel: "Timeline",
    journeyTitle: "minha trajet\u00F3ria",
    sections: {
      education: "Onde Estudei",
      graduation: "Gradua\u00E7\u00E3o",
      career: "Carreira",
    },
    alts: {
      kidPhoto: "Foto de inf\u00E2ncia no computador",
      pinheirosLogo: "Logo do Col\u00E9gio Pinheiros",
      motivoLogo: "Logo do Col\u00E9gio Motivo",
      graduationPhoto: "Foto da gradua\u00E7\u00E3o",
      graduationOverlay: "Moldura da semana de imers\u00E3o",
      ajLogo: "Logo AJ",
      webStarLogo: "Logo W",
    },
    educationCards: {
      pinheirosName: "Escola Pinheiro",
      pinheirosLevel: "Ensino Fundamental",
      motivoName: "Col\u00E9gio Motivo",
      motivoLevel: "Ensino M\u00E9dio",
    },
    career: {
      first: {
        role: "Desenvolvedor de software",
        company: "AJ Solu\u00E7\u00F5es & Sistemas \u00B7 Est\u00E1gio",
        title: "Primeiro Est\u00E1gio",
        period: "Agosto - Novembro",
        note: "Primeiro est\u00E1gio",
      },
      second: {
        title: "Segundo Est\u00E1gio",
        period: "Fevereiro - Hoje",
        note: "A jornada continua",
        role: "Desenvolvedor full stack",
        company: "Web Star Studio \u00B7 Est\u00E1gio",
      },
    },
    finalCta: {
      titleTop: "O pr\u00F3ximo cap\u00EDtulo",
      titleAccent: "ainda est\u00E1 em aberto.",
      description:
        "Estou dispon\u00EDvel e em busca de novos desafios.\nQue tal escrevermos juntos?",
    },
  },
  "en-US": {
    menuToggle: {
      menu: "Menu",
      close: "Close",
      openAria: "Open menu",
      closeAria: "Close menu",
    },
    projectAriaLabel: (name: string) => `View ${name} project`,
    heroText: `Hello...${"\u200B".repeat(25)}\n\nMy name is Jo\u00E3o Pedro,\nAnd this is my portfolio.`,
    workIntroLead: "discover my",
    workIntroAccent: "work",
    impactKicker: "Impact Design",
    impactTitle: ["TURNING", "IDEAS", "INTO", "REALITY."],
    impactDescription:
      "My work lives at the intersection of modern aesthetics and absolute functionality. Every project is a new chance to challenge the ordinary.",
    projectsButton: "PROJECTS",
    timelineLabel: "Timeline",
    journeyTitle: "my journey",
    sections: {
      education: "Where I Studied",
      graduation: "Higher Education",
      career: "Career",
    },
    alts: {
      kidPhoto: "Childhood photo at the computer",
      pinheirosLogo: "Colegio Pinheiros logo",
      motivoLogo: "Colegio Motivo logo",
      graduationPhoto: "Graduation photo",
      graduationOverlay: "Immersion week frame",
      ajLogo: "AJ logo",
      webStarLogo: "W logo",
    },
    educationCards: {
      pinheirosName: "Escola Pinheiro",
      pinheirosLevel: "Elementary School",
      motivoName: "Col\u00E9gio Motivo",
      motivoLevel: "High School",
    },
    career: {
      first: {
        role: "Software developer",
        company: "AJ Solu\u00E7\u00F5es & Sistemas \u00B7 Internship",
        title: "First Internship",
        period: "August - November",
        note: "First internship",
      },
      second: {
        title: "Second Internship",
        period: "February - Today",
        note: "The journey continues",
        role: "Full-stack developer",
        company: "Web Star Studio \u00B7 Internship",
      },
    },
    finalCta: {
      titleTop: "The next chapter",
      titleAccent: "is still unwritten.",
      description:
        "I am available and looking for new challenges.\nWhat if we build it together?",
    },
  },
} as const;

interface PortfolioPageProps {
  language: SiteLanguage;
}

export default function PortfolioPage({ language }: PortfolioPageProps) {
  const [projectsMenuOpen, setProjectsMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const copy = portfolioCopy[language];

  const projectMenuItems = [
    { label: "Delusional", ariaLabel: copy.projectAriaLabel("Delusional"), link: "#", onClick: (e: React.MouseEvent) => { e.preventDefault(); handleOpenProject("Delusional"); } },
    { label: "Petfeeder", ariaLabel: copy.projectAriaLabel("Petfeeder"), link: "#", onClick: (e: React.MouseEvent) => { e.preventDefault(); handleOpenProject("Petfeeder"); } },
    { label: "Dr Daniel", ariaLabel: copy.projectAriaLabel("Dr Daniel"), link: "#", onClick: (e: React.MouseEvent) => { e.preventDefault(); handleOpenProject("Dr Daniel"); } },
    { label: "Dr Guilherme", ariaLabel: copy.projectAriaLabel("Dr Guilherme"), link: "#", onClick: (e: React.MouseEvent) => { e.preventDefault(); handleOpenProject("Dr Guilherme"); } },
    { label: "APP FLY", ariaLabel: copy.projectAriaLabel("APP FLY"), link: "#", onClick: (e: React.MouseEvent) => { e.preventDefault(); handleOpenProject("APP FLY"); } },
    { label: "Stephanie", ariaLabel: copy.projectAriaLabel("Stephanie"), link: "#", onClick: (e: React.MouseEvent) => { e.preventDefault(); handleOpenProject("Stephanie"); } },
  ];

  const handleOpenProject = (name: string) => {
    setSelectedProject(name);
    setProjectsMenuOpen(false);
    // Pequeno delay para o menu começar a fechar antes do modal aparecer
    setTimeout(() => {
      setModalOpen(true);
    }, 400);
  };

  const { scrollY } = useScroll();

  const timelineSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: timelineSectionRef,
    offset: ["start 0.9", "end 0.1"],
  });
  const timelineLineHeight = useTransform(timelineScrollProgress, [0, 1], ["0%", "100%"]);

  // Terminal background parallax and cinematic blur
  // Moves down slightly slower than the scroll (Parallax), scales up, blurs, and fades lightly.
  const terminalY = useTransform(scrollY, [0, 800], [0, 300]);
  const terminalScale = useTransform(scrollY, [0, 600], [1, 1.15]);
  const terminalBlur = useTransform(scrollY, [0, 600], ["blur(0px)", "blur(16px)"]);
  const terminalOpacity = useTransform(scrollY, [0, 800], [1, 0.4]); 

  // Text scrolls UP much faster than the page, fading out early
  const textY = useTransform(scrollY, [0, 400], [0, -120]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="w-full bg-black text-white min-h-[300vh]">
      <StaggeredMenu
        position="left"
        items={projectMenuItems}
        displaySocials={false}
        displayItemNumbering={false}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#ffffff"
        changeMenuColorOnOpen={true}
        colors={["#D7F6D0", "#A7EF9E"]}
        logoUrl="/jp-mark.svg"
        accentColor="#7AD06A"
        isFixed
        hideToggleButton
        controlledOpen={projectsMenuOpen}
        onMenuClose={() => setProjectsMenuOpen(false)}
        toggleLabels={copy.menuToggle}
      />

      <ProjectModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        projectName={selectedProject} 
        language={language}
      />

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Terminal Background Layer securely masked by CSS to prevent harsh edges */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
          <motion.div 
            className="absolute inset-0 w-full h-full origin-center"
            style={{
              y: terminalY,
              scale: terminalScale,
              filter: terminalBlur,
              opacity: terminalOpacity,
            }}
          >
            <FaultyTerminal
              scale={1.5}
              gridMul={[2, 1]}
              digitSize={1.2}
              timeScale={0.5}
              pause={false}
              scanlineIntensity={0.5}
              glitchAmount={1}
              flickerAmount={1}
              noiseAmp={1}
              chromaticAberration={0}
              dither={0}
              curvature={0.1}
              tint="#A7EF9E"
              mouseReact={true}
              mouseStrength={0.5}
              pageLoadAnimation
              brightness={0.6}
            />
          </motion.div>
        </div>

        {/* Text Layer */}
        <motion.div 
          className="relative z-10 pointer-events-none px-6 w-full flex items-center justify-center text-center"
          style={{
            y: textY,
            opacity: textOpacity,
          }}
        >
          <TextType
            text={copy.heroText}
            typingSpeed={65}
            loop={false}
            showCursor
            cursorCharacter="_"
            cursorBlinkDuration={0.4}
            className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.04em] text-white drop-shadow-2xl leading-[1.25]"
          />
        </motion.div>
      </section>

      {/* Marquee Infinite Scroll Separator */}
      <section className="w-full relative z-20 bg-black pt-12 pb-12">
        <ScrollVelocity
          texts={['HTML5', 'CSS3', 'React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Vite']} 
          velocity={65}
          className="text-[#A7EF9E] mr-12 text-6xl md:text-8xl tracking-tighter uppercase font-black opacity-90"
        />
      </section>

      {/* Work Showcase Title */}
      <section className="relative w-full z-20 flex flex-col items-center pt-24 pb-0">
        <motion.div 
          className="max-w-4xl text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tighter text-white drop-shadow-xl">
            {copy.workIntroLead} <span className="text-[#A7EF9E]">{copy.workIntroAccent}</span>
          </h2>
        </motion.div>
      </section>

      {/* Zoom Parallax — LAST section, image zooms to fill screen as finale */}
      <ZoomParallax lockThreshold={0.8} images={portfolioZoomImages} />

      {/* New Section following the Zoom Parallax — The expanded photo acts as the transition/hero */}
      <section className="relative z-30 w-full min-h-screen bg-black flex flex-col items-center justify-center px-6 py-24">
        <motion.div 
          className="max-w-4xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-[#A7EF9E] font-mono text-sm uppercase tracking-widest mb-4 block">{copy.impactKicker}</span>
          <h2 className="text-5xl md:text-8xl font-sans font-black tracking-tighter text-white mb-8 leading-[0.9]">
            {copy.impactTitle[0]} <br/> <span className="text-[#A7EF9E]">{copy.impactTitle[1]}</span> {copy.impactTitle[2]} <br/> {copy.impactTitle[3]}
          </h2>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {copy.impactDescription}
          </p>
          <div className="mt-16 flex justify-center">
            <button
              type="button"
              onClick={() => setProjectsMenuOpen((current) => !current)}
              className="px-16 md:px-24 py-6 md:py-8 bg-[#A7EF9E] text-black text-xl md:text-2xl font-black uppercase tracking-widest transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(167,239,158,0.3)] shadow-xl"
            >
              {copy.projectsButton}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Trajetória Section */}
      <section ref={timelineSectionRef} className="relative z-30 w-full bg-zinc-950 overflow-hidden">

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#A7EF9E]/5 blur-[200px] rounded-full" />
        </div>

        {/* Title */}
        <div className="relative z-10 flex flex-col items-center pt-32 pb-24 px-6">
          <motion.span
            className="font-mono text-xs uppercase tracking-[0.5em] text-[#A7EF9E] mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {copy.timelineLabel}
          </motion.span>
          <ScrollFloat
            animationDuration={1.5}
            ease="expo.out"
            scrollStart="top center+=40%"
            scrollEnd="bottom center-=20%"
            stagger={0.04}
            containerClassName="text-center"
            textClassName="text-[clamp(2.5rem,8vw,7rem)] italic font-black tracking-[-0.04em] text-white leading-none uppercase"
          >
            {copy.journeyTitle}
          </ScrollFloat>
          <motion.div
            className="mt-6 h-px bg-[#A7EF9E]/40 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            style={{ width: "8rem" }}
          />
        </div>

        {/* Timeline body */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-40">

          {/* Vertical line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px overflow-hidden"
            style={{
              background:
                "linear-gradient(to bottom, rgba(39,39,42,1) 0%, rgba(39,39,42,1) 86%, rgba(39,39,42,0) 100%)",
            }}
          >
            <motion.div
              className="w-full origin-top"
              style={{
                height: timelineLineHeight,
                background:
                  "linear-gradient(to bottom, rgba(167,239,158,1) 0%, rgba(167,239,158,1) 82%, rgba(167,239,158,0) 100%)",
              }}
            />
          </div>

          {/* ─── ONDE ESTUDEI ─── */}
          <div className="relative mb-32">
            {/* Section marker */}
            <motion.div
              className="flex flex-col items-center gap-3 mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-4 h-4 rounded-full bg-[#A7EF9E] shadow-[0_0_16px_rgba(167,239,158,0.6)] border-2 border-zinc-950" />
              <div className="px-5 py-1.5 border border-[#A7EF9E]/30 bg-zinc-950">
                <span className="font-mono text-[#A7EF9E] text-xs uppercase tracking-[0.35em]">{copy.sections.education}</span>
              </div>
            </motion.div>

            {/* Content: photo left, cards right */}
            <div className="grid grid-cols-2 gap-0 items-center">
              {/* Left: photo */}
              <motion.div
                className="flex justify-end pr-16"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="w-56 h-72 bg-zinc-800 border border-zinc-700 overflow-hidden">
                  <img
                    src="/assets/kid.JPG"
                    alt={copy.alts.kidPhoto}
                    className="w-full h-full object-cover object-[35%_center]"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              {/* Right: 2 cards */}
              <motion.div
                className="flex flex-col gap-5 pl-16"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              >
                {/* Card 1 */}
                <div className="border border-zinc-700 bg-zinc-900/60 p-6 flex items-center gap-5 hover:border-[#A7EF9E]/40 transition-colors duration-300">
                  <div className="w-16 h-16 bg-white rounded-sm flex-shrink-0 flex items-center justify-center overflow-hidden p-1">
                    <img
                      src="/assets/colegio-pinheiros-logo.svg"
                      alt={copy.alts.pinheirosLogo}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg leading-tight">{copy.educationCards.pinheirosName}</p>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider mt-1">{copy.educationCards.pinheirosLevel}</p>
                  </div>
                </div>
                {/* Card 2 */}
                <div className="border border-zinc-700 bg-zinc-900/60 p-6 flex items-center gap-5 hover:border-[#A7EF9E]/40 transition-colors duration-300">
                  <div className="w-16 h-16 bg-white rounded-sm flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src="/assets/colegio-motivo-logo.svg"
                      alt={copy.alts.motivoLogo}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg leading-tight">{copy.educationCards.motivoName}</p>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider mt-1">{copy.educationCards.motivoLevel}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ─── GRADUAÇÃO ─── */}
          <div className="relative mb-32">
            {/* Section marker */}
            <motion.div
              className="flex flex-col items-center gap-3 mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-4 h-4 rounded-full bg-[#A7EF9E] shadow-[0_0_16px_rgba(167,239,158,0.6)] border-2 border-zinc-950" />
              <div className="px-5 py-1.5 border border-[#A7EF9E]/30 bg-zinc-950">
                <span className="font-mono text-[#A7EF9E] text-xs uppercase tracking-[0.35em]">{copy.sections.graduation}</span>
              </div>
            </motion.div>

            {/* Content: two photos left, empty right */}
            <div className="grid grid-cols-2 gap-0 items-start">
              {/* Left: two stacked photos (aesthetic offset) */}
              <motion.div
                className="flex justify-end pr-16"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="relative w-[17rem] h-[18rem]">
                  {/* Back photo — rotated, offset */}
                  {/* Graduation photo */}
                  <div className="absolute right-0 bottom-0 w-48 h-64 bg-zinc-800/80 border border-zinc-600 overflow-hidden">
                    <img
                      src="/assets/graduacao-photo.jpg"
                      alt={copy.alts.graduationPhoto}
                      className="w-full h-full object-cover object-center [image-orientation:from-image]"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -top-8 -left-5 z-10 pointer-events-none w-44">
                    <img
                      src="/assets/graduacao-overlay.png"
                      alt={copy.alts.graduationOverlay}
                      className="w-full h-auto object-contain -rotate-[6deg] drop-shadow-[16px_18px_16px_rgba(0,0,0,0.62)]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Right: intentionally empty */}
              <div className="pl-16" />
            </div>
          </div>

          {/* ─── PROFISSIONAL ─── */}
          <div className="relative mb-16">
            {/* Section marker */}
            <motion.div
              className="flex flex-col items-center gap-3 mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-4 h-4 rounded-full bg-[#A7EF9E] shadow-[0_0_16px_rgba(167,239,158,0.6)] border-2 border-zinc-950" />
              <div className="px-5 py-1.5 border border-[#A7EF9E]/30 bg-zinc-950">
                <span className="font-mono text-[#A7EF9E] text-xs uppercase tracking-[0.35em]">{copy.sections.career}</span>
              </div>
            </motion.div>

            {/* 2025 — branch LEFT */}
            <div className="relative grid grid-cols-2 gap-0 items-center py-10">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#A7EF9E] border-2 border-zinc-950 shadow-[0_0_12px_rgba(167,239,158,0.5)] z-10" />
              <motion.div
                className="flex items-center justify-end gap-5 pr-6"
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-36 flex-shrink-0 flex flex-col items-center text-center">
                    <div className="w-14 h-14 overflow-hidden rounded-xl shadow-[0_12px_24px_rgba(0,0,0,0.35)]">
                      <img
                        src="/assets/aj-logo.svg"
                        alt={copy.alts.ajLogo}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-3 text-zinc-200 text-[11px] leading-tight">
                      {copy.career.first.role}
                    </p>
                    <p className="mt-1 text-zinc-500 text-[10px] leading-tight">
                      {copy.career.first.company}
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="text-[#A7EF9E] font-mono text-xs uppercase tracking-widest block mb-1">{copy.career.first.title}</span>
                    <span className="text-white font-black text-4xl md:text-5xl leading-none">2025</span>
                    <p className="text-[#A7EF9E] font-mono text-[10px] uppercase tracking-widest mt-1">{copy.career.first.period}</p>
                    <p className="text-zinc-400 text-sm mt-2 max-w-[200px]">{copy.career.first.note}</p>
                  </div>
                </div>
                {/* branch line → right toward center */}
                <motion.div
                  className="h-px bg-[#A7EF9E] flex-shrink-0 origin-right"
                  style={{ width: "2.5rem" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </motion.div>
              <div />
            </div>

            {/* 2026 — branch RIGHT */}
            <div className="relative grid grid-cols-2 gap-0 items-center py-10">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#A7EF9E] border-2 border-zinc-950 shadow-[0_0_12px_rgba(167,239,158,0.5)] z-10" />
              <div />
              <motion.div
                className="flex items-center gap-5 pl-6"
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* branch line ← left toward center */}
                <motion.div
                  className="h-px bg-[#A7EF9E] flex-shrink-0 origin-left"
                  style={{ width: "2.5rem" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
                <div className="flex items-start gap-4">
                  <div className="text-center">
                    <span className="text-[#A7EF9E] font-mono text-xs uppercase tracking-widest block mb-1">{copy.career.second.title}</span>
                    <span className="text-white font-black text-4xl md:text-5xl leading-none">2026</span>
                    <p className="text-[#A7EF9E] font-mono text-[10px] uppercase tracking-widest mt-1">{copy.career.second.period}</p>
                    <p className="text-zinc-400 text-sm mt-2 max-w-[200px]">{copy.career.second.note}</p>
                  </div>
                  <div className="w-36 flex-shrink-0 flex flex-col items-center text-center">
                    <div className="w-14 h-14 overflow-hidden rounded-xl shadow-[0_12px_24px_rgba(0,0,0,0.35)]">
                      <img
                        src="/assets/w-symbol-logo.svg"
                        alt={copy.alts.webStarLogo}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-3 text-zinc-200 text-[11px] leading-tight">
                      {copy.career.second.role}
                    </p>
                    <p className="mt-1 text-zinc-500 text-[10px] leading-tight">
                      {copy.career.second.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ─── END: CTA ─── */}
          <motion.div
            className="flex flex-col items-center pt-10 pb-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Pulsing dot — end of line */}
            <div className="relative flex items-center justify-center w-8 h-8 mb-8">
              <div className="absolute w-8 h-8 rounded-full bg-[#A7EF9E]/30 animate-ping" />
              <div className="absolute w-5 h-5 rounded-full bg-[#A7EF9E]/20 animate-ping [animation-delay:0.3s]" />
              <div className="relative w-4 h-4 rounded-full bg-[#A7EF9E] shadow-[0_0_20px_rgba(167,239,158,0.8)]" />
            </div>

            <span className="font-mono text-[#A7EF9E] text-xs uppercase tracking-[0.4em] mb-5 opacity-70">
              ???
            </span>
            <h3 className="text-4xl md:text-6xl font-black text-white text-center leading-[1] tracking-tighter mb-4">
              {copy.finalCta.titleTop}<br />
              <span className="text-[#A7EF9E] italic">{copy.finalCta.titleAccent}</span>
            </h3>
            <p className="text-zinc-500 text-base md:text-lg text-center max-w-sm mt-4 leading-relaxed">
              {copy.finalCta.description.split("\n")[0]}<br />
              {copy.finalCta.description.split("\n")[1]}
            </p>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
