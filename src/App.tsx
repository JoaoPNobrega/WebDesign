import { useEffect, useState } from "react";

import { AppDock } from "@/components/AppDock";
import LanguageGate from "@/components/LanguageGate";
import {
  type SiteLanguage,
} from "@/lib/site-language";
import DestructionPage from "@/pages/DestructionPage";
import LanyardPage from "@/pages/LanyardPage";
import NotFoundPage from "@/pages/NotFoundPage";
import Page67 from "@/pages/Page67";
import PortfolioPage from "@/pages/PortfolioPage";

function getCurrentPath() {
  if (typeof window === "undefined") {
    return "/";
  }

  return window.location.pathname;
}

export default function App() {
  const [pathname, setPathname] = useState(getCurrentPath);
  const [language, setLanguage] = useState<SiteLanguage | null>(null);

  const activeLanguage = language ?? "pt-BR";

  useEffect(() => {
    const syncPath = () => setPathname(getCurrentPath());
    window.addEventListener("popstate", syncPath);

    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (target && target.href && target.href.startsWith(window.location.origin)) {
        if (target.getAttribute("target") !== "_blank") {
          e.preventDefault();
          const url = new URL(target.href);
          window.history.pushState(null, "", url.pathname);
          syncPath();
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("popstate", syncPath);
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  useEffect(() => {
    if (!language) {
      document.title = "Choose Language | Jo\u00E3o Pedro";
      return;
    }

    const titlesByLanguage: Record<SiteLanguage, Record<string, string>> = {
      "pt-BR": {
        "/": "Portf\u00F3lio | Jo\u00E3o Pedro",
        "/destruction": "Destruction | Jo\u00E3o Pedro",
        "/cracha": "Crach\u00E1 | Jo\u00E3o Pedro",
        "/67": "Projeto 67 | Jo\u00E3o Pedro",
      },
      "en-US": {
        "/": "Portfolio | Jo\u00E3o Pedro",
        "/destruction": "Destruction | Jo\u00E3o Pedro",
        "/cracha": "Badge | Jo\u00E3o Pedro",
        "/67": "Project 67 | Jo\u00E3o Pedro",
      },
    };

    document.title = titlesByLanguage[language][pathname] || "Portfolio | Jo\u00E3o Pedro";
  }, [language, pathname]);

  useEffect(() => {
    document.documentElement.lang = activeLanguage;
  }, [activeLanguage]);

  const handleSelectLanguage = (nextLanguage: SiteLanguage) => {
    setLanguage(nextLanguage);
  };

  const renderContent = () => {
    switch (pathname) {
      case "/":
        return <PortfolioPage language={activeLanguage} />;
      case "/destruction":
        return <DestructionPage language={activeLanguage} />;
      case "/cracha":
        return <LanyardPage />;
      case "/67":
        return <Page67 language={activeLanguage} />;
      default:
        return <NotFoundPage language={activeLanguage} />;
    }
  };

  if (!language) {
    return <LanguageGate onSelect={handleSelectLanguage} />;
  }

  return (
    <main className="app-shell">
      {renderContent()}
      <AppDock
        activeId={
          pathname === "/destruction"
            ? "destruction"
            : pathname === "/cracha"
              ? "cracha"
              : pathname === "/67"
                ? "67"
                : "home"
        }
        language={activeLanguage}
      />
    </main>
  );
}
