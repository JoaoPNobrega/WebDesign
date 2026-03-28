import React from "react";

import type { SiteLanguage } from "@/lib/site-language";

const notFoundCopy = {
  "pt-BR": {
    ariaLabel:
      "Um 404 vira um rosto, olha para os lados, pisca e forma um sorriso.",
    title: "Protocolo n\u00E3o encontrado",
    description:
      "Parece que voc\u00EA acessou um setor restrito do sistema que n\u00E3o existe.",
    button: "Retornar ao Hub",
  },
  "en-US": {
    ariaLabel:
      "A 404 becomes a face, looks to the sides, blinks, and forms a smile.",
    title: "Protocol not found",
    description:
      "It looks like you reached a restricted sector of the system that does not exist.",
    button: "Return to Hub",
  },
} as const;

interface NotFoundPageProps {
  language: SiteLanguage;
}

export default function NotFoundPage({ language }: NotFoundPageProps) {
  const copy = notFoundCopy[language];

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState(null, "", "/");
    window.dispatchEvent(new Event("popstate"));
  };

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-950 text-[#A7EF9E]">
      <style>{`
        .face {
          display: block;
          width: 12em;
          height: auto;
          margin-bottom: 2rem;
        }
        .face__eyes,
        .face__eye-lid,
        .face__mouth-left,
        .face__mouth-right,
        .face__nose,
        .face__pupil {
          animation: eyes 1s 0.3s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        .face__eye-lid,
        .face__pupil {
          animation-duration: 4s;
          animation-delay: 1.3s;
          animation-iteration-count: infinite;
        }
        .face__eye-lid {
          animation-name: eye-lid;
        }
        .face__mouth-left,
        .face__mouth-right {
          animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
        }
        .face__mouth-left {
          animation-name: mouth-left;
        }
        .face__mouth-right {
          animation-name: mouth-right;
        }
        .face__nose {
          animation-name: nose;
        }
        .face__pupil {
          animation-name: pupil;
        }

        @keyframes eye-lid {
          from, 40%, 45%, to {
            transform: translateY(0);
          }
          42.5% {
            transform: translateY(17.5px);
          }
        }
        @keyframes eyes {
          from {
            transform: translateY(112.5px);
          }
          to {
            transform: translateY(15px);
          }
        }
        @keyframes pupil {
          from, 37.5%, 40%, 45%, 87.5%, to {
            stroke-dashoffset: 0;
            transform: translate(0, 0);
          }
          12.5%, 25%, 62.5%, 75% {
            stroke-dashoffset: 0;
            transform: translate(-35px, 0);
          }
          42.5% {
            stroke-dashoffset: 35;
            transform: translate(0, 17.5px);
          }
        }
        @keyframes mouth-left {
          from, 50% { stroke-dashoffset: -102; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes mouth-right {
          from, 50% { stroke-dashoffset: 102; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes nose {
          from { transform: translate(0, 0); }
          to { transform: translate(0, 22.5px); }
        }
      `}</style>

      <svg
        className="face drop-shadow-[0_0_20px_rgba(167,239,158,0.3)]"
        viewBox="0 0 320 380"
        width="320px"
        height="380px"
        aria-label={copy.ariaLabel}
      >
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="25">
          <g className="face__eyes" transform="translate(0, 112.5)">
            <g transform="translate(15, 0)">
              <polyline className="face__eye-lid" points="37,0 0,120 75,120" />
              <polyline className="face__pupil" points="55,120 55,155" strokeDasharray="35 35" />
            </g>
            <g transform="translate(230, 0)">
              <polyline className="face__eye-lid" points="37,0 0,120 75,120" />
              <polyline className="face__pupil" points="55,120 55,155" strokeDasharray="35 35" />
            </g>
          </g>
          <rect className="face__nose" rx="4" ry="4" x="132.5" y="112.5" width="55" height="155" />
          <g strokeDasharray="102 102" transform="translate(65, 334)">
            <path className="face__mouth-left" d="M 0 30 C 0 30 40 0 95 0" strokeDashoffset="-102" />
            <path className="face__mouth-right" d="M 95 0 C 150 0 190 30 190 30" strokeDashoffset="102" />
          </g>
        </g>
      </svg>

      <div className="mt-8 flex animate-[fadeIn_0.5s_0.8s_forwards] flex-col items-center justify-center opacity-0">
        <h1 className="mb-2 text-3xl font-bold tracking-tighter text-white md:text-4xl">
          {copy.title}
        </h1>
        <p className="mb-8 max-w-sm text-center text-zinc-400">
          {copy.description}
        </p>
        <button
          onClick={goHome}
          className="rounded-md bg-[#A7EF9E] px-8 py-3 font-semibold tracking-tight text-black shadow-[0_0_20px_rgba(167,239,158,0.2)] transition-all hover:bg-[#8ece84] hover:shadow-[0_0_30px_rgba(167,239,158,0.4)] active:scale-95"
        >
          {copy.button}
        </button>
      </div>
    </main>
  );
}
