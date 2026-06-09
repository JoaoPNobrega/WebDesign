import { useState, useEffect, useCallback, useRef, type CSSProperties } from "react";

import DragaoLogoAnimada, {
  DRAGAO_CENTER_TEAL,
  DRAGAO_CENTER_GRAFITE,
} from "@/components/DragaoLogoAnimada";
import AetherFlowHero from "@/components/ui/aether-flow-hero";
import { useLang } from "@/lib/i18n";
import type { SiteLanguage } from "@/lib/site-language";

// Máscara da abertura: silhueta do MIOLO (dragão) em branco.
// O site é revelado através dessa forma, que dá zoom até preencher a tela.
const MASK_SVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1060 1080'><path fill='#fff' fill-rule='evenodd' d='${DRAGAO_CENTER_GRAFITE}'/><path fill='#fff' fill-rule='evenodd' d='${DRAGAO_CENTER_TEAL}'/></svg>`;
const MASK_URL = `url("data:image/svg+xml,${encodeURIComponent(MASK_SVG)}")`;

// Tempo total até a animação de entrada completar (entrada + draw do miolo).
const INTRO_DONE_MS = 1500;

type Lang = "pt-br" | "en";

export default function IntroLogo({
  onDone,
  loaderMode = false,
  canReveal = true,
}: {
  onDone: () => void;
  /** Modo "tela de carregamento": esconde os botões de idioma e revela sozinho. */
  loaderMode?: boolean;
  /** Em loaderMode, só dispara o zoom de saída quando isto for true (ex.: 3D pronto). */
  canReveal?: boolean;
}) {
  const { setLang } = useLang();
  const [replayKey] = useState(0);
  const [ready, setReady] = useState(false); // animação concluída → botões
  const [exiting, setExiting] = useState(false); // clicou no idioma → saída
  const [grown, setGrown] = useState(false); // máscara do dragão deu zoom

  // Trava o scroll do site enquanto a intro está na frente.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Mostra os botões quando a intro termina.
  useEffect(() => {
    setReady(false);
    setExiting(false);
    setGrown(false);
    const t = setTimeout(() => setReady(true), INTRO_DONE_MS);
    return () => clearTimeout(t);
  }, [replayKey]);

  // Dispara a saída: colchetes voam, dragão dá zoom e revela o que está por baixo.
  const triggerExit = useCallback(() => {
    setReady(false);
    setExiting(true);
    const tGrow = setTimeout(() => setGrown(true), 350);
    const tNav = setTimeout(() => onDone(), 2050);
    return () => {
      clearTimeout(tGrow);
      clearTimeout(tNav);
    };
  }, [onDone]);

  const handleChoose = useCallback(
    (lang: Lang) => {
      // aplica o idioma escolhido no portfólio
      const siteLang: SiteLanguage = lang === "en" ? "en-US" : "pt-BR";
      setLang(siteLang);
      return triggerExit();
    },
    [setLang, triggerExit]
  );

  // Em modo loader não há escolha de idioma: assim que a animação termina e o
  // conteúdo está pronto (canReveal), revela sozinho — apenas uma vez.
  // (Importante NÃO retornar o cleanup do triggerExit aqui: como ele muda
  // `exiting`, o effect re-rodaria e o cleanup limparia os timeouts do zoom/onDone,
  // travando a intro no meio da saída.)
  const autoRevealedRef = useRef(false);
  useEffect(() => {
    if (loaderMode && ready && canReveal && !exiting && !autoRevealedRef.current) {
      autoRevealedRef.current = true;
      triggerExit();
    }
  }, [loaderMode, ready, canReveal, exiting, triggerExit]);

  // Buraco em forma de dragão que CRESCE recortado da própria intro:
  // (campo sólido) XOR (dragão) = tudo visível, menos o dragão → janela
  // transparente que revela o portfólio REAL por baixo conforme dá zoom.
  const exitMaskStyle: CSSProperties = exiting
    ? ({
        WebkitMaskImage: `${MASK_URL}, linear-gradient(#fff, #fff)`,
        maskImage: `${MASK_URL}, linear-gradient(#fff, #fff)`,
        WebkitMaskRepeat: "no-repeat, no-repeat",
        maskRepeat: "no-repeat, no-repeat",
        WebkitMaskPosition: "center, center",
        maskPosition: "center, center",
        WebkitMaskSize: `${grown ? "240000px" : "340px"}, 100% 100%`,
        maskSize: `${grown ? "240000px" : "340px"}, 100% 100%`,
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        transition:
          "-webkit-mask-size 1.5s cubic-bezier(0.55,0,0.75,0), mask-size 1.5s cubic-bezier(0.55,0,0.75,0)",
        willChange: "mask-size, -webkit-mask-size",
      } as CSSProperties)
    : {};

  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        ...exitMaskStyle,
      }}
    >
      {/* Fundo: constelação de partículas na cor da logo (teal). */}
      <AetherFlowHero colorRgb="0, 199, 167" />

      {/* Logo (entra; na saída os colchetes voam pra fora e o miolo some) */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <DragaoLogoAnimada
          size={340}
          replayKey={replayKey}
          offscreen
          centerEntrance="forge"
          centerDrawDelay={0.55}
          centerDrawDuration={0.95}
          exiting={exiting}
        />
      </div>

      {/* Botões de idioma — aparecem ao fim da animação, somem ao clicar.
          Em modo loader (ex.: tela de carregamento do 3D) não aparecem. */}
      {ready && !exiting && !loaderMode && (
        <div
          style={{
            position: "fixed",
            bottom: "16%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 14,
            animation: "introBtns 0.5s ease-out forwards",
          }}
        >
          <style>{`
            @keyframes introBtns { from { opacity: 0; transform: translate(-50%, 12px); } to { opacity: 1; transform: translate(-50%, 0); } }
          `}</style>
          <LangButton label="Português" sub="PT-BR" onClick={() => handleChoose("pt-br")} />
          <LangButton label="English" sub="EN" onClick={() => handleChoose("en")} />
        </div>
      )}
    </main>
  );
}

function LangButton({ label, sub, onClick }: { label: string; sub: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: "14px 30px",
        borderRadius: 16,
        border: "none",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(16px) saturate(140%)",
        WebkitBackdropFilter: "blur(16px) saturate(140%)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
        color: "#fff",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        minWidth: 140,
        transition: "background 0.25s, transform 0.25s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.16)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <span style={{ fontSize: 16, fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 11, letterSpacing: 2, color: "#00C7A7" }}>{sub}</span>
    </button>
  );
}
