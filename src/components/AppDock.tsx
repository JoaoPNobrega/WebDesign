import { CreditCard, Flame, Home } from "lucide-react";

import TiltedDock from "@/components/ui/tilted-dock";

interface AppDockProps {
  activeId: "home" | "cracha" | "destruction";
}

import { TiltedDockItem } from "@/components/ui/tilted-dock";

const dockItems: TiltedDockItem[] = [
  {
    id: "home",
    icon: <Home size={28} />,
    label: "Home",
    href: "#/",
  },
  {
    id: "cracha",
    icon: <CreditCard size={28} />,
    label: "Cracha",
    href: "#/cracha",
  },
  {
    id: "destruction",
    icon: <Flame size={28} />,
    label: "Destruction",
    href: "#/destruction",
  },
];

export function AppDock({ activeId }: AppDockProps) {
  return <TiltedDock items={dockItems} activeId={activeId} />;
}
