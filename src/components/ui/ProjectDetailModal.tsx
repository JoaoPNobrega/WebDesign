import { motion, type Variants } from "framer-motion";
import { ExternalLink, X } from "lucide-react";

import { useLang, type LocalizedText } from "@/lib/i18n";
import { copy } from "@/lib/portfolio-copy";

type ProjectDetailModalProps = {
  onClose: () => void;
  title: string;
  image: string;
  description: LocalizedText;
  href: string;
  ctaLabel: string;
  ctaIsGithub: boolean;
  partner: string | null;
  partnerLogo: string;
  partnerLogoClassName: string;
};

const contentVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.32, staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
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

export default function ProjectDetailModal({
  onClose,
  title,
  image,
  description,
  href,
  ctaLabel,
  ctaIsGithub,
  partner,
  partnerLogo,
  partnerLogoClassName,
}: ProjectDetailModalProps) {
  const { tx } = useLang();

  return (
    <motion.div
      key="project-detail-modal"
      className="fixed inset-0 z-[1400] flex items-center justify-center px-4 py-6 sm:px-6 sm:py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
      onClick={onClose}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[#050505]/94"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.article
        className="relative z-10 grid max-h-[88vh] w-full max-w-5xl grid-cols-1 overflow-hidden rounded-[1.7rem] bg-[#0a0a0b] shadow-[0_50px_170px_rgba(0,0,0,0.78)] ring-1 ring-white/[0.05] lg:grid-cols-[1.08fr_1fr]"
        initial={{ clipPath: "inset(45% 47% 45% 47% round 2.6rem)", opacity: 0 }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 1.7rem)", opacity: 1 }}
        exit={{ clipPath: "inset(45% 47% 45% 47% round 2.6rem)", opacity: 0 }}
        transition={{
          clipPath: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.3, ease: "easeOut" },
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-30 h-px bg-gradient-to-r from-transparent via-[#A7EF9E]/45 to-transparent"
        />

        <button
          type="button"
          aria-label={tx(copy.projects.closePreview)}
          onClick={onClose}
          className="absolute right-4 top-4 z-30 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white/55 backdrop-blur-sm transition hover:bg-black/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/50"
        >
          <X className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
        </button>

        {/* Image */}
        <div className="relative h-56 w-full overflow-hidden sm:h-72 lg:h-auto">
          <motion.img
            src={image}
            alt={`${tx(copy.projects.previewAlt)} ${title}`}
            className="h-full w-full object-cover object-center"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            loading="lazy"
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,0)_55%,rgba(10,10,11,0.85)_100%)] lg:bg-[linear-gradient(90deg,rgba(10,10,11,0)_62%,rgba(10,10,11,0.92)_100%)]" />
        </div>

        {/* Content */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="show"
          className="flex max-h-[88vh] flex-col justify-center gap-6 overflow-y-auto p-7 sm:p-9 lg:p-11"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A7EF9E]" />
            <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-[#A7EF9E]/80">
              {tx(copy.projects.selected)}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5">
            <h2
              id="project-detail-title"
              className="text-3xl font-black uppercase leading-[0.92] tracking-[-0.075em] text-white sm:text-[2.85rem]"
            >
              {title}
            </h2>
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

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-[0.98rem] leading-7 text-white/58 sm:text-base sm:leading-8"
          >
            {tx(description)}
          </motion.p>

          <motion.div variants={itemVariants} className="pt-1">
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
        </motion.div>
      </motion.article>
    </motion.div>
  );
}
