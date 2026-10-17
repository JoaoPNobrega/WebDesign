import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "jpan@cesar.school";
const LINKEDIN = "https://www.linkedin.com/in/joaopedro-nobrega";
const GITHUB = "https://github.com/JoaoPNobrega";

const timeFormatter = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Recife", hour: "2-digit", minute: "2-digit", hour12: false });

function useRecifeTime() {
  const [time, setTime] = useState(() => timeFormatter.format(new Date()));
  useEffect(() => {
    const id = window.setInterval(() => setTime(timeFormatter.format(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function SiteFooter() {
  const root = useRef<HTMLDivElement>(null);
  const time = useRecifeTime();

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)", hover: "(hover: hover) and (pointer: fine)", mobile: "(max-width: 720px)" },
        (context) => {
          const { motion, hover, mobile } = context.conditions as { motion: boolean; reduce: boolean; hover: boolean; mobile: boolean };
          const wrap = scope.querySelector<HTMLElement>(".footer-curve__wrap");
          const wrapper = scope.querySelector<HTMLElement>(".site-footer");
          const footer = scope.querySelector<HTMLElement>(".site-footer__inner");
          const arrow = scope.querySelector<HTMLElement>(".site-footer__arrow");
          const track = scope.querySelector<HTMLElement>(".footer-cta__track");
          const magnet = scope.querySelector<HTMLElement>(".footer-cta");
          const label = scope.querySelector<HTMLElement>(".footer-cta__label");
          if (!wrap || !wrapper || !footer || !arrow || !track || !magnet || !label) return;

          if (!motion) {
            gsap.set(wrap, { height: 0 });
            gsap.set(footer, { yPercent: 0 });
            return;
          }

          const scrollTrigger = { trigger: wrapper, start: "top bottom", end: "bottom bottom", scrub: true, invalidateOnRefresh: true };
          gsap.fromTo(wrap, { height: () => (window.innerWidth <= 720 ? "6vh" : "10vh") }, { height: 0, ease: "none", scrollTrigger });
          gsap.fromTo(footer, { yPercent: -30 }, { yPercent: 0, ease: "none", scrollTrigger });
          gsap.fromTo(arrow, { rotate: 15 }, { rotate: 0, ease: "none", scrollTrigger });
          // On mobile the CTA stays put, so it keeps its margin from the right edge at every scroll position.
          if (!mobile) gsap.fromTo(track, { x: () => -window.innerWidth * 0.06 }, { x: 0, ease: "none", scrollTrigger });

          if (!hover) return;
          const margin = 60;
          let inside = false;
          const onMove = (event: PointerEvent) => {
            const rect = track.getBoundingClientRect();
            const within = event.clientX >= rect.left - margin && event.clientX <= rect.right + margin && event.clientY >= rect.top - margin && event.clientY <= rect.bottom + margin;
            if (within) {
              inside = true;
              const dx = event.clientX - (rect.left + rect.width / 2);
              const dy = event.clientY - (rect.top + rect.height / 2);
              gsap.to(magnet, { x: dx * 0.35, y: dy * 0.35, duration: 0.4, ease: "power3.out", overwrite: "auto" });
              gsap.to(label, { x: dx * 0.2, y: dy * 0.2, duration: 0.4, ease: "power3.out", overwrite: "auto" });
            } else if (inside) {
              inside = false;
              gsap.to([magnet, label], { x: 0, y: 0, duration: 1.1, ease: "elastic.out(1, 0.3)", overwrite: "auto" });
            }
          };
          window.addEventListener("pointermove", onMove, { passive: true });
          return () => window.removeEventListener("pointermove", onMove);
        },
      );
    }, scope);

    const refresh = () => ScrollTrigger.refresh();
    const frame = requestAnimationFrame(refresh);
    window.addEventListener("resize", refresh);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", refresh);
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="footer-scene">
      <div className="footer-curve" aria-hidden="true">
        <div className="footer-curve__wrap">
          <div className="footer-curve__shape" />
        </div>
      </div>
      <div className="site-footer">
        <footer className="site-footer__inner" aria-labelledby="footer-title">
          <div className="site-footer__top">
            <h2 className="site-footer__title" id="footer-title">
              <span className="site-footer__title-row">
                <span className="site-footer__avatar" aria-hidden="true">
                  <img src="/assets/joao-pedro-hero-cutout.png" alt="" width={1122} height={1402} loading="lazy" />
                </span>
                <span>Vamos trabalhar</span>
              </span>
              <span className="site-footer__title-row">juntos</span>
            </h2>
            <ArrowUpRight className="site-footer__arrow" />
          </div>

          <div className="site-footer__divider">
            <span className="site-footer__line" aria-hidden="true" />
            <div className="footer-cta__track">
              <a className="footer-cta" href={`mailto:${EMAIL}`}>
                <span className="footer-cta__fill" aria-hidden="true" />
                <span className="footer-cta__label">Fale comigo</span>
              </a>
            </div>
          </div>

          <ul className="site-footer__pills">
            <li><a className="site-footer__pill" href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><a className="site-footer__pill" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a className="site-footer__pill" href={GITHUB} target="_blank" rel="noreferrer">GitHub</a></li>
          </ul>

          <div className="site-footer__bottom">
            <div className="site-footer__meta">
              <dl className="site-footer__item">
                <dt>Versão</dt>
                <dd>2026 Edition</dd>
              </dl>
              <dl className="site-footer__item">
                <dt>Horário local</dt>
                <dd><time>{time} GMT-3</time> · Recife</dd>
              </dl>
            </div>
            <div className="site-footer__item">
              <span className="site-footer__label" id="footer-socials">Redes</span>
              <ul className="site-footer__socials" aria-labelledby="footer-socials">
                <li><a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a></li>
                <li><a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
