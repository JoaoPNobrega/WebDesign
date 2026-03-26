import { motion, useScroll, useTransform } from "framer-motion";
import FaultyTerminal from "@/components/ui/FaultyTerminal";
import TextType from "@/components/ui/TextType";
import ScrollVelocity from "@/components/ui/ScrollVelocity";
import { ZoomParallax } from "@/components/ui/zoom-parallax";

export default function PortfolioPage() {

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
    <div className="w-full bg-black text-white min-h-[200vh]">
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
      <ZoomParallax images={[
        {
          src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
          alt: 'Modern architecture building',
        },
        {
          src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
          alt: 'Urban cityscape at sunset',
        },
        {
          src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
          alt: 'Abstract geometric pattern',
        },
        {
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
          alt: 'Mountain landscape',
        },
        {
          src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
          alt: 'Minimalist design elements',
        },
        {
          src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
          alt: 'Ocean waves and beach',
        },
        {
          src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
          alt: 'Forest trees and sunlight',
        },
      ]} />
    </div>
  );
}
