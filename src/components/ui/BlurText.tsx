import { useEffect, useMemo, useRef, useState, type CSSProperties, type ElementType } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";

type BlurTextProps = {
  text?: string;
  id?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Transition["ease"];
  onAnimationComplete?: () => void;
  stepDuration?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  style?: CSSProperties;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>,
) => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap((step) => Object.keys(step))]);

  return Array.from(keys).reduce<Record<string, Array<string | number>>>((keyframes, key) => {
    keyframes[key] = [from[key], ...steps.map((step) => step[key])];
    return keyframes;
  }, {});
};

export default function BlurText({
  text = "",
  id,
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = [0.22, 1, 0.36, 1],
  onAnimationComplete,
  stepDuration = 0.35,
  tag = "p",
  style,
}: BlurTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const Tag = motion[tag] as ElementType;
  const elements = useMemo(() => (animateBy === "words" ? text.split(" ") : Array.from(text)), [animateBy, text]);

  useEffect(() => {
    if (!ref.current || shouldReduceMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin, shouldReduceMotion, threshold]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction],
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction],
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const keyframes = useMemo(() => buildKeyframes(fromSnapshot, toSnapshots), [fromSnapshot, toSnapshots]);
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, index) => (stepCount === 1 ? 0 : index / (stepCount - 1)));

  if (shouldReduceMotion) {
    return (
      <Tag id={id} className={className} style={style}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      id={id}
      className={`flex flex-wrap ${className}`}
      style={style}
      aria-label={text.replace(/\s+/g, " ").trim()}
    >
      {elements.map((segment, index) => {
        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        };

        return (
          <motion.span
            key={`${segment}-${index}`}
            initial={fromSnapshot}
            animate={inView ? keyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            aria-hidden="true"
            className="inline-block will-change-[transform,filter,opacity]"
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 ? "\u00A0" : null}
          </motion.span>
        );
      })}
    </Tag>
  );
}
