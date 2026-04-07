import { useEffect, useState } from "react";

import PortfolioLandingPage from "@/pages/PortfolioLandingPage";
import Page67 from "@/pages/Page67";
import type { SiteLanguage } from "@/lib/site-language";

function getCurrentPath() {
  if (typeof window === "undefined") {
    return "/";
  }

  return window.location.pathname;
}

export default function App() {
  const [pathname, setPathname] = useState(getCurrentPath);
  const activeLanguage: SiteLanguage = "pt-BR";

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
    document.title = pathname === "/67" ? "Projeto 67 | Jo\u00E3o Pedro" : "Portf\u00F3lio | Jo\u00E3o Pedro";
  }, [pathname]);

  useEffect(() => {
    document.documentElement.lang = activeLanguage;
  }, []);

  const renderContent = () => {
    switch (pathname) {
      case "/67":
        return <Page67 language={activeLanguage} />;
      case "/":
      case "/portfolio":
        return <PortfolioLandingPage />;
      default:
        return <PortfolioLandingPage />;
    }
  };

  return (
    <main className={`app-shell ${pathname !== "/67" ? "overflow-visible" : ""}`}>
      {renderContent()}
    </main>
  );
}
