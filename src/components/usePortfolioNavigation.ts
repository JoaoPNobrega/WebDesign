import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useSmoothScroll from "./useSmoothScroll";
import aboutCrossfade from "./aboutCrossfade";

export default function usePortfolioNavigation() {
  const smoothScroll = useSmoothScroll();
  const running = useRef(false);
  const [unlocked, setUnlocked] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [aboutActive, setAboutActive] = useState(false);

  function showAbout() {
    const about = document.querySelector<HTMLElement>("#about");
    if (!about) return;
    const scroll = smoothScroll.current;
    if (scroll) {
      scroll.resize();
      scroll.scrollTo(about, { immediate: true, force: true });
    } else window.scrollTo(0, about.getBoundingClientRect().top + window.scrollY);
  }

  function scrollToTarget(target: HTMLElement) {
    const scroll = smoothScroll.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (scroll) scroll.scrollTo(target, reduce ? { immediate: true } : { duration: 1.4 });
    else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }

  function openAbout() {
    if (running.current) return;
    if (unlocked && window.scrollY > window.innerHeight * .25) { showAbout(); return; }
    running.current = true;
    setUnlocked(true);
    setTransitioning(true);
  }

  useLayoutEffect(() => {
    if (!unlocked) { window.scrollTo(0, 0); return; }
    if (!transitioning) return;
    const hero = document.querySelector<HTMLElement>(".hero");
    const about = document.querySelector<HTMLElement>("#about");
    if (!hero || !about || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showAbout(); running.current = false; setTransitioning(false); return;
    }
    smoothScroll.current?.stop();
    const restore = () => { smoothScroll.current?.start(); smoothScroll.current?.resize(); };
    const dispose = aboutCrossfade(hero, about, showAbout, () => {
      restore();
      running.current = false;
      setTransitioning(false);
    });
    return () => { dispose(); restore(); running.current = false; };
  }, [unlocked, transitioning]);

  useEffect(() => {
    const update = () => setAboutActive(unlocked && window.scrollY > window.innerHeight * .65);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [unlocked]);

  return { unlocked, transitioning, aboutActive, openAbout, scrollToTarget };
}
