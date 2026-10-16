import type { LocalizedText } from "@/lib/i18n";

export type NavProjectItem = (typeof allProjectItems)[number];

/** Projetos que ficam fora da vitrine (dados preservados, só não aparecem). */
const hiddenProjects: readonly string[] = ["FlyHigh", "Beyblade X Manager"];

const allProjectItems = [
  {
    title: "Dr Daniel Pianetti",
    image: "/assets/daniel-notch.png",
    description: {
      "pt-BR": "Site do urologista Dr. Daniel Pianetti (Belo Horizonte), desenvolvido durante meu estágio na Web Star Studio. Foco em cirurgia robótica Da Vinci, oncologia urológica (próstata, rim e bexiga) e HoLEP, com objeto 3D, logo animada e uma narrativa que transmite tecnologia e confiança. Tem páginas dedicadas por procedimento, blog com painel próprio (CMS), avaliações reais (Doctoralia + Google) e um chatbot — tudo com SEO/GEO pesado (JSON-LD, llms.txt) pra ranquear e ser citado por buscas e IAs.",
      "en-US": "Website for urologist Dr. Daniel Pianetti (Belo Horizonte), built during my internship at Web Star Studio. Focused on Da Vinci robotic surgery, urologic oncology (prostate, kidney and bladder) and HoLEP, with a 3D object, an animated logo and a narrative that conveys technology and trust. It has dedicated pages per procedure, a blog with its own admin (CMS), real reviews (Doctoralia + Google) and a chatbot — all with heavy SEO/GEO (JSON-LD, llms.txt) to rank and get cited by search and AI.",
    },
    partner: "Web Star Studio",
    href: "https://drdanielpianetti.com.br/",
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
      "pt-BR": "Site da Delusional, estúdio independente de web design e automação em Recife. Apresenta os serviços (sites e landing pages, lojas e marketplaces, design e automação de tarefas) com hero 3D e animação guiada pelo scroll. Pensado pra busca local, com versões em português, inglês e espanhol.",
      "en-US": "Website for Delusional, an independent web design and automation studio in Recife. It presents the services (websites and landing pages, stores and marketplaces, design and task automation) with a 3D hero and scroll-driven animation. Built for local search, with Portuguese, English and Spanish versions.",
    },
    partner: "Delusional",
    partnerLogo: "/assets/delusional-logo.png",
    partnerLogoClassName: "h-[0.95rem] w-auto object-contain",
    href: "https://delusionals.studio/",
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
    partnerLogoClassName: "h-[0.95rem] w-auto object-contain",
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
    title: "Dr Adilis da Fonte",
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
      "/assets/adilis-mobile.jpg"
    ],
    description: {
      "pt-BR": "Site do Dr. Adilis da Fonte — cirurgião de cabeça e pescoço em Recife, chefe do serviço no IMIP e com residência no INCA —, desenvolvido durante meu estágio na Web Star Studio. O posicionamento é “segurança traduzida em conduta, não em promessa”: uma experiência clínica e sóbria, em azul-petróleo com acento ciano, que explica cada etapa do cuidado — do primeiro contato ao pós-operatório. Tem páginas por especialidade (tireoide, glândulas salivares, pele, pescoço), uma área dedicada a médicos encaminhadores, depoimentos, blog com painel próprio (CMS) e agendamento direto por WhatsApp.",
      "en-US": "Website for Dr. Adilis da Fonte — a head and neck surgeon in Recife, head of the service at IMIP and trained at INCA — built during my internship at Web Star Studio. The positioning is “safety expressed as conduct, not as a promise”: a sober, clinical experience in petrol blue with a cyan accent, explaining every step of care — from first contact to post-op. It has per-specialty pages (thyroid, salivary glands, skin, neck), a section dedicated to referring physicians, testimonials, a blog with its own admin (CMS) and direct booking via WhatsApp.",
    },
    partner: "Web Star Studio",
    href: "https://dradilis.webstar.studio/",
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
    partnerLogoClassName: "h-[0.95rem] w-auto object-contain",
  },
  {
    title: "t4kena geek store",
    images: [
      "/assets/t4kena-preview.jpg",
      "/assets/t4kena-1.jpg",
      "/assets/t4kena-2.jpg"
    ],
    description: {
      "pt-BR": "Loja própria da t4kena geek store, de cartas Pokémon TCG em Recife — projeto pessoal. Catálogo com busca e filtros, coleções, lacrados, página de produto, carrinho com pedido fechado pelo WhatsApp e um painel administrativo próprio com CRUD de produtos, preço, estoque com movimentações registradas e configurações da loja. Visual ilustrado com animações em GSAP e scroll suave (Lenis).",
      "en-US": "Custom online store for t4kena geek store, a Pokémon TCG card shop in Recife — a personal project. Catalog with search and filters, collections, sealed products, product pages, a cart that closes the order via WhatsApp and a custom admin panel with product CRUD, pricing, stock movements and store settings. An illustrated look with GSAP animations and smooth scrolling (Lenis).",
    },
    href: "https://t4kena.vercel.app/",
  },
  {
    title: "Siaze",
    images: [
      "/assets/siaze-preview.jpg",
      "/assets/siaze-1.jpg"
    ],
    description: {
      "pt-BR": "Site institucional da Siaze, empresa de gestão de sinistros, assistência à saúde e prevenção de acidentes para empresas e seguradoras, desenvolvido durante meu trabalho na Web Star Studio. Páginas de serviços, prevenção, portal EAD e contato, com visual moderno de healthtech.",
      "en-US": "Institutional website for Siaze, a company handling claims management, health assistance and accident prevention for businesses and insurers, built during my work at Web Star Studio. Services, prevention, e-learning portal and contact pages, with a modern healthtech look.",
    },
    partner: "Web Star Studio",
    href: "https://siaze.com.br/",
  },
  {
    title: "Affordable Granite",
    images: [
      "/assets/granite-preview.jpg",
      "/assets/granite-1.jpg",
      "/assets/granite-2.jpg"
    ],
    description: {
      "pt-BR": "Site da Affordable Granite, empresa de bancadas em pedra e armários na Flórida (EUA), desenvolvido durante meu trabalho na Web Star Studio. Catálogo de materiais por categoria e marca, páginas de serviços e de áreas atendidas, galeria de projetos, pedido de orçamento, um visualizador com IA que aplica o material escolhido na foto do ambiente do cliente e um painel administrativo completo.",
      "en-US": "Website for Affordable Granite, a stone countertop and cabinet company in Florida (USA), built during my work at Web Star Studio. A material catalog by category and brand, service and service-area pages, a project gallery, estimate requests, an AI visualizer that applies the chosen material to a photo of the client's room and a full admin panel.",
    },
    partner: "Web Star Studio",
    href: "https://affordable-granite.webstarstudio.site/",
  },
  {
    title: "Dra Danielle Talamonti",
    images: [
      "/assets/danielle-preview.jpg",
      "/assets/danielle-1.jpg"
    ],
    description: {
      "pt-BR": "Site da coloproctologista Dra. Danielle Talamonti, desenvolvido durante meu trabalho na Web Star Studio. Home com posicionamento da médica, páginas de especialidades (doença hemorroidária e plicomas anais), sobre, blog, FAQ e contato, com painel administrativo em desenvolvimento.",
      "en-US": "Website for colorectal surgeon Dr. Danielle Talamonti, built during my work at Web Star Studio. A home presenting the doctor, specialty pages (hemorrhoidal disease and anal skin tags), about, blog, FAQ and contact, with an admin panel in development.",
    },
    partner: "Web Star Studio",
    href: "https://dradanielletalamonti.webstarstudio.site/",
  },
  {
    title: "Dra Raquel Kelner",
    images: [
      "/assets/raquel-preview.jpg",
      "/assets/raquel-1.jpg"
    ],
    description: {
      "pt-BR": "Site da proctologista e coloproctologista Dra. Raquel Kelner (Recife), desenvolvido durante meu trabalho na Web Star Studio. Páginas de condições, procedimentos, equipe, jornada do paciente, blog e agendamento, além de portal do paciente e painel administrativo.",
      "en-US": "Website for proctologist and colorectal surgeon Dr. Raquel Kelner (Recife), built during my work at Web Star Studio. Pages for conditions, procedures, team, patient journey, blog and booking, plus a patient portal and an admin panel.",
    },
    partner: "Web Star Studio",
    href: "https://draraquelkelner.com/",
  },
  {
    title: "Dr Guilherme Mendonça",
    images: [
      "/assets/guilherme-mendonca-preview.jpg",
      "/assets/guilherme-mendonca-1.jpg"
    ],
    description: {
      "pt-BR": "Site do cirurgião torácico Dr. Guilherme Mendonça (Arcoverde e Recife), desenvolvido durante meu trabalho na Web Star Studio. Páginas por especialidade (nódulo e câncer de pulmão, cirurgia robótica, derrame pleural, hiperidrose, broncoscopia e traqueoscopia), sobre, blog, FAQ e contato, com painel administrativo próprio.",
      "en-US": "Website for thoracic surgeon Dr. Guilherme Mendonça (Arcoverde and Recife), built during my work at Web Star Studio. Pages per specialty (lung nodules and cancer, robotic surgery, pleural effusion, hyperhidrosis, bronchoscopy and tracheostomy), about, blog, FAQ and contact, with its own admin panel.",
    },
    partner: "Web Star Studio",
    href: "https://drguilhermemendonca.com.br/",
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
    partnerLogoClassName: "h-[0.95rem] w-auto object-contain",
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

/** Lista exibida em todo o site (vitrine, /projetos e navegação entre projetos). */
export const navProjectItems: readonly NavProjectItem[] = allProjectItems.filter(
  (item) => !hiddenProjects.includes(item.title),
);

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
