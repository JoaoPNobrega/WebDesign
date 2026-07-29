import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Mail } from "lucide-react";

import { type LocalizedText, useLang } from "@/lib/i18n";
import { copy } from "@/lib/portfolio-copy";
import { navProjectItems, projectSlug } from "@/lib/projects";
import { categoryLabel, projectCategory, type Category } from "@/lib/project-details";

const t = (pt: string, en: string): LocalizedText => ({ "pt-BR": pt, "en-US": en });

const backCopy = t("Voltar", "Back");

// Abas de filtro (como "All Web 3D Graphics…" do site de referência).
const allFilters: { key: "all" | Category; label: LocalizedText }[] = [
  { key: "all", label: t("Todos", "All") },
  { key: "site", label: t("Sites", "Sites") },
  { key: "app", label: t("Apps", "Apps") },
  { key: "dashboard", label: t("Painéis", "Dashboards") },
  { key: "iot", label: t("IoT", "IoT") },
];

// Só mostra a aba de uma categoria que tenha projeto visível — assim, ao esconder
// um projeto, a aba órfã some sozinha em vez de abrir uma lista vazia.
const filters = allFilters.filter(
  (f) => f.key === "all" || navProjectItems.some((p) => projectCategory[p.title] === f.key),
);

function projectImage(item: (typeof navProjectItems)[number]): string {
  if ("images" in item && Array.isArray(item.images)) {
    return item.images[0];
  }
  return "image" in item ? item.image : "";
}

export default function ProjectsPage() {
  const { tx, lang } = useLang();
  const [activeCat, setActiveCat] = useState<"all" | Category>("all");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const visible = navProjectItems.filter(
    (p) => activeCat === "all" || projectCategory[p.title] === activeCat,
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Glow sutil no topo (aurora), como na referência */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(167,239,158,0.07),transparent_42%),radial-gradient(circle_at_bottom,rgba(167,239,158,0.04),transparent_35%)]" />

      <div className="relative mx-auto w-full max-w-[2600px] px-5 pb-24 pt-7 sm:px-8 lg:px-10">
        {/* Top: Voltar (esquerda) + Contato (direita) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-between gap-3"
        >
          <a
            href="/"
            onClick={() => {
              // Voltamos do /projetos: sinaliza pra home reabrir o popup de projetos.
              try {
                window.sessionStorage.setItem("jp-open-projetos", "1");
              } catch {
                /* ignore */
              }
            }}
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white/65 ring-1 ring-white/10 transition hover:bg-white/[0.12] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/60"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            {tx(backCopy)}
          </a>

          <a
            href="mailto:jpan@cesar.school"
            className="group inline-flex items-center gap-2 rounded-full bg-[#A7EF9E]/[0.1] px-4 py-2.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#A7EF9E] ring-1 ring-[#A7EF9E]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A7EF9E] hover:text-black hover:shadow-[0_10px_30px_-8px_rgba(167,239,158,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/60"
          >
            <Mail className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-6" aria-hidden="true" />
            {tx(copy.nav.contact)}
          </a>
        </motion.div>

        {/* Breadcrumb (estilo "Lorisbukvic.graphics / Works") */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05, ease: "easeOut" }}
          className="mt-10 text-xl font-medium tracking-[-0.01em] text-white/45 sm:mt-12 sm:text-2xl"
        >
          João Pedro <span className="text-white/20">/</span>{" "}
          <span className="font-bold text-white">{tx(copy.nav.projects)}</span>
        </motion.h1>

        {/* Abas de filtro */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2.5"
        >
          {filters.map((f) => {
            const isActive = activeCat === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveCat(f.key)}
                aria-pressed={isActive}
                className={`text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/50 ${
                  isActive ? "text-white" : "text-white/35 hover:text-white/70"
                }`}
              >
                {tx(f.label)}
              </button>
            );
          })}
        </motion.div>

        {/* Grid de works */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(min(360px,100%),1fr))] gap-x-5 gap-y-7 sm:mt-10"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item) => {
              const cat = projectCategory[item.title];
              const partner = "partner" in item ? item.partner : null;
              const partnerLogo = "partnerLogo" in item ? item.partnerLogo : "/assets/webstar-logo-white.png";
              return (
                <motion.a
                  key={item.title}
                  layout
                  href={`/projetos/${projectSlug(item.title)}`}
                  aria-label={item.title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group"
                >
                  {/* Moldura: card escuro com a imagem embutida */}
                  <div className="relative flex aspect-[5/4] items-center justify-center overflow-hidden rounded-2xl bg-white/[0.035] p-3 transition-colors duration-500 group-hover:bg-white/[0.06]">
                    {/* Imagem (menor, centralizada) */}
                    <div className="relative aspect-[16/10] w-[92%] overflow-hidden rounded-lg bg-black/40 [transform:translateZ(0)]">
                      <img
                        src={projectImage(item)}
                        alt={`${tx(copy.projects.thumbAlt)} ${item.title}`}
                        className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Overlay escuro do CARD: vinheta vinda de cima e de baixo */}
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,transparent_28%,transparent_45%,rgba(0,0,0,0.95)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Tags no topo (no hover): tipo (esquerda) + parceria (direita) */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 flex -translate-y-1 items-start justify-between gap-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {cat ? (
                        <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#A7EF9E] [text-shadow:0_1px_4px_rgba(0,0,0,0.7)]">
                          {tx(categoryLabel[cat])}
                        </span>
                      ) : (
                        <span />
                      )}
                      {partner ? (
                        <span className="inline-flex items-center rounded-full bg-black/55 px-2.5 py-1.5 backdrop-blur-sm">
                          <img
                            src={partnerLogo}
                            alt={partner}
                            className="h-3.5 w-auto max-w-[5rem] object-contain"
                            loading="lazy"
                          />
                        </span>
                      ) : null}
                    </div>

                    {/* Título na base (no hover) */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 px-4 pb-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <h2 className="text-sm font-bold uppercase tracking-[0.06em] text-white">
                        {item.title}
                      </h2>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
