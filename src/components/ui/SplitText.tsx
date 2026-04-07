import React, { useMemo } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | number[];
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: {
    opacity?: number;
    x?: number;
    y?: number;
    scale?: number;
    filter?: string;
  };
  to?: {
    opacity?: number;
    x?: number;
    y?: number;
    scale?: number;
    filter?: string;
  };
  threshold?: number;
  rootMargin?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
};

const defaultEase = [0.22, 1, 0.36, 1] as const;

function resolveEase(ease: SplitTextProps["ease"]): Transition["ease"] {
  if (Array.isArray(ease)) {
    return ease as Transition["ease"];
  }

  if (ease === "power3.out") {
    return defaultEase;
  }

  return ease || defaultEase;
}

export default function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  tag = "p",
  textAlign = "center",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const Tag = motion[tag] as React.ElementType;
  const lines = useMemo(() => text.split("\n"), [text]);
  const characters = useMemo(() => lines.flatMap((line) => Array.from(line)), [lines]);
  const transitionEase = resolveEase(ease);

  if (shouldReduceMotion) {
    return (
      <Tag className={className} style={{ textAlign, whiteSpace: "pre-line" }}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      style={{ textAlign, whiteSpace: "pre-line" }}
      aria-label={text.replace(/\s+/g, " ").trim()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold, margin: rootMargin }}
    >
      {lines.map((line, lineIndex) => {
        const previousCharacters = lines.slice(0, lineIndex).join("").length;

        return (
          <span key={`${line}-${lineIndex}`} className="block overflow-visible py-[0.06em]">
            {Array.from(line).map((character, characterIndex) => {
              const absoluteIndex = previousCharacters + characterIndex;
              const isLastCharacter = absoluteIndex === characters.length - 1;

              return (
                <motion.span
                  key={`${character}-${lineIndex}-${characterIndex}`}
                  aria-hidden="true"
                  className="inline-block will-change-transform"
                  variants={{
                    hidden: from,
                    visible: to,
                  }}
                  transition={{
                    duration,
                    ease: transitionEase,
                    delay: (absoluteIndex * delay) / 1000,
                  }}
                  onAnimationComplete={() => {
                    if (isLastCharacter) {
                      onLetterAnimationComplete?.();
                    }
                  }}
                >
                  {character === " " ? "\u00A0" : character}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
