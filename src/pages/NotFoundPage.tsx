import React from "react";

export default function NotFoundPage() {
  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState(null, "", "/");
    window.dispatchEvent(new Event("popstate"));
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-zinc-950 text-[#A7EF9E] overflow-hidden">
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

        /* Animations */
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
        aria-label="A 404 becomes a face, looks to the sides, and blinks. The 4s slide up, the 0 slides down, and then a mouth appears."
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
      
      <div className="mt-8 flex flex-col items-center justify-center opacity-0 animate-[fadeIn_0.5s_0.8s_forwards]">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-2">Protocolo não encontrado</h1>
        <p className="text-zinc-400 mb-8 max-w-sm text-center">Parece que você acessou um setor restrito do sistema que não existe.</p>
        <button 
          onClick={goHome} 
          className="px-8 py-3 bg-[#A7EF9E] text-black font-semibold tracking-tight shadow-[0_0_20px_rgba(167,239,158,0.2)] rounded-md hover:bg-[#8ece84] hover:shadow-[0_0_30px_rgba(167,239,158,0.4)] transition-all active:scale-95"
        >
          Retornar ao Hub
        </button>
      </div>

    </main>
  );
}
