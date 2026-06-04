/**
 * Logo PADRÃO animada do dragão JPN (código vetorizado).
 *
 * Sequência de animação:
 *  1) colchetes internos "<" ">" (grafite) deslizam de fora;
 *  2) colchetes externos (teal) chegam atrasados;
 *  3) o miolo central (dragão) é DESENHADO — um traço-máscara branco corre
 *     pelo caminho revelando a forma já preenchida (draw real, com cor).
 *
 * Baseado em logo_jpn_dragao_codigo_vetorizada.svg.
 * Use `replayKey` (ex.: passar um número que muda) para remontar e reanimar.
 */

// Colchete "<" esquerdo (ponta em x=40 / x=210)
const LEFT_TEAL = "M 290 225 L 40 451 L 272 683 L 278 642 L 96 451 L 291 267 Z";
const LEFT_GRAFITE = "M 379 290 L 210 454 L 471 703 L 482 669 L 262 454 L 381 335 Z";

// Colchete ">" direito (ponta em x=1019 / x=849)
const RIGHT_TEAL = "M 768 224 L 768 268 L 962 450 L 781 641 L 786 683 L 1019 451 Z";
const RIGHT_GRAFITE = "M 680 291 L 678 335 L 796 454 L 599 646 L 579 713 L 849 454 Z";

// Miolo central — dragão + raios + ornamentos
const CENTER_TEAL =
  "M 703 654 L 653 706 L 649 788 L 605 738 L 555 781 L 475 1039 L 585 916 L 546 931 L 593 793 L 680 878 L 698 707 L 764 784 L 716 952 L 803 779 Z M 353 654 L 255 779 L 342 951 L 294 783 L 350 709 L 363 710 L 415 761 L 400 815 L 357 782 L 358 827 L 417 879 L 457 748 Z M 611 512 L 554 568 L 437 922 L 411 913 L 450 988 Z M 489 398 L 487 408 L 496 413 L 493 401 Z M 459 42 L 375 191 L 431 268 L 433 219 L 413 194 Z M 600 40 L 646 194 L 627 218 L 629 268 L 684 191 Z";
const CENTER_GRAFITE =
  "M 574 137 L 593 249 L 549 303 L 531 501 L 511 303 L 467 254 L 487 137 L 444 198 L 443 263 L 492 355 L 431 306 L 454 392 L 441 398 L 478 438 L 475 488 L 525 555 L 565 519 L 581 438 L 618 398 L 605 392 L 628 306 L 566 356 L 616 283 L 616 199 Z M 555 501 L 555 509 L 549 514 L 544 514 L 544 507 L 550 501 Z M 501 501 L 508 501 L 513 506 L 514 513 L 509 514 L 501 506 Z M 463 367 L 467 367 L 490 391 L 495 406 L 494 411 L 490 411 L 470 397 L 462 372 Z M 596 366 L 597 372 L 591 392 L 587 399 L 572 409 L 566 410 L 565 403 L 569 391 L 592 366 Z";

// Paths completos (úteis para variações estáticas/derivadas)
export const DRAGAO_TEAL_PATH = `${LEFT_TEAL} ${RIGHT_TEAL} ${CENTER_TEAL}`;
export const DRAGAO_GRAFITE_PATH = `${LEFT_GRAFITE} ${RIGHT_GRAFITE} ${CENTER_GRAFITE}`;

// Apenas o miolo central (dragão) — usado p/ máscara da abertura do site.
export const DRAGAO_CENTER_TEAL = CENTER_TEAL;
export const DRAGAO_CENTER_GRAFITE = CENTER_GRAFITE;
export const DRAGAO_VIEWBOX = "0 0 1060 1080";

interface Props {
  size?: number;
  /** Mude este valor para remontar o SVG e rodar a animação de novo. */
  replayKey?: number | string;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Deixa os colchetes virem de FORA da tela sem corte: o SVG passa a
   * "vazar" (overflow visível) e o deslocamento de entrada fica grande.
   * Distância de entrada em unidades da viewBox (default 560).
   */
  offscreen?: boolean;
  entranceDistance?: number;
  /** Quando o desenho do dragão central começa (s). Default 1.5. */
  centerDrawDelay?: number;
  /** Duração do desenho do dragão central (s). Default 2.6. */
  centerDrawDuration?: number;
  /** Estado de saída: colchetes saem da tela e o miolo some (p/ abertura). */
  exiting?: boolean;
  /**
   * Tipo de entrada do miolo:
   *  - "draw"  (default): traço-máscara revela a forma preenchida (logo padrão);
   *  - "forge": camadas teal/grafite convergem em foco + bloom de energia (intro).
   */
  centerEntrance?: "draw" | "forge";
}

export default function DragaoLogoAnimada({
  size = 280,
  replayKey,
  className,
  style,
  offscreen = false,
  entranceDistance,
  centerDrawDelay = 1.5,
  centerDrawDuration = 2.6,
  exiting = false,
  centerEntrance = "draw",
}: Props) {
  const forge = centerEntrance === "forge";
  const dist = entranceDistance ?? (offscreen ? 2600 : 560);
  // Distância de SAÍDA bem maior (em unidades da viewBox) p/ garantir que os
  // colchetes saiam por completo mesmo em telas largas.
  const exitDist = 14000;
  return (
    <svg
      key={replayKey}
      viewBox="0 0 1060 1080"
      width={size}
      height={size}
      role="img"
      aria-label="Logo JPN dragão"
      className={[className, exiting ? "dla-exit" : ""].filter(Boolean).join(" ")}
      style={{
        filter: "drop-shadow(2px 6px 10px rgba(0,0,0,0.45))",
        overflow: offscreen ? "visible" : undefined,
        ["--dla-dist" as string]: `${dist}px`,
        ["--dla-exit-dist" as string]: `${exitDist}px`,
        ["--dla-draw-delay" as string]: `${centerDrawDelay}s`,
        ["--dla-draw-dur" as string]: `${centerDrawDuration}s`,
        ...style,
      }}
    >
      <style>{`
        .dla-il, .dla-ir, .dla-ol, .dla-or {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
        }
        /* 1) colchetes internos (grafite) chegam primeiro */
        .dla-il { animation: dlaFromLeft  1.0s cubic-bezier(0.22,1,0.36,1) 0.10s both; }
        .dla-ir { animation: dlaFromRight 1.0s cubic-bezier(0.22,1,0.36,1) 0.10s both; }
        /* 2) colchetes externos (teal) chegam atrasados */
        .dla-ol { animation: dlaFromLeft  1.0s cubic-bezier(0.22,1,0.36,1) 0.70s both; }
        .dla-or { animation: dlaFromRight 1.0s cubic-bezier(0.22,1,0.36,1) 0.70s both; }

        @keyframes dlaFromLeft {
          from { opacity: 0; transform: translateX(calc(-1 * var(--dla-dist, 560px))); }
          35%  { opacity: 1; }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes dlaFromRight {
          from { opacity: 0; transform: translateX(var(--dla-dist, 560px)); }
          35%  { opacity: 1; }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* 3) miolo desenhado por traço-máscara que revela a forma preenchida */
        .dla-mask-stroke {
          fill: none; stroke: #fff; stroke-width: 95;
          stroke-linejoin: round; stroke-linecap: round;
          stroke-dasharray: 6500; stroke-dashoffset: 6500;
          animation: dlaDraw var(--dla-draw-dur, 2.6s) ease-in-out var(--dla-draw-delay, 1.5s) both;
        }
        @keyframes dlaDraw { to { stroke-dashoffset: 0; } }

        /* ENTRADA "forge": camadas convergem em foco + bloom de energia */
        .dla-forge-g, .dla-forge-t, .dla-bloom {
          transform-box: fill-box;
          transform-origin: center;
        }
        .dla-bloom {
          opacity: 0;
          animation: dlaBloom 0.95s ease-out var(--dla-draw-delay, 0.5s) both;
        }
        .dla-forge-g {
          opacity: 0;
          animation: dlaForgeG var(--dla-draw-dur, 0.9s)
            cubic-bezier(0.18, 0.9, 0.28, 1.18) var(--dla-draw-delay, 0.5s) both;
        }
        .dla-forge-t {
          opacity: 0;
          animation: dlaForgeT var(--dla-draw-dur, 0.9s)
            cubic-bezier(0.18, 0.9, 0.28, 1.18)
            calc(var(--dla-draw-delay, 0.5s) + 0.10s) both;
        }
        @keyframes dlaBloom {
          0%   { opacity: 0; transform: scale(0.2); }
          35%  { opacity: 1; }
          100% { opacity: 0; transform: scale(1.35); }
        }
        @keyframes dlaForgeG {
          from { opacity: 0; transform: translate(-26px, -32px) scale(0.9); filter: blur(7px); }
          55%  { opacity: 1; }
          to   { opacity: 1; transform: translate(0, 0) scale(1); filter: blur(0); }
        }
        @keyframes dlaForgeT {
          from { opacity: 0; transform: translate(30px, 36px) scale(0.9); filter: blur(7px); }
          55%  { opacity: 1; }
          to   { opacity: 1; transform: translate(0, 0) scale(1); filter: blur(0); }
        }

        /* SAÍDA: colchetes deslizam pra fora; miolo some (zoom ocorre na página) */
        .dla-exit .dla-il, .dla-exit .dla-ol {
          animation: dlaOutLeft 0.6s cubic-bezier(0.7,0,0.84,0) forwards !important;
        }
        .dla-exit .dla-ir, .dla-exit .dla-or {
          animation: dlaOutRight 0.6s cubic-bezier(0.7,0,0.84,0) forwards !important;
        }
        .dla-exit .dla-center { animation: dlaCenterOut 0.4s ease-out 0.3s forwards; }
        @keyframes dlaOutLeft {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 1; transform: translateX(calc(-1 * var(--dla-exit-dist, 14000px))); }
        }
        @keyframes dlaOutRight {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 1; transform: translateX(var(--dla-exit-dist, 14000px)); }
        }
        @keyframes dlaCenterOut { from { opacity: 1; } to { opacity: 0; } }
      `}</style>

      <defs>
        {!forge && (
          <mask id="dlaDrawMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1060" height="1080">
            <path className="dla-mask-stroke" d={CENTER_GRAFITE} />
            <path className="dla-mask-stroke" d={CENTER_TEAL} />
          </mask>
        )}
        {forge && (
          <radialGradient id="dlaBloomGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00C7A7" stopOpacity="0.6" />
            <stop offset="55%" stopColor="#00C7A7" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#00C7A7" stopOpacity="0" />
          </radialGradient>
        )}
      </defs>

      {/* colchetes internos */}
      <path className="dla-il" fill="#252C31" fillRule="evenodd" d={LEFT_GRAFITE} />
      <path className="dla-ir" fill="#252C31" fillRule="evenodd" d={RIGHT_GRAFITE} />

      {/* colchetes externos */}
      <path className="dla-ol" fill="#00C7A7" fillRule="evenodd" d={LEFT_TEAL} />
      <path className="dla-or" fill="#00C7A7" fillRule="evenodd" d={RIGHT_TEAL} />

      {/* miolo central */}
      {forge ? (
        <g className="dla-center">
          {/* bloom de energia atrás do dragão */}
          <circle className="dla-bloom" cx="525" cy="520" r="470" fill="url(#dlaBloomGrad)" />
          {/* camadas convergindo em foco */}
          <path className="dla-forge-g" fill="#252C31" fillRule="evenodd" d={CENTER_GRAFITE} />
          <path className="dla-forge-t" fill="#00C7A7" fillRule="evenodd" d={CENTER_TEAL} />
        </g>
      ) : (
        <g className="dla-center" mask="url(#dlaDrawMask)">
          <path fill="#252C31" fillRule="evenodd" d={CENTER_GRAFITE} />
          <path fill="#00C7A7" fillRule="evenodd" d={CENTER_TEAL} />
        </g>
      )}
    </svg>
  );
}
