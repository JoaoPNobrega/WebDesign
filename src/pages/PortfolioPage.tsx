import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FaultyTerminal from "@/components/ui/FaultyTerminal";
import TextType from "@/components/ui/TextType";
import ScrollVelocity from "@/components/ui/ScrollVelocity";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { StaggeredMenu } from "@/components/ui/StaggeredMenu";

const portfolioZoomImages = [
  {
    type: "video",
    src: "/portfolio-sites/site-01-opening.mp4",
    posterSrc: "/portfolio-sites/site-01-opening-poster.jpg",
    fallbackSrc: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80",
    alt: "Center site preview",
  },
  {
    type: "video",
    src: "/portfolio-sites/site-02-top-left.mp4",
    posterSrc: "/portfolio-sites/site-02-top-left-poster.jpg",
    fallbackSrc: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80",
    alt: "Top left site preview",
  },
  {
    type: "video",
    src: "/portfolio-sites/site-03-left-tall.mp4",
    posterSrc: "/portfolio-sites/site-03-left-tall-poster.jpg",
    fallbackSrc: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80",
    alt: "Left tall site preview",
  },
  {
    type: "video",
    src: "/portfolio-sites/site-04-center-right.mp4",
    posterSrc: "/portfolio-sites/site-04-center-right-poster.jpg",
    fallbackSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80",
    alt: "Center right site preview",
  },
  {
    type: "video",
    src: "/portfolio-sites/site-05-bottom-left.mp4",
    posterSrc: "/portfolio-sites/site-05-bottom-left-poster.jpg",
    fallbackSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80",
    alt: "Bottom left site preview",
  },
  {
    type: "video",
    src: "/portfolio-sites/site-06-bottom-wide.mp4",
    posterSrc: "/portfolio-sites/site-06-bottom-wide-poster.jpg",
    fallbackSrc: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80",
    alt: "Bottom wide site preview",
  },
  {
    type: "video",
    src: "/portfolio-sites/site-07-final-zoom.mp4",
    posterSrc: "/portfolio-sites/site-07-final-zoom-poster.jpg",
    fallbackSrc: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80",
    alt: "Final zoom site preview",
  },
] as const;

const projectMenuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "Cracha", ariaLabel: "View the 3D badge project", link: "/cracha" },
  { label: "Destroy", ariaLabel: "View the destruction experiment", link: "/destruction" },
  { label: "Page 67", ariaLabel: "View the Page 67 project", link: "/67" },
] as const;

export default function PortfolioPage() {
  const [projectsMenuOpen, setProjectsMenuOpen] = useState(false);

  const { scrollY } = useScroll();

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
        items={[...projectMenuItems]}
        displaySocials={false}
        displayItemNumbering={true}
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
            text={`Olá...${"\u200B".repeat(25)}\n\nMeu nome é João Pedro,\nE esse é meu portfólio.`}
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
            conheça meu <span className="text-[#A7EF9E]">trabalho</span>
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
          <span className="text-[#A7EF9E] font-mono text-sm uppercase tracking-widest mb-4 block">Design de Impacto</span>
          <h2 className="text-5xl md:text-8xl font-sans font-black tracking-tighter text-white mb-8 leading-[0.9]">
            TRANSFORMANDO <br/> <span className="text-[#A7EF9E]">IDEIAS</span> EM <br/> REALIDADE.
          </h2>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Meu trabalho foca na intersecção entre estética moderna e funcionalidade absoluta. Cada projeto é uma nova oportunidade de desafiar o comum.
          </p>
          <div className="mt-12 flex gap-4 justify-center">
            <button
              type="button"
              onClick={() => setProjectsMenuOpen((current) => !current)}
              className="px-8 py-4 bg-[#A7EF9E] text-black font-bold uppercase tracking-tighter transition-transform hover:scale-105"
            >
              PROJETOS
            </button>
            <button className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-tighter transition-all hover:bg-white/10">
              Contato
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
