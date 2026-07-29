import type { LocalizedText } from "@/lib/i18n";

export type NavProjectItem = (typeof navProjectItems)[number];

export const navProjectItems = [
  {
    title: "Dr Daniel Pianetti",
    image: "/assets/daniel-notch.png",
    description: {
      "pt-BR": "Site do urologista Dr. Daniel Pianetti (Belo Horizonte), desenvolvido durante meu estágio na Web Star Studio. Foco em cirurgia robótica Da Vinci, oncologia urológica (próstata, rim e bexiga) e HoLEP, com objeto 3D, logo animada e uma narrativa que transmite tecnologia e confiança. Tem páginas dedicadas por procedimento, blog com painel próprio (CMS), avaliações reais (Doctoralia + Google) e um chatbot — tudo com SEO/GEO pesado (JSON-LD, llms.txt) pra ranquear e ser citado por buscas e IAs.",
      "en-US": "Website for urologist Dr. Daniel Pianetti (Belo Horizonte), built during my internship at Web Star Studio. Focused on Da Vinci robotic surgery, urologic oncology (prostate, kidney and bladder) and HoLEP, with a 3D object, an animated logo and a narrative that conveys technology and trust. It has dedicated pages per procedure, a blog with its own admin (CMS), real reviews (Doctoralia + Google) and a chatbot — all with heavy SEO/GEO (JSON-LD, llms.txt) to rank and get cited by search and AI.",
    },
    partner: "Web Star Studio",
    href: "https://daniel.webstar.studio/",
  },
  {
    title: "Delusional Studio",
    images: [
      "/assets/delusional-studio-preview.jpg",
      "/assets/delusional-studio-1.jpg",
      "/assets/delusional-studio-2.jpg",
      "/assets/delusional-studio-3.jpg",
      "/assets/delusional-studio-4.jpg"
    ],
    description: {
      "pt-BR": "Site-vitrine da Delusional — agência digital independente de web design e automação com IA. Funciona como uma ponte com o cliente: em vez de depender de busca, é a peça que a equipe mostra pessoalmente ou em anúncio pra provar, em segundos, que o estúdio existe e entrega. Visual brutalista com hero 3D (Three.js), tipografia condensada e acento roxo, organizado em três frentes — Web, Design e Automação — com a vitrine dos trabalhos do time. Site estático rápido, publicado na Vercel pra ser compartilhado por link.",
      "en-US": "Showcase site for Delusional — an independent digital agency for web design and AI automation. It works as a bridge to the client: instead of relying on search, it's the piece the team shows in person or in an ad to prove, in seconds, that the studio exists and delivers. A brutalist look with a 3D hero (Three.js), condensed type and a purple accent, organized around three fronts — Web, Design and Automation — with a showcase of the team's work. A fast static site, deployed on Vercel to be shared as a link.",
    },
    partner: "Delusional",
    partnerLogo: "/assets/delusional-logo.png",
    partnerLogoClassName: "h-5 w-auto object-contain sm:h-6",
    href: "https://delusionalstudio.vercel.app/",
  },
  {
    title: "Filipe Regueira",
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
      "/assets/filipe-mobile.jpg"
    ],
    description: {
      "pt-BR": "Site de autoridade do professor Filipe Regueira — promotor de justiça, autor e pesquisador em criminologia, política criminal e segurança pública. Direção visual “Tinta & Latão”: fundo quase-preto, acento em latão e tipografia serifada, pensada pra sustentar leitura longa sem cansar. Reúne os dois livros (com página própria pra “Balbúrdia Penal”), artigos publicados na imprensa, palestras filtráveis por tema, aparições na mídia e trajetória — mais um painel administrativo próprio onde ele mesmo publica conteúdo e acompanha os números do site.",
      "en-US": "Authority site for professor Filipe Regueira — public prosecutor, author and researcher in criminology, criminal policy and public safety. An “Ink & Brass” visual direction: near-black background, a brass accent and serif type, designed to hold long-form reading without fatigue. It gathers both books (with a dedicated page for “Balbúrdia Penal”), articles published in the press, talks filterable by topic, media appearances and his background — plus a custom admin panel where he publishes content himself and follows the site's numbers.",
    },
    partner: "Delusional",
    partnerLogo: "/assets/delusional-logo.png",
    partnerLogoClassName: "h-5 w-auto object-contain sm:h-6",
    href: "https://professorfiliperegueira.com.br/",
  },
  {
    title: "FlyHigh",
    images: [
      "/assets/flyhigh-cover.jpg",
      "/assets/flyhigh-mockup-2.jpg",
    ],
    description: {
      "pt-BR": "App mobile-first que criei pra organizar a pelada de vôlei do meu grupo: check-in de jogadores, montagem de times, fila, placar ao vivo, histórico e pagamento via Pix. Com tema visual inspirado no anime Haikyu!!.",
      "en-US": "A mobile-first app I built to organize my group's volleyball pickup games: player check-in, team building, a queue, a live scoreboard, history and Pix payments. With visuals inspired by the anime Haikyu!!.",
    },
  },
  {
    title: "Keeping House",
    images: [
      "/assets/keepinghouse-hero.jpg",
      "/assets/keepinghouse-categorias.jpg",
      "/assets/keepinghouse-busca.jpg",
      "/assets/keepinghouse-concierge.jpg",
      "/assets/keepinghouse-planos.jpg",
      "/assets/keepinghouse-mobile.jpg"
    ],
    description: {
      "pt-BR": "Plataforma/marketplace de serviços domésticos da Keeping House: conecta famílias a diaristas, babás, cuidadoras, governantas e mais — com busca por CEP e categoria, perfis avaliados, planos de assinatura, vagas, um Concierge premium de curadoria e áreas logadas para contratante, profissional e administrador.",
      "en-US": "Domestic-services marketplace for Keeping House: connects families with house cleaners, nannies, caregivers, housekeepers and more — with CEP + category search, reviewed profiles, subscription plans, job postings, a premium curated Concierge and logged-in areas for clients, professionals and admins.",
    },
    href: "https://keepinghouse.com.br/",
  },
  {
    title: "PetFeeder",
    image: "/assets/petfeeder-preview.webp",
    description: {
      "pt-BR": "Alimentador automático inteligente para pets, desenvolvido com ESP32, sensores e atuadores. O projeto integra um dashboard web em tempo real via Firebase, controle local por Access Point e API Gemini para sugerir rotinas de alimentação personalizadas.",
      "en-US": "A smart automatic pet feeder built with ESP32, sensors and actuators. The project integrates a real-time web dashboard via Firebase, local control through an Access Point and the Gemini API to suggest personalized feeding routines.",
    },
    href: "https://github.com/JoaoPNobrega/PetFeeder-Front",
    ctaLabel: "GitHub",
    partner: "CESAR School",
    partnerLogo: "/assets/cesar-school-logo.png",
    partnerLogoClassName: "h-5 w-auto object-contain sm:h-6",
  },
  {
    title: "Dr Cristiano Berardo",
    images: [
      "/assets/drcristiano-preview.jpg",
      "/assets/drcristiano-1.jpg",
      "/assets/drcristiano-2.jpg",
      "/assets/drcristiano-3.jpg",
      "/assets/drcristiano-4.jpg"
    ],
    description: {
      "pt-BR": "Landing page institucional para o cirurgião cardiovascular Dr. Cristiano Berardo, desenvolvida durante meu estágio na Web Star Studio. Um site premium que transmite autoridade médica, trajetória acadêmica e cuidado humanizado para pacientes e médicos.",
      "en-US": "Institutional landing page for cardiovascular surgeon Dr. Cristiano Berardo, built during my internship at Web Star Studio. A premium site conveying medical authority, academic background and humanized care for patients and physicians.",
    },
    partner: "Web Star Studio",
    href: "https://drcristiano.webstar.studio",
  },
  {
    title: "Delulu Painel",
    images: [
      "/assets/delulu-empresa.jpg",
      "/assets/delulu-projetos.jpg",
      "/assets/delulu-ganhos.jpg",
      "/assets/delulu-status.jpg",
      "/assets/delulu-kanban.jpg",
      "/assets/delulu-mobile.jpg"
    ],
    description: {
      "pt-BR": "Plataforma interna da Delusional (estúdio de desenvolvimento web freelance) para organizar e dar suporte a todo o time: distribuição de projetos, divisão de ganhos por membro, Kanban pessoal, cofre de contratos e monitoramento de uptime dos sites dos clientes. Estética Neumorphism (Soft UI), com login por papéis (dono/PO/membro).",
      "en-US": "Internal platform for Delusional (a freelance web-dev studio) to organize and support the whole team: project distribution, per-member earnings split, a personal Kanban, a contracts vault and uptime monitoring of clients' sites. A Neumorphism (Soft UI) aesthetic, with role-based login (owner/PO/member).",
    },
    partner: "Delusional",
    partnerLogo: "/assets/delusional-logo.png",
    partnerLogoClassName: "h-5 w-auto object-contain sm:h-6",
    href: "https://delulu-painel.vercel.app/",
  },
  {
    title: "Ines Knoden",
    image: "/assets/ines-preview.png",
    description: {
      "pt-BR": "Site da Inês Knoden — Wellness & Career Coach em Lisboa, desenvolvido durante meu estágio na Web Star Studio. Voltado a mulheres (sobretudo francófonas) sobrecarregadas que buscam energia, equilíbrio e clareza profissional, a experiência transmite serenidade e acolhimento — convida a respirar e desacelerar. Identidade suave e madura (paleta coral/pêssego, tipografia serifada com toques manuscritos), com páginas de programas, sobre e contato e estrutura bilíngue (PT/FR).",
      "en-US": "Website for Inês Knoden — Wellness & Career Coach in Lisbon, built during my internship at Web Star Studio. Aimed at (mostly francophone) overwhelmed women seeking energy, balance and career clarity, the experience conveys serenity and warmth — inviting you to breathe and slow down. A soft, mature identity (coral/peach palette, serif type with handwritten touches), with programs, about and contact pages and a bilingual structure (PT/FR).",
    },
    partner: "Web Star Studio",
    href: "https://ines.webstarstudio.site/",
  },
  {
    title: "Stephanie Bolsoni",
    image: "/assets/stephanie-bolsoni.jpg",
    imageScale: "scale-[1.2] group-hover:scale-[1.28]",
    description: {
      "pt-BR": "Site da nutricionista Stephanie Bolsoni, desenvolvido durante meu estágio na Web Star Studio. Nutrição personalizada e baseada em ciência para mulheres, com atendimento presencial em Dublin e online — foco em emagrecimento e saúde metabólica. Reúne avaliações reais sincronizadas do Doctify e do Google, galeria do consultório, agendamento e um blog com painel próprio (CMS) pra publicar conteúdo, tudo numa experiência premium e bem animada.",
      "en-US": "Website for nutritionist Stephanie Bolsoni, built during my internship at Web Star Studio. Personalized, science-based nutrition for women, with in-person care in Dublin and online — focused on weight loss and metabolic health. It brings together real reviews synced from Doctify and Google, a clinic gallery, booking and a blog with its own admin (CMS) to publish content, all in a premium, highly animated experience.",
    },
    partner: "Web Star Studio",
    href: "https://stephaniebolsoni.com/",
  },
  {
    title: "Dr Guilherme Maia",
    image: "/assets/dr-guilherme-preview.jpg",
    imageScale: "scale-[1.2] group-hover:scale-[1.28]",
    description: {
      "pt-BR": "Site do urologista Dr. Guilherme Maia (Recife) — meu primeiro projeto no estágio na Web Star Studio. Landing médica com foco em storytelling e autoridade: cirurgia robótica Da Vinci, câncer de próstata, próstata aumentada (HPB) e vasectomia sem bisturi, destacando a trajetória (chefe de Urologia do IMIP, fellowship na França, pioneiro da cirurgia robótica no Recife) e um blog educativo. Simples e clara, feita pra transmitir confiança e gerar agendamento.",
      "en-US": "Website for urologist Dr. Guilherme Maia (Recife) — my first project during the Web Star Studio internship. A medical landing focused on storytelling and authority: Da Vinci robotic surgery, prostate cancer, enlarged prostate (BPH) and no-scalpel vasectomy, highlighting his background (Head of Urology at IMIP, a fellowship in France, a pioneer of robotic surgery in Recife) and an educational blog. Simple and clear, built to convey trust and drive bookings.",
    },
    partner: "Web Star Studio",
    href: "https://drguilhermemaia.com.br/",
  },
  {
    title: "Mirela Albuquerque",
    images: [
      "/assets/mirela-preview.jpg",
      "/assets/mirela-1.jpg",
      "/assets/mirela-2.jpg",
      "/assets/mirela-3.jpg",
      "/assets/mirela-4.jpg",
      "/assets/mirela-5.jpg"
    ],
    description: {
      "pt-BR": "Site da Dra. Mirela Albuquerque — médica tricologista em Recife (Clínica Aevum, no Pina), desenvolvido durante meu estágio na Web Star Studio. Especializada em saúde capilar: queda de cabelo, alopecias e calvície, com tricoscopia digital e laudo por IA, protocolos médicos individualizados e transplante capilar e de sobrancelhas. Estética editorial sofisticada em tons terrosos, com seções por tratamento e procedimento, FAQ, agendamento e um blog com painel próprio (CMS).",
      "en-US": "Website for Dr. Mirela Albuquerque — a trichologist in Recife (Aevum Clinic, Pina), built during my internship at Web Star Studio. Specialized in hair health: hair loss, alopecias and balding, with digital trichoscopy and AI-assisted reports, individualized medical protocols and hair and eyebrow transplants. A sophisticated editorial look in earthy tones, with sections per treatment and procedure, FAQ, booking and a blog with its own admin (CMS).",
    },
    partner: "Web Star Studio",
    href: "https://dramirelaalbuquerque.com.br/",
  },
  {
    title: "Dr Dimas Antunes",
    image: "/assets/dimas-preview.png",
    description: {
      "pt-BR": "Site do urologista e andrologista Dr. Dimas Antunes (clínica CURAR, Recife), desenvolvido durante meu estágio na Web Star Studio. Conceito 'The Clinical Curator': uma experiência editorial premium — discreta, autoritativa e tecnológica — que destaca a autoridade acadêmica (formação internacional, docência e SBU) e a urologia de ponta para a saúde do homem. Layout assimétrico com scrollytelling, glassmorphism e bento grid, logo animada com morph (GSAP) e acabamento de revista científica.",
      "en-US": "Website for urologist and andrologist Dr. Dimas Antunes (CURAR clinic, Recife), built during my internship at Web Star Studio. A 'Clinical Curator' concept: a premium editorial experience — discreet, authoritative and technological — highlighting his academic authority (international training, teaching and the Brazilian Urology Society) and advanced urology for men's health. An asymmetric scrollytelling layout with glassmorphism and a bento grid, an animated morphing logo (GSAP) and a scientific-journal finish.",
    },
    partner: "Web Star Studio",
    href: "https://dimas.webstarstudio.site/",
  },
  {
    title: "Izi Solutions",
    image: "/assets/izi-solutions-preview.png",
    description: {
      "pt-BR": "Site da izi Solutions — limpeza profissional especializada em Airbnb, short stay e escritórios em São Paulo, desenvolvido durante meu estágio na Web Star Studio. Posiciona o 'padrão europeu', turnover rápido entre hóspedes e gestão de enxoval e amenities. Site bilíngue (PT/EN) com páginas de serviços, FAQ, blog com painel próprio (CMS) e SEO/GEO forte (JSON-LD, sitemap, llms.txt) pra captar anfitriões e empresas pela busca.",
      "en-US": "Website for izi Solutions — professional cleaning specialized in Airbnb, short stay and offices in São Paulo, built during my internship at Web Star Studio. It positions a 'European standard', fast turnover between guests and managed linens and amenities. A bilingual site (PT/EN) with service pages, FAQ, a blog with its own admin (CMS) and strong SEO/GEO (JSON-LD, sitemap, llms.txt) to capture hosts and companies through search.",
    },
    partner: "Web Star Studio",
    href: "https://izisolutions.com.br/",
  },
  {
    title: "Beyblade X Manager",
    images: [
      "/assets/beyblade-preview.jpg",
      "/assets/beyblade-1.jpg",
      "/assets/beyblade-2.jpg",
      "/assets/beyblade-3.jpg",
      "/assets/beyblade-4.jpg",
      "/assets/beyblade-5.jpg"
    ],
    description: {
      "pt-BR": "Projeto pessoal e despretensioso: um app mobile pra organizar as batalhas de Beyblade X entre os meus primos. Cadastro de bladers, partida 1v1 com placar ao vivo e os finishes oficiais (Spin, Over, Burst e Xtreme), além de histórico e ranking. Foi 100% vibecodado num fim de tarde, só pra ter algo divertido e funcional — nada comercial.",
      "en-US": "A casual personal project: a mobile app to organize Beyblade X battles with my cousins. Blader registration, 1v1 matches with a live scoreboard and the official finishes (Spin, Over, Burst and Xtreme), plus history and a ranking. It was 100% vibe-coded in an afternoon, just to have something fun and working — nothing commercial.",
    },
    href: "https://beyblade-x-manager.vercel.app/",
  },
] as const;

export function projectSlug(title: string): string {
  return title
    .normalize("NFD")
    // remove diacríticos (acentos) após decomposição NFD
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getProjectBySlug(slug: string): NavProjectItem | undefined {
  return navProjectItems.find((item) => projectSlug(item.title) === slug);
}

export function getProjectImages(item: NavProjectItem): string[] {
  if ("images" in item && Array.isArray(item.images)) {
    return [...item.images];
  }
  return "image" in item ? [item.image as string] : [];
}

export type { LocalizedText };
