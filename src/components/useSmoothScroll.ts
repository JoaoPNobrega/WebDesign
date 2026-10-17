import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Lenis driven by the GSAP ticker so ScrollTrigger reads the same frame. */
export default function useSmoothScroll() {
  const scroll = useRef<Lenis | null>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function setup() {
      scroll.current?.destroy();
      const lenis = new Lenis({ smoothWheel: !preference.matches, syncTouch: false, lerp: .085, wheelMultiplier: .9 });
      lenis.on("scroll", ScrollTrigger.update);
      scroll.current = lenis;
    }
    setup();
    const tick = (time: number) => scroll.current?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    preference.addEventListener("change", setup);
    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      preference.removeEventListener("change", setup);
      scroll.current?.destroy();
      scroll.current = null;
    };
  }, []);
  return scroll;
}
