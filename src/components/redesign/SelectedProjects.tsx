import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getProjectImages, navProjectItems } from "@/lib/projects";
import { projectDetails } from "@/lib/project-details";
import { ArrowUpRight, SplitWords, magnetize, revealWords, useSectionMotion } from "./motion";

const FEATURED = ["Dr Daniel Pianetti", "Delusional Studio", "Filipe Regueira", "t4kena geek store", "Siaze", "Delulu Painel"];

/** First sentence, without splitting on honorifics like "Dr." / "Dra.". */
function firstSentence(text: string) {
  const match = text.match(/^.*?(?<!\b(?:Dr|Dra|Sr|Sra|Prof))\.(?=\s|$)/);
  return match ? match[0] : text;
}

const projects = FEATURED.flatMap(title => {
  const item = navProjectItems.find(project => project.title === title);
  if (!item || !("href" in item)) return [];
  const partner = "partner" in item ? item.partner : "Projeto pessoal";
  if (/aj solu/i.test(`${item.title} ${partner}`)) return [];
  return [{
    title: item.title,
    partner,
    href: item.href,
    image: getProjectImages(item)[0],
    description: firstSentence(item.description["pt-BR"]),
    tags: projectDetails[item.title]?.tags.slice(0, 4) ?? [],
  }];
});

const pad = (value: number) => String(value).padStart(2, "0");

export default function SelectedProjects() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, ({ motion, desktop, hover }, scope) => {
    if (!motion) return;
    const title = scope.querySelector(".rd-projects__title");
    if (title) revealWords(title);
    const cleanups: (() => void)[] = [];

    if (desktop) {
      const items = [...scope.querySelectorAll<HTMLElement>(".rd-project")];
      const layers = [...scope.querySelectorAll<HTMLElement>(".rd-projects__layer")];
      const frame = scope.querySelector(".rd-projects__frame");
      const counter = scope.querySelector(".rd-projects__current");
      let current = -1;
      let depth = 1;
      const activate = (index: number, animate = true) => {
        if (index === current) return;
        const forward = index > current;
        current = index;
        items.forEach((item, i) => { item.dataset.active = String(i === index); });
        if (counter) counter.textContent = pad(index + 1);
        const layer = layers[index];
        gsap.set(layer, { zIndex: ++depth });
        if (!animate) { gsap.set(layer, { clipPath: "inset(0% 0% 0% 0%)" }); return; }
        gsap.fromTo(layer, { clipPath: forward ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: .95, ease: "power3.inOut", overwrite: true });
        gsap.fromTo(layer.querySelector("img"), { scale: 1.14 }, { scale: 1, duration: 1.3, ease: "power3.out", overwrite: true });
      };
      activate(0, false);
      items.forEach((item, index) => ScrollTrigger.create({
        trigger: item,
        start: "top center",
        end: "bottom center",
        onToggle: self => { if (self.isActive) activate(index); },
      }));
      gsap.fromTo(frame, { clipPath: "inset(14% 12% 14% 12% round 28px)" }, {
        clipPath: "inset(0% 0% 0% 0% round 16px)",
        ease: "none",
        scrollTrigger: { trigger: scope.querySelector(".rd-projects__body"), start: "top 85%", end: "top 20%", scrub: true },
      });
      cleanups.push(() => {
        items.forEach(item => { delete item.dataset.active; });
        if (counter) counter.textContent = pad(1);
      });
    } else {
      scope.querySelectorAll<HTMLElement>(".rd-project").forEach(card => {
        const media = card.querySelector(".rd-project__media");
        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 85%", once: true } });
        tl.fromTo(media, { clipPath: "inset(10% 8% 10% 8% round 14px)" }, { clipPath: "inset(0% 0% 0% 0% round 14px)", duration: 1, ease: "power3.out" })
          .from(card.querySelector(".rd-project__info"), { opacity: 0, y: 20, duration: .8, ease: "power3.out" }, .15);
      });
    }
    if (hover) { const off = magnetize(scope); if (off) cleanups.push(off); }
    return () => cleanups.forEach(cleanup => cleanup());
  });

  return (
    <section ref={root} id="projetos" className="rd-section rd-projects" aria-labelledby="projects-title" tabIndex={-1}>
      <header className="rd-section__header">
        <p className="rd-eyebrow">Seleção · {pad(projects.length)} projetos</p>
        <h2 className="rd-section__title rd-projects__title" id="projects-title"><SplitWords text="Projetos selecionados" /></h2>
        <p className="rd-section__lead">Sites e sistemas no ar, feitos na Web Star Studio, como freelancer e por conta própria.</p>
      </header>

      <div className="rd-projects__body">
        <ol className="rd-projects__list">
          {projects.map((project, index) => (
            <li className="rd-project" key={project.title}>
              <figure className="rd-project__media">
                <img src={project.image} alt={`Captura de tela do projeto ${project.title}`} width={1600} height={1000} loading="lazy" decoding="async" />
              </figure>
              <div className="rd-project__info">
                <p className="rd-project__meta"><span>{pad(index + 1)}</span>{project.partner}</p>
                <h3 className="rd-project__title">{project.title}</h3>
                <p className="rd-project__description">{project.description}</p>
                {project.tags.length > 0 && (
                  <ul className="rd-project__tags" aria-label="Tecnologias">
                    {project.tags.map(tag => <li key={tag}>{tag}</li>)}
                  </ul>
                )}
                <a className="rd-link" href={project.href} target="_blank" rel="noreferrer">
                  Ver site<span className="rd-sr-only"> de {project.title} (abre em nova aba)</span>
                  <ArrowUpRight className="rd-link__icon" />
                </a>
              </div>
            </li>
          ))}
        </ol>

        <div className="rd-projects__stage" aria-hidden="true">
          <div className="rd-projects__frame">
            {projects.map(project => (
              <div className="rd-projects__layer" key={project.title}>
                <img src={project.image} alt="" width={1600} height={1000} loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
          <p className="rd-projects__counter"><span className="rd-projects__current">01</span> / {pad(projects.length)}</p>
        </div>
      </div>

      <div className="rd-projects__more">
        <span className="rd-magnet">
          <a className="rd-button" href="/projetos" data-magnet>
            <span data-magnet-label>Ver todos os projetos</span>
          </a>
        </span>
      </div>
    </section>
  );
}
