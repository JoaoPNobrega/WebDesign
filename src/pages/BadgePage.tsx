import { useEffect, useState, type ComponentType } from "react";

import IntroLogo from "@/components/IntroLogo";

type LanyardComponent = ComponentType<{
  position?: [number, number, number];
  gravity?: [number, number, number];
}>;

export default function BadgePage() {
  // O 3D (three.js / rapier) é pesado: só carrega quando esta página abre,
  // nunca no bundle inicial da home.
  const [Lanyard, setLanyard] = useState<LanyardComponent | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    let active = true;
    import("@/components/Lanyard").then((mod) => {
      if (active) {
        setLanyard(() => mod.default as LanyardComponent);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-zinc-50">
      {/* Botão "Go Back" — só aparece depois da intro revelar o crachá,
          nunca por cima da intro. Estilo glass do portfólio + verde da marca. */}
      {revealed && (
        <a
          href="/"
          aria-label="Voltar"
          className="group fixed left-5 top-5 z-[60] block h-14 w-48 rounded-2xl border border-white/10 bg-white/5 text-center text-base font-medium uppercase tracking-[0.28em] text-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md"
          style={{ animation: "badgeBackIn 0.6s ease-out both" }}
        >
          <div className="absolute left-1 top-1 z-10 flex h-12 w-1/4 items-center justify-center rounded-xl bg-[#A7EF9E] text-black duration-500 group-hover:w-[184px]">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </div>
          <p className="flex h-full translate-x-3 items-center justify-center">Voltar</p>
        </a>
      )}
      <style>{`
        @keyframes badgeBackIn {
          from { opacity: 0; transform: translateX(-12px); filter: blur(6px); }
          to { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
      `}</style>

      {/* O crachá 3D fica por baixo; a intro o revela quando estiver pronto. */}
      {Lanyard && <Lanyard position={[0, 0, 18]} gravity={[0, -40, 0]} />}

      {/* Intro do site reaproveitada como tela de carregamento do modelo 3D.
          Sem botões de idioma; revela sozinha assim que o 3D termina de carregar. */}
      {!revealed && (
        <IntroLogo
          loaderMode
          canReveal={Lanyard !== null}
          onDone={() => setRevealed(true)}
        />
      )}
    </div>
  );
}
