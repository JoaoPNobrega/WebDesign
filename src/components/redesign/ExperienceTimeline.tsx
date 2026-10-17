import { useRef } from "react";
import gsap from "gsap";
import { SplitWords, revealWords, useSectionMotion } from "./motion";

const EXPERIENCE = [
  { period: "out/2026 – atual", role: "Desenvolvedor Front-end Júnior", place: "Web Star Studio" },
  { period: "fev – set/2026", role: "Estagiário Full Stack", place: "Web Star Studio" },
  { period: "abr/2026 – atual", role: "Desenvolvedor freelancer", place: "Projetos independentes", note: "Ex.: site do professor Filipe Regueira." },
  { period: "Conclusão prevista no fim de 2027", role: "Ciência da Computação", place: "CESAR School" },
];

const FACTS = ["Recife, PE", "Inglês intermediário"];

export default function ExperienceTimeline() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, ({ motion }, scope) => {
    if (!motion) return;
    const title = scope.querySelector(".rd-section__title");
    if (title) revealWords(title);
    const list = scope.querySelector(".rd-timeline");
    gsap.fromTo(scope.querySelector(".rd-timeline__fill"), { scaleY: 0 }, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: { trigger: list, start: "top 70%", end: "bottom 60%", scrub: true },
    });
    // Entries reveal together as soon as the timeline enters (not scrubbed), so it never reads as empty.
    const items = scope.querySelectorAll<HTMLElement>(".rd-timeline__item");
    const reveal = gsap.timeline({ scrollTrigger: { trigger: list, start: "top 85%", once: true } });
    reveal.from(items, { opacity: 0, y: 24, duration: .6, ease: "power3.out", stagger: .08 })
      .from(scope.querySelectorAll(".rd-timeline__dot"), { scale: 0, duration: .45, ease: "back.out(2)", stagger: .08 }, .15);
  });

  return (
    <section ref={root} className="rd-section rd-experience" aria-labelledby="experience-title">
      <header className="rd-section__header">
        <p className="rd-eyebrow">Trajetória</p>
        <h2 className="rd-section__title" id="experience-title"><SplitWords text="Experiência e formação" /></h2>
      </header>
      <div className="rd-timeline">
        <span className="rd-timeline__line" aria-hidden="true"><span className="rd-timeline__fill" /></span>
        <ol className="rd-timeline__list">
          {EXPERIENCE.map(entry => (
            <li className="rd-timeline__item" key={`${entry.role}-${entry.period}`}>
              <span className="rd-timeline__dot" aria-hidden="true" />
              <p className="rd-timeline__period">{entry.period}</p>
              <div>
                <h3 className="rd-timeline__role">{entry.role}</h3>
                <p className="rd-timeline__place">{entry.place}</p>
                {entry.note && <p className="rd-timeline__note">{entry.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
      <ul className="rd-facts" aria-label="Informações rápidas">
        {FACTS.map(fact => <li key={fact}>{fact}</li>)}
      </ul>
    </section>
  );
}
