import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

import { useLang } from "@/lib/i18n";
import { copy } from "@/lib/portfolio-copy";
import { projectDetails, type ProjectShot } from "@/lib/project-details";
import { getProjectBySlug, getProjectImages } from "@/lib/projects";

const contentVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.2, staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function GithubGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M12 .7C5.74.7.66 5.78.66 12.04c0 5.01 3.25 9.26 7.76 10.76.57.1.78-.25.78-.55v-2c-3.16.69-3.83-1.36-3.83-1.36-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.66 1.23 3.31.94.1-.73.4-1.23.72-1.52-2.52-.29-5.17-1.26-5.17-5.61 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.44.11-3 0 0 .96-.31 3.13 1.16.91-.25 1.88-.38 2.85-.38s1.94.13 2.85.38c2.17-1.47 3.13-1.16 3.13-1.16.62 1.56.23 2.71.11 3 .73.79 1.17 1.8 1.17 3.04 0 4.36-2.65 5.32-5.18 5.6.41.35.77 1.04.77 2.1v3.11c0 .31.21.66.78.55a11.35 11.35 0 0 0 7.76-10.76C23.34 5.78 18.26.7 12 .7Z" />
    </svg>
  );
}

const backCopy = {
  "pt-BR": "Voltar aos projetos",
  "en-US": "Back to projects",
} as const;

const notFoundCopy = {
  "pt-BR": "Projeto não encontrado.",
  "en-US": "Project not found.",
} as const;

function hostFromUrl(url?: string): string | null {
  if (!url) {
    return null;
  }
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

function ShotShowcase({ shots, siteUrl }: { shots: ProjectShot[]; siteUrl?: string }) {
  const { tx, lang } = useLang();
  const [active, setActive] = useState(0);
  const prev = () => setActive((current) => (current - 1 + shots.length) % shots.length);
  const next = () => setActive((current) => (current + 1) % shots.length);
  const shot = shots[active];
  const host = hostFromUrl(siteUrl);

  return (
    <div className="mx-auto max-w-4xl">
      {/* ── Janela macOS — a print no aspecto natural, sem corte ──────── */}
      <div className="overflow-hidden rounded-[0.9rem] bg-[#0c0c0e] shadow-[0_40px_120px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.07)] sm:rounded-[1.1rem]">
        {/* Barra de título */}
        <div className="flex items-center gap-3 border-b border-white/[0.06] bg-gradient-to-b from-white/[0.05] to-white/[0.015] px-4 py-3">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex min-w-0 flex-1 justify-center">
            <span className="inline-flex max-w-full items-center gap-2 truncate rounded-lg bg-black/35 px-3.5 py-1.5 font-mono text-[0.64rem] tracking-[0.04em] text-white/45 ring-1 ring-white/[0.05]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-2.5 w-2.5 shrink-0 text-[#A7EF9E]/70" aria-hidden="true">
                <rect x="5" y="11" width="14" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              {host ?? "preview"}
            </span>
          </div>
          <div className="w-[3.25rem]" aria-hidden="true" />
        </div>

        {/* Print inteira — a janela acompanha a altura da imagem */}
        <div className="relative bg-black/30">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={shot.src}
              src={shot.src}
              alt={tx(shot.title)}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, scale: 1.012 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.34, ease: "easeOut" }}
              className="block h-auto w-full"
            />
          </AnimatePresence>
        </div>
      </div>

      {/* ── Legenda + navegação ───────────────────────────────────────── */}
      <div className="mt-7 flex flex-col gap-6 sm:mt-8 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
        <div className="min-h-[7.5rem] flex-1 sm:min-h-[6.5rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${active}-${lang}`}
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(5px)" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-mono text-[0.62rem] font-semibold tracking-[0.3em] text-[#A7EF9E]/75">
                {String(active + 1).padStart(2, "0")}
                <span className="text-white/22"> / {String(shots.length).padStart(2, "0")}</span>
              </p>
              <h3 className="mt-2.5 text-xl font-bold leading-snug tracking-[-0.01em] text-white sm:text-2xl">
                {tx(shot.title)}
              </h3>
              {shot.text ? (
                <p className="mt-2 max-w-[52ch] text-[0.92rem] leading-7 text-white/52">
                  {tx(shot.text)}
                </p>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Print anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-white/60 ring-1 ring-white/10 transition hover:bg-white/[0.12] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/50"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Próxima print"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-white/60 ring-1 ring-white/10 transition hover:bg-white/[0.12] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/50"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Miniaturas ────────────────────────────────────────────────── */}
      <div className="mt-6 grid grid-cols-5 gap-2 sm:gap-3">
        {shots.map((thumb, index) => (
          <button
            key={thumb.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={tx(thumb.title)}
            className={`relative aspect-[2/1] overflow-hidden rounded-md ring-1 transition-all duration-300 sm:rounded-lg ${
              index === active
                ? "opacity-100 ring-[#A7EF9E]/70 shadow-[0_0_24px_rgba(167,239,158,0.12)]"
                : "opacity-35 ring-white/10 hover:opacity-75"
            }`}
          >
            <img
              src={thumb.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProjectPage({ slug }: { slug: string }) {
  const { tx, lang } = useLang();
  const project = getProjectBySlug(slug);
  const detail = project ? projectDetails[project.title] : undefined;
  const gallery = project
    ? detail?.images?.length
      ? detail.images
      : getProjectImages(project)
    : [];
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  // Autoplay da galeria simples (projetos sem shots legendadas).
  const hasShowcase = Boolean(detail?.shots && detail.shots.length > 1);
  useEffect(() => {
    if (hasShowcase || gallery.length < 2) {
      return;
    }
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % gallery.length);
    }, 4600);
    return () => window.clearInterval(interval);
  }, [gallery.length, activeImage, hasShowcase]);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#050505] px-6 text-white">
        <p className="text-lg text-white/60">{notFoundCopy[lang]}</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white/70 ring-1 ring-white/10 transition hover:bg-[#A7EF9E] hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {backCopy[lang]}
        </a>
      </div>
    );
  }

  const goTo = (index: number) => {
    setActiveImage(((index % gallery.length) + gallery.length) % gallery.length);
  };

  const hasHref = "href" in project;
  const href = hasHref ? (project as { href: string }).href : undefined;
  const ctaIsGithub = "ctaLabel" in project && project.ctaLabel === "GitHub";
  const ctaLabel = "ctaLabel" in project ? project.ctaLabel : tx(copy.projects.viewSite);
  const partner = "partner" in project ? project.partner : null;
  const partnerLogo = "partnerLogo" in project ? project.partnerLogo : "/assets/webstar-logo-white.png";
  const partnerLogoClassName =
    "partnerLogoClassName" in project ? project.partnerLogoClassName : "h-5 w-auto object-contain sm:h-6";

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_38%),radial-gradient(circle_at_bottom,rgba(167,239,158,0.07),transparent_30%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-7 sm:px-8">
        {/* Topo: voltar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white/65 ring-1 ring-white/10 transition hover:bg-white/[0.12] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/60"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            {backCopy[lang]}
          </a>
        </motion.div>

        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="show"
          className="mt-8 sm:mt-10"
        >
          {/* Cabeçalho */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A7EF9E]" />
            <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-[#A7EF9E]/80">
              {tx(copy.projects.selected)}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-4 flex flex-wrap items-center gap-4">
            <h1 className="text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.01em] text-white sm:text-6xl">
              {project.title}
            </h1>
            {partner ? (
              <div className="group relative inline-flex">
                <div
                  className="inline-flex cursor-help items-center rounded-full bg-white/[0.05] px-3.5 py-2 ring-1 ring-white/10 transition duration-300 hover:bg-white/[0.08] hover:ring-[#A7EF9E]/40"
                  aria-label={`${tx(copy.projects.partnership)} ${partner}`}
                >
                  <img
                    src={partnerLogo}
                    alt=""
                    aria-hidden="true"
                    className={partnerLogoClassName}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="pointer-events-none absolute bottom-[calc(100%+0.6rem)] left-1/2 w-max -translate-x-1/2 rounded-full bg-black/90 px-3 py-1.5 text-[0.66rem] font-medium text-white/72 opacity-0 shadow-[0_16px_50px_rgba(0,0,0,0.42)] ring-1 ring-white/10 transition duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
                  {tx(copy.projects.partnership)} {partner}
                </div>
              </div>
            ) : null}
          </motion.div>

          {/* Showcase com janela de navegador (projetos com prints legendadas) */}
          {detail?.shots && detail.shots.length > 1 ? (
            <motion.div variants={itemVariants} className="mt-10 sm:mt-12">
              <ShotShowcase shots={detail.shots} siteUrl={href} />
            </motion.div>
          ) : (
          <motion.div variants={itemVariants} className="mt-9">
            <div className="relative aspect-video w-full overflow-hidden rounded-[1.4rem] bg-white/[0.03] ring-1 ring-white/[0.07]">
              <AnimatePresence initial={false}>
                <motion.img
                  key={gallery[activeImage]}
                  src={gallery[activeImage]}
                  alt={`${tx(copy.projects.previewAlt)} ${project.title}`}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  initial={{ opacity: 0, scale: 1.035 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  decoding="async"
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0)_72%,rgba(5,5,5,0.5)_100%)]" />

              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Print anterior"
                    onClick={() => goTo(activeImage - 1)}
                    className="absolute left-4 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white/65 backdrop-blur-sm transition hover:bg-black/70 hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="Próxima print"
                    onClick={() => goTo(activeImage + 1)}
                    className="absolute right-4 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white/65 backdrop-blur-sm transition hover:bg-black/70 hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
                    {gallery.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        aria-label={`Print ${index + 1}`}
                        onClick={() => goTo(index)}
                        className={`rounded-full transition-all duration-300 ${
                          index === activeImage ? "h-1.5 w-5 bg-white/85" : "h-1.5 w-1.5 bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
          )}

          {/* Conteúdo */}
          <div className="mt-10 grid gap-9 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
            <div className="flex flex-col gap-7">
              <motion.p variants={itemVariants} className="text-base leading-8 text-white/62 sm:text-lg sm:leading-9">
                {tx(project.description)}
              </motion.p>

              {detail?.role ? (
                <motion.div
                  variants={itemVariants}
                  className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/[0.07]"
                >
                  <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#A7EF9E]/75">
                    {tx(copy.projects.myRole)}
                  </p>
                  <p className="mt-3 text-[0.95rem] leading-7 text-white/64">{tx(detail.role)}</p>
                </motion.div>
              ) : null}
            </div>

            <div className="flex flex-col gap-7">
              {detail?.tags?.length ? (
                <motion.div variants={itemVariants}>
                  <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-white/38">
                    {tx(copy.projects.stackLabel)}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {detail.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-white/[0.05] px-3.5 py-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white/64 ring-1 ring-white/10"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}

              {hasHref ? (
                <motion.div variants={itemVariants}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-[3.1rem] cursor-pointer items-center justify-center gap-2.5 rounded-full bg-white px-7 text-sm font-black uppercase tracking-[0.2em] text-black transition hover:-translate-y-0.5 hover:bg-[#A7EF9E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/70"
                  >
                    {ctaIsGithub ? <GithubGlyph /> : <ExternalLink className="h-4 w-4" aria-hidden="true" />}
                    {ctaLabel}
                  </a>
                </motion.div>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
