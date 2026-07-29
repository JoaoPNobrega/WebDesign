import { type SVGProps, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { Cloud, ExternalLink, Mail, Menu, Monitor, Server, X, type LucideIcon } from "lucide-react";

import DestructionSection from "@/components/DestructionSection";
import CvModal from "@/components/ui/CvModal";
import { projectSlug } from "@/lib/projects";
import TagSphere, { type Accent } from "@/components/ui/TagSphere";
import { useLang, type LocalizedText } from "@/lib/i18n";
import { copy } from "@/lib/portfolio-copy";
import type { SiteLanguage } from "@/lib/site-language";

// ── Constants ────────────────────────────────────────────────────────────────
const GITHUB_URL = "https://github.com/JoaoPNobrega";
const CV_PDF_URL = "/curriculo-joao-pedro.pdf";
const CV_DOWNLOAD_NAME = "Curriculo_Joao_Pedro.pdf";
const HERO_BG_IMAGE = "/assets/joao-pedro-about-clean.webp";

const PARTNER_URLS: Record<string, string> = {
  "Web Star Studio": "https://www.webstar.studio/",
  "CESAR School": "https://www.cesar.school/",
  "Delusional": "https://delusionalstudio.vercel.app/",
};

const L = (pt: string, en: string): LocalizedText => ({ "pt-BR": pt, "en-US": en });

// ── ShinyIcon ─────────────────────────────────────────────────────────────────
const CV_ICON_MASK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/%3E%3Cpolyline points='14 2 14 8 20 8'/%3E%3Cline x1='16' y1='13' x2='8' y2='13'/%3E%3Cline x1='16' y1='17' x2='8' y2='17'/%3E%3Cpolyline points='10 9 9 9 8 9'/%3E%3C/svg%3E")`;
const LANG_ICON_MASK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cline x1='2' y1='12' x2='22' y2='12'/%3E%3Cpath d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'/%3E%3C/svg%3E")`;

function ShinyIcon({ maskUrl, size = 18, speed = "2.6s" }: { maskUrl: string; size?: number; speed?: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block flex-shrink-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.54)_0%,rgba(255,255,255,0.96)_38%,rgba(167,239,158,0.92)_50%,rgba(255,255,255,0.96)_62%,rgba(255,255,255,0.54)_100%)] bg-[length:240%_100%] motion-safe:animate-[shiny-text_var(--shiny-speed)_linear_infinite]"
      style={{
        width: size,
        height: size,
        WebkitMaskImage: maskUrl,
        maskImage: maskUrl,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        "--shiny-speed": speed,
      } as React.CSSProperties}
    />
  );
}

// ── SVG marks ─────────────────────────────────────────────────────────────────
function GithubMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .7C5.74.7.66 5.78.66 12.04c0 5.01 3.25 9.26 7.76 10.76.57.1.78-.25.78-.55v-2c-3.16.69-3.83-1.36-3.83-1.36-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.66 1.23 3.31.94.1-.73.4-1.23.72-1.52-2.52-.29-5.17-1.26-5.17-5.61 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.44.11-3 0 0 .96-.31 3.13 1.16.91-.25 1.88-.38 2.85-.38s1.94.13 2.85.38c2.17-1.47 3.13-1.16 3.13-1.16.62 1.56.23 2.71.11 3 .73.79 1.17 1.8 1.17 3.04 0 4.36-2.65 5.32-5.18 5.6.41.35.77 1.04.77 2.1v3.11c0 .31.21.66.78.55a11.35 11.35 0 0 0 7.76-10.76C23.34 5.78 18.26.7 12 .7Z" />
    </svg>
  );
}

function LinkedinMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

const contactItems = [
  { label: "GitHub", icon: GithubMark, href: GITHUB_URL },
  { label: "LinkedIn", icon: LinkedinMark, href: "https://linkedin.com/in/joaopedro-nobrega" },
  { label: "Email", icon: Mail, href: "mailto:jpan@cesar.school" },
] as const;

// ── Data ──────────────────────────────────────────────────────────────────────
type Project = {
  title: string;
  image: string;
  description: LocalizedText;
  href?: string;
  ctaLabel?: string;
  partner?: string;
  partnerLogo?: string;
};

const projects: Project[] = [
  {
    title: "Dr Daniel Pianetti",
    image: "/assets/daniel-notch.png",
    description: L(
      "Site do urologista Dr. Daniel Pianetti (Belo Horizonte), desenvolvido durante meu estágio na Web Star Studio. Foco em cirurgia robótica Da Vinci, oncologia urológica (próstata, rim e bexiga) e HoLEP, com objeto 3D, logo animada e uma narrativa que transmite tecnologia e confiança. Tem páginas dedicadas por procedimento, blog com painel próprio (CMS), avaliações reais (Doctoralia + Google) e um chatbot — tudo com SEO/GEO pesado (JSON-LD, llms.txt) pra ranquear e ser citado por buscas e IAs.",
      "Website for urologist Dr. Daniel Pianetti (Belo Horizonte), built during my internship at Web Star Studio. Focused on Da Vinci robotic surgery, urologic oncology (prostate, kidney and bladder) and HoLEP, with a 3D object, an animated logo and a narrative that conveys technology and trust. It has dedicated pages per procedure, a blog with its own admin (CMS), real reviews (Doctoralia + Google) and a chatbot — all with heavy SEO/GEO (JSON-LD, llms.txt) to rank and get cited by search and AI.",
    ),
    partner: "Web Star Studio",
    href: "https://daniel.webstar.studio/",
  },
  {
    title: "Delusional Studio",
    image: "/assets/delusional-studio-preview.jpg",
    description: L(
      "Site-vitrine da Delusional — agência digital independente de web design e automação com IA. Funciona como uma ponte com o cliente: em vez de depender de busca, é a peça que a equipe mostra pessoalmente ou em anúncio pra provar, em segundos, que o estúdio existe e entrega. Visual brutalista com hero 3D (Three.js), tipografia condensada e acento roxo, organizado em três frentes — Web, Design e Automação — com a vitrine dos trabalhos do time. Site estático rápido, publicado na Vercel pra ser compartilhado por link.",
      "Showcase site for Delusional — an independent digital agency for web design and AI automation. It works as a bridge to the client: instead of relying on search, it's the piece the team shows in person or in an ad to prove, in seconds, that the studio exists and delivers. A brutalist look with a 3D hero (Three.js), condensed type and a purple accent, organized around three fronts — Web, Design and Automation — with a showcase of the team's work. A fast static site, deployed on Vercel to be shared as a link.",
    ),
    partner: "Delusional",
    partnerLogo: "/assets/delusional-logo.png",
    href: "https://delusionalstudio.vercel.app/",
  },
  {
    title: "Filipe Regueira",
    image: "/assets/filipe-preview.jpg",
    description: L(
      "Site de autoridade do professor Filipe Regueira — promotor de justiça, autor e pesquisador em criminologia, política criminal e segurança pública. Direção visual “Tinta & Latão”: fundo quase-preto, acento em latão e tipografia serifada, pensada pra sustentar leitura longa sem cansar. Reúne os dois livros (com página própria pra “Balbúrdia Penal”), artigos publicados na imprensa, palestras filtráveis por tema, aparições na mídia e trajetória — mais um painel administrativo próprio onde ele mesmo publica conteúdo e acompanha os números do site.",
      "Authority site for professor Filipe Regueira — public prosecutor, author and researcher in criminology, criminal policy and public safety. An “Ink & Brass” visual direction: near-black background, a brass accent and serif type, designed to hold long-form reading without fatigue. It gathers both books (with a dedicated page for “Balbúrdia Penal”), articles published in the press, talks filterable by topic, media appearances and his background — plus a custom admin panel where he publishes content himself and follows the site's numbers.",
    ),
    partner: "Delusional",
    partnerLogo: "/assets/delusional-logo.png",
    href: "https://professorfiliperegueira.com.br/",
  },
  {
    title: "Dr Adilis da Fonte",
    image: "/assets/adilis-preview.jpg",
    description: L(
      "Site do Dr. Adilis da Fonte — cirurgião de cabeça e pescoço em Recife, chefe do serviço no IMIP e com residência no INCA —, desenvolvido durante meu estágio na Web Star Studio. O posicionamento é “segurança traduzida em conduta, não em promessa”: uma experiência clínica e sóbria, em azul-petróleo com acento ciano, que explica cada etapa do cuidado — do primeiro contato ao pós-operatório. Tem páginas por especialidade (tireoide, glândulas salivares, pele, pescoço), uma área dedicada a médicos encaminhadores, depoimentos, blog com painel próprio (CMS) e agendamento direto por WhatsApp.",
      "Website for Dr. Adilis da Fonte — a head and neck surgeon in Recife, head of the service at IMIP and trained at INCA — built during my internship at Web Star Studio. The positioning is “safety expressed as conduct, not as a promise”: a sober, clinical experience in petrol blue with a cyan accent, explaining every step of care — from first contact to post-op. It has per-specialty pages (thyroid, salivary glands, skin, neck), a section dedicated to referring physicians, testimonials, a blog with its own admin (CMS) and direct booking via WhatsApp.",
    ),
    partner: "Web Star Studio",
    href: "https://dradilis.webstar.studio/",
  },
  {
    title: "Keeping House",
    image: "/assets/keepinghouse-hero.jpg",
    description: L(
      "Plataforma/marketplace de serviços domésticos da Keeping House: conecta famílias a diaristas, babás, cuidadoras, governantas e mais — com busca por CEP e categoria, perfis avaliados, planos de assinatura, vagas, um Concierge premium de curadoria e áreas logadas para contratante, profissional e administrador.",
      "Domestic-services marketplace for Keeping House: connects families with house cleaners, nannies, caregivers, housekeepers and more — with CEP + category search, reviewed profiles, subscription plans, job postings, a premium curated Concierge and logged-in areas for clients, professionals and admins.",
    ),
    href: "https://keepinghouse.com.br/",
  },
  {
    title: "PetFeeder",
    image: "/assets/petfeeder-preview.webp",
    description: L(
      "Alimentador automático inteligente para pets, desenvolvido com ESP32, sensores e atuadores. O projeto integra um dashboard web em tempo real via Firebase, controle local por Access Point e API Gemini para sugerir rotinas de alimentação personalizadas.",
      "A smart automatic pet feeder built with ESP32, sensors and actuators. The project integrates a real-time web dashboard via Firebase, local control through an Access Point and the Gemini API to suggest personalized feeding routines.",
    ),
    href: "https://github.com/JoaoPNobrega/PetFeeder-Front",
    ctaLabel: "GitHub",
    partner: "CESAR School",
    partnerLogo: "/assets/cesar-school-logo.png",
  },
  {
    title: "Dr Cristiano Berardo",
    image: "/assets/drcristiano-preview.jpg",
    description: L(
      "Landing page institucional para o cirurgião cardiovascular Dr. Cristiano Berardo, desenvolvida durante meu estágio na Web Star Studio. Um site premium que transmite autoridade médica, trajetória acadêmica e cuidado humanizado para pacientes e médicos.",
      "Institutional landing page for cardiovascular surgeon Dr. Cristiano Berardo, built during my internship at Web Star Studio. A premium site conveying medical authority, academic background and humanized care for patients and physicians.",
    ),
    partner: "Web Star Studio",
    href: "https://drcristiano.webstar.studio",
  },
  {
    title: "Delulu Painel",
    image: "/assets/delulu-empresa.jpg",
    description: L(
      "Plataforma interna da Delusional (estúdio de desenvolvimento web freelance) para organizar e dar suporte a todo o time: distribuição de projetos, divisão de ganhos por membro, Kanban pessoal, cofre de contratos e monitoramento de uptime dos sites dos clientes. Estética Neumorphism (Soft UI), com login por papéis (dono/PO/membro).",
      "Internal platform for Delusional (a freelance web-dev studio) to organize and support the whole team: project distribution, per-member earnings split, a personal Kanban, a contracts vault and uptime monitoring of clients' sites. A Neumorphism (Soft UI) aesthetic, with role-based login (owner/PO/member).",
    ),
    partner: "Delusional",
    partnerLogo: "/assets/delusional-logo.png",
    href: "https://delulu-painel.vercel.app/",
  },
  {
    title: "Ines Knoden",
    image: "/assets/ines-preview.png",
    description: L(
      "Site da Inês Knoden — Wellness & Career Coach em Lisboa, desenvolvido durante meu estágio na Web Star Studio. Voltado a mulheres (sobretudo francófonas) sobrecarregadas que buscam energia, equilíbrio e clareza profissional, a experiência transmite serenidade e acolhimento — convida a respirar e desacelerar. Identidade suave e madura (paleta coral/pêssego, tipografia serifada com toques manuscritos), com páginas de programas, sobre e contato e estrutura bilíngue (PT/FR).",
      "Website for Inês Knoden — Wellness & Career Coach in Lisbon, built during my internship at Web Star Studio. Aimed at (mostly francophone) overwhelmed women seeking energy, balance and career clarity, the experience conveys serenity and warmth — inviting you to breathe and slow down. A soft, mature identity (coral/peach palette, serif type with handwritten touches), with programs, about and contact pages and a bilingual structure (PT/FR).",
    ),
    partner: "Web Star Studio",
    href: "https://ines.webstarstudio.site/",
  },
  {
    title: "Stephanie Bolsoni",
    image: "/assets/stephanie-bolsoni.jpg",
    description: L(
      "Site da nutricionista Stephanie Bolsoni, desenvolvido durante meu estágio na Web Star Studio. Nutrição personalizada e baseada em ciência para mulheres, com atendimento presencial em Dublin e online — foco em emagrecimento e saúde metabólica. Reúne avaliações reais sincronizadas do Doctify e do Google, galeria do consultório, agendamento e um blog com painel próprio (CMS) pra publicar conteúdo, tudo numa experiência premium e bem animada.",
      "Website for nutritionist Stephanie Bolsoni, built during my internship at Web Star Studio. Personalized, science-based nutrition for women, with in-person care in Dublin and online — focused on weight loss and metabolic health. It brings together real reviews synced from Doctify and Google, a clinic gallery, booking and a blog with its own admin (CMS) to publish content, all in a premium, highly animated experience.",
    ),
    partner: "Web Star Studio",
    href: "https://stephaniebolsoni.com/",
  },
  {
    title: "Dr Guilherme Maia",
    image: "/assets/dr-guilherme-preview.jpg",
    description: L(
      "Site do urologista Dr. Guilherme Maia (Recife) — meu primeiro projeto no estágio na Web Star Studio. Landing médica com foco em storytelling e autoridade: cirurgia robótica Da Vinci, câncer de próstata, próstata aumentada (HPB) e vasectomia sem bisturi, destacando a trajetória (chefe de Urologia do IMIP, fellowship na França, pioneiro da cirurgia robótica no Recife) e um blog educativo. Simples e clara, feita pra transmitir confiança e gerar agendamento.",
      "Website for urologist Dr. Guilherme Maia (Recife) — my first project during the Web Star Studio internship. A medical landing focused on storytelling and authority: Da Vinci robotic surgery, prostate cancer, enlarged prostate (BPH) and no-scalpel vasectomy, highlighting his background (Head of Urology at IMIP, a fellowship in France, a pioneer of robotic surgery in Recife) and an educational blog. Simple and clear, built to convey trust and drive bookings.",
    ),
    partner: "Web Star Studio",
    href: "https://drguilhermemaia.com.br/",
  },
  {
    title: "Mirela Albuquerque",
    image: "/assets/mirela-preview.jpg",
    description: L(
      "Site da Dra. Mirela Albuquerque — médica tricologista em Recife (Clínica Aevum, no Pina), desenvolvido durante meu estágio na Web Star Studio. Especializada em saúde capilar: queda de cabelo, alopecias e calvície, com tricoscopia digital e laudo por IA, protocolos médicos individualizados e transplante capilar e de sobrancelhas. Estética editorial sofisticada em tons terrosos, com seções por tratamento e procedimento, FAQ, agendamento e um blog com painel próprio (CMS).",
      "Website for Dr. Mirela Albuquerque — a trichologist in Recife (Aevum Clinic, Pina), built during my internship at Web Star Studio. Specialized in hair health: hair loss, alopecias and balding, with digital trichoscopy and AI-assisted reports, individualized medical protocols and hair and eyebrow transplants. A sophisticated editorial look in earthy tones, with sections per treatment and procedure, FAQ, booking and a blog with its own admin (CMS).",
    ),
    partner: "Web Star Studio",
    href: "https://dramirelaalbuquerque.com.br/",
  },
  {
    title: "Dr Dimas Antunes",
    image: "/assets/dimas-preview.png",
    description: L(
      "Site do urologista e andrologista Dr. Dimas Antunes (clínica CURAR, Recife), desenvolvido durante meu estágio na Web Star Studio. Conceito 'The Clinical Curator': uma experiência editorial premium — discreta, autoritativa e tecnológica — que destaca a autoridade acadêmica (formação internacional, docência e SBU) e a urologia de ponta para a saúde do homem. Layout assimétrico com scrollytelling, glassmorphism e bento grid, logo animada com morph (GSAP) e acabamento de revista científica.",
      "Website for urologist and andrologist Dr. Dimas Antunes (CURAR clinic, Recife), built during my internship at Web Star Studio. A 'Clinical Curator' concept: a premium editorial experience — discreet, authoritative and technological — highlighting his academic authority (international training, teaching and the Brazilian Urology Society) and advanced urology for men's health. An asymmetric scrollytelling layout with glassmorphism and a bento grid, an animated morphing logo (GSAP) and a scientific-journal finish.",
    ),
    partner: "Web Star Studio",
    href: "https://dimas.webstarstudio.site/",
  },
  {
    title: "Izi Solutions",
    image: "/assets/izi-solutions-preview.png",
    description: L(
      "Site da izi Solutions — limpeza profissional especializada em Airbnb, short stay e escritórios em São Paulo, desenvolvido durante meu estágio na Web Star Studio. Posiciona o 'padrão europeu', turnover rápido entre hóspedes e gestão de enxoval e amenities. Site bilíngue (PT/EN) com páginas de serviços, FAQ, blog com painel próprio (CMS) e SEO/GEO forte (JSON-LD, sitemap, llms.txt) pra captar anfitriões e empresas pela busca.",
      "Website for izi Solutions — professional cleaning specialized in Airbnb, short stay and offices in São Paulo, built during my internship at Web Star Studio. It positions a 'European standard', fast turnover between guests and managed linens and amenities. A bilingual site (PT/EN) with service pages, FAQ, a blog with its own admin (CMS) and strong SEO/GEO (JSON-LD, sitemap, llms.txt) to capture hosts and companies through search.",
    ),
    partner: "Web Star Studio",
    href: "https://izisolutions.com.br/",
  },
];

const workHistory: {
  role: LocalizedText;
  company: LocalizedText;
  period: LocalizedText;
  description: LocalizedText;
  isCurrent: boolean;
}[] = [
  {
    isCurrent: true,
    role: L("Desenvolvedor full stack", "Full stack developer"),
    company: L("Web Star Studio · Estágio", "Web Star Studio · Internship"),
    period: L("Fevereiro 2026 — Hoje", "February 2026 — Present"),
    description: L(
      "Desenvolvimento e manutenção de sites, com foco em layouts responsivos, front-end e identidade visual.",
      "Building and maintaining websites, focused on responsive layouts, front-end and visual identity.",
    ),
  },
  {
    isCurrent: true,
    role: L("Desenvolvedor web freelancer", "Freelance web developer"),
    company: L("Autônomo", "Self-employed"),
    period: L("Abril 2026 — Hoje", "April 2026 — Present"),
    description: L(
      "Criação de sites e landing pages sob demanda para clientes, do briefing à entrega — direção visual, front-end e acabamento.",
      "Building websites and landing pages on demand for clients, from briefing to delivery — visual direction, front-end and polish.",
    ),
  },
  {
    isCurrent: false,
    role: L("Desenvolvedor de software", "Software developer"),
    company: L("AJ Soluções & Sistemas · Estágio", "AJ Soluções & Sistemas · Internship"),
    period: L("Setembro — Dezembro 2025", "September — December 2025"),
    description: L(
      "Desenvolvimento de software, automações N8N e planilhas VBA.",
      "Software development, N8N automations and VBA spreadsheets.",
    ),
  },
];

const educationInfo = {
  degree: L("Bacharelado em Ciência da Computação", "Bachelor's in Computer Science"),
  school: "CESAR School",
  location: L("Recife, PE · Brasil", "Recife, PE · Brazil"),
  period: L("2022 — em andamento", "2022 — in progress"),
};

const spokenLanguages: { name: LocalizedText; level: LocalizedText }[] = [
  { name: L("Português", "Portuguese"), level: L("Nativo", "Native") },
  { name: L("Inglês", "English"), level: L("Avançado", "Advanced") },
];

const skillGroups: { key: string; label: string; icon: LucideIcon; items: string[] }[] = [
  {
    key: "frontend",
    label: "Frontend",
    icon: Monitor,
    items: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "Figma", "Dashboards"],
  },
  {
    key: "backend",
    label: "Backend",
    icon: Server,
    items: ["Node.js", "Python", "REST APIs", "Firebase", "Machine Learning", "Arquitetura de Software", "Testes Automatizados", "TDD", "BDD"],
  },
  {
    key: "devops",
    label: "Tools",
    icon: Cloud,
    items: ["AWS", "Cloud", "Git", "Vite", "IoT", "n8n", "Power Automate", "Lovable", "Claude Code", "Codex", "Antigravity", "Scrum", "Kanban", "Metodologias Ágeis", "BPM", "LGPD"],
  },
];

const MINT_ACCENT: Accent = {
  color: "#A7EF9E",
  tagBg: "rgba(167,239,158,0.07)",
  tagBorder: "rgba(167,239,158,0.26)",
  tagText: "#BFF3B6",
  line: "#A7EF9E",
};

// ── Utils ─────────────────────────────────────────────────────────────────────
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function MobileNav({ onOpenCv }: { onOpenCv: () => void }) {
  const { tx, lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const cvRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (cvRef.current && !cvRef.current.contains(e.target as Node)) setCvOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks: { id: string; label: LocalizedText }[] = [
    { id: "about", label: copy.about.eyebrow },
    { id: "projects", label: copy.nav.projects },
    { id: "skills", label: copy.skills.eyebrow },
    { id: "experience", label: copy.experience.title },
    { id: "education", label: copy.education.eyebrow },
    { id: "contact", label: copy.nav.contact },
  ];

  const go = (id: string) => {
    setMenuOpen(false);
    window.requestAnimationFrame(() => scrollToId(id));
  };

  const langOptions: { value: SiteLanguage; label: string }[] = [
    { value: "pt-BR", label: "PT-BR" },
    { value: "en-US", label: "EN" },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#050505]/85 backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between px-5">
          <button
            type="button"
            onClick={() => scrollToId("top")}
            className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white"
          >
            JP<span className="text-[#A7EF9E]">N</span>
          </button>

          <div className="flex items-center gap-1">
            {/* CV dropdown */}
            <div ref={cvRef} className="relative">
              <button
                type="button"
                onClick={() => { setCvOpen((v) => !v); setLangOpen(false); }}
                aria-label="Currículo"
                aria-expanded={cvOpen}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition active:scale-95 ${
                  cvOpen ? "border-[#A7EF9E]/45 bg-[#A7EF9E]/[0.08]" : "border-white/12 bg-white/[0.04]"
                }`}
              >
                <ShinyIcon maskUrl={CV_ICON_MASK} size={17} />
              </button>

              <AnimatePresence>
                {cvOpen && (
                  <motion.div
                    key="cv-dropdown"
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-[calc(100%+8px)] z-50 w-40 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0f0f0f]/95 shadow-[0_16px_48px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
                  >
                    <button
                      type="button"
                      onClick={() => { setCvOpen(false); onOpenCv(); }}
                      className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-sm font-semibold text-white/85 transition hover:bg-white/[0.06] active:bg-white/[0.09]"
                    >
                      <ExternalLink size={14} className="text-[#A7EF9E]" aria-hidden="true" />
                      {tx(copy.nav.cvOpen)}
                    </button>
                    <div className="mx-3 h-px bg-white/[0.06]" />
                    <a
                      href={CV_PDF_URL}
                      download={CV_DOWNLOAD_NAME}
                      onClick={() => setCvOpen(false)}
                      className="flex w-full items-center gap-2.5 px-4 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/[0.06] active:bg-white/[0.09]"
                    >
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#A7EF9E" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      {tx(copy.nav.cvDownload)}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Lang dropdown */}
            <div ref={langRef} className="relative">
              <button
                type="button"
                onClick={() => { setLangOpen((v) => !v); setCvOpen(false); }}
                aria-label={tx(copy.language.label)}
                aria-expanded={langOpen}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition active:scale-95 ${
                  langOpen ? "border-[#A7EF9E]/45 bg-[#A7EF9E]/[0.08]" : "border-white/12 bg-white/[0.04]"
                }`}
              >
                <ShinyIcon maskUrl={LANG_ICON_MASK} size={17} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    key="lang-dropdown"
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0f0f0f]/95 p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
                  >
                    <LayoutGroup id="mobile-lang-pill">
                      <div className="flex flex-col gap-0.5">
                        {langOptions.map((opt) => {
                          const on = lang === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => { setLang(opt.value); setLangOpen(false); }}
                              aria-pressed={on}
                              className="relative flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left transition"
                            >
                              {on && (
                                <motion.span
                                  layoutId="mobile-lang-active-pill"
                                  className="absolute inset-0 rounded-xl bg-[#A7EF9E]/[0.12]"
                                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                              )}
                              <span className={`relative z-10 font-mono text-[0.7rem] font-bold tracking-[0.14em] ${on ? "text-[#A7EF9E]" : "text-white/50"}`}>
                                {opt.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </LayoutGroup>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => { setMenuOpen(true); setCvOpen(false); setLangOpen(false); }}
              aria-label="Abrir menu"
              className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/85 transition active:scale-95"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#050505]/96 backdrop-blur-2xl"
          >
            <div className="flex h-14 items-center justify-between px-5">
              <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-[#A7EF9E]">
                {tx(L("Menu", "Menu"))}
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/85 active:scale-95"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex min-h-0 flex-1 flex-col justify-center gap-0 overflow-y-auto px-7">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  type="button"
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.38, delay: 0.04 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => go(link.id)}
                  className="border-b border-white/[0.06] py-4 text-left text-[1.8rem] font-extrabold uppercase leading-none tracking-[-0.005em] text-white/90 transition active:text-[#A7EF9E]"
                >
                  {tx(link.label)}
                </motion.button>
              ))}
            </nav>

            <div className="px-7 pb-10 pt-4">
              <div className="mb-4 flex gap-2.5">
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); onOpenCv(); }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#A7EF9E] py-3.5 text-sm font-black uppercase tracking-[0.16em] text-[#050505] active:scale-[0.98]"
                >
                  {tx(copy.nav.cvOpen)}
                </button>
                <a
                  href={CV_PDF_URL}
                  download={CV_DOWNLOAD_NAME}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] py-3.5 text-sm font-black uppercase tracking-[0.16em] text-white/85 active:scale-[0.98]"
                >
                  {tx(copy.nav.cvDownload)}
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                      aria-label={item.label}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06] text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition active:bg-[#A7EF9E]/[0.16] active:text-[#A7EF9E]"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Section heading ────────────────────────────────────────────────────────────
function SectionHeading({ eyebrow, title }: { eyebrow: LocalizedText; title: LocalizedText }) {
  const { tx } = useLang();
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-9 text-center"
    >
      <p className="mb-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-[#A7EF9E]">
        {tx(eyebrow)}
      </p>
      <h2 className="text-[2rem] font-extrabold uppercase leading-[0.95] tracking-[-0.01em] text-white">
        {tx(title)}
      </h2>
    </motion.div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function MobileHero({ onOpenCv }: { onOpenCv: () => void }) {
  const { tx } = useLang();
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {/* Full-bleed background photo */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_BG_IMAGE}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-[center_18%]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.38)_0%,rgba(5,5,5,0.12)_38%,rgba(5,5,5,0.72)_68%,rgba(5,5,5,0.96)_100%)]" />
      </div>

      {/* Corner brackets */}
      <span className="pointer-events-none absolute left-5 top-20 h-7 w-7 rounded-tl-lg border-l-2 border-t-2 border-[#A7EF9E]/50" />
      <span className="pointer-events-none absolute right-5 top-20 h-7 w-7 rounded-tr-lg border-r-2 border-t-2 border-[#A7EF9E]/50" />

      {/* Floating badge */}
      <span className="absolute bottom-[calc(100%-52svh)] right-5 inline-flex items-center gap-1.5 font-mono text-[0.52rem] font-medium uppercase tracking-[0.28em] text-white/55">
        <span className="h-1.5 w-1.5 rounded-full bg-[#A7EF9E]" />
        {tx(copy.hero.badgeLocation)}
      </span>

      {/* Text block anchored to bottom */}
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative px-6 pb-10 pt-8"
      >
        <p className="mb-3 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-white/55">
          {tx(copy.hero.eyebrow)}
        </p>
        <h1
          className="text-[2.55rem] font-medium leading-[0.97] tracking-[-0.04em] text-white"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {tx(copy.hero.intro)}
        </h1>
        <p className="mt-3 text-base font-light uppercase tracking-[0.3em] text-white/70">
          {tx(copy.hero.roleTitle)}
        </p>
        <p className="mt-5 text-[0.92rem] leading-7 text-white/68">{tx(copy.hero.panelBody)}</p>

        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={onOpenCv}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#A7EF9E] py-4 text-[0.75rem] font-black uppercase tracking-[0.16em] text-[#050505] shadow-[0_16px_44px_rgba(167,239,158,0.26)] active:scale-[0.98]"
          >
            {tx(copy.hero.resumeCta)}
          </button>
          <button
            type="button"
            onClick={() => scrollToId("contact")}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] py-4 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm active:scale-[0.98]"
          >
            {tx(copy.hero.contactCta)}
          </button>
        </div>
      </motion.div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function MobileAbout() {
  const { tx } = useLang();
  return (
    <section id="about" className="scroll-mt-20 px-6 py-20">
      <SectionHeading eyebrow={copy.about.eyebrow} title={copy.about.title} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="mx-auto max-w-prose text-center"
      >
        <p className="text-[0.98rem] leading-7 text-white/70">{tx(copy.about.paragraphOne)}</p>
        <p className="mt-5 text-sm leading-7 text-white/50">{tx(copy.about.paragraphTwo)}</p>
      </motion.div>
    </section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { tx } = useLang();
  const partnerUrl = project.partner ? PARTNER_URLS[project.partner] : undefined;
  const partnerLogo = project.partnerLogo ?? "/assets/webstar-logo-white.png";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: Math.min(index, 3) * 0.05, ease: "easeOut" }}
      className="overflow-hidden rounded-[1.25rem] border border-white/[0.06] bg-white/[0.03]"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={project.image}
          alt={`${tx(copy.projects.thumbAlt)} ${project.title}`}
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0)_55%,rgba(5,5,5,0.55)_100%)]" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-extrabold uppercase leading-tight tracking-[-0.005em] text-white">
            {project.title}
          </h3>
          {project.partner && partnerUrl ? (
            <a
              href={partnerUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full bg-white/[0.05] px-2.5 ring-1 ring-white/10 active:ring-[#A7EF9E]/45"
              title={`${tx(copy.projects.partnership)} ${project.partner}`}
            >
              <img src={partnerLogo} alt={project.partner} className="h-3 w-auto object-contain" loading="lazy" />
            </a>
          ) : null}
        </div>
        <p className="mt-2.5 text-[0.85rem] leading-6 text-white/55">{tx(project.description)}</p>
        <a
          href={`/projetos/${projectSlug(project.title)}`}
          className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white py-2 text-[0.7rem] font-black uppercase tracking-[0.16em] text-black transition active:bg-[#A7EF9E]"
        >
          {tx(copy.projects.learnMore)}
        </a>
      </div>
    </motion.article>
  );
}

function MobileProjects() {
  const { tx } = useLang();

  return (
    <section id="projects" className="scroll-mt-20 px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-9 text-center text-[2rem] font-bold leading-[1.05] tracking-[-0.04em] text-white"
      >
        {tx(copy.projects.headingLead)}{" "}
        <span className="text-[#A7EF9E]">{tx(copy.projects.headingAccent)}</span>
      </motion.h2>
      <div className="flex flex-col gap-5">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────
function MobileSkills() {
  const { tx, lang } = useLang();
  const [active, setActive] = useState(0);
  const group = skillGroups[active];

  return (
    <section id="skills" className="scroll-mt-20 px-6 py-20">
      <SectionHeading eyebrow={copy.skills.eyebrow} title={copy.skills.title} />
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto -mt-5 mb-7 max-w-prose text-center text-[0.9rem] leading-6 text-white/55"
      >
        {tx(copy.skills.subtitle)}
      </motion.p>

      <div className="flex rounded-2xl border border-white/10 bg-white/[0.03] p-1">
        {skillGroups.map((g, i) => {
          const Icon = g.icon;
          const on = i === active;
          return (
            <button
              key={g.key}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(i)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.08em] transition ${
                on ? "bg-[#A7EF9E] text-[#050505] shadow-[0_0_22px_rgba(167,239,158,0.32)]" : "text-white/50 active:text-white/80"
              }`}
            >
              <Icon size={14} className={on ? "text-[#050505]" : "text-white/35"} aria-hidden="true" />
              {g.label}
            </button>
          );
        })}
      </div>

      <div className="mt-1 w-full">
        <TagSphere
          key={group.key}
          tags={group.items}
          accent={MINT_ACCENT}
          label={`${group.label} ${lang === "pt-BR" ? "habilidades" : "skills"}`}
        />
      </div>

      <ul className="sr-only">
        {skillGroups.map((g) => (
          <li key={g.key}>{g.label}: {g.items.join(", ")}</li>
        ))}
      </ul>
    </section>
  );
}

// ── Experience ────────────────────────────────────────────────────────────────
function ExpCard({ item, current }: { item: (typeof workHistory)[number]; current: boolean }) {
  const { tx } = useLang();
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-[12px] p-6 ${current ? "bg-white/[0.055]" : "bg-white/[0.025]"}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          current ? "bg-[radial-gradient(circle_at_16%_12%,rgba(167,239,158,0.16),transparent_40%)]" : ""
        }`}
      />
      <div className="relative z-10">
        <p className={`font-mono text-[0.66rem] font-semibold uppercase tracking-[0.22em] ${current ? "text-[#A7EF9E]" : "text-white/45"}`}>
          {tx(item.company)}
        </p>
        <p className={`mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] ${current ? "text-white/55" : "text-white/38"}`}>
          {tx(item.period)}
        </p>
        <h3
          className={`mt-4 leading-tight tracking-[-0.02em] ${current ? "text-xl text-white" : "text-lg text-white/55"}`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {tx(item.role)}
        </h3>
        <p className={`mt-2.5 text-[0.85rem] leading-6 ${current ? "text-white/70" : "text-white/45"}`}>
          {tx(item.description)}
        </p>
      </div>
    </motion.article>
  );
}

function MobileExperience() {
  const { tx } = useLang();
  const reduce = useReducedMotion() ?? false;
  const current = workHistory.filter((w) => w.isCurrent);
  const past = workHistory.filter((w) => !w.isCurrent);

  return (
    <section id="experience" className="scroll-mt-20 px-6 py-20">
      <SectionHeading eyebrow={copy.experience.eyebrow} title={copy.experience.title} />

      <div className="mb-5 flex items-center justify-center gap-2">
        <span className="relative inline-flex h-1.5 w-1.5" aria-hidden="true">
          {!reduce && (
            <motion.span
              className="absolute inset-0 rounded-full bg-[#A7EF9E]"
              animate={{ scale: [1, 2.4, 1], opacity: [0.55, 0, 0.55] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <span className="relative h-1.5 w-1.5 rounded-full bg-[#A7EF9E] shadow-[0_0_8px_rgba(167,239,158,0.75)]" />
        </span>
        <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-[#A7EF9E]">
          {tx(copy.experience.statusLive)}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {current.map((item) => (
          <ExpCard key={item.company["pt-BR"]} item={item} current />
        ))}
      </div>

      {past.length > 0 && (
        <>
          <p className="mb-5 mt-12 text-center font-mono text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-white/35">
            {tx(copy.experience.pastGroup)}
          </p>
          <div className="flex flex-col gap-4">
            {past.map((item) => (
              <ExpCard key={item.company["pt-BR"]} item={item} current={false} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

// ── Education ─────────────────────────────────────────────────────────────────
function MobileEducation() {
  const { tx } = useLang();
  return (
    <section id="education" className="scroll-mt-20 px-6 py-20">
      <SectionHeading eyebrow={copy.education.eyebrow} title={copy.education.title} />

      <div className="flex flex-col gap-5">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[12px] bg-white/[0.055] p-6"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(167,239,158,0.16),transparent_38%)]" />
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-3">
              <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[#A7EF9E]">
                {tx(copy.education.educationLabel)}
              </p>
              <img src="/assets/cesar-school-logo.png" alt="CESAR School" className="h-6 w-auto object-contain opacity-85" loading="lazy" />
            </div>
            <h3 className="mt-5 text-xl font-bold leading-tight tracking-[-0.02em] text-white">{tx(educationInfo.degree)}</h3>
            <p className="mt-2.5 font-mono text-[0.8rem] text-white/72">{educationInfo.school}</p>
            <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-white/45">
              {tx(educationInfo.location)} &#183; {tx(educationInfo.period)}
            </p>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[12px] bg-white/[0.055] p-6"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_8%,rgba(167,239,158,0.14),transparent_36%)]" />
          <div className="relative z-10">
            <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[#A7EF9E]">
              {tx(copy.education.languagesLabel)}
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {spokenLanguages.map((language) => (
                <li
                  key={language.name["pt-BR"]}
                  className="flex items-center justify-between rounded-[10px] bg-black/20 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                >
                  <span className="text-base font-semibold text-white">{tx(language.name)}</span>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/58">
                    {tx(language.level)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PortfolioLandingPageMobile() {
  const { lang } = useLang();
  const [isCvOpen, setIsCvOpen] = useState(false);

  return (
    <div className="relative w-full overflow-x-hidden bg-[#050505] text-white">
      <CvModal
        open={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        pdfUrl={CV_PDF_URL}
        downloadName={CV_DOWNLOAD_NAME}
      />

      <MobileNav onOpenCv={() => setIsCvOpen(true)} />

      <MobileHero onOpenCv={() => setIsCvOpen(true)} />

      <MobileProjects />

      <div className="bg-[linear-gradient(180deg,#050505_0%,#08080d_24%,#0d0e16_52%,#0a0c0b_78%,#050505_100%)]">
        <MobileAbout />
        <MobileSkills />
        <MobileExperience />
        <MobileEducation />
        <section id="contact" className="scroll-mt-20">
          <DestructionSection language={lang} backgroundClassName="bg-transparent" showAmbientBackground={false} />
        </section>
      </div>
    </div>
  );
}
