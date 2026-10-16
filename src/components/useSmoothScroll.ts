import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function useSmoothScroll() {
  const scroll = useRef<Lenis | null>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function setup() {
      scroll.current?.destroy();
      scroll.current = new Lenis({ smoothWheel: !preference.matches, syncTouch: false, lerp: .085, wheelMultiplier: .9 });
    }
    setup();
    function tick(time: number) { scroll.current?.raf(time); frame = requestAnimationFrame(tick); }
    frame = requestAnimationFrame(tick);
    preference.addEventListener("change", setup);
    return () => {
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", setup);
      scroll.current?.destroy();
      scroll.current = null;
    };
  }, []);
  return scroll;
}
