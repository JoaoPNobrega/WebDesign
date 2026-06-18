import type { LocalizedText } from "@/lib/i18n";

const t = (pt: string, en: string): LocalizedText => ({ "pt-BR": pt, "en-US": en });

// Projetos do estágio na Web Star: design + front-end por mim, com todo o
// ferramental de IA fornecido pela empresa.
const webstarRole = t(
  "Desenvolvido durante meu estágio na Web Star Studio, atuando do design ao front-end. Todo o ferramental de IA usado na produção foi fornecido pela empresa.",
  "Built during my internship at Web Star Studio, working from design to front-end. All the AI tooling used in production was provided by the company.",
);

// Ferramental de IA fornecido pela Web Star nos projetos do estágio.
export const webstarTools = ["Claude", "Stitch", "Gemini", "Codex", "GPT"];

export type ProjectShot = {
  src: string;
  title: LocalizedText;
  text?: LocalizedText;
};

export type ProjectDetail = {
  tags: string[];
  /** Ferramentas/IA usadas na produção (ex.: Claude, Gemini…). */
  tools?: string[];
  /** ID do vídeo do YouTube p/ a seção de demonstração (ex.: "A1_detLyOCI"). */
  video?: string;
  /** Capa do vídeo (quando o YouTube não tem thumbnail em alta resolução). */
  videoPoster?: string;
  /** Créditos de colaboração (ex.: back-end feito por outra pessoa). */
  credits?: { role: LocalizedText; name: string; href?: string }[];
  role: LocalizedText;
  /** Prints extras para a galeria do "Saiba mais". A primeira é a capa. */
  images?: string[];
  /** Prints com legenda — quando presente, a página do projeto vira galeria masonry. */
  shots?: ProjectShot[];
};

// Categoria/disciplina de cada projeto (usado nas tags e nos filtros).
export type Category = "site" | "app" | "dashboard" | "iot";

export const categoryLabel: Record<Category, LocalizedText> = {
  site: t("Site", "Site"),
  app: t("App", "App"),
  dashboard: t("Painel", "Dashboard"),
  iot: t("IoT", "IoT"),
};

export const projectCategory: Record<string, Category> = {
  "Mirela Albuquerque": "site",
  "Dr Guilherme Maia": "site",
  FlyHigh: "app",
  PetFeeder: "iot",
  "Dr Daniel Pianetti": "site",
  "Stephanie Bolsoni": "site",
  "Izi Solutions": "site",
  "Ines Knoden": "site",
  "Dr Dimas Antunes": "site",
  "Dr Cristiano Berardo": "site",
  "Keeping House": "site",
  "Delusional Studio": "site",
  "Delulu Painel": "dashboard",
  "Beyblade X Manager": "app",
};

export const projectDetails: Record<string, ProjectDetail> = {
  "Mirela Albuquerque": {
    tags: ["React", "TypeScript", "TanStack Start", "Tailwind CSS", "Supabase", "Framer Motion"],
    role: t(
      "Desenvolvido durante meu estágio na Web Star Studio, atuando do design ao front-end: a home editorial em tons terrosos, as seções de tratamentos e procedimentos (transplante capilar e de sobrancelhas), a página de tricoscopia digital com laudo por IA, a FAQ, os fluxos de agendamento e um blog com painel próprio (CMS em Supabase). Construído em React + TanStack Start e publicado na Cloudflare, com microinterações (Framer Motion), responsividade caprichada e SEO/GEO. Todo o ferramental de IA usado na produção foi fornecido pela empresa.",
      "Built during my internship at Web Star Studio, working from design to front-end: the editorial home in earthy tones, the treatment and procedure sections (hair and eyebrow transplants), the digital trichoscopy page with AI-assisted reports, the FAQ, the booking flows and a blog with its own admin (a Supabase CMS). Built in React + TanStack Start and shipped on Cloudflare, with microinteractions (Framer Motion), careful responsiveness and SEO/GEO. All the AI tooling used in production was provided by the company.",
    ),
    images: [
      "/assets/mirela-preview.jpg",
      "/assets/mirela-1.jpg",
      "/assets/mirela-2.jpg",
      "/assets/mirela-3.jpg",
      "/assets/mirela-4.jpg",
      "/assets/mirela-5.jpg",
    ],
    shots: [
      {
        src: "/assets/mirela-preview.jpg",
        title: t("Home editorial", "Editorial home"),
        text: t("Primeira dobra em tons terrosos posicionando a medicina capilar.", "Above the fold in earthy tones positioning hair medicine."),
      },
      {
        src: "/assets/mirela-1.jpg",
        title: t("Tratamentos", "Treatments"),
        text: t("Protocolos médicos individualizados após avaliação clínica.", "Individualized medical protocols after a clinical assessment."),
      },
      {
        src: "/assets/mirela-2.jpg",
        title: t("Procedimentos", "Procedures"),
        text: t("Transplante capilar e de sobrancelhas, do planejamento ao pós-operatório.", "Hair and eyebrow transplants, from planning to post-op."),
      },
      {
        src: "/assets/mirela-3.jpg",
        title: t("Tricoscopia digital", "Digital trichoscopy"),
        text: t("Diagnóstico detalhado com laudo por IA pra orientar o protocolo.", "Detailed diagnosis with AI-assisted reports to guide the protocol."),
      },
      {
        src: "/assets/mirela-4.jpg",
        title: t("Na clínica", "At the clinic"),
        text: t("Galeria da avaliação capilar com tricoscopia digital.", "Gallery of the hair assessment with digital trichoscopy."),
      },
      {
        src: "/assets/mirela-5.jpg",
        title: t("Dúvidas respondidas", "Questions answered"),
        text: t("FAQ que responde as principais dúvidas e leva ao agendamento.", "FAQ answering the main questions and driving to booking."),
      },
    ],
  },
  "Dr Guilherme Maia": {
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    role: t(
      "Meu primeiro projeto no estágio na Web Star Studio — atuei do design ao front-end. Uma landing médica com narrativa de autoridade para o urologista Dr. Guilherme Maia: hero, especialidades, trajetória e blog, com foco em clareza, responsividade e um CTA direto pra agendamento. Por ser o primeiro, foi onde aprendi o fluxo do estúdio do briefing à entrega. Todo o ferramental de IA usado na produção foi fornecido pela empresa.",
      "My first project during the Web Star Studio internship — I worked from design to front-end. A medical landing with an authority-driven narrative for urologist Dr. Guilherme Maia: hero, specialties, background and a blog, focused on clarity, responsiveness and a direct booking CTA. Being the first, it's where I learned the studio's flow from briefing to delivery. All the AI tooling used in production was provided by the company.",
    ),
    images: [
      "/assets/guilherme-1.jpg",
      "/assets/guilherme-2.jpg",
      "/assets/guilherme-4.jpg",
      "/assets/guilherme-5.jpg",
    ],
  },
  FlyHigh: {
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "Supabase"],
    role: t(
      "Projeto pessoal full-stack, do conceito ao deploy: um app mobile-first pra organizar a pelada de vôlei do meu grupo (Prainha ZS) — check-in de mensalistas e diaristas, montagem de times, fila de espera, placar ao vivo, histórico e pagamento via Pix. Visual com tema de anime (Haikyu!!). Front em React + TypeScript + Vite + Tailwind, estado com Zustand e Supabase como backend (com fallback local).",
      "Personal full-stack project, from concept to deploy: a mobile-first app to organize my group's volleyball pickup games (Prainha ZS) — check-in for monthly and drop-in players, team building, a waiting queue, a live scoreboard, history and Pix payments. Anime-themed visuals (Haikyu!!). Front-end in React + TypeScript + Vite + Tailwind, Zustand state and Supabase as the backend (with a local fallback).",
    ),
    images: [
      "/assets/flyhigh-cover.jpg",
      "/assets/flyhigh-mockup-2.jpg",
    ],
  },
  PetFeeder: {
    tags: ["ESP32", "C++ / Arduino", "Firebase", "Gemini AI", "Vanilla JS"],
    video: "A1_detLyOCI",
    videoPoster: "/assets/petfeeder-video-poster.jpg",
    role: t(
      "Projeto acadêmico de Sistemas Embarcados na CESAR School. Um alimentador automático de pets com ESP32 — sensor ultrassônico, servo motor, potenciômetro e botão físico — conectado em tempo real ao Firebase e a uma dashboard web, com a API Gemini sugerindo rotinas de alimentação. Atuei na dashboard web (configuração do pet, monitoramento ao vivo, relatórios e rotinas) e na integração com o hardware via Firebase.",
      "Academic Embedded Systems project at CESAR School. An automatic pet feeder powered by an ESP32 — ultrasonic sensor, servo motor, potentiometer and a physical button — connected in real time to Firebase and a web dashboard, with the Gemini API suggesting feeding routines. I worked on the web dashboard (pet setup, live monitoring, reports and routines) and the hardware integration via Firebase.",
    ),
    images: [
      "/assets/petfeeder-welcome.jpg",
      "/assets/petfeeder-app.jpg",
      "/assets/petfeeder-firebase.jpg",
    ],
  },
  "Dr Daniel Pianetti": {
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Three.js", "Supabase"],
    role: t(
      "Desenvolvido durante meu estágio na Web Star Studio, atuando do design ao front-end: a home cinematográfica com objeto 3D (Da Vinci) e logo animada, as páginas dedicadas de cada procedimento, o blog com painel próprio (CMS em Supabase), o chatbot, os modais de agendamento e a integração de avaliações (Doctoralia + Google). Caprichei nas animações (GSAP/Framer), na responsividade e num SEO/GEO forte (JSON-LD, dados estruturados, llms.txt). Todo o ferramental de IA usado na produção foi fornecido pela empresa.",
      "Built during my internship at Web Star Studio, working from design to front-end: the cinematic home with a 3D object (Da Vinci) and an animated logo, the dedicated page for each procedure, the blog with its own admin (a Supabase CMS), the chatbot, the booking modals and the reviews integration (Doctoralia + Google). I focused on the animations (GSAP/Framer), responsiveness and strong SEO/GEO (JSON-LD, structured data, llms.txt). All the AI tooling used in production was provided by the company.",
    ),
    images: [
      "/assets/daniel-1.jpg",
      "/assets/daniel-2.jpg",
      "/assets/daniel-3.jpg",
      "/assets/daniel-4.jpg",
      "/assets/daniel-5.jpg",
    ],
  },
  "Stephanie Bolsoni": {
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Framer Motion"],
    role: t(
      "Desenvolvido durante meu estágio na Web Star Studio, atuando do design ao front-end: a landing premium, as páginas (sobre, especialidades, contato), a integração de avaliações reais (Doctify + Google), a galeria do consultório, o fluxo de agendamento e um blog com painel próprio (CMS em Supabase) pra ela publicar. Caprichei nas microinterações e na responsividade. Todo o ferramental de IA usado na produção foi fornecido pela empresa.",
      "Built during my internship at Web Star Studio, working from design to front-end: the premium landing, the pages (about, specialties, contact), the real-reviews integration (Doctify + Google), the clinic gallery, the booking flow and a blog with its own admin (a Supabase CMS) for her to publish. I focused on the microinteractions and responsiveness. All the AI tooling used in production was provided by the company.",
    ),
    images: [
      "/assets/stephanie-1.jpg",
      "/assets/stephanie-2.jpg",
      "/assets/stephanie-3.jpg",
      "/assets/stephanie-4.jpg",
      "/assets/stephanie-5.jpg",
    ],
  },
  "Izi Solutions": {
    tags: ["React", "TypeScript", "TanStack Start", "Tailwind CSS", "Supabase", "Framer Motion"],
    role: t(
      "Desenvolvido durante meu estágio na Web Star Studio, atuando do design ao front-end: a landing de conversão, as páginas de serviços (Airbnb, short stay, escritórios), o FAQ, o blog com painel próprio (CMS em Supabase) e o site bilíngue (PT/EN). Construído em React + TanStack Start e publicado na Cloudflare, com microinterações (Framer Motion), responsividade e SEO/GEO forte (JSON-LD, sitemap, llms.txt). Todo o ferramental de IA usado na produção foi fornecido pela empresa.",
      "Built during my internship at Web Star Studio, working from design to front-end: the conversion landing, the service pages (Airbnb, short stay, offices), the FAQ, the blog with its own admin (a Supabase CMS) and the bilingual site (PT/EN). Built in React + TanStack Start and shipped on Cloudflare, with microinteractions (Framer Motion), responsiveness and strong SEO/GEO (JSON-LD, sitemap, llms.txt). All the AI tooling used in production was provided by the company.",
    ),
    images: [
      "/assets/izi-1.jpg",
      "/assets/izi-2.jpg",
      "/assets/izi-3.jpg",
      "/assets/izi-4.jpg",
      "/assets/izi-5.jpg",
    ],
  },
  "Ines Knoden": {
    tags: ["React", "TypeScript", "TanStack Start", "Tailwind CSS", "Framer Motion"],
    role: t(
      "Desenvolvido durante meu estágio na Web Star Studio, atuando do design ao front-end. Traduzi a direção de marca (serenidade, acolhimento, feminilidade madura) numa experiência suave: home, programas, sobre e contato, com paleta coral/pêssego, tipografia serifada com toques manuscritos e microinterações leves (Framer Motion). Construído em React + TanStack Start com estrutura bilíngue (PT/FR) e publicado na Cloudflare, com responsividade caprichada. Todo o ferramental de IA usado na produção foi fornecido pela empresa.",
      "Built during my internship at Web Star Studio, working from design to front-end. I translated the brand direction (serenity, warmth, mature femininity) into a soft experience: home, programs, about and contact, with a coral/peach palette, serif type with handwritten touches and gentle microinteractions (Framer Motion). Built in React + TanStack Start with a bilingual structure (PT/FR) and shipped on Cloudflare, with careful responsiveness. All the AI tooling used in production was provided by the company.",
    ),
    images: [
      "/assets/ines-1.jpg",
      "/assets/ines-2.jpg",
      "/assets/ines-3.jpg",
      "/assets/ines-4.jpg",
      "/assets/ines-5.jpg",
    ],
  },
  "Dr Dimas Antunes": {
    tags: ["React", "TypeScript", "TanStack Start", "Tailwind CSS", "GSAP", "Framer Motion"],
    role: t(
      "Desenvolvido durante meu estágio na Web Star Studio, atuando do design ao front-end. Tirei do papel o conceito 'The Clinical Curator': uma experiência editorial de alto luxo com layout assimétrico, scrollytelling, glassmorphism e bento grid, tipografia de alto contraste e uma logo animada que faz morph (GSAP + flubber). Construído em React + TanStack Start e publicado na Cloudflare, com responsividade e microinterações caprichadas. Todo o ferramental de IA usado na produção foi fornecido pela empresa.",
      "Built during my internship at Web Star Studio, working from design to front-end. I brought the 'Clinical Curator' concept to life: a high-luxury editorial experience with an asymmetric layout, scrollytelling, glassmorphism and a bento grid, high-contrast typography and an animated morphing logo (GSAP + flubber). Built in React + TanStack Start and shipped on Cloudflare, with careful responsiveness and microinteractions. All the AI tooling used in production was provided by the company.",
    ),
    images: [
      "/assets/dimas-1.jpg",
      "/assets/dimas-2.jpg",
      "/assets/dimas-3.jpg",
      "/assets/dimas-4.jpg",
      "/assets/dimas-5.jpg",
    ],
  },
  "Dr Cristiano Berardo": {
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    role: t(
      "Landing page institucional premium para o cirurgião cardiovascular Dr. Cristiano Berardo, durante meu estágio na Web Star Studio. Atuei do design ao front-end: primeira dobra com posicionamento de autoridade, seção de trajetória acadêmica, especialidades e procedimentos, uma narrativa de cuidado humanizado e o fechamento com os canais de agendamento. Cuidei da responsividade completa, das microinterações em Framer Motion e do acabamento premium que passa confiança a pacientes e médicos. Todo o ferramental de IA da produção foi fornecido pela empresa.",
      "Premium institutional landing page for cardiovascular surgeon Dr. Cristiano Berardo, during my internship at Web Star Studio. I worked from design to front-end: an authority-focused hero, an academic background section, specialties and procedures, a humanized-care narrative and a closing with the booking channels. I handled full responsiveness, the Framer Motion microinteractions and the premium finish that conveys trust to patients and physicians. All the AI tooling used in production was provided by the company.",
    ),
    images: [
      "/assets/drcristiano-preview.jpg",
      "/assets/drcristiano-1.jpg",
      "/assets/drcristiano-2.jpg",
      "/assets/drcristiano-3.jpg",
      "/assets/drcristiano-4.jpg",
    ],
    shots: [
      {
        src: "/assets/drcristiano-preview.jpg",
        title: t("Hero institucional", "Institutional hero"),
        text: t("Primeira dobra com posicionamento premium e autoridade médica.", "Above the fold with premium positioning and medical authority."),
      },
      {
        src: "/assets/drcristiano-1.jpg",
        title: t("Trajetória", "Background"),
        text: t("Seção que conta a formação e a carreira do cirurgião.", "Section telling the surgeon's education and career."),
      },
      {
        src: "/assets/drcristiano-2.jpg",
        title: t("Especialidades", "Specialties"),
        text: t("Procedimentos e áreas de atuação apresentados com clareza.", "Procedures and practice areas presented clearly."),
      },
      {
        src: "/assets/drcristiano-3.jpg",
        title: t("Cuidado humanizado", "Humanized care"),
        text: t("Narrativa visual voltada para o paciente.", "Patient-focused visual narrative."),
      },
      {
        src: "/assets/drcristiano-4.jpg",
        title: t("Contato", "Contact"),
        text: t("Fechamento com canais de agendamento.", "Closing with booking channels."),
      },
    ],
  },
  "Keeping House": {
    tags: ["React", "TypeScript", "Vite", "React Router", "Leaflet", "Stripe"],
    role: t(
      "Desenvolvi todo o front-end desta plataforma de produção em React + TypeScript + Vite: a landing de conversão, a busca de profissionais por região (com mapa em Leaflet), os perfis públicos, o fluxo de assinatura via Stripe, o quadro de vagas, o Concierge premium e os painéis logados de contratante, profissional e admin. Cuidei da responsividade, da acessibilidade (AA) e dos estados de carregando/erro/vazio em cada tela. O back-end (Java/Spring) ficou com o time.",
      "I built the entire front-end of this production platform in React + TypeScript + Vite: the conversion landing, the regional professional search (with a Leaflet map), public profiles, the Stripe subscription flow, the job board, the premium Concierge and the logged-in dashboards for clients, professionals and admins. I handled responsiveness, AA accessibility and loading/error/empty states on every screen. The back-end (Java/Spring) was handled by the team.",
    ),
    credits: [
      { role: t("Back-end", "Back-end"), name: "João Pedro Batista", href: "https://jpbatista.xyz" },
    ],
    images: [
      "/assets/keepinghouse-hero.jpg",
      "/assets/keepinghouse-categorias.jpg",
      "/assets/keepinghouse-busca.jpg",
      "/assets/keepinghouse-concierge.jpg",
      "/assets/keepinghouse-planos.jpg",
      "/assets/keepinghouse-mobile.jpg",
    ],
  },
  "Delusional Studio": {
    tags: ["HTML", "CSS", "JavaScript", "Three.js", "Vite"],
    role: t(
      "Concebi e produzi o site de apresentação da Delusional — agência digital independente de web design e automação. Defini o posicionamento e a copy das três frentes (Web, Design e Automação), montei o visual brutalista com hero 3D em Three.js, as microinterações e a vitrine dos trabalhos do time, e publiquei como site estático rápido na Vercel. Não é um site de busca: é a peça que a gente mostra ao cliente — pessoalmente ou em anúncio — pra provar em segundos que o estúdio existe e entrega.",
      "I conceived and produced Delusional's presentation site — an independent digital agency for web design and automation. I defined the positioning and copy for the three fronts (Web, Design and Automation), built the brutalist look with a 3D hero in Three.js, the microinteractions and the team's work showcase, and shipped it as a fast static site on Vercel. It's not a search site: it's the piece we show clients — in person or in an ad — to prove in seconds that the studio exists and delivers.",
    ),
    images: [
      "/assets/delusional-studio-preview.jpg",
      "/assets/delusional-studio-1.jpg",
      "/assets/delusional-studio-2.jpg",
      "/assets/delusional-studio-3.jpg",
      "/assets/delusional-studio-4.jpg",
    ],
    shots: [
      {
        src: "/assets/delusional-studio-preview.jpg",
        title: t("Home imersiva", "Immersive home"),
        text: t("Entrada do site com identidade visual marcante.", "Site entrance with a bold visual identity."),
      },
      {
        src: "/assets/delusional-studio-1.jpg",
        title: t("Showcase de projetos", "Project showcase"),
        text: t("Vitrine dos trabalhos entregues pelo estúdio.", "Display of the studio's delivered work."),
      },
      {
        src: "/assets/delusional-studio-2.jpg",
        title: t("Animações interativas", "Interactive animations"),
        text: t("Microinterações e movimento guiando a navegação.", "Microinteractions and motion guiding navigation."),
      },
      {
        src: "/assets/delusional-studio-3.jpg",
        title: t("Serviços", "Services"),
        text: t("O que o estúdio entrega, do design ao deploy.", "What the studio delivers, from design to deploy."),
      },
      {
        src: "/assets/delusional-studio-4.jpg",
        title: t("Contato", "Contact"),
        text: t("Fechamento com chamada para novos projetos.", "Closing with a call for new projects."),
      },
    ],
  },
  "Delulu Painel": {
    tags: ["React", "Vite", "Fastify", "Prisma", "PostgreSQL"],
    role: t(
      "Plataforma interna full-stack que criei do zero (design + front + back) como uma forma de organizar e dar suporte a todo o time da Delusional: distribuição de projetos entre os membros, divisão de ganhos, Kanban pessoal, cofre de contratos e monitoramento de uptime dos sites dos clientes — além de um wizard de criação de projeto. Front em React + Vite com design system Neumorphism (Soft UI) próprio; back em Node + Fastify + Prisma + PostgreSQL, com autenticação por papéis (dono/PO/membro).",
      "Full-stack internal platform I built from scratch (design + front + back) as a way to organize and support the whole Delusional team: project distribution across members, earnings split, a personal Kanban, a contracts vault and uptime monitoring of clients' sites — plus a project-creation wizard. Front-end in React + Vite with a custom Neumorphism (Soft UI) design system; back-end in Node + Fastify + Prisma + PostgreSQL, with role-based auth (owner/PO/member).",
    ),
    images: [
      "/assets/delulu-empresa.jpg",
      "/assets/delulu-projetos.jpg",
      "/assets/delulu-ganhos.jpg",
      "/assets/delulu-status.jpg",
      "/assets/delulu-kanban.jpg",
      "/assets/delulu-mobile.jpg",
    ],
  },
  "Beyblade X Manager": {
    tags: ["React", "TypeScript", "Vite", "Supabase"],
    role: t(
      "Projeto pessoal full-stack que fiz do zero, sozinho e bem rápido — praticamente vibecodando num fim de tarde — só pra organizar as peladas de Beyblade X com os meus primos. Cuidei de tudo: a UI mobile com tema neon (efeitos de vidro/liquid glass), a lógica da partida 1v1 com os finishes oficiais (Spin, Over, Burst e Xtreme) e meta de pontos, o ranking e o histórico, com persistência local e sincronização via Supabase. Sem pretensão comercial: é só um projetinho divertido pra usar no celular.",
      "A personal full-stack project I built from scratch, solo and fast — basically vibe-coding in an afternoon — just to organize Beyblade X matches with my cousins. I handled everything: the neon mobile UI (glass / liquid-glass effects), the 1v1 match logic with the official finishes (Spin, Over, Burst and Xtreme) and a points target, the ranking and the history, with local persistence and Supabase sync. No commercial ambition: it's just a fun little app to use on the phone.",
    ),
    images: [
      "/assets/beyblade-preview.jpg",
      "/assets/beyblade-1.jpg",
      "/assets/beyblade-2.jpg",
      "/assets/beyblade-3.jpg",
      "/assets/beyblade-4.jpg",
      "/assets/beyblade-5.jpg",
    ],
    shots: [
      {
        src: "/assets/beyblade-preview.jpg",
        title: t("Visão geral", "Overview"),
        text: t("App mobile com tema neon do Beyblade X.", "Mobile app with a neon Beyblade X theme."),
      },
      {
        src: "/assets/beyblade-1.jpg",
        title: t("Menu", "Home"),
        text: t("Painel inicial com atalhos e os números das batalhas.", "Home with shortcuts and the battle stats."),
      },
      {
        src: "/assets/beyblade-2.jpg",
        title: t("Arena", "Arena"),
        text: t("Placar ao vivo da partida 1v1 com os finishes oficiais.", "Live 1v1 scoreboard with the official finishes."),
      },
      {
        src: "/assets/beyblade-3.jpg",
        title: t("Ranking", "Ranking"),
        text: t("Classificação dos bladers por vitórias e pontos.", "Blader leaderboard by wins and points."),
      },
      {
        src: "/assets/beyblade-4.jpg",
        title: t("Histórico", "History"),
        text: t("Registro das batalhas anteriores e seus placares.", "Log of past battles and their scores."),
      },
      {
        src: "/assets/beyblade-5.jpg",
        title: t("Bladers", "Bladers"),
        text: t("Cadastro dos jogadores que entram nas disputas.", "Registration of the players who join the matches."),
      },
    ],
  },
};
