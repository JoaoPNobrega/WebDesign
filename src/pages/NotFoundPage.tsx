import { useLang } from "@/lib/i18n";

export default function NotFoundPage() {
  const { tx } = useLang();

  return (
    <section className="flex min-h-[100svh] w-full flex-col items-center justify-center bg-[#050505] px-6 text-center text-white">
      <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#A7EF9E]">
        {tx({ "pt-BR": "Erro 404", "en-US": "Error 404" })}
      </p>
      <h1
        className="mt-4 text-[2.4rem] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[3.4rem]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {tx({ "pt-BR": "Página não encontrada", "en-US": "Page not found" })}
      </h1>
      <p className="mt-4 max-w-md text-[0.95rem] leading-7 text-white/60">
        {tx({
          "pt-BR": "O endereço que você abriu não existe ou mudou de lugar.",
          "en-US": "The address you opened doesn't exist or has moved.",
        })}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-full bg-[#A7EF9E] px-7 text-[0.75rem] font-black uppercase tracking-[0.16em] text-[#050505] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          {tx({ "pt-BR": "Voltar ao início", "en-US": "Back to home" })}
        </a>
        <a
          href="/projetos"
          className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/60"
        >
          {tx({ "pt-BR": "Ver projetos", "en-US": "View projects" })}
        </a>
      </div>
    </section>
  );
}
