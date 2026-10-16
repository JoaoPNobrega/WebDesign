import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, GalleryHorizontalEnd, LayoutGrid, X } from "lucide-react";
import { getProjectImages, navProjectItems } from "../lib/projects";

export default function NotchProjects({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"carousel" | "grid">("carousel");
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, scrollLeft: 0, dragging: false, active: false });

  function updateEdges() {
    const track = trackRef.current;
    if (!track) return;
    setCanPrevious(track.scrollLeft > 2);
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 2);
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    dragRef.current.active = false;
    dragRef.current.dragging = false;
    delete track.dataset.dragging;
    track.scrollLeft = 0;
    track.scrollTop = 0;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(track);
    updateEdges();
    return () => observer.disconnect();
  }, [mode]);

  function move(direction: number) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".project-card");
    const distance = (card?.getBoundingClientRect().width ?? track.clientWidth) + 16;
    track.scrollBy({
      left: direction * distance,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (mode !== "carousel" || event.pointerType !== "mouse" || event.button !== 0) return;
    dragRef.current = { startX: event.clientX, scrollLeft: event.currentTarget.scrollLeft, dragging: false, active: true };
  }

  function drag(event: PointerEvent<HTMLDivElement>) {
    const state = dragRef.current;
    if (!state.active) return;
    const distance = event.clientX - state.startX;
    if (Math.abs(distance) > 6 && !state.dragging) {
      state.dragging = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.dataset.dragging = "true";
    }
    if (state.dragging) event.currentTarget.scrollLeft = state.scrollLeft - distance;
  }

  function stopDrag(event: PointerEvent<HTMLDivElement>) {
    dragRef.current.active = false;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <section className="projects-panel" aria-labelledby="notch-projects-title">
      <header className="projects-panel__header">
        <div>
          <p className="notch__eyebrow">PORTFÓLIO · {navProjectItems.length} PROJETOS</p>
          <h2 id="notch-projects-title">Um pouco do que eu crio.</h2>
        </div>
        <div className="projects-panel__tools">
          <button
            className="notch__icon-button projects-panel__view"
            type="button"
            aria-label={mode === "carousel" ? "Ver projetos em grade" : "Ver projetos em carrossel"}
            title={mode === "carousel" ? "Ver em grade" : "Ver em carrossel"}
            aria-pressed={mode === "grid"}
            onClick={() => setMode((value) => value === "carousel" ? "grid" : "carousel")}
          >
            {mode === "carousel" ? <LayoutGrid size={19} strokeWidth={1.6} /> : <GalleryHorizontalEnd size={20} strokeWidth={1.6} />}
          </button>
          <span className="projects-panel__divider" aria-hidden="true" />
          <button className="notch__icon-button" type="button" aria-label="Fechar projetos" onClick={onClose}><X size={19} strokeWidth={1.6} /></button>
        </div>
      </header>
      <div className="projects-panel__viewport" data-mode={mode}>
        <div
          ref={trackRef}
          className="projects-panel__list"
          data-mode={mode}
          role="region"
          aria-label={mode === "carousel" ? "Carrossel de projetos" : "Grade de projetos"}
          aria-roledescription={mode === "carousel" ? "carrossel" : undefined}
          tabIndex={0}
          onScroll={updateEdges}
          onPointerDown={startDrag}
          onPointerMove={drag}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onDragStart={(event) => event.preventDefault()}
          onClickCapture={(event) => {
            if (dragRef.current.dragging) {
              event.preventDefault();
              event.stopPropagation();
              dragRef.current.dragging = false;
            }
          }}
          onKeyDown={(event) => {
            if (mode !== "carousel" || event.target !== event.currentTarget) return;
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              move(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
        >
          {navProjectItems.map((project, index) => (
            <a className="project-card" key={project.title} href={"href" in project ? project.href : undefined} target="_blank" rel="noreferrer" aria-label={`Abrir ${project.title} em nova aba`}>
              <div className="project-card__cover">
                <img src={getProjectImages(project)[0]} alt={`Prévia do projeto ${project.title}`} loading={index < 3 ? "eager" : "lazy"} draggable={false} width={640} height={400} />
                <span className="project-card__visit" aria-hidden="true"><ArrowUpRight size={18} /></span>
              </div>
              <div className="project-card__caption">
                <div><h3>{project.title}</h3><p>{"partner" in project ? project.partner : "Projeto web"}</p></div>
                <span className="project-card__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </div>
            </a>
          ))}
        </div>
        {mode === "carousel" && (["start", "end"] as const).map((side) => (
          <span
            key={side}
            className="projects-panel__edge"
            data-side={side}
            data-active={side === "start" ? canPrevious : canNext}
            aria-hidden="true"
          ><i /><i /><i /></span>
        ))}
      </div>
      <footer className="projects-panel__footer">
        <span>{mode === "carousel" ? "Arraste para explorar" : "Role para ver todos os projetos"}</span>
        {mode === "carousel" && <div className="projects-panel__arrows">
          <button className="notch__icon-button" type="button" aria-label="Projetos anteriores" disabled={!canPrevious} onClick={() => move(-1)}><ArrowLeft size={18} strokeWidth={1.5} /></button>
          <button className="notch__icon-button" type="button" aria-label="Próximos projetos" disabled={!canNext} onClick={() => move(1)}><ArrowRight size={18} strokeWidth={1.5} /></button>
        </div>}
      </footer>
    </section>
  );
}
