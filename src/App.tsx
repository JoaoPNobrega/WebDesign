import { useEffect, useState } from "react";

import { AppDock } from "@/components/AppDock";
import PortfolioPage from "@/pages/PortfolioPage";
import DestructionPage from "@/pages/DestructionPage";
import LanyardPage from "@/pages/LanyardPage";

const DEFAULT_HASH = "#/";

function getCurrentPath() {
  if (typeof window === "undefined") {
    return "/";
  }

  const hashPath = window.location.hash.replace(/^#/, "");
  if (!hashPath) {
    return "/";
  }

  return hashPath.startsWith("/") ? hashPath : `/${hashPath}`;
}

export default function App() {
  const [pathname, setPathname] = useState(getCurrentPath);

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, "", DEFAULT_HASH);
    }

    const syncPath = () => setPathname(getCurrentPath());
    syncPath();

    window.addEventListener("hashchange", syncPath);
    return () => window.removeEventListener("hashchange", syncPath);
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
      case "/destruction":
        return <DestructionPage />;
      case "/cracha":
        return <LanyardPage />;
      default:
        return <PortfolioPage />;
    }
  };

  return (
    <main className="app-shell">
      {renderContent()}
      <AppDock 
        activeId={pathname === "/destruction" ? "destruction" : pathname === "/cracha" ? "cracha" : "home"} 
      />
    </main>
  );
}
