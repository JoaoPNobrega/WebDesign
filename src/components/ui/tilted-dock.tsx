"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Bell, Home, Search, Settings, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface TiltedDockItem {
  id: number | string;
  icon: ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

const icons: TiltedDockItem[] = [
  { id: 1, icon: <Home size={28} />, label: "Home" },
  { id: 2, icon: <Search size={28} />, label: "Search" },
  { id: 3, icon: <Bell size={28} />, label: "Alerts" },
  { id: 4, icon: <User size={28} />, label: "Profile" },
  { id: 5, icon: <Settings size={28} />, label: "Settings" },
];

interface TiltedDockProps {
  items?: TiltedDockItem[];
  activeId?: number | string | null;
  className?: string;
}

function DockAction({ item, isActive }: { item: TiltedDockItem; isActive: boolean }) {
  const sharedClassName = cn(
    "h-14 w-14 rounded-2xl border border-white/10 bg-white/5 text-zinc-100 shadow-[0_8px_20px_rgba(0,0,0,0.25)] backdrop-blur-md",
    "hover:bg-white/10 hover:text-white",
    isActive && "border-orange-300/35 bg-orange-500/20 text-white",
  );

  if (item.href) {
    return (
      <Button asChild variant="ghost" size="icon" className={sharedClassName}>
        <a href={item.href} aria-label={item.label}>
          {item.icon}
        </a>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={sharedClassName}
      onClick={item.onClick}
      aria-label={item.label}
    >
      {item.icon}
    </Button>
  );
}

export default function TiltedDock({
  items = icons,
  activeId = null,
  className,
}: TiltedDockProps) {
  const [hovered, setHovered] = useState<number | string | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <TooltipProvider delayDuration={100}>
      <div className={cn("fixed bottom-6 left-1/2 z-50 -translate-x-1/2", className)}>
        <motion.div
          className="flex gap-5 rounded-[30px] border border-white/10 bg-zinc-950/72 px-6 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateX: 16, rotateY: mouse.x * 10 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          {items.map((item) => {
            const isActive = activeId === item.id;

            return (
              <motion.div
                key={item.id}
                className="relative flex flex-col items-center justify-center"
                onHoverStart={() => setHovered(item.id)}
                onHoverEnd={() => setHovered(null)}
                animate={{
                  scale: hovered === item.id || isActive ? 1.22 : 1,
                  z: hovered === item.id || isActive ? 120 : hovered ? -20 : 0,
                  opacity: hovered && hovered !== item.id && !isActive ? 0.5 : 1,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      animate={{
                        rotateX: hovered === item.id ? -10 : 0,
                        rotateY: hovered === item.id ? 10 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    >
                      <DockAction item={item} isActive={isActive} />
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="top">{item.label}</TooltipContent>
                </Tooltip>

                <motion.span
                  className="absolute -bottom-7 text-xs font-medium tracking-[0.18em] text-zinc-100/88"
                  animate={{
                    opacity: hovered === item.id || isActive ? 1 : 0,
                    y: hovered === item.id || isActive ? 0 : 5,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  {item.label}
                </motion.span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </TooltipProvider>
  );
}
