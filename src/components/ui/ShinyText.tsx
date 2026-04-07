import { type ElementType, type HTMLAttributes } from "react";

interface ShinyTextProps extends HTMLAttributes<HTMLElement> {
  text?: string;
  as?: ElementType;
  speed?: string;
}

export default function ShinyText({
  text,
  as: Component = "span",
  speed = "3.2s",
  className = "",
  children,
  style,
  ...props
}: ShinyTextProps) {
  return (
    <Component
      className={`relative inline-block bg-[linear-gradient(110deg,rgba(255,255,255,0.54)_0%,rgba(255,255,255,0.96)_38%,rgba(167,239,158,0.92)_50%,rgba(255,255,255,0.96)_62%,rgba(255,255,255,0.54)_100%)] bg-[length:240%_100%] bg-clip-text text-transparent motion-safe:animate-[shiny-text_var(--shiny-speed)_linear_infinite] ${className}`}
      style={{ "--shiny-speed": speed, ...style } as React.CSSProperties}
      {...props}
    >
      {text ?? children}
    </Component>
  );
}
