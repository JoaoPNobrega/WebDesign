import { type CSSProperties, useId, useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

type Intensity = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface LiquidGlassCardProps extends HTMLMotionProps<"div"> {
  glowIntensity?: Intensity;
  shadowIntensity?: Intensity;
  blurIntensity?: Intensity;
  borderRadius?: string;
  draggable?: boolean;
  expandable?: boolean;
  width?: string;
  height?: string;
  expandedWidth?: string;
  expandedHeight?: string;
}

const blurValue: Record<Intensity, string> = {
  none: "0px",
  xs: "1px",
  sm: "3px",
  md: "6px",
  lg: "10px",
  xl: "14px",
  "2xl": "18px",
};

const tintValue: Record<Intensity, string> = {
  none: "0",
  xs: "0.1",
  sm: "0.16",
  md: "0.22",
  lg: "0.28",
  xl: "0.34",
  "2xl": "0.42",
};

const glowValue: Record<Intensity, string> = {
  none: "0",
  xs: "0.08",
  sm: "0.14",
  md: "0.22",
  lg: "0.32",
  xl: "0.44",
  "2xl": "0.58",
};

const shadowValue: Record<Intensity, string> = {
  none: "0 0 0 rgba(0,0,0,0)",
  xs: "0 8px 22px rgba(0,0,0,0.18), 0 0 12px rgba(255,255,255,0.04)",
  sm: "0 14px 36px rgba(0,0,0,0.24), 0 0 22px rgba(255,255,255,0.06)",
  md: "0 24px 70px rgba(0,0,0,0.34), 0 0 34px rgba(255,255,255,0.08)",
  lg: "0 34px 110px rgba(0,0,0,0.44), 0 0 48px rgba(255,255,255,0.10)",
  xl: "0 44px 150px rgba(0,0,0,0.54), 0 0 64px rgba(255,255,255,0.12)",
  "2xl": "0 54px 190px rgba(0,0,0,0.64), 0 0 84px rgba(255,255,255,0.14)",
};

export function LiquidGlassCard({
  children,
  className,
  glowIntensity = "sm",
  shadowIntensity = "md",
  blurIntensity = "sm",
  borderRadius = "32px",
  draggable = false,
  expandable = false,
  width,
  height,
  expandedWidth,
  expandedHeight,
  style,
  onClick,
  ...props
}: LiquidGlassCardProps) {
  const filterId = `glass-distortion-${useId().replace(/:/g, "")}`;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={cn("liquidGlass-wrapper", draggable && "cursor-grab active:cursor-grabbing", expandable && "cursor-pointer", className)}
      drag={draggable}
      dragElastic={0.18}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileDrag={draggable ? { scale: 1.025 } : undefined}
      animate={{
        width: isExpanded ? expandedWidth ?? width : width,
        height: isExpanded ? expandedHeight ?? height : height,
      }}
      transition={{ type: "spring", stiffness: 210, damping: 24, mass: 0.75 }}
      onClick={(event) => {
        if (expandable) setIsExpanded((current) => !current);
        onClick?.(event);
      }}
      style={
        {
          "--liquid-glass-radius": borderRadius,
          "--liquid-glass-blur": blurValue[blurIntensity],
          "--liquid-glass-tint": tintValue[glowIntensity],
          "--liquid-glass-glow": glowValue[glowIntensity],
          "--liquid-glass-shadow": shadowValue[shadowIntensity],
          borderRadius,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
        <filter id={filterId} x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="1" seed="5" result="turbulence" />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />
          <feDisplacementMap in="SourceGraphic" in2="softMap" scale="190" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div
        className="liquidGlass-effect"
        style={{
          filter: `url(#${filterId})`,
          WebkitBackdropFilter: `url(#${filterId}) blur(var(--liquid-glass-blur)) saturate(1.45)`,
          backdropFilter: `url(#${filterId}) blur(var(--liquid-glass-blur)) saturate(1.45)`,
        }}
      />
      <div className="liquidGlass-refraction" />
      <div className="liquidGlass-tint" />
      <div className="liquidGlass-shine" />
      <div className="liquidGlass-text">{children}</div>
    </motion.div>
  );
}

export default LiquidGlassCard;
