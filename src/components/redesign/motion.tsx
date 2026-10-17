import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const MEDIA = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 900px)",
  hover: "(hover: hover) and (pointer: fine)",
};

export type MotionConditions = Record<keyof typeof MEDIA, boolean>;

/** Scoped gsap.context + matchMedia for one section; everything is reverted on unmount. */
export function useSectionMotion<T extends HTMLElement>(scope: RefObject<T>, setup: (conditions: MotionConditions, root: T) => void | (() => void)) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(MEDIA, context => setup(context.conditions as MotionConditions, root));
    }, root);
    return () => {
      mm.revert();
      ctx.revert();
    };
    // The setup only reads the DOM, so it runs once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Words wrapped in overflow masks, so each one can rise from translateY(100%). */
export function SplitWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="rd-mask"><span className="rd-mask__inner">{word}</span></span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

/** Rise every masked word inside `trigger` once it enters the viewport. */
export function revealWords(trigger: Element, options: { delay?: number; immediate?: boolean } = {}) {
  const words = trigger.querySelectorAll(".rd-mask__inner");
  if (!words.length) return;
  gsap.from(words, {
    yPercent: 110,
    duration: 1.1,
    ease: "power4.out",
    stagger: .055,
    delay: options.delay ?? 0,
    scrollTrigger: options.immediate ? undefined : { trigger, start: "top 88%", once: true },
  });
}

/** Magnetic pull (same pattern as the footer CTA): the wrapper stays put and is used for hit-testing. */
export function magnetize(root: Element, margin = 28) {
  const items = [...root.querySelectorAll<HTMLElement>(".rd-magnet")].flatMap(track => {
    const magnet = track.querySelector<HTMLElement>("[data-magnet]");
    const label = track.querySelector<HTMLElement>("[data-magnet-label]");
    return magnet ? [{ track, magnet, label, inside: false }] : [];
  });
  if (!items.length) return;
  const onMove = (event: PointerEvent) => {
    items.forEach(item => {
      const rect = item.track.getBoundingClientRect();
      const within = event.clientX >= rect.left - margin && event.clientX <= rect.right + margin && event.clientY >= rect.top - margin && event.clientY <= rect.bottom + margin;
      if (within) {
        item.inside = true;
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        gsap.to(item.magnet, { x: dx * .3, y: dy * .3, duration: .4, ease: "power3.out", overwrite: "auto" });
        if (item.label) gsap.to(item.label, { x: dx * .15, y: dy * .15, duration: .4, ease: "power3.out", overwrite: "auto" });
      } else if (item.inside) {
        item.inside = false;
        gsap.to([item.magnet, item.label].filter(Boolean), { x: 0, y: 0, duration: 1.1, ease: "elastic.out(1, 0.3)", overwrite: "auto" });
      }
    });
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  return () => window.removeEventListener("pointermove", onMove);
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
