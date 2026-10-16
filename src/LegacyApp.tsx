import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import PortfolioLandingPage from "@/pages/PortfolioLandingPage";
import PortfolioLandingPageMobile from "@/pages/PortfolioLandingPageMobile";
import BadgePage from "@/pages/BadgePage";
import ProjectPage from "@/pages/ProjectPage";
import ProjectsPage from "@/pages/ProjectsPage";
import { useIsMobile } from "@/hooks/useIsMobile";
import { LanguageProvider } from "@/lib/i18n";
import { applyRouteMeta } from "@/lib/seo";

function getCurrentPath() {
  if (typeof window === "undefined") {
    return "/";
  }

  return window.location.pathname;
}

// A dica dos ícones da home pisca só na primeira visita da sessão.
const ENTRANCE_HINT_SEEN_KEY = "jp-entrance-hint-seen";

export default function App() {
  const isMobile = useIsMobile();
  const [pathname, setPathname] = useState(getCurrentPath);
  const [runEntranceHint] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.sessionStorage.getItem(ENTRANCE_HINT_SEEN_KEY) !== "1";
  });

  useEffect(() => {
    window.sessionStorage.setItem(ENTRANCE_HINT_SEEN_KEY, "1");
  }, []);

  useEffect(() => {
    const syncPath = () => setPathname(getCurrentPath());
    window.addEventListener("popstate", syncPath);

    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target || !target.href || !target.href.startsWith(window.location.origin)) {
        return;
      }
      // Let downloads, new-tab links and static assets (e.g. the CV PDF) behave natively.
      if (
        target.hasAttribute("download") ||
        target.getAttribute("target") === "_blank" ||
        /\.[a-z0-9]+($|\?)/i.test(new URL(target.href).pathname.split("/").pop() ?? "")
      ) {
        return;
      }
      e.preventDefault();
      const url = new URL(target.href);
      window.history.pushState(null, "", url.pathname);
      syncPath();
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("popstate", syncPath);
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  useEffect(() => {
    applyRouteMeta(pathname);
  }, [pathname]);

  const projectMatch = pathname.match(/^\/projetos\/([^/]+)\/?$/);
  const detailSlug = projectMatch ? decodeURIComponent(projectMatch[1]) : null;

  if (pathname === "/3d") {
    return (
      <LanguageProvider>
        <main className="app-shell overflow-visible">
          <BadgePage />
        </main>
      </LanguageProvider>
    );
  }

  if (pathname === "/projetos" || detailSlug) {
    return (
      <LanguageProvider>
        <main className="app-shell overflow-visible">
          {/* Listagem fica como camada de base */}
          <ProjectsPage />
          {/* Detalhe do projeto desliza por cima da listagem (e desliza pra baixo
              no Voltar). O next/prev entre projetos é tratado dentro da própria
              ProjectPage. */}
          <AnimatePresence>
            {detailSlug ? (
              <motion.div
                key="project-detail-layer"
                className="fixed inset-0 z-50"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectPage slug={detailSlug} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </main>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <main className="app-shell overflow-visible">
        {isMobile ? <PortfolioLandingPageMobile /> : <PortfolioLandingPage runEntranceHint={runEntranceHint} />}
      </main>
    </LanguageProvider>
  );
}
