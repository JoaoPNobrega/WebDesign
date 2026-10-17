import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitWords, revealWords, useSectionMotion } from "./motion";

// Only tools that appear in SkillsSection or in the project stacks (project-details.ts).
const ROWS = [
  ["React", "TypeScript", "Next.js", "Vite", "Tailwind CSS", "GSAP"],
  ["Node.js", "Supabase", "Figma", "Git", "Framer Motion", "JavaScript"],
];

export default function StackMarquee() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, ({ motion, desktop }, scope) => {
    const title = scope.querySelector(".rd-section__title");
    if (!motion) return;
    if (title) revealWords(title);
    const tracks = [...scope.querySelectorAll<HTMLElement>(".rd-marquee__track")];
    const state = tracks.map((track, index) => ({ track, x: 0, direction: index % 2 ? 1 : -1, width: 0 }));
    const measure = () => state.forEach(row => { row.width = row.track.scrollWidth / 2; });
    measure();
    const base = desktop ? 60 : 36;
    let boost = 0;
    let direction = 1;
    const tick = (_time: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 64) / 1000;
      boost = gsap.utils.interpolate(boost, 0, .06);
      state.forEach(row => {
        if (!row.width) return;
        row.x = gsap.utils.wrap(-row.width, 0, row.x + row.direction * direction * (base + boost) * dt);
        gsap.set(row.track, { x: row.x });
      });
    };
    ScrollTrigger.create({
      trigger: scope,
      start: "top bottom",
      end: "bottom top",
      onToggle: self => (self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
      onUpdate: self => {
        const velocity = self.getVelocity();
        direction = velocity < 0 ? -1 : 1;
        boost = Math.max(boost, Math.min(Math.abs(velocity) * (desktop ? .35 : .2), desktop ? 1600 : 700));
      },
      onRefresh: measure,
    });
    return () => gsap.ticker.remove(tick);
  });

  return (
    <section ref={root} className="rd-section rd-stack" aria-labelledby="stack-title">
      <header className="rd-section__header">
        <p className="rd-eyebrow">Ferramentas</p>
        <h2 className="rd-section__title" id="stack-title"><SplitWords text="Stack do dia a dia" /></h2>
      </header>
      <div className="rd-marquee">
        {ROWS.map((row, index) => (
          <div className="rd-marquee__row" key={index}>
            <div className="rd-marquee__track">
              <ul className="rd-marquee__group">
                {row.map(item => <li key={item}>{item}</li>)}
              </ul>
              <ul className="rd-marquee__group" aria-hidden="true">
                {row.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
