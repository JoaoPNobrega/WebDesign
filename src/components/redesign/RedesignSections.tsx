import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutIntro from "./AboutIntro";
import Statement from "./Statement";
import SelectedProjects from "./SelectedProjects";
import StackMarquee from "./StackMarquee";
import ExperienceTimeline from "./ExperienceTimeline";

type Props = { onNavigate: (target: HTMLElement) => void };

/** Sections between the hero and the footer. Keeps ScrollTrigger in sync with late layout changes. */
export default function RedesignSections({ onNavigate }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer = 0;
    let disposed = false;
    const refresh = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => { if (!disposed) ScrollTrigger.refresh(); }, 200);
    };

    let lastSize = "";
    const observer = new ResizeObserver(([entry]) => {
      const size = `${Math.round(entry.contentRect.width)}x${Math.round(entry.contentRect.height)}`;
      if (size === lastSize) return;
      const first = !lastSize;
      lastSize = size;
      if (!first) refresh();
    });
    observer.observe(document.body);

    const pending = [...(root.current?.querySelectorAll("img") ?? [])].filter(image => !image.complete);
    pending.forEach(image => image.addEventListener("load", refresh, { once: true }));
    void document.fonts?.ready.then(refresh);

    return () => {
      disposed = true;
      window.clearTimeout(timer);
      observer.disconnect();
      pending.forEach(image => image.removeEventListener("load", refresh));
    };
  }, []);

  return (
    <div ref={root} className="rd">
      <AboutIntro onNavigate={onNavigate} />
      <Statement />
      <SelectedProjects />
      <StackMarquee />
      <ExperienceTimeline />
    </div>
  );
}
