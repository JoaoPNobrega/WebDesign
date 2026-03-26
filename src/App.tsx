import { useEffect, useState } from "react";

import { AppDock } from "@/components/AppDock";
import PortfolioPage from "@/pages/PortfolioPage";
import DestructionPage from "@/pages/DestructionPage";
import LanyardPage from "@/pages/LanyardPage";
import Page67 from "@/pages/Page67";
import NotFoundPage from "@/pages/NotFoundPage";

const DEFAULT_PATH = "/";

function getCurrentPath() {
  if (typeof window === "undefined") {
    return "/";
  }
  return window.location.pathname;
}

export default function App() {
  const [pathname, setPathname] = useState(getCurrentPath);

  useEffect(() => {
    const syncPath = () => setPathname(getCurrentPath());
    window.addEventListener("popstate", syncPath);

    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.href && target.href.startsWith(window.location.origin)) {
        if (target.getAttribute('target') !== '_blank') {
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
    const titles: Record<string, string> = {
      "/": "Portfolio | João Pedro",
      "/destruction": "Destruction",
      "/cracha": "Crachá",
    };
    document.title = titles[pathname] || "Portfolio";
  }, [pathname]);

  const renderContent = () => {
    switch (pathname) {
      case "/":
        return <PortfolioPage />;
      case "/destruction":
        return <DestructionPage />;
      case "/cracha":
        return <LanyardPage />;
      case "/67":
        return <Page67 />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <main className="app-shell">
      {renderContent()}
      <AppDock 
        activeId={
          pathname === "/destruction" ? "destruction" : 
          pathname === "/cracha" ? "cracha" : 
          pathname === "/67" ? "67" : 
          "home"
        } 
      />
    </main>
  );
}
