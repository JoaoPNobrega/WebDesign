import { useEffect, useRef, useState } from "react";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { useLang, type LocalizedText } from "@/lib/i18n";
import ShinyText from "@/components/ui/ShinyText";

type TimelineItem = {
  label: LocalizedText;
  title: LocalizedText;
  text: LocalizedText;
  logo: string;
  logoClassName?: string;
  anchorId?: string;
};

const timelineItems: TimelineItem[] = [
  {
    label: { "pt-BR": "2022 · Formação", "en-US": "2022 · Education" },
    title: {
      "pt-BR": "A base: Ciência da Computação",
      "en-US": "The foundation: Computer Science",
    },
    text: {
      "pt-BR":
        "Bacharelado em andamento na CESAR School, em Recife. Onde a lógica, os fundamentos e a vontade de construir coisas viraram profissão.",
      "en-US":
        "Bachelor's in progress at CESAR School, in Recife. Where logic, fundamentals and the urge to build things became a profession.",
    },
    logo: "/assets/cesar-school-logo.png",
    anchorId: "education",
  },
  {
    label: { "pt-BR": "Set 2025 · Estágio", "en-US": "Sep 2025 · Internship" },
    title: {
      "pt-BR": "Primeiro contato com o mercado",
      "en-US": "First taste of the market",
    },
    text: {
      "pt-BR":
        "Desenvolvedor de software na AJ Soluções & Sistemas: desenvolvimento, automações N8N e planilhas VBA. O começo prático de tudo.",
      "en-US":
        "Software developer at AJ Soluções & Sistemas: development, N8N automations and VBA spreadsheets. Where the hands-on part began.",
    },
    logo: "/assets/aj-logo.svg",
  },
  {
    label: { "pt-BR": "Fev 2026 · Estágio", "en-US": "Feb 2026 · Internship" },
    title: {
      "pt-BR": "Web Star Studio, full stack",
      "en-US": "Web Star Studio, full stack",
    },
    text: {
      "pt-BR":
        "Desenvolvimento e manutenção de sites, com foco em layouts responsivos, front-end e identidade visual. Atualmente em andamento.",
      "en-US":
        "Building and maintaining websites, focused on responsive layouts, front-end and visual identity. Currently ongoing.",
    },
    logo: "/assets/webstar-logo-new.png",
    logoClassName: "max-h-8 max-w-[78%]",
  },
  {
    label: { "pt-BR": "Abr 2026 · Freelance", "en-US": "Apr 2026 · Freelance" },
    title: {
      "pt-BR": "Autônomo, do briefing à entrega",
      "en-US": "Self-employed, briefing to delivery",
    },
    text: {
      "pt-BR":
        "Criação de sites e landing pages sob demanda para clientes — direção visual, front-end e acabamento. Cada projeto, de ponta a ponta.",
      "en-US":
        "Building websites and landing pages on demand for clients — visual direction, front-end and polish. Each project, end to end.",
    },
    logo: "/assets/delusional-logo.png",
    logoClassName: "max-h-8 max-w-[68%]",
  },
];

const spokenLanguages: { name: LocalizedText; level: LocalizedText }[] = [
  { name: { "pt-BR": "Português", "en-US": "Portuguese" }, level: { "pt-BR": "Nativo", "en-US": "Native" } },
  { name: { "pt-BR": "Inglês", "en-US": "English" }, level: { "pt-BR": "Avançado", "en-US": "Advanced" } },
];

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return desktop;
}

export default function StoryTimeline() {
  const { tx } = useLang();
  const ref = useRef<HTMLElement>(null);
  const desktop = useIsDesktop();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.6 });
  const leftX = useTransform(smooth, [0, 1], ["0%", "40%"]);
  const rightX = useTransform(smooth, [0, 1], ["0%", "-40%"]);
  const titleOpacity = useTransform(smooth, [0, 0.96], [1, 0]);

  return (
    <section
      id="experience"
      ref={ref}
      aria-label={tx({ "pt-BR": "Minha trajetória", "en-US": "My journey" })}
      className="relative bg-transparent text-white md:min-h-[2350px]"
    >
      <div className="mx-auto max-w-[1440px] px-6 pt-28 sm:px-8 md:px-12 md:pt-36">
        {/* Título que se separa no scroll */}
        <div className="z-0 mt-10 flex justify-between md:sticky md:top-1/2 md:mt-0 md:-translate-y-1/2">
          <motion.h2
            style={desktop ? { x: leftX, opacity: titleOpacity } : undefined}
            className="text-[2.6rem] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-white md:text-[clamp(3rem,8vw,6.5rem)]"
          >
            Primeiros
          </motion.h2>
          <motion.h2
            style={desktop ? { x: rightX, opacity: titleOpacity } : undefined}
            className="text-[2.6rem] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-white md:text-[clamp(3rem,8vw,6.5rem)]"
          >
            Passos
          </motion.h2>
        </div>

        {/* Linha + cards */}
        <div className="relative z-10 mt-16 md:mt-32 md:min-h-[1750px]">
          <AnimatedStoryLine />
          {timelineItems.map((item, index) => (
            <StoryCard key={item.title["pt-BR"]} item={item} index={index} tx={tx} />
          ))}
          <LanguagesCard index={timelineItems.length} />
        </div>
      </div>
    </section>
  );
}

function AnimatedStoryLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 88%", "end 12%"],
  });
  const pathLength = useSpring(useTransform(scrollYProgress, [0, 0.9], [0, 1]), {
    stiffness: 55,
    damping: 22,
    mass: 0.7,
  });

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <svg
        className="hidden h-full w-full md:block"
        viewBox="0 0 1000 3320"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="story-line-grad" gradientUnits="userSpaceOnUse" x1="500" y1="20" x2="500" y2="3320">
            <stop offset="0%" stopColor="#A7EF9E" stopOpacity="0" />
            <stop offset="7%" stopColor="#A7EF9E" stopOpacity="0.85" />
            <stop offset="82%" stopColor="#A7EF9E" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#A7EF9E" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M -180 135 L 355 135 C 720 135, 890 380, 805 720 C 725 1040, 220 1140, 220 1480 C 220 1840, 790 1930, 770 2260 C 750 2580, 355 2700, 430 3300"
          stroke="url(#story-line-grad)"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength, filter: "drop-shadow(0 0 10px rgba(167,239,158,0.4))" }}
        />
      </svg>

      <svg
        className="h-full w-full md:hidden"
        viewBox="0 0 390 2700"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="story-line-grad-m" gradientUnits="userSpaceOnUse" x1="195" y1="0" x2="195" y2="2700">
            <stop offset="0%" stopColor="#A7EF9E" stopOpacity="0" />
            <stop offset="8%" stopColor="#A7EF9E" stopOpacity="0.8" />
            <stop offset="88%" stopColor="#A7EF9E" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#A7EF9E" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M -40 90 C 280 90, 360 240, 310 520 C 260 800, 60 850, 80 1140 C 100 1430, 340 1500, 305 1790 C 270 2080, 90 2170, 150 2690"
          stroke="url(#story-line-grad-m)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}

const positions = ["md:ml-[8%]", "md:ml-auto md:mr-[8%]", "md:ml-[14%]", "md:ml-auto md:mr-[2%]", "md:mx-auto"];

function StoryCard({
  item,
  index,
  tx,
}: {
  item: TimelineItem;
  index: number;
  tx: ReturnType<typeof useLang>["tx"];
}) {
  return (
    <motion.article
      id={item.anchorId}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative z-10 mb-6 w-full overflow-hidden rounded-2xl bg-white/[0.035] p-6 ring-1 ring-white/10 backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.06] hover:ring-white/20 sm:p-7 md:mb-[8rem] md:w-[25rem] ${positions[index]} ${item.anchorId ? "scroll-mt-24" : ""}`}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#A7EF9E]/[0.07] blur-3xl transition-opacity duration-500 group-hover:bg-[#A7EF9E]/[0.12]" />

      {/* header: logo (sem moldura) + período */}
      <div className="relative mb-6 flex items-center justify-between gap-4">
        <img
          src={item.logo}
          alt=""
          loading="lazy"
          className={`w-auto object-contain object-left ${item.logoClassName ?? "max-h-9 max-w-[60%]"}`}
        />
        <span className="shrink-0 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#A7EF9E]">
          {tx(item.label)}
        </span>
      </div>

      <h3 className="relative text-xl font-bold leading-snug tracking-[-0.02em] text-white sm:text-[1.4rem]">
        {tx(item.title)}
      </h3>
      <p className="relative mt-3 text-[0.9rem] leading-relaxed text-white/60">{tx(item.text)}</p>

      <div className="relative mt-6 h-px w-full bg-gradient-to-r from-[#A7EF9E]/40 via-white/10 to-transparent" />
    </motion.article>
  );
}

function LanguagesCard({ index }: { index: number }) {
  const { tx } = useLang();
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative z-10 mb-6 w-full overflow-hidden rounded-2xl bg-white/[0.035] p-6 ring-1 ring-white/10 backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.06] hover:ring-white/20 sm:p-7 md:mb-0 md:w-[25rem] ${positions[index]}`}
    >
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-44 w-44 rounded-full bg-[#A7EF9E]/[0.07] blur-3xl" />

      <div className="relative mb-6 flex items-center justify-between gap-3">
        <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/75">
          {tx({ "pt-BR": "Idiomas", "en-US": "Languages" })}
        </span>
        <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#A7EF9E]">
          {tx({ "pt-BR": "Hoje", "en-US": "Today" })}
        </span>
      </div>

      <h3 className="relative text-xl font-bold leading-snug tracking-[-0.02em] text-white sm:text-[1.4rem]">
        {tx({ "pt-BR": "Comunicação sem barreiras", "en-US": "Communication without barriers" })}
      </h3>
      <ul className="relative mt-5 flex flex-col gap-2.5">
        {spokenLanguages.map((language) => (
          <li
            key={language.name["pt-BR"]}
            className="flex items-center justify-between rounded-xl bg-black/20 px-4 py-3.5 ring-1 ring-inset ring-white/[0.06]"
          >
            <span className="font-semibold text-white">{tx(language.name)}</span>
            <ShinyText
              text={tx(language.level)}
              speed="2.6s"
              className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] [filter:drop-shadow(0_0_8px_rgba(167,239,158,0.55))]"
            />
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
