import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, CalendarDays, ChevronRight, Mail, X } from "lucide-react";
import NotchProjects from "./NotchProjects";

export default function ContactNotch({ onAbout, aboutBusy = false, aboutActive = false, panelRequest }: { onAbout: () => void; aboutBusy?: boolean; aboutActive?: boolean; panelRequest?: { view: "contacts" | "projects"; sequence: number } }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"contacts" | "booking" | "projects">("contacts");
  const [panelHeight, setPanelHeight] = useState(0);
  const notchRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const projectsRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<"contacts" | "projects">("contacts");
  const scheduleRef = useRef<HTMLButtonElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const previousView = useRef(view);

  useEffect(() => {
    if (!panelRequest) return;
    lastTrigger.current = panelRequest.view === "projects" ? "projects" : "contacts";
    setView(panelRequest.view);
    setOpen(true);
    (panelRequest.view === "projects" ? projectsRef.current : toggleRef.current)?.focus({ preventScroll: true });
  }, [panelRequest]);

  useEffect(() => {
    if (previousView.current !== view && open) {
      if (view === "booking") backRef.current?.focus({ preventScroll: true });
      else if (view === "contacts" && previousView.current === "booking") scheduleRef.current?.focus({ preventScroll: true });
    }
    previousView.current = view;
  }, [view, open]);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const observer = new ResizeObserver(() => setPanelHeight(content.getBoundingClientRect().height));
    setPanelHeight(content.getBoundingClientRect().height);
    observer.observe(content);
    return () => observer.disconnect();
  }, [view]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !notchRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        (lastTrigger.current === "projects" ? projectsRef.current : toggleRef.current)?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function toggleContact() {
    lastTrigger.current = "contacts";
    if (open && view !== "projects") setOpen(false);
    else { setView("contacts"); setOpen(true); }
  }

  function toggleProjects() {
    lastTrigger.current = "projects";
    if (open && view === "projects") setOpen(false);
    else { setView("projects"); setOpen(true); }
  }

  function closeProjects() {
    setOpen(false);
    projectsRef.current?.focus();
  }

  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <nav ref={notchRef} className="notch" data-open={open} data-panel={view === "projects" ? "projects" : "contact"} aria-label="Navegação principal">
      <div className="notch__nav">
        <button type="button" disabled={aboutBusy} aria-busy={aboutBusy} aria-pressed={aboutActive} onClick={() => { setOpen(false); onAbout(); }}>Sobre</button>
        <button ref={toggleRef} type="button" aria-expanded={open && view !== "projects"} aria-controls="notch-panel" onClick={toggleContact}>Contato</button>
        <button ref={projectsRef} type="button" aria-expanded={open && view === "projects"} aria-controls="notch-panel" onClick={toggleProjects}>Projetos</button>
      </div>
      <div
        id="notch-panel"
        className="notch__expansion"
        data-lenis-prevent
        style={{ height: open ? panelHeight : 0 }}
        aria-hidden={!open}
        {...(!open ? { inert: "" } : {})}
      >
        <div key={view} ref={contentRef} className="notch__content">
          {view === "projects" ? <NotchProjects onClose={closeProjects} /> : view === "contacts" ? (
            <section aria-labelledby="contact-title">
              <div className="notch__heading">
                <div><p className="notch__eyebrow">CONTATO</p><h2 id="contact-title">Vamos conversar.</h2></div>
                <button className="notch__icon-button" type="button" aria-label="Fechar contatos" onClick={() => { setOpen(false); toggleRef.current?.focus(); }}><X size={18} /></button>
              </div>
              <div className="contact-options">
                <a className="contact-option" href="mailto:jpan@cesar.school">
                  <span className="contact-option__icon"><Mail size={19} strokeWidth={1.5} /></span>
                  <span className="contact-option__text"><strong>E-mail</strong><small>jpan@cesar.school</small></span>
                  <ArrowUpRight className="contact-option__arrow" size={18} strokeWidth={1.5} />
                </a>
                <button ref={scheduleRef} className="contact-option" type="button" onClick={() => setView("booking")}>
                  <span className="contact-option__icon"><CalendarDays size={19} strokeWidth={1.5} /></span>
                  <span className="contact-option__text"><strong>Agendar uma conversa</strong><small>Escolha um dia e um horário</small></span>
                  <ChevronRight className="contact-option__arrow" size={18} strokeWidth={1.5} />
                </button>
                <a className="contact-option" href="https://www.linkedin.com/in/joaopedro-nobrega" target="_blank" rel="noreferrer">
                  <span className="contact-option__icon"><span className="contact-option__linkedin" aria-hidden="true">in</span></span>
                  <span className="contact-option__text"><strong>LinkedIn</strong><small>Vamos nos conectar</small></span>
                  <ArrowUpRight className="contact-option__arrow" size={18} strokeWidth={1.5} />
                </a>
              </div>
            </section>
          ) : (
            <section aria-labelledby="booking-title">
              <button ref={backRef} className="notch__back" type="button" onClick={() => setView("contacts")}><ArrowLeft size={15} /> Contatos</button>
              <div className="notch__heading notch__heading--booking">
                <div><p className="notch__eyebrow">UM TEMPO PARA SUAS IDEIAS</p><h2 id="booking-title">Agendar conversa.</h2></div>
              </div>
              <form className="booking-form" onSubmit={(event) => event.preventDefault()}>
                <div className="booking-form__row">
                  <label>Dia<input name="date" type="date" min={minDate} required /></label>
                  <label>Horário<input name="time" type="time" step={1800} required /></label>
                </div>
                <p className="booking-form__timezone">Horário de Recife · UTC−3</p>
                <label>Seu nome<input name="name" autoComplete="name" placeholder="Como posso te chamar?" required /></label>
                <label>Seu e-mail<input name="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" required /></label>
                <button className="booking-form__submit" type="submit" disabled>Agendamento em breve</button>
                <p className="booking-form__notice">Em breve você poderá confirmar seu horário por aqui. Por enquanto, fale comigo por e-mail ou LinkedIn.</p>
              </form>
            </section>
          )}
        </div>
      </div>
    </nav>
  );
}
