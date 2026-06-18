import type { LocalizedText } from "@/lib/i18n";

const t = (pt: string, en: string): LocalizedText => ({ "pt-BR": pt, "en-US": en });

// Papel padrão: projeto solo, de ponta a ponta.
const soloRole = t(
  "Projeto solo: design, front-end, responsividade e entrega — tudo feito por mim, do briefing ao deploy.",
  "Solo project: design, front-end, responsiveness and delivery — all done by me, from briefing to deploy.",
);

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
};

export const projectDetails: Record<string, ProjectDetail> = {
  "Dr Guilherme Maia": {
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    role: webstarRole,
    images: [
      "/assets/guilherme-1.jpg",
      "/assets/guilherme-2.jpg",
      "/assets/guilherme-4.jpg",
      "/assets/guilherme-5.jpg",
    ],
  },
  FlyHigh: {
    tags: ["React", "Vite", "Tailwind CSS"],
    role: soloRole,
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
      "/assets/petfeeder-welcome.png",
      "/assets/petfeeder-app.png",
      "/assets/petfeeder-firebase.png",
    ],
  },
  "Dr Daniel Pianetti": {
    tags: ["React", "Vite", "Tailwind CSS", "Three.js"],
    role: webstarRole,
    images: [
      "/assets/daniel-1.jpg",
      "/assets/daniel-2.jpg",
      "/assets/daniel-3.jpg",
      "/assets/daniel-4.jpg",
      "/assets/daniel-5.jpg",
    ],
  },
  "Stephanie Bolsoni": {
    tags: ["React", "Vite", "Tailwind CSS"],
    role: webstarRole,
    images: [
      "/assets/stephanie-1.jpg",
      "/assets/stephanie-2.jpg",
      "/assets/stephanie-3.jpg",
      "/assets/stephanie-4.jpg",
      "/assets/stephanie-5.jpg",
    ],
  },
  "Izi Solutions": {
    tags: ["React", "Vite", "Tailwind CSS"],
    role: webstarRole,
    images: [
      "/assets/izi-1.jpg",
      "/assets/izi-2.jpg",
      "/assets/izi-3.jpg",
      "/assets/izi-4.jpg",
      "/assets/izi-5.jpg",
    ],
  },
  "Ines Knoden": {
    tags: ["React", "Vite", "Tailwind CSS"],
    role: webstarRole,
    images: [
      "/assets/ines-1.jpg",
      "/assets/ines-2.jpg",
      "/assets/ines-3.jpg",
      "/assets/ines-4.jpg",
      "/assets/ines-5.jpg",
    ],
  },
  "Dr Dimas Antunes": {
    tags: ["React", "Vite", "Tailwind CSS"],
    role: webstarRole,
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
      "/assets/drcristiano-preview.png",
      "/assets/drcristiano-1.png",
      "/assets/drcristiano-2.png",
      "/assets/drcristiano-3.png",
      "/assets/drcristiano-4.png",
    ],
    shots: [
      {
        src: "/assets/drcristiano-preview.png",
        title: t("Hero institucional", "Institutional hero"),
        text: t("Primeira dobra com posicionamento premium e autoridade médica.", "Above the fold with premium positioning and medical authority."),
      },
      {
        src: "/assets/drcristiano-1.png",
        title: t("Trajetória", "Background"),
        text: t("Seção que conta a formação e a carreira do cirurgião.", "Section telling the surgeon's education and career."),
      },
      {
        src: "/assets/drcristiano-2.png",
        title: t("Especialidades", "Specialties"),
        text: t("Procedimentos e áreas de atuação apresentados com clareza.", "Procedures and practice areas presented clearly."),
      },
      {
        src: "/assets/drcristiano-3.png",
        title: t("Cuidado humanizado", "Humanized care"),
        text: t("Narrativa visual voltada para o paciente.", "Patient-focused visual narrative."),
      },
      {
        src: "/assets/drcristiano-4.png",
        title: t("Contato", "Contact"),
        text: t("Fechamento com canais de agendamento.", "Closing with booking channels."),
      },
    ],
  },
  "Keeping House": {
    tags: ["React", "Vite", "Tailwind CSS"],
    role: t(
      "Atuei no front-end: implementei toda a interface e a responsividade. O restante do projeto ficou com o time da Delusional.",
      "I handled the front-end: I built the entire interface and responsiveness. The rest of the project was done by the Delusional team.",
    ),
    images: [
      "/assets/keepinghouse-preview.png",
      "/assets/keepinghouse-1.png",
      "/assets/keepinghouse-2.png",
      "/assets/keepinghouse-3.png",
      "/assets/keepinghouse-4.png",
    ],
    shots: [
      {
        src: "/assets/keepinghouse-preview.png",
        title: t("Hero", "Hero"),
        text: t("Primeira dobra com proposta de valor e CTA direto.", "Above the fold with value proposition and direct CTA."),
      },
      {
        src: "/assets/keepinghouse-1.png",
        title: t("Serviços", "Services"),
        text: t("Apresentação dos serviços de limpeza e organização.", "Showcase of cleaning and organization services."),
      },
      {
        src: "/assets/keepinghouse-2.png",
        title: t("Planos", "Plans"),
        text: t("Planos e pacotes com foco em conversão.", "Plans and packages built for conversion."),
      },
      {
        src: "/assets/keepinghouse-3.png",
        title: t("Depoimentos", "Testimonials"),
        text: t("Prova social de clientes reais.", "Social proof from real clients."),
      },
      {
        src: "/assets/keepinghouse-4.png",
        title: t("Agendamento", "Booking"),
        text: t("Fluxo de agendamento direto pelo WhatsApp.", "Direct WhatsApp booking flow."),
      },
    ],
  },
  "Delusional Studio": {
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    role: soloRole,
    images: [
      "/assets/delusional-studio-preview.png",
      "/assets/delusional-studio-1.png",
      "/assets/delusional-studio-2.png",
      "/assets/delusional-studio-3.png",
      "/assets/delusional-studio-4.png",
    ],
    shots: [
      {
        src: "/assets/delusional-studio-preview.png",
        title: t("Home imersiva", "Immersive home"),
        text: t("Entrada do site com identidade visual marcante.", "Site entrance with a bold visual identity."),
      },
      {
        src: "/assets/delusional-studio-1.png",
        title: t("Showcase de projetos", "Project showcase"),
        text: t("Vitrine dos trabalhos entregues pelo estúdio.", "Display of the studio's delivered work."),
      },
      {
        src: "/assets/delusional-studio-2.png",
        title: t("Animações interativas", "Interactive animations"),
        text: t("Microinterações e movimento guiando a navegação.", "Microinteractions and motion guiding navigation."),
      },
      {
        src: "/assets/delusional-studio-3.png",
        title: t("Serviços", "Services"),
        text: t("O que o estúdio entrega, do design ao deploy.", "What the studio delivers, from design to deploy."),
      },
      {
        src: "/assets/delusional-studio-4.png",
        title: t("Contato", "Contact"),
        text: t("Fechamento com chamada para novos projetos.", "Closing with a call for new projects."),
      },
    ],
  },
  "Delulu Painel": {
    tags: ["React", "Vite", "Tailwind CSS", "Firebase"],
    role: soloRole,
    images: [
      "/assets/delulu-painel-preview.png",
      "/assets/delulu-painel-1.png",
      "/assets/delulu-painel-2.png",
      "/assets/delulu-painel-3.png",
    ],
    shots: [
      {
        src: "/assets/delulu-painel-preview.png",
        title: t("Visão geral", "Overview"),
        text: t("Dashboard principal com estética Neumorphism.", "Main dashboard with a Neumorphism aesthetic."),
      },
      {
        src: "/assets/delulu-painel-1.png",
        title: t("Kanban pessoal", "Personal Kanban"),
        text: t("Organização da rotina e das tarefas do time.", "Organizing the team's routine and tasks."),
      },
      {
        src: "/assets/delulu-painel-2.png",
        title: t("Gestão financeira", "Financial management"),
        text: t("Controle de projetos, valores e contratos assinados.", "Tracking projects, payments and signed contracts."),
      },
      {
        src: "/assets/delulu-painel-3.png",
        title: t("Monitoramento", "Monitoring"),
        text: t("Status e uptime dos sites no ar, em tempo real.", "Live status and uptime of deployed websites."),
      },
    ],
  },
};
