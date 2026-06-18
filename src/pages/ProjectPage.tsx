import { useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

import { useLang } from "@/lib/i18n";
import { copy } from "@/lib/portfolio-copy";
import { categoryLabel, projectCategory, projectDetails, webstarTools } from "@/lib/project-details";
import { getProjectBySlug, getProjectImages, navProjectItems, projectSlug } from "@/lib/projects";

const contentVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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

const prevCopy = { "pt-BR": "Anterior", "en-US": "Previous" } as const;
const nextCopy = { "pt-BR": "Próximo", "en-US": "Next" } as const;

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

// Qualidades de thumbnail do YouTube, da melhor p/ a pior. Nem todo vídeo tem
// maxres (só quando enviado em ≥720p), então caímos para a próxima disponível.
const YT_THUMB_QUALITIES = ["maxresdefault", "sddefault", "hqdefault"];

// Player do YouTube com facade "clica-pra-tocar": mostra a thumbnail + botão e só
// carrega o iframe (e o JS do YouTube) depois do clique — mais rápido e sem cookies.
function VideoEmbed({
  id,
  poster,
  label,
  title,
}: {
  id: string;
  poster?: string;
  label: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [quality, setQuality] = useState(0);
  const thumbSrc = poster ?? `https://i.ytimg.com/vi/${id}/${YT_THUMB_QUALITIES[quality]}.jpg`;

  if (playing) {
    return (
      <div className="relative aspect-video w-full">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={`${title} — ${label}`}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`${label} — ${title}`}
      className="group relative block aspect-video w-full cursor-pointer overflow-hidden"
    >
      <img
        src={thumbSrc}
        onError={poster ? undefined : () => setQuality((index) => Math.min(index + 1, YT_THUMB_QUALITIES.length - 1))}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/25 transition group-hover:from-black/40" aria-hidden="true" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-full bg-[#A7EF9E] text-black shadow-[0_10px_50px_rgba(167,239,158,0.45)] transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
          <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7 sm:h-9 sm:w-9" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}

function ProjectView({ slug }: { slug: string }) {
  const { tx, lang } = useLang();
  const [activeShot, setActiveShot] = useState(0);

  const project = getProjectBySlug(slug);
  const detail = project ? projectDetails[project.title] : undefined;

  // Próximo/anterior (com wraparound) para a navegação sequencial entre projetos.
  const currentIndex = navProjectItems.findIndex((p) => projectSlug(p.title) === slug);
  const total = navProjectItems.length;
  const prevItem = currentIndex >= 0 ? navProjectItems[(currentIndex - 1 + total) % total] : null;
  const nextItem = currentIndex >= 0 ? navProjectItems[(currentIndex + 1) % total] : null;

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#050505] px-6 text-white">
        <p className="text-lg text-white/60">{notFoundCopy[lang]}</p>
        <a
          href="/projetos"
          className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white/70 ring-1 ring-white/10 transition hover:bg-[#A7EF9E] hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {backCopy[lang]}
        </a>
      </div>
    );
  }

  // Imagens: usa as prints (shots) quando há; senão as imagens da galeria.
  const showcaseImages = detail?.shots?.length
    ? detail.shots.map((shot) => shot.src)
    : detail?.images?.length
      ? detail.images
      : getProjectImages(project);
  const coverImage = showcaseImages[0] ?? "";
  const safeActive = Math.min(activeShot, Math.max(showcaseImages.length - 1, 0));
  const activeImage = showcaseImages[safeActive] ?? coverImage;

  const cat = projectCategory[project.title];
  const hasHref = "href" in project;
  const href = hasHref ? (project as { href: string }).href : undefined;
  const ctaIsGithub = "ctaLabel" in project && project.ctaLabel === "GitHub";
  const ctaLabel = "ctaLabel" in project ? project.ctaLabel : tx(copy.projects.viewSite);
  const partner = "partner" in project ? project.partner : null;
  const partnerLogo = "partnerLogo" in project ? project.partnerLogo : "/assets/webstar-logo-white.png";
  const host = hostFromUrl(href);
  // Ferramentas: usa as do projeto; nos projetos da Web Star, herda as da empresa.
  const tools = detail?.tools ?? (partner === "Web Star Studio" ? webstarTools : null);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_38%),radial-gradient(circle_at_bottom,rgba(167,239,158,0.07),transparent_30%)]" />

      {/* ── HERO full-bleed: capa de ponta a ponta + título + tags ───────── */}
      <header className="relative">
        {/* Voltar sobre a capa */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute left-5 top-6 z-20 sm:left-8 sm:top-8"
        >
          <a
            href="/projetos"
            className="inline-flex items-center gap-2 rounded-full bg-[#A7EF9E]/[0.14] px-4 py-2.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#A7EF9E] backdrop-blur-md transition hover:bg-[#A7EF9E] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/60"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            {backCopy[lang]}
          </a>
        </motion.div>

        {coverImage ? (
          <div className="relative h-[58vh] min-h-[340px] w-full overflow-hidden sm:h-[66vh]">
            <motion.img
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              src={coverImage}
              alt={project.title}
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.35)_0%,transparent_26%,transparent_44%,rgba(5,5,5,0.78)_80%,#050505_100%)]" />
            {/* Fade escuro nos cantos superiores (esq./dir.) p/ legibilidade do "Voltar" */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_66%_at_0%_0%,rgba(5,5,5,0.92),transparent_72%),radial-gradient(75%_66%_at_100%_0%,rgba(5,5,5,0.92),transparent_72%)]" />
          </div>
        ) : null}

        {/* Título + tags sobre a transição da foto pro fundo */}
        <div className="relative z-10 mx-auto -mt-14 flex max-w-5xl flex-col items-center px-5 text-center sm:-mt-20">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-white drop-shadow-[0_10px_44px_rgba(0,0,0,0.85)] sm:text-7xl"
          >
            {project.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-2"
          >
            {cat ? (
              <span className="rounded-full bg-white/[0.06] px-3.5 py-1.5 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#A7EF9E] ring-1 ring-white/10 backdrop-blur-sm">
                {tx(categoryLabel[cat])}
              </span>
            ) : null}
            {partner ? (
              <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1.5 ring-1 ring-white/10 backdrop-blur-sm">
                <img src={partnerLogo} alt={partner} className="h-3.5 w-auto max-w-[5.5rem] object-contain" loading="lazy" />
              </span>
            ) : null}
          </motion.div>
        </div>
      </header>

      {/* ── Conteúdo (largura controlada) ────────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-20 pt-10 sm:px-8 lg:px-12">
        {/* Descrição + botão */}
        <div className="flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="max-w-3xl text-base leading-8 text-white/65 sm:text-lg sm:leading-9"
          >
            {tx(project.description)}
          </motion.p>

          {hasHref ? (
            <motion.a
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex h-[3.1rem] cursor-pointer items-center justify-center gap-2.5 rounded-full bg-white px-7 text-sm font-black uppercase tracking-[0.2em] text-black transition hover:-translate-y-0.5 hover:bg-[#A7EF9E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/70"
            >
              {ctaIsGithub ? <GithubGlyph /> : <ExternalLink className="h-4 w-4" aria-hidden="true" />}
              {ctaLabel}
            </motion.a>
          ) : null}
        </div>

        {/* ── Demonstração em vídeo (quando há) ─────────────────────────────── */}
        {detail?.video ? (
          <motion.section
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-16 max-w-5xl sm:mt-20"
          >
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#A7EF9E]/40" aria-hidden="true" />
              <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#A7EF9E]/80">
                {tx(copy.projects.videoLabel)}
              </p>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#A7EF9E]/40" aria-hidden="true" />
            </div>
            <div className="overflow-hidden rounded-[1.1rem] bg-black shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.08]">
              <VideoEmbed
                id={detail.video}
                poster={detail.videoPoster}
                label={tx(copy.projects.videoLabel)}
                title={project.title}
              />
            </div>
          </motion.section>
        ) : null}

        {/* ── Detalhes: info (esquerda) + showcase em navegador (direita) ───── */}
        <motion.section
          variants={contentVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 grid gap-10 sm:mt-24 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14"
        >
          {/* Esquerda: informações */}
          <div className="flex flex-col gap-8">
            {detail?.role ? (
              <motion.div variants={itemVariants} className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/[0.07]">
                <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#A7EF9E]/75">
                  {tx(copy.projects.myRole)}
                </p>
                <p className="mt-3 text-[0.95rem] leading-7 text-white/64">{tx(detail.role)}</p>
              </motion.div>
            ) : null}

            {detail?.credits?.length ? (
              <motion.div variants={itemVariants}>
                <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-white/38">
                  {tx(copy.projects.creditsLabel)}
                </p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {detail.credits.map((credit) => (
                    <li key={credit.name} className="text-[0.92rem] leading-6 text-white/64">
                      <span className="text-white/40">{tx(credit.role)} — </span>
                      {credit.href ? (
                        <a
                          href={credit.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-white/85 underline-offset-4 transition hover:text-[#A7EF9E] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/50"
                        >
                          {credit.name}
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="font-medium text-white/85">{credit.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}

            {tools?.length ? (
              <motion.div variants={itemVariants}>
                <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-white/38">
                  {tx(copy.projects.toolsLabel)}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full bg-[#A7EF9E]/[0.08] px-3.5 py-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[#A7EF9E]/90 ring-1 ring-[#A7EF9E]/25"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}

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
          </div>

          {/* Direita: janela de navegador + miniaturas */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3.5">
            <div className="overflow-hidden rounded-[0.9rem] bg-[#0c0c0e] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/[0.07] sm:rounded-[1.1rem]">
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
              <div className="relative bg-black/30">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                    className="block h-auto w-full"
                  />
                </AnimatePresence>
              </div>
            </div>

            {showcaseImages.length > 1 ? (
              <div
                className="grid gap-2.5 sm:gap-3"
                style={{ gridTemplateColumns: `repeat(${showcaseImages.length}, minmax(0, 1fr))` }}
              >
                {showcaseImages.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveShot(index)}
                    aria-label={`${tx(copy.projects.previewAlt)} ${index + 1}`}
                    className={`relative aspect-[16/10] overflow-hidden rounded-lg ring-1 transition-all duration-300 ${
                      index === safeActive
                        ? "opacity-100 ring-[#A7EF9E]/70 shadow-[0_0_24px_rgba(167,239,158,0.12)]"
                        : "opacity-45 ring-white/10 hover:opacity-80"
                    }`}
                  >
                    <img src={src} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-top" />
                  </button>
                ))}
              </div>
            ) : null}
          </motion.div>
        </motion.section>

        {/* Próximo / anterior projeto */}
        {prevItem && nextItem ? (
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 flex items-stretch justify-between gap-6 border-t border-white/10 pt-8"
          >
            <a href={`/projetos/${projectSlug(prevItem.title)}`} className="group flex flex-1 flex-col items-start gap-1.5">
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/40 transition group-hover:text-[#A7EF9E]">
                <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                {prevCopy[lang]}
              </span>
              <span className="text-sm font-bold uppercase tracking-[0.04em] text-white/75 transition group-hover:text-white sm:text-base">
                {prevItem.title}
              </span>
            </a>
            <a href={`/projetos/${projectSlug(nextItem.title)}`} className="group flex flex-1 flex-col items-end gap-1.5 text-right">
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/40 transition group-hover:text-[#A7EF9E]">
                {nextCopy[lang]}
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
              <span className="text-sm font-bold uppercase tracking-[0.04em] text-white/75 transition group-hover:text-white sm:text-base">
                {nextItem.title}
              </span>
            </a>
          </motion.nav>
        ) : null}
      </div>
    </div>
  );
}

export default function ProjectPage({ slug }: { slug: string }) {
  // Camada que desliza: cada projeto desliza por cima do anterior no next/prev.
  const orderRef = useRef(0);
  const lastSlugRef = useRef<string | null>(null);
  if (lastSlugRef.current !== slug) {
    orderRef.current += 1;
    lastSlugRef.current = slug;
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505]">
      <AnimatePresence initial={false}>
        <motion.div
          key={slug}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.45 } }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ zIndex: orderRef.current }}
          className="absolute inset-0 overflow-y-auto overscroll-contain bg-[#050505]"
        >
          <ProjectView slug={slug} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
