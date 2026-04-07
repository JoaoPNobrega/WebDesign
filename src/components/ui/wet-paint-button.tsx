import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type WetPaintButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  dripColor?: string;
};

type DripProps = {
  left: string;
  height: number;
  delay: number;
};

const Drip = ({ left, height, delay }: DripProps) => {
  return (
    <motion.div
      className="absolute top-[99%] origin-top"
      style={{ left }}
      initial={{ scaleY: 0.75 }}
      animate={{ scaleY: [0.75, 1, 0.75] }}
      transition={{
        duration: 2,
        times: [0, 0.25, 1],
        delay,
        ease: "easeIn",
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      <div
        style={{ height, backgroundColor: "var(--wet-paint-color)" }}
        className="w-2 rounded-b-full transition-opacity group-hover:opacity-90"
      />

      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-full top-0"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
          style={{ fill: "var(--wet-paint-color)" }}
          className="transition-opacity group-hover:opacity-90"
        />
      </svg>

      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-full top-0 rotate-90"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
          style={{ fill: "var(--wet-paint-color)" }}
          className="transition-opacity group-hover:opacity-90"
        />
      </svg>

      <motion.div
        initial={{ y: -8, opacity: 1 }}
        animate={{ y: [-8, 50], opacity: [1, 0] }}
        transition={{
          duration: 2,
          times: [0, 1],
          delay,
          ease: "easeIn",
          repeat: Infinity,
          repeatDelay: 2,
        }}
        style={{ backgroundColor: "var(--wet-paint-color)" }}
        className="absolute top-full h-2 w-2 rounded-full transition-opacity group-hover:opacity-90"
      />
    </motion.div>
  );
};

const WetPaintButton = React.forwardRef<HTMLButtonElement, WetPaintButtonProps>(
  ({ children, className, dripColor = "#ffffff", style, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative inline-flex items-center justify-center overflow-visible rounded-full font-semibold transition-colors",
          className,
        )}
        style={{ "--wet-paint-color": dripColor, ...style } as React.CSSProperties}
        {...props}
      >
        {children}
        <Drip left="12%" height={24} delay={0.5} />
        <Drip left="34%" height={18} delay={2.8} />
        <Drip left="62%" height={12} delay={4.1} />
        <Drip left="86%" height={20} delay={1.4} />
      </button>
    );
  },
);

WetPaintButton.displayName = "WetPaintButton";

export default WetPaintButton;
