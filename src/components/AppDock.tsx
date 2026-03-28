import { CreditCard, Flame, Home, Play } from "lucide-react";

import type { SiteLanguage } from "@/lib/site-language";
import Dock, { DockItemData } from "@/components/ui/Dock";

interface AppDockProps {
  activeId: "home" | "cracha" | "destruction" | "67";
  language: SiteLanguage;
}

const dockLabels: Record<SiteLanguage, Record<AppDockProps["activeId"], string>> = {
  "pt-BR": {
    home: "In\u00EDcio",
    cracha: "Crach\u00E1",
    destruction: "Destruction",
    "67": "Proj 67",
  },
  "en-US": {
    home: "Home",
    cracha: "Badge",
    destruction: "Destruction",
    "67": "Proj 67",
  },
};

export function AppDock({ activeId, language }: AppDockProps) {
  const navigate = (path: string) => {
    window.history.pushState(null, "", path);
    window.dispatchEvent(new Event("popstate"));
  };

  const getStyle = (id: string) => {
    return activeId === id
      ? "text-[#A7EF9E] border-[#A7EF9E]/40 shadow-[0_0_12px_rgba(167,239,158,0.2)] bg-black/60"
      : "text-zinc-400 hover:text-white bg-black/40 border-transparent hover:border-white/10";
  };

  const labels = dockLabels[language];

  const items: DockItemData[] = [
    {
      icon: <Home size={22} />,
      label: labels.home,
      onClick: () => navigate("/"),
      className: getStyle("home"),
    },
    {
      icon: <CreditCard size={22} />,
      label: labels.cracha,
      onClick: () => navigate("/cracha"),
      className: getStyle("cracha"),
    },
    {
      icon: <Flame size={22} />,
      label: labels.destruction,
      onClick: () => navigate("/destruction"),
      className: getStyle("destruction"),
    },
    {
      icon: <Play size={22} />,
      label: labels["67"],
      onClick: () => navigate("/67"),
      className: getStyle("67"),
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <Dock
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </div>
  );
}
