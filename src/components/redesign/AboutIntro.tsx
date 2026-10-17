import { useRef, type MouseEvent } from "react";
import gsap from "gsap";
import GitHubActivity from "../GitHubActivity";
import { SplitWords, magnetize, revealWords, useSectionMotion } from "./motion";

type Props = { onNavigate: (target: HTMLElement) => void };

export default function AboutIntro({ onNavigate }: Props) {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, ({ motion, hover }, scope) => {
    if (!motion) return;
    const title = scope.querySelector(".rd-intro__title");
    if (title) revealWords(title, { immediate: true, delay: .25 });
    gsap.from(scope.querySelectorAll(".rd-intro__text, .rd-intro__actions"), { opacity: 0, y: 24, duration: 1, ease: "power3.out", stagger: .1, delay: .65 });
    gsap.from(scope.querySelector(".github-activity"), { opacity: 0, y: 32, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: scope.querySelector(".github-activity"), start: "top 90%", once: true } });
    if (hover) return magnetize(scope);
  });

  function goToProjects(event: MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById("projetos");
    if (!target) return;
    event.preventDefault();
    onNavigate(target);
    target.focus({ preventScroll: true });
  }

  return (
    <section ref={root} id="about" className="about-section rd-intro" aria-labelledby="about-title">
      <div className="about-section__content rd-intro__content">
        <div className="about-section__intro">
          <p className="rd-eyebrow">João Pedro Araújo Nóbrega</p>
          <h2 className="rd-intro__title" id="about-title">
            <SplitWords text="Desenvolvedor Front-end Júnior em Recife." />
          </h2>
          <p className="rd-intro__text">
            Construo sites e interfaces web com React e TypeScript na <strong>Web Star Studio</strong>, onde comecei como estagiário e hoje sou júnior. Em paralelo, faço projetos freelance e curso Ciência da Computação na CESAR School.
          </p>
          <div className="rd-intro__actions">
            <span className="rd-magnet">
              <a className="rd-button rd-button--primary" href="#projetos" onClick={goToProjects} data-magnet>
                <span data-magnet-label>Ver projetos</span>
              </a>
            </span>
            <span className="rd-magnet">
              <a className="rd-button" href="/curriculo-joao-pedro.pdf" target="_blank" rel="noreferrer" data-magnet>
                <span data-magnet-label>Currículo <span className="rd-button__meta">PDF</span></span>
              </a>
            </span>
          </div>
        </div>
        <GitHubActivity />
      </div>
    </section>
  );
}
