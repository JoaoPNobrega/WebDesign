import { useEffect, useState } from "react";

import PortfolioLandingPage from "@/pages/PortfolioLandingPage";
import PortfolioLandingPageMobile from "@/pages/PortfolioLandingPageMobile";
import BadgePage from "@/pages/BadgePage";
import IntroLogo from "@/components/IntroLogo";
import { useIsMobile } from "@/hooks/useIsMobile";
import { LanguageProvider } from "@/lib/i18n";

function getCurrentPath() {
  if (typeof window === "undefined") {
    return "/";
  }

  return window.location.pathname;
}

const INTRO_SEEN_KEY = "jp-intro-seen";

export default function App() {
  const isMobile = useIsMobile();
  const [pathname, setPathname] = useState(getCurrentPath);
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.sessionStorage.getItem(INTRO_SEEN_KEY) !== "1";
  });

  const handleIntroDone = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    }
    setShowIntro(false);
  };

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
    document.title = "Portfólio | João Pedro";
  }, [pathname]);

  if (pathname === "/3d") {
    return (
      <LanguageProvider>
        <main className="app-shell overflow-visible">
          <BadgePage />
        </main>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <main className="app-shell overflow-visible">
        {isMobile ? <PortfolioLandingPageMobile /> : <PortfolioLandingPage />}
      </main>
      {showIntro ? <IntroLogo onDone={handleIntroDone} loaderMode /> : null}
    </LanguageProvider>
  );
}
