import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TrajetoriaScrollytelling from "@/components/ui/TrajetoriaScrollytelling";
import FaultyTerminal from "@/components/ui/FaultyTerminal";
import TextType from "@/components/ui/TextType";
import ScrollVelocity from "@/components/ui/ScrollVelocity";
import { ZoomParallax, type ZoomMediaAsset } from "@/components/ui/zoom-parallax";
import { StaggeredMenu } from "@/components/ui/StaggeredMenu";
import { ProjectModal } from "@/components/ui/ProjectModal";
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

// Stable reference — prevents FaultyTerminal from recreating its WebGL context
// on every PortfolioPage re-render (state changes from menu/modal open).
const TERMINAL_GRID_MUL: [number, number] = [2, 1];

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

  // Terminal background: subtle parallax + gentle scale + soft blur + light fade.
  // Range extended so the effect spreads across the full hero scroll distance (~900px).
  const terminalY       = useTransform(scrollY, [0, 900], [0, 180]);
  const terminalScale   = useTransform(scrollY, [0, 700], [1, 1.10]);
  const terminalBlur    = useTransform(scrollY, [0, 700], ["blur(0px)", "blur(10px)"]);
  const terminalOpacity = useTransform(scrollY, [0, 900], [1, 0.45]);

  // Text rises and fades — starts fading at 50px (not on first tick) for a
  // brief rest, fully gone by 380px so the reveal below has a clean slate.
  const textY      = useTransform(scrollY, [0, 460], [0, -150]);
  const textOpacity = useTransform(scrollY, [50, 380], [1, 0]);

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
              gridMul={TERMINAL_GRID_MUL}
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
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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

      {/* ── Scrollytelling timeline ─────────────────────────────────────── */}
      <TrajetoriaScrollytelling copy={copy} />
    </div>
  );
}
