import { type SVGProps, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Cloud, ExternalLink, Mail, Menu, Monitor, Server, X, type LucideIcon } from "lucide-react";

import DestructionSection from "@/components/DestructionSection";
import CvModal from "@/components/ui/CvModal";
import TagSphere, { type Accent } from "@/components/ui/TagSphere";
import { useLang, type LocalizedText } from "@/lib/i18n";
import { copy } from "@/lib/portfolio-copy";
import type { SiteLanguage } from "@/lib/site-language";

// ── Shared constants / data (duplicated from the desktop page on purpose, so
//    the desktop file is never touched). Text lives in portfolio-copy.ts; only
//    the structural data is mirrored here. ───────────────────────────────────
const GITHUB_URL = "https://github.com/JoaoPNobrega";
const CV_PDF_URL = "/curriculo-joao-pedro.pdf";
const CV_DOWNLOAD_NAME = "Curriculo_Joao_Pedro.pdf";
const HERO_IMAGE = "/portfolio/hero-risk-radar.png";

const PARTNER_URLS: Record<string, string> = {
  "Web Star Studio": "https://www.webstar.studio/",
  "CESAR School": "https://www.cesar.school/",
};

const L = (pt: string, en: string): LocalizedText => ({ "pt-BR": pt, "en-US": en });

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

const contactItems = [
  { label: "GitHub", icon: GithubMark, href: GITHUB_URL },
  { label: "LinkedIn", icon: LinkedinMark, href: "https://linkedin.com/in/joaopedro-nobrega" },
  { label: "Email", icon: Mail, href: "mailto:jpan@cesar.school" },
] as const;

type Project = {
  title: string;
  image: string;
  description: LocalizedText;
  href?: string;
  ctaLabel?: string;
  partner?: string;
  partnerLogo?: string;
  partnerLogoClassName?: string;
};

const projects: Project[] = [
  {
    title: "Dr Guilherme Maia",
    image: "/assets/dr-guilherme-preview.png",
    description: L(
      "Site desenvolvido para o urologista Dr. Guilherme Maia durante meu estágio na Web Star Studio. Uma landing page médica com foco em storytelling, atendimento ao público e simplicidade, fortalecendo a autoridade profissional.",
      "Website built for urologist Dr. Guilherme Maia during my internship at Web Star Studio. A medical landing page focused on storytelling, patient care and simplicity, reinforcing professional authority.",
    ),
    partner: "Web Star Studio",
    href: "https://drguilhermemaia.com.br/",
  },
  {
    title: "FlyHigh",
    image: "/assets/flynotch.png",
    description: L(
      "App web mobile feito para gerenciar partidas e acompanhar estatísticas. Criei para ajudar no vôlei que jogo com meus primos, com inspiração no anime Haikyu!!.",
      "A mobile web app to manage matches and track statistics. I built it for the volleyball games I play with my cousins, inspired by the anime Haikyu!!.",
    ),
  },
  {
    title: "PetFeeder",
    image: "/assets/petfeeder-preview.webp",
    description: L(
      "Alimentador automático inteligente para pets, desenvolvido com ESP32, sensores e atuadores. O projeto integra um dashboard web em tempo real via Firebase, controle local por Access Point e API Gemini para sugerir rotinas de alimentação personalizadas.",
      "A smart automatic pet feeder built with ESP32, sensors and actuators. The project integrates a real-time web dashboard via Firebase, local control through an Access Point and the Gemini API to suggest personalized feeding routines.",
    ),
    href: "https://github.com/JoaoPNobrega/PetFeeder-Front",
    ctaLabel: "GitHub",
    partner: "CESAR School",
    partnerLogo: "/assets/cesar-school-logo.png",
  },
  {
    title: "Dr Daniel Pianetti",
    image: "/assets/daniel-notch.png",
    description: L(
      "Site desenvolvido para o urologista Dr. Daniel Pianetti durante meu estágio na Web Star Studio. A experiência combina logo animada, objeto 3D e uma narrativa visual voltada para cirurgia robótica, tecnologia e confiança.",
      "Website built for urologist Dr. Daniel Pianetti during my internship at Web Star Studio. The experience combines an animated logo, a 3D object and a visual narrative centered on robotic surgery, technology and trust.",
    ),
    partner: "Web Star Studio",
    href: "https://daniel.webstar.studio/",
  },
  {
    title: "Stephanie Bolsoni",
    image: "/assets/stephanie-bolsoni.png",
    description: L(
      "Site desenvolvido para a nutricionista Stephanie Bolsoni durante meu estágio na Web Star Studio. O projeto destaca avaliações em tempo real e uma presença internacional, com atendimento em Dublin e online.",
      "Website built for nutritionist Stephanie Bolsoni during my internship at Web Star Studio. The project highlights real-time reviews and an international presence, with appointments in Dublin and online.",
    ),
    partner: "Web Star Studio",
    href: "https://stephaniebolsoni.com/",
  },
  {
    title: "Izi Solutions",
    image: "/assets/izi-solutions-preview.png",
    description: L(
      "Site desenvolvido para a Izi Solutions durante meu estágio na Web Star Studio. A landing page apresenta serviços de limpeza em São Paulo com uma experiência objetiva, moderna e voltada para conversão.",
      "Website built for Izi Solutions during my internship at Web Star Studio. The landing page presents cleaning services in São Paulo with an objective, modern and conversion-focused experience.",
    ),
    partner: "Web Star Studio",
    href: "https://izisolutions.com.br/",
  },
  {
    title: "Ines Knoden",
    image: "/assets/ines-preview.png",
    description: L(
      "Site desenvolvido para a coach Inês Knoden durante meu estágio na Web Star Studio. O projeto comunica acolhimento, carreira e bem-estar para mulheres, com uma identidade visual elegante e internacional.",
      "Website built for coach Inês Knoden during my internship at Web Star Studio. The project conveys warmth, career and well-being for women, with an elegant, international visual identity.",
    ),
    partner: "Web Star Studio",
    href: "https://ines.webstarstudio.site/",
  },
  {
    title: "Dr Dimas Antunes",
    image: "/assets/dimas-preview.png",
    description: L(
      "Site desenvolvido para o urologista Dr. Dimas Antunes durante meu estágio na Web Star Studio. A experiência reforça autoridade médica, cuidado e clareza para pacientes em Recife.",
      "Website built for urologist Dr. Dimas Antunes during my internship at Web Star Studio. The experience reinforces medical authority, care and clarity for patients in Recife.",
    ),
    partner: "Web Star Studio",
    href: "https://dimas.webstarstudio.site/",
  },
];

const workHistory: {
  role: LocalizedText;
  company: LocalizedText;
  period: LocalizedText;
  description: LocalizedText;
  isCurrent: boolean;
}[] = [
  {
    isCurrent: true,
    role: L("Desenvolvedor full stack", "Full stack developer"),
    company: L("Web Star Studio · Estágio", "Web Star Studio · Internship"),
    period: L("Fevereiro 2026 — Hoje", "February 2026 — Present"),
    description: L(
      "Desenvolvimento e manutenção de sites, com foco em layouts responsivos, front-end e identidade visual.",
      "Building and maintaining websites, focused on responsive layouts, front-end and visual identity.",
    ),
  },
  {
    isCurrent: true,
    role: L("Desenvolvedor web freelancer", "Freelance web developer"),
    company: L("Autônomo", "Self-employed"),
    period: L("Abril 2026 — Hoje", "April 2026 — Present"),
    description: L(
      "Criação de sites e landing pages sob demanda para clientes, do briefing à entrega — direção visual, front-end e acabamento.",
      "Building websites and landing pages on demand for clients, from briefing to delivery — visual direction, front-end and polish.",
    ),
  },
  {
    isCurrent: false,
    role: L("Desenvolvedor de software", "Software developer"),
    company: L("AJ Soluções & Sistemas · Estágio", "AJ Soluções & Sistemas · Internship"),
    period: L("Setembro — Dezembro 2025", "September — December 2025"),
    description: L(
      "Desenvolvimento de software, automações N8N e planilhas VBA.",
      "Software development, N8N automations and VBA spreadsheets.",
    ),
  },
];

const educationInfo = {
  degree: L("Bacharelado em Ciência da Computação", "Bachelor's in Computer Science"),
  school: "CESAR School",
  location: L("Recife, PE · Brasil", "Recife, PE · Brazil"),
  period: L("2022 — em andamento", "2022 — in progress"),
};

const spokenLanguages: { name: LocalizedText; level: LocalizedText }[] = [
  { name: L("Português", "Portuguese"), level: L("Nativo", "Native") },
  { name: L("Inglês", "English"), level: L("Avançado", "Advanced") },
];

const SERIF = "var(--font-sans)";

// ── Building blocks ─────────────────────────────────────────────────────────

function LangSwitch() {
  const { lang, setLang } = useLang();
  const options: { value: SiteLanguage; label: string }[] = [
    { value: "pt-BR", label: "PT" },
    { value: "en-US", label: "EN" },
  ];
  return (
    <div className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] p-0.5">
      {options.map((opt) => {
        const on = lang === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLang(opt.value)}
            aria-pressed={on}
            className={`rounded-full px-2.5 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] transition ${
              on ? "bg-[#A7EF9E] text-[#050505]" : "text-white/55"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function MobileNav({ onOpenCv }: { onOpenCv: () => void }) {
  const { tx } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links: { id: string; label: LocalizedText }[] = [
    { id: "about", label: copy.about.eyebrow },
    { id: "projects", label: copy.nav.projects },
    { id: "skills", label: L("Skills", "Skills") },
    { id: "experience", label: copy.experience.title },
    { id: "education", label: copy.education.eyebrow },
    { id: "contact", label: copy.nav.contact },
  ];

  const go = (id: string) => {
    setOpen(false);
    // let the overlay unmount before scrolling so layout is settled
    window.requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between px-5">
          <button
            type="button"
            onClick={() => scrollToId("top")}
            className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white"
          >
            JP<span className="text-[#A7EF9E]">N</span>
          </button>
          <div className="flex items-center gap-2.5">
            <LangSwitch />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/85 transition active:scale-95"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#050505]/96 backdrop-blur-2xl"
          >
            <div className="flex h-14 items-center justify-between px-5">
              <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-[#A7EF9E]">
                {tx(L("Menu", "Menu"))}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/85 active:scale-95"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex min-h-0 flex-1 flex-col justify-center gap-1 overflow-y-auto px-7">
              {links.map((link, i) => (
                <motion.button
                  key={link.id}
                  type="button"
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => go(link.id)}
                  className="border-b border-white/[0.06] py-4 text-left text-[2rem] font-extrabold uppercase leading-none tracking-[-0.005em] text-white/90 transition active:text-[#A7EF9E]"
                  style={{ fontFamily: SERIF }}
                >
                  {tx(link.label)}
                </motion.button>
              ))}
            </nav>

            <div className="px-7 pb-10 pt-4">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onOpenCv();
                }}
                className="mb-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#A7EF9E] py-3.5 text-sm font-black uppercase tracking-[0.16em] text-[#050505] active:scale-[0.98]"
              >
                {tx(copy.hero.resumeCta)}
              </button>
              <div className="flex items-center justify-center gap-3">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                      aria-label={item.label}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06] text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition active:bg-[#A7EF9E]/[0.16] active:text-[#A7EF9E]"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: LocalizedText;
  title: LocalizedText;
}) {
  const { tx } = useLang();
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-9 text-center"
    >
      <p className="mb-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-[#A7EF9E]">
        {tx(eyebrow)}
      </p>
      <h2 className="text-[2rem] font-extrabold uppercase leading-[0.95] tracking-[-0.01em] text-white">
        {tx(title)}
      </h2>
    </motion.div>
  );
}

function MobileHero({ onOpenCv }: { onOpenCv: () => void }) {
  const { tx } = useLang();
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-center px-6 pb-16 pt-24">
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col"
      >
        <p className="mb-4 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-white/55">
          {tx(copy.hero.eyebrow)}
        </p>
        <h1
          className="text-[2.7rem] font-medium leading-[0.98] tracking-[-0.04em] text-white"
          style={{ fontFamily: SERIF }}
        >
          {tx(copy.hero.intro)}
        </h1>
        <p className="mt-5 text-sm font-medium uppercase tracking-[0.2em] text-white/55">
          {tx(copy.hero.rolePrefix)}{" "}
          <span className="font-extrabold tracking-[0.1em] text-[#A7EF9E]">{tx(copy.hero.roleTitle)}</span>
        </p>
        <p className="mt-6 max-w-prose text-[0.98rem] leading-7 text-white/70">{tx(copy.hero.panelBody)}</p>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={onOpenCv}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#A7EF9E] py-4 text-sm font-black uppercase tracking-[0.16em] text-[#050505] shadow-[0_18px_50px_rgba(167,239,158,0.22)] active:scale-[0.98]"
          >
            {tx(copy.hero.resumeCta)}
          </button>
          <button
            type="button"
            onClick={() => scrollToId("contact")}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] py-4 text-sm font-bold uppercase tracking-[0.16em] text-white/85 active:scale-[0.98]"
          >
            {tx(copy.hero.contactCta)}
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-10 overflow-hidden rounded-[1.6rem] border border-white/[0.07]"
      >
        <img
          src={HERO_IMAGE}
          alt={tx(copy.hero.imageAlt)}
          className="h-64 w-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.18)_0%,rgba(5,5,5,0)_42%,rgba(5,5,5,0.72)_100%)]" />
        <span className="absolute left-4 top-4 font-mono text-[0.55rem] font-medium uppercase tracking-[0.3em] text-white/55">
          {tx(copy.hero.badgePortfolio)}
        </span>
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 font-mono text-[0.55rem] font-medium uppercase tracking-[0.3em] text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-[#A7EF9E]" />
          {tx(copy.hero.badgeLocation)}
        </span>
      </motion.div>
    </section>
  );
}

function MobileAbout() {
  const { tx } = useLang();
  return (
    <section id="about" className="scroll-mt-20 px-6 py-20">
      <SectionHeading eyebrow={copy.about.eyebrow} title={copy.about.title} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative mx-auto mb-7 mt-6 w-full max-w-[16rem]"
      >
        {/* moldura deslocada (outline) atrás, em acento */}
        <div className="pointer-events-none absolute -bottom-2.5 -left-2.5 -z-10 h-full w-full rounded-[1.5rem] border border-[#A7EF9E]/35" />
        {/* moldura com borda em gradiente */}
        <div className="relative rounded-[1.6rem] bg-gradient-to-br from-white/25 via-white/5 to-transparent p-px shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]">
          <div className="relative overflow-hidden rounded-[1.55rem] ring-1 ring-white/10">
            <img
              src="/assets/joao-pedro-about-clean.webp"
              alt="João Pedro"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover object-[center_28%]"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[1.55rem] ring-1 ring-inset ring-white/[0.08]" />
          </div>
        </div>
        {/* cantos de acento */}
        <span className="pointer-events-none absolute -left-1.5 -top-1.5 h-5 w-5 rounded-tl-lg border-l-2 border-t-2 border-[#A7EF9E]/70" />
        <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-5 w-5 rounded-br-lg border-b-2 border-r-2 border-[#A7EF9E]/70" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="mx-auto max-w-prose text-center"
      >
        <p className="text-[0.98rem] leading-7 text-white/70">{tx(copy.about.paragraphOne)}</p>
        <p className="mt-5 text-sm leading-7 text-white/50">{tx(copy.about.paragraphTwo)}</p>
      </motion.div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { tx } = useLang();
  const href = project.href ?? GITHUB_URL;
  const ctaLabel = project.ctaLabel ?? (project.href ? tx(copy.projects.viewSite) : "GitHub");
  const partnerUrl = project.partner ? PARTNER_URLS[project.partner] : undefined;
  const partnerLogo = project.partnerLogo ?? "/assets/webstar-logo-white.png";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: Math.min(index, 3) * 0.05, ease: "easeOut" }}
      className="overflow-hidden rounded-[1.25rem] border border-white/[0.06] bg-white/[0.03]"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <img src={project.image} alt={`${tx(copy.projects.thumbAlt)} ${project.title}`} className="h-full w-full object-cover object-top" loading="lazy" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0)_55%,rgba(5,5,5,0.55)_100%)]" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-extrabold uppercase leading-tight tracking-[-0.005em] text-white">
            {project.title}
          </h3>
          {project.partner ? (
            partnerUrl ? (
              <a
                href={partnerUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full bg-white/[0.05] px-2.5 ring-1 ring-white/10 active:ring-[#A7EF9E]/45"
                title={`${tx(copy.projects.partnership)} ${project.partner}`}
              >
                <img src={partnerLogo} alt={project.partner} className="h-3 w-auto object-contain" loading="lazy" />
              </a>
            ) : null
          ) : null}
        </div>
        <p className="mt-2.5 text-[0.85rem] leading-6 text-white/55">{tx(project.description)}</p>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white py-2 text-[0.7rem] font-black uppercase tracking-[0.16em] text-black transition active:bg-[#A7EF9E]"
        >
          {ctaLabel === "GitHub" ? (
            <GithubMark className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {ctaLabel}
        </a>
      </div>
    </motion.article>
  );
}

function MobileProjects() {
  const { tx } = useLang();
  return (
    <section id="projects" className="scroll-mt-20 px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-9 text-center text-[2rem] font-bold leading-[1.05] tracking-[-0.04em] text-white"
      >
        {tx(copy.projects.headingLead)} <span className="text-[#A7EF9E]">{tx(copy.projects.headingAccent)}</span>
      </motion.h2>
      <div className="flex flex-col gap-5">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ExpCard({
  item,
  current,
}: {
  item: (typeof workHistory)[number];
  current: boolean;
}) {
  const { tx } = useLang();
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-[12px] p-6 ${current ? "bg-white/[0.055]" : "bg-white/[0.025]"}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          current
            ? "bg-[radial-gradient(circle_at_16%_12%,rgba(167,239,158,0.16),transparent_40%)]"
            : ""
        }`}
      />
      <div className="relative z-10">
        <p className={`font-mono text-[0.66rem] font-semibold uppercase tracking-[0.22em] ${current ? "text-[#A7EF9E]" : "text-white/45"}`}>
          {tx(item.company)}
        </p>
        <p className={`mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] ${current ? "text-white/55" : "text-white/38"}`}>
          {tx(item.period)}
        </p>
        <h3
          className={`mt-4 leading-tight tracking-[-0.02em] ${current ? "text-xl text-white" : "text-lg text-white/55"}`}
          style={{ fontFamily: SERIF }}
        >
          {tx(item.role)}
        </h3>
        <p className={`mt-2.5 text-[0.85rem] leading-6 ${current ? "text-white/70" : "text-white/45"}`}>
          {tx(item.description)}
        </p>
      </div>
    </motion.article>
  );
}

function MobileExperience() {
  const { tx } = useLang();
  const reduce = useReducedMotion() ?? false;
  const current = workHistory.filter((w) => w.isCurrent);
  const past = workHistory.filter((w) => !w.isCurrent);

  return (
    <section id="experience" className="scroll-mt-20 px-6 py-20">
      <SectionHeading eyebrow={copy.experience.eyebrow} title={copy.experience.title} />

      <div className="mb-5 flex items-center justify-center gap-2">
        <span className="relative inline-flex h-1.5 w-1.5" aria-hidden="true">
          {!reduce ? (
            <motion.span
              className="absolute inset-0 rounded-full bg-[#A7EF9E]"
              animate={{ scale: [1, 2.4, 1], opacity: [0.55, 0, 0.55] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : null}
          <span className="relative h-1.5 w-1.5 rounded-full bg-[#A7EF9E] shadow-[0_0_8px_rgba(167,239,158,0.75)]" />
        </span>
        <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-[#A7EF9E]">
          {tx(copy.experience.statusLive)}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {current.map((item) => (
          <ExpCard key={item.company["pt-BR"]} item={item} current />
        ))}
      </div>

      {past.length > 0 ? (
        <>
          <p className="mb-5 mt-12 text-center font-mono text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-white/35">
            {tx(copy.experience.pastGroup)}
          </p>
          <div className="flex flex-col gap-4">
            {past.map((item) => (
              <ExpCard key={item.company["pt-BR"]} item={item} current={false} />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}

function MobileEducation() {
  const { tx } = useLang();
  return (
    <section id="education" className="scroll-mt-20 px-6 py-20">
      <SectionHeading eyebrow={copy.education.eyebrow} title={copy.education.title} />

      <div className="flex flex-col gap-5">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[12px] bg-white/[0.055] p-6"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(167,239,158,0.16),transparent_38%)]" />
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-3">
              <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[#A7EF9E]">
                {tx(copy.education.educationLabel)}
              </p>
              <img src="/assets/cesar-school-logo.png" alt="CESAR School" className="h-6 w-auto object-contain opacity-85" loading="lazy" />
            </div>
            <h3 className="mt-5 text-xl font-bold leading-tight tracking-[-0.02em] text-white">{tx(educationInfo.degree)}</h3>
            <p className="mt-2.5 font-mono text-[0.8rem] text-white/72">{educationInfo.school}</p>
            <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-white/45">
              {tx(educationInfo.location)} &#183; {tx(educationInfo.period)}
            </p>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[12px] bg-white/[0.055] p-6"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_8%,rgba(167,239,158,0.14),transparent_36%)]" />
          <div className="relative z-10">
            <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[#A7EF9E]">
              {tx(copy.education.languagesLabel)}
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {spokenLanguages.map((language) => (
                <li
                  key={language.name["pt-BR"]}
                  className="flex items-center justify-between rounded-[10px] bg-black/20 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                >
                  <span className="text-base font-semibold text-white">{tx(language.name)}</span>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/58">
                    {tx(language.level)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

const skillGroups: { key: string; label: string; icon: LucideIcon; items: string[] }[] = [
  {
    key: "frontend",
    label: "Frontend",
    icon: Monitor,
    items: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "Figma", "Dashboards"],
  },
  {
    key: "backend",
    label: "Backend",
    icon: Server,
    items: ["Node.js", "Python", "REST APIs", "Firebase", "Machine Learning", "Arquitetura de Software", "Testes Automatizados", "TDD", "BDD"],
  },
  {
    key: "devops",
    label: "Tools",
    icon: Cloud,
    items: ["AWS", "Cloud", "Git", "Vite", "IoT", "n8n", "Power Automate", "Lovable", "Claude Code", "Codex", "Antigravity", "Scrum", "Kanban", "Metodologias Ágeis", "BPM", "LGPD"],
  },
];

const MINT_ACCENT: Accent = {
  color: "#A7EF9E",
  tagBg: "rgba(167,239,158,0.07)",
  tagBorder: "rgba(167,239,158,0.26)",
  tagText: "#BFF3B6",
  line: "#A7EF9E",
};

function MobileSkills() {
  const { tx, lang } = useLang();
  const [active, setActive] = useState(0);
  const group = skillGroups[active];

  return (
    <section id="skills" className="scroll-mt-20 px-6 py-20">
      <SectionHeading eyebrow={copy.skills.eyebrow} title={copy.skills.title} />
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto -mt-5 mb-7 max-w-prose text-center text-[0.9rem] leading-6 text-white/55"
      >
        {tx(copy.skills.subtitle)}
      </motion.p>

      {/* Full-width segmented toggle — three equal segments, never overflows */}
      <div className="flex rounded-2xl border border-white/10 bg-white/[0.03] p-1">
        {skillGroups.map((g, i) => {
          const Icon = g.icon;
          const on = i === active;
          return (
            <button
              key={g.key}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(i)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.08em] transition ${
                on ? "bg-[#A7EF9E] text-[#050505] shadow-[0_0_22px_rgba(167,239,158,0.32)]" : "text-white/50 active:text-white/80"
              }`}
            >
              <Icon size={14} className={on ? "text-[#050505]" : "text-white/35"} aria-hidden="true" />
              {g.label}
            </button>
          );
        })}
      </div>

      {/* 3D draggable tag cloud — remounts per group so the fly-out replays */}
      <div className="mt-1 w-full">
        <TagSphere
          key={group.key}
          tags={group.items}
          accent={MINT_ACCENT}
          label={`${group.label} ${lang === "pt-BR" ? "habilidades" : "skills"}`}
        />
      </div>

      <ul className="sr-only">
        {skillGroups.map((g) => (
          <li key={g.key}>
            {g.label}: {g.items.join(", ")}
          </li>
        ))}
      </ul>
    </section>
  );
}

function MobileFooter() {
  const { tx } = useLang();
  return (
    <footer className="border-t border-white/[0.06] px-6 py-10 text-center">
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-white/40">
        {tx(L("João Pedro — Software Developer", "João Pedro — Software Developer"))}
      </p>
      <div className="mt-4 flex items-center justify-center gap-3">
        {contactItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
              aria-label={item.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition active:bg-[#A7EF9E]/[0.16] active:text-[#A7EF9E]"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>
          );
        })}
      </div>
    </footer>
  );
}

export default function PortfolioLandingPageMobile() {
  const { lang } = useLang();
  const [isCvOpen, setIsCvOpen] = useState(false);

  return (
    <div className="relative w-full overflow-x-hidden bg-[#050505] text-white">
      <CvModal
        open={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        pdfUrl={CV_PDF_URL}
        downloadName={CV_DOWNLOAD_NAME}
      />

      <MobileNav onOpenCv={() => setIsCvOpen(true)} />

      <MobileHero onOpenCv={() => setIsCvOpen(true)} />

      <MobileProjects />

      <div className="bg-[linear-gradient(180deg,#050505_0%,#08080d_24%,#0d0e16_52%,#0a0c0b_78%,#050505_100%)]">
        <MobileAbout />
        <MobileSkills />
        <MobileExperience />
        <MobileEducation />
        <section id="contact" className="scroll-mt-20">
          <DestructionSection language={lang} backgroundClassName="bg-transparent" showAmbientBackground={false} />
        </section>
      </div>

      <MobileFooter />
    </div>
  );
}
