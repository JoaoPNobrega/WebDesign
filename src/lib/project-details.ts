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
  "t4kena geek store": "site",
  Siaze: "site",
  "Affordable Granite": "site",
  "Dra Danielle Talamonti": "site",
  "Dra Raquel Kelner": "site",
  "Dr Guilherme Mendonça": "site",
  "Dr Cristiano Berardo": "site",
  "Keeping House": "site",
  "Delusional Studio": "site",
  "Filipe Regueira": "site",
  "Dr Adilis da Fonte": "site",
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
  "t4kena geek store": {
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Zod"],
    role: t(
      "Projeto pessoal: a loja online da t4kena geek store, de cartas Pokémon TCG. Construí o front e o back em Next.js + TypeScript: catálogo com busca e filtros, coleções, página de produto, carrinho com limite por pessoa e escolha de entrega, e o pedido fechado pelo WhatsApp. O painel administrativo protegido por senha tem CRUD de produtos validado com Zod, controle de estoque com entrada e saída registradas e as configurações públicas da loja. A camada de dados fica isolada num repositório, pronta pra migrar pro Supabase.",
      "Personal project: the online store for t4kena geek store, a Pokémon TCG card shop. I built front and back end in Next.js + TypeScript: a catalog with search and filters, collections, product pages, a cart with per-person limits and delivery options, and orders closed via WhatsApp. The password-protected admin panel has Zod-validated product CRUD, stock control with logged in/out movements and the store's public settings. The data layer is isolated behind a repository, ready to move to Supabase.",
    ),
    images: [
      "/assets/t4kena-preview.jpg",
      "/assets/t4kena-1.jpg",
      "/assets/t4kena-2.jpg",
    ],
    shots: [
      { src: "/assets/t4kena-preview.jpg", title: t("Home ilustrada", "Illustrated home"), text: t("Hero com cena ilustrada e atalhos pro catálogo e coleções.", "Hero with an illustrated scene and shortcuts to the catalog and collections.") },
      { src: "/assets/t4kena-1.jpg", title: t("Catálogo", "Catalog"), text: t("Busca e filtros pelas cartas disponíveis.", "Search and filters across the available cards.") },
      { src: "/assets/t4kena-2.jpg", title: t("Coleções", "Collections"), text: t("Navegação pelas coleções da loja.", "Browsing the store's collections.") },
    ],
  },
  Siaze: {
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion", "GSAP"],
    role: t(
      "Site institucional da Siaze, desenvolvido na Web Star Studio. Atuei no front-end das páginas de home, sobre, serviços, prevenção, portal EAD e contato, com responsividade, animações e o visual moderno de healthtech pedido pela empresa. Todo o ferramental de IA da produção foi fornecido pela empresa.",
      "Institutional website for Siaze, built at Web Star Studio. I worked on the front-end for the home, about, services, prevention, e-learning portal and contact pages, with responsiveness, animations and the modern healthtech look the company asked for. All the AI tooling used in production was provided by the company.",
    ),
    images: ["/assets/siaze-preview.jpg", "/assets/siaze-1.jpg"],
    shots: [
      { src: "/assets/siaze-preview.jpg", title: t("Home", "Home"), text: t("Primeira dobra com chamada pra contato e WhatsApp.", "Above the fold with contact and WhatsApp calls to action.") },
      { src: "/assets/siaze-1.jpg", title: t("Design em movimento", "Design in motion"), text: t("Serviços para empresas e seguradoras.", "Services for businesses and insurers.") },
    ],
  },
  "Affordable Granite": {
    tags: ["React", "TypeScript", "TanStack Start", "Tailwind CSS", "Lovable"],
    role: t(
      "Site da Affordable Granite, empresa de bancadas em pedra e armários na Flórida (EUA), desenvolvido na Web Star Studio. Catálogo de materiais por categoria e marca, páginas de serviços e de áreas atendidas, galeria de projetos, pedido de orçamento, um visualizador com IA que aplica o material escolhido na foto do ambiente do cliente e um painel administrativo completo. Todo o ferramental de IA da produção foi fornecido pela empresa.",
      "Website for Affordable Granite, a stone countertop and cabinet company in Florida (USA), built during my work at Web Star Studio. A material catalog by category and brand, service and service-area pages, a project gallery, estimate requests, an AI visualizer that applies the chosen material to a photo of the client's room and a full admin panel. All the AI tooling used in production was provided by the company.",
    ),
    images: ["/assets/granite-preview.jpg", "/assets/granite-1.jpg", "/assets/granite-2.jpg"],
    shots: [
      { src: "/assets/granite-preview.jpg", title: t("Home", "Home"), text: t("Primeira dobra com chamada pra orçamento.", "Above the fold with a call to request an estimate.") },
      { src: "/assets/granite-1.jpg", title: t("Visualizador", "Visualizer"), text: t("Visualizador de cozinha com IA.", "AI kitchen visualizer.") },
      { src: "/assets/granite-2.jpg", title: t("Materiais", "Materials"), text: t("Catálogo de materiais com filtros.", "Material catalog with filters.") },
    ],
  },
  "Dra Danielle Talamonti": {
    tags: ["React", "TypeScript", "TanStack Start", "Tailwind CSS"],
    role: t(
      "Site da coloproctologista Dra. Danielle Talamonti, desenvolvido na Web Star Studio. Home com posicionamento da médica, páginas de especialidades (doença hemorroidária e plicomas anais), sobre, blog, FAQ e contato, com painel administrativo em desenvolvimento. Todo o ferramental de IA da produção foi fornecido pela empresa.",
      "Website for colorectal surgeon Dr. Danielle Talamonti, built during my work at Web Star Studio. A home presenting the doctor, specialty pages (hemorrhoidal disease and anal skin tags), about, blog, FAQ and contact, with an admin panel in development. All the AI tooling used in production was provided by the company.",
    ),
    images: ["/assets/danielle-preview.jpg", "/assets/danielle-1.jpg"],
    shots: [
      { src: "/assets/danielle-preview.jpg", title: t("Home", "Home"), text: t("Primeira dobra com a apresentação da médica.", "Above the fold presenting the doctor.") },
      { src: "/assets/danielle-1.jpg", title: t("Especialidades", "Specialties"), text: t("Especialidades em coloproctologia.", "Colorectal specialties.") },
    ],
  },
  "Dra Raquel Kelner": {
    tags: ["React", "Vite", "TypeScript", "Tailwind CSS", "GSAP"],
    role: t(
      "Site da proctologista e coloproctologista Dra. Raquel Kelner (Recife), desenvolvido na Web Star Studio. Páginas de condições, procedimentos, equipe, jornada do paciente, blog e agendamento, além de portal do paciente e painel administrativo. Todo o ferramental de IA da produção foi fornecido pela empresa.",
      "Website for proctologist and colorectal surgeon Dr. Raquel Kelner (Recife), built during my work at Web Star Studio. Pages for conditions, procedures, team, patient journey, blog and booking, plus a patient portal and an admin panel. All the AI tooling used in production was provided by the company.",
    ),
    images: ["/assets/raquel-preview.jpg", "/assets/raquel-1.jpg"],
    shots: [
      { src: "/assets/raquel-preview.jpg", title: t("Home", "Home"), text: t("Primeira dobra com a apresentação da médica.", "Above the fold presenting the doctor.") },
      { src: "/assets/raquel-1.jpg", title: t("Procedimentos", "Procedures"), text: t("Procedimentos minimamente invasivos.", "Minimally invasive procedures.") },
    ],
  },
  "Dr Guilherme Mendonça": {
    tags: ["React", "TypeScript", "TanStack Start", "Tailwind CSS"],
    role: t(
      "Site do cirurgião torácico Dr. Guilherme Mendonça (Arcoverde e Recife), desenvolvido na Web Star Studio. Páginas por especialidade (nódulo e câncer de pulmão, cirurgia robótica, derrame pleural, hiperidrose, broncoscopia e traqueoscopia), sobre, blog, FAQ e contato, com painel administrativo próprio. Todo o ferramental de IA da produção foi fornecido pela empresa.",
      "Website for thoracic surgeon Dr. Guilherme Mendonça (Arcoverde and Recife), built during my work at Web Star Studio. Pages per specialty (lung nodules and cancer, robotic surgery, pleural effusion, hyperhidrosis, bronchoscopy and tracheostomy), about, blog, FAQ and contact, with its own admin panel. All the AI tooling used in production was provided by the company.",
    ),
    images: ["/assets/guilherme-mendonca-preview.jpg", "/assets/guilherme-mendonca-1.jpg"],
    shots: [
      { src: "/assets/guilherme-mendonca-preview.jpg", title: t("Sobre", "About"), text: t("Apresentação do médico.", "Introducing the doctor.") },
      { src: "/assets/guilherme-mendonca-1.jpg", title: t("Especialidades", "Specialties"), text: t("Condições tratadas, uma por página.", "Conditions treated, one per page.") },
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
        title: t("Comece enxuto, cresça depois", "Start lean, grow later"),
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
      "Concebi e produzi o site da Delusional, estúdio independente de web design e automação em Recife. Escrevi a copy dos serviços (sites e landing pages, lojas e marketplaces, design e automação de tarefas), montei o hero 3D e as seções animadas pelo scroll e estruturei o site pra busca local, com versões em português, inglês e espanhol. Publicado na Vercel.",
      "I conceived and produced the website for Delusional, an independent web design and automation studio in Recife. I wrote the copy for the services (websites and landing pages, stores and marketplaces, design and task automation), built the 3D hero and the scroll-animated sections and structured the site for local search, with Portuguese, English and Spanish versions. Deployed on Vercel.",
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
        title: t("Home", "Home"),
        text: t("Hero com a peça 3D e a chamada principal.", "Hero with the 3D piece and the main call to action."),
      },
      {
        src: "/assets/delusional-studio-1.jpg",
        title: t("Cada peça tem uma função", "Every piece has a job"),
        text: t("Vista explodida mostrando cada parte do site.", "Exploded view showing each part of the site."),
      },
      {
        src: "/assets/delusional-studio-2.jpg",
        title: t("Lojas e marketplaces", "Stores and marketplaces"),
        text: t("Seção de serviço guiada pela animação no scroll.", "Service section driven by the scroll animation."),
      },
      {
        src: "/assets/delusional-studio-3.jpg",
        title: t("Serviços", "Services"),
        text: t("Animação a serviço da marca.", "Animation in service of the brand."),
      },
      {
        src: "/assets/delusional-studio-4.jpg",
        title: t("Contato", "Contact"),
        text: t("Versão inicial pronta pra crescer com novas páginas.", "A first version ready to grow with new pages."),
      },
    ],
  },
  "Dr Adilis da Fonte": {
    tags: ["React", "TypeScript", "TanStack Start", "Tailwind CSS", "Supabase", "Motion"],
    role: t(
      "Desenvolvido durante meu estágio na Web Star Studio, atuando do design ao front-end: a home com hero em scrollytelling (Segurança · Experiência · Cuidado), a página Sobre com trajetória e titulação, as páginas por especialidade, a área para médicos encaminhadores, os depoimentos, o blog com painel próprio (CMS em Supabase) e os fluxos de agendamento por WhatsApp. Traduzi a promessa do médico numa direção sóbria e clínica — azul-petróleo, acento ciano e muito respiro —, cuidando das microinterações (Motion), da responsividade e do SEO. Construído em React + TanStack Start. Todo o ferramental de IA usado na produção foi fornecido pela empresa.",
      "Built during my internship at Web Star Studio, working from design to front-end: the home with a scrollytelling hero (Safety · Experience · Care), the About page with his background and credentials, the per-specialty pages, the section for referring physicians, the testimonials, the blog with its own admin (a Supabase CMS) and the WhatsApp booking flows. I translated the doctor's promise into a sober, clinical direction — petrol blue, a cyan accent and plenty of breathing room — handling the microinteractions (Motion), responsiveness and SEO. Built in React + TanStack Start. All the AI tooling used in production was provided by the company.",
    ),
    images: [
      "/assets/adilis-preview.jpg",
      "/assets/adilis-hero.jpg",
      "/assets/adilis-sobre.jpg",
      "/assets/adilis-trajetoria.jpg",
      "/assets/adilis-especialidades.jpg",
      "/assets/adilis-encaminhadores.jpg",
      "/assets/adilis-como-funciona.jpg",
      "/assets/adilis-blog.jpg",
      "/assets/adilis-agendamento.jpg",
      "/assets/adilis-mobile.jpg",
    ],
    shots: [
      {
        src: "/assets/adilis-preview.jpg",
        title: t("Abertura da página Sobre", "About page opening"),
        text: t("O médico em cena e a tese do site: cirurgia é decisão técnica e relação de confiança.", "The doctor on screen and the site's thesis: surgery is a technical decision and a relationship of trust."),
      },
      {
        src: "/assets/adilis-hero.jpg",
        title: t("Hero em scrollytelling", "Scrollytelling hero"),
        text: t("Segurança, experiência e cuidado emergem sobre o consultório conforme se rola.", "Safety, experience and care emerge over the consulting room as you scroll."),
      },
      {
        src: "/assets/adilis-sobre.jpg",
        title: t("Quem é o Dr. Adilis", "Who Dr. Adilis is"),
        text: t("Mais de 20 anos de cirurgia de cabeça e pescoço, com as credenciais em destaque.", "Over 20 years of head and neck surgery, with the credentials up front."),
      },
      {
        src: "/assets/adilis-trajetoria.jpg",
        title: t("Trajetória em números", "Background in numbers"),
        text: t("Anos de atuação, hospitais de referência e títulos — com nota de rodapé sobre a verificação.", "Years of practice, reference hospitals and specialist titles — with a footnote on verification."),
      },
      {
        src: "/assets/adilis-especialidades.jpg",
        title: t("Especialidades", "Specialties"),
        text: t("Mapa de pontos da cabeça e do pescoço ligando cada região à sua patologia.", "A dotted head-and-neck map linking each region to its condition."),
      },
      {
        src: "/assets/adilis-encaminhadores.jpg",
        title: t("Médicos encaminhadores", "Referring physicians"),
        text: t("Uma frente inteira do site para quem encaminha, e não para o paciente.", "A whole section of the site aimed at referrers rather than patients."),
      },
      {
        src: "/assets/adilis-como-funciona.jpg",
        title: t("Do encaminhamento ao retorno", "From referral to feedback"),
        text: t("Os três passos do encaminhamento, com o vínculo com o médico assistente preservado.", "The three referral steps, keeping the bond with the assisting physician intact."),
      },
      {
        src: "/assets/adilis-blog.jpg",
        title: t("Blog clínico", "Clinical blog"),
        text: t("Artigo em destaque e arquivo filtrável por tema, publicados pelo painel.", "A featured article and an archive filterable by topic, published from the admin."),
      },
      {
        src: "/assets/adilis-agendamento.jpg",
        title: t("Agendamento", "Booking"),
        text: t("Fechamento da home levando direto à consulta.", "The home's closing section leading straight to booking."),
      },
      {
        src: "/assets/adilis-mobile.jpg",
        title: t("No celular", "On mobile"),
        text: t("O mesmo tom clínico reduzido à tela do paciente, com agendamento a um toque.", "The same clinical tone scaled to the patient's screen, with one-tap booking."),
      },
    ],
  },
  "Filipe Regueira": {
    tags: ["Astro", "TypeScript", "React", "Tailwind CSS", "Supabase", "Vercel"],
    role: t(
      "Projeto full-stack que conduzi do briefing ao ar, pela Delusional: direção de arte, conteúdo, front-end e o painel administrativo. Traduzi o pedido do cliente — “sério, sem firula” — numa direção visual própria, “Tinta & Latão”: fundo quase-preto, acento em latão, Fraunces nos títulos e Newsreader no texto, com movimento contido (reveal no scroll, zero 3D) e contraste calibrado pra leitura longa. Construído em Astro, com as coleções de artigos e palestras filtráveis por tema, páginas dedicadas por livro, agregador de imprensa e SEO/JSON-LD. Por cima, um painel próprio em React + Supabase pra ele publicar artigos, palestras, imprensa e projetos, responder mensagens do formulário e acompanhar os analíticos do site — sem depender de mim pra cada atualização.",
      "A full-stack project I led from briefing to launch, through Delusional: art direction, content, front-end and the admin panel. I translated the client's brief — “serious, no frills” — into a custom visual direction, “Ink & Brass”: near-black background, a brass accent, Fraunces for headings and Newsreader for body text, with restrained motion (scroll reveals, zero 3D) and contrast tuned for long-form reading. Built in Astro, with article and talk collections filterable by topic, dedicated pages per book, a press aggregator and SEO/JSON-LD. On top of it, a custom React + Supabase panel so he can publish articles, talks, press and projects, reply to form messages and follow the site's analytics — without depending on me for every update.",
    ),
    images: [
      "/assets/filipe-preview.jpg",
      "/assets/filipe-livro.jpg",
      "/assets/filipe-livro-page.jpg",
      "/assets/filipe-sobre.jpg",
      "/assets/filipe-palestras-fotos.jpg",
      "/assets/filipe-reconhecimentos.jpg",
      "/assets/filipe-artigos.jpg",
      "/assets/filipe-imprensa.jpg",
      "/assets/filipe-palestras.jpg",
      "/assets/filipe-mobile.jpg",
    ],
    shots: [
      {
        src: "/assets/filipe-preview.jpg",
        title: t("Primeira dobra", "Above the fold"),
        text: t("A tese do professor em uma frase, sobre fundo de biblioteca e acento em latão.", "The professor's thesis in one sentence, over a library backdrop with a brass accent."),
      },
      {
        src: "/assets/filipe-livro.jpg",
        title: t("O livro em destaque", "The featured book"),
        text: t("“Balbúrdia Penal” ancora a home, com compra direta na Amazon.", "“Balbúrdia Penal” anchors the home, with a direct Amazon purchase link."),
      },
      {
        src: "/assets/filipe-livro-page.jpg",
        title: t("Página do livro", "Book page"),
        text: t("Ficha completa: sinopse, ISBN, páginas, edição e onde comprar.", "Full record: synopsis, ISBN, pages, edition and where to buy."),
      },
      {
        src: "/assets/filipe-sobre.jpg",
        title: t("Biografia", "Biography"),
        text: t("Trajetória acadêmica e institucional aberta por um trio de retratos.", "Academic and institutional background opened by a trio of portraits."),
      },
      {
        src: "/assets/filipe-palestras-fotos.jpg",
        title: t("Palestras em destaque", "Featured talks"),
        text: t("Linha do tempo das participações, com fotos reais de cada evento.", "A timeline of his appearances, with real photos from each event."),
      },
      {
        src: "/assets/filipe-reconhecimentos.jpg",
        title: t("Reconhecimentos", "Recognitions"),
        text: t("Condecorações e homenagens documentadas em cards datados.", "Decorations and honors documented in dated cards."),
      },
      {
        src: "/assets/filipe-artigos.jpg",
        title: t("Artigos", "Articles"),
        text: t("Coleção de textos autorais filtrável por tema, com a fonte original creditada.", "A collection of his articles filterable by topic, crediting the original outlet."),
      },
      {
        src: "/assets/filipe-imprensa.jpg",
        title: t("Na mídia", "In the media"),
        text: t("Agregador de entrevistas e reportagens, com o vídeo em destaque.", "An aggregator of interviews and press coverage, with the featured video."),
      },
      {
        src: "/assets/filipe-palestras.jpg",
        title: t("Temas de palestra", "Talk topics"),
        text: t("Cinco temas prontos para convite, cada um levando ao formulário preenchido.", "Five topics ready to be booked, each one prefilling the contact form."),
      },
      {
        src: "/assets/filipe-mobile.jpg",
        title: t("No celular", "On mobile"),
        text: t("A mesma hierarquia reduzida ao polegar, mantendo o conforto de leitura.", "The same hierarchy scaled to the thumb, keeping the reading comfort."),
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
