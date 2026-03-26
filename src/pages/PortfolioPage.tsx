import { motion } from "framer-motion";
import { ArrowRight, Code, Laptop, Layout, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const PROJECTS = [
  {
    title: "Crachá Interativo",
    description: "Um crachá 3D interativo com física realística e texturas personalizadas.",
    href: "#/",
    icon: <Layout className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Destruction Engine",
    description: "Efeito de vaporização de texto com animações fluidas e design focado em problemas reais.",
    href: "#/destruction",
    icon: <Sparkles className="h-6 w-6" />,
    color: "from-orange-500 to-red-600",
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-[0.2em] bg-white/5 border border-white/10 rounded-full text-white/60">
              Web Design Portfolio
            </span>
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-8">
              Transformando ideias em <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                experiências digitais.
              </span>
            </h1>
            <p className="max-w-2xl text-lg text-zinc-400 mb-10 mx-auto">
              Desenvolvedor Full Stack especializado em interfaces interativas e experiências imersivas. 
              Focado em elevar o padrão visual de produtos digitais.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="rounded-full bg-white text-black hover:bg-zinc-200 px-8 py-6 text-md font-medium">
                Conferir Projetos
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 px-8 py-6 text-md font-medium">
                Contatos
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Featured Projects */}
        <section className="mt-40">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-semibold tracking-tight">Projetos em Destaque</h2>
            <div className="block h-[1px] flex-1 mx-8 bg-zinc-800" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, index) => (
              <motion.a
                key={project.title}
                href={project.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-colors overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity blur-3xl`} />
                
                <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit border border-white/5 group-hover:border-white/10 transition-colors">
                  {project.icon}
                </div>
                
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-white transition-colors">{project.title}</h3>
                <p className="text-zinc-400 mb-8 flex-1 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex items-center text-sm font-medium text-white/60 group-hover:text-white transition-all">
                  Ver projeto
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Philosophy / About */}
        <section className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">O Design não é apenas como parece, mas <span className="text-zinc-500">como funciona.</span></h2>
            <div className="space-y-6 text-zinc-400">
              <p>
                Acredito que cada detalhe importa. Do micro-interação à arquitetura de rede, 
                o objetivo é sempre o mesmo: criar algo que importe.
              </p>
              <p>
                Com experiência em tecnologias modernas como React, Three.js e Tailwind, 
                eu busco o equilíbrio perfeito entre estética e funcionalidade.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <div className="text-white font-bold text-2xl mb-1">2+</div>
                <div className="text-xs uppercase tracking-widest text-zinc-500">Anos Exp.</div>
              </div>
              <div>
                <div className="text-white font-bold text-2xl mb-1">15+</div>
                <div className="text-xs uppercase tracking-widest text-zinc-500">Projetos</div>
              </div>
              <div>
                <div className="text-white font-bold text-2xl mb-1">100%</div>
                <div className="text-xs uppercase tracking-widest text-zinc-500">Qualidade</div>
              </div>
            </div>
          </div>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl">
              <img 
                src="/assets/portfolioIcon.jpeg" 
                alt="Profile" 
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-60 pt-16 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-xs uppercase tracking-widest text-zinc-500">
            © 2026 Joao Pedro / Design Portfolio
          </div>
          <div className="flex gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Email</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
