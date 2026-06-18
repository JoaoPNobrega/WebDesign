import type { LocalizedText } from "@/lib/i18n";

export type NavProjectItem = (typeof navProjectItems)[number];

export const navProjectItems = [
  {
    title: "Dr Guilherme Maia",
    image: "/assets/dr-guilherme-preview.png",
    imageScale: "scale-[1.2] group-hover:scale-[1.28]",
    description: {
      "pt-BR": "Site desenvolvido para o urologista Dr. Guilherme Maia durante meu estágio na Web Star Studio. Uma landing page médica com foco em storytelling, atendimento ao público e simplicidade, fortalecendo a autoridade profissional.",
      "en-US": "Website built for urologist Dr. Guilherme Maia during my internship at Web Star Studio. A medical landing page focused on storytelling, patient care and simplicity, reinforcing professional authority.",
    },
    partner: "Web Star Studio",
    href: "https://drguilhermemaia.com.br/",
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
    title: "Dr Daniel Pianetti",
    image: "/assets/daniel-notch.png",
    description: {
      "pt-BR": "Site desenvolvido para o urologista Dr. Daniel Pianetti durante meu estágio na Web Star Studio. A experiência combina logo animada, objeto 3D e uma narrativa visual voltada para cirurgia robótica, tecnologia e confiança.",
      "en-US": "Website built for urologist Dr. Daniel Pianetti during my internship at Web Star Studio. The experience combines an animated logo, a 3D object and a visual narrative centered on robotic surgery, technology and trust.",
    },
    partner: "Web Star Studio",
    href: "https://daniel.webstar.studio/",
  },
  {
    title: "Stephanie Bolsoni",
    image: "/assets/stephanie-bolsoni.png",
    imageScale: "scale-[1.2] group-hover:scale-[1.28]",
    description: {
      "pt-BR": "Site desenvolvido para a nutricionista Stephanie Bolsoni durante meu estágio na Web Star Studio. O projeto destaca avaliações em tempo real e uma presença internacional, com atendimento em Dublin e online.",
      "en-US": "Website built for nutritionist Stephanie Bolsoni during my internship at Web Star Studio. The project highlights real-time reviews and an international presence, with appointments in Dublin and online.",
    },
    partner: "Web Star Studio",
    href: "https://stephaniebolsoni.com/",
  },
  {
    title: "Izi Solutions",
    image: "/assets/izi-solutions-preview.png",
    description: {
      "pt-BR": "Site desenvolvido para a Izi Solutions durante meu estágio na Web Star Studio. A landing page apresenta serviços de limpeza em São Paulo com uma experiência objetiva, moderna e voltada para conversão.",
      "en-US": "Website built for Izi Solutions during my internship at Web Star Studio. The landing page presents cleaning services in São Paulo with an objective, modern and conversion-focused experience.",
    },
    partner: "Web Star Studio",
    href: "https://izisolutions.com.br/",
  },
  {
    title: "Ines Knoden",
    image: "/assets/ines-preview.png",
    description: {
      "pt-BR": "Site desenvolvido para a coach Inês Knoden durante meu estágio na Web Star Studio. O projeto comunica acolhimento, carreira e bem-estar para mulheres, com uma identidade visual elegante e internacional.",
      "en-US": "Website built for coach Inês Knoden during my internship at Web Star Studio. The project conveys warmth, career and well-being for women, with an elegant, international visual identity.",
    },
    partner: "Web Star Studio",
    href: "https://ines.webstarstudio.site/",
  },
  {
    title: "Dr Dimas Antunes",
    image: "/assets/dimas-preview.png",
    description: {
      "pt-BR": "Site desenvolvido para o urologista Dr. Dimas Antunes durante meu estágio na Web Star Studio. A experiência reforça autoridade médica, cuidado e clareza para pacientes em Recife.",
      "en-US": "Website built for urologist Dr. Dimas Antunes during my internship at Web Star Studio. The experience reinforces medical authority, care and clarity for patients in Recife.",
    },
    partner: "Web Star Studio",
    href: "https://dimas.webstarstudio.site/",
  },
  {
    title: "Dr Cristiano Berardo",
    images: [
      "/assets/drcristiano-preview.png",
      "/assets/drcristiano-1.png",
      "/assets/drcristiano-2.png",
      "/assets/drcristiano-3.png",
      "/assets/drcristiano-4.png"
    ],
    description: {
      "pt-BR": "Landing page institucional para o cirurgião cardiovascular Dr. Cristiano Berardo, desenvolvida durante meu estágio na Web Star Studio. Um site premium que transmite autoridade médica, trajetória acadêmica e cuidado humanizado para pacientes e médicos.",
      "en-US": "Institutional landing page for cardiovascular surgeon Dr. Cristiano Berardo, built during my internship at Web Star Studio. A premium site conveying medical authority, academic background and humanized care for patients and physicians.",
    },
    partner: "Web Star Studio",
    href: "https://drcristiano.webstar.studio",
  },
  {
    title: "Keeping House",
    images: [
      "/assets/keepinghouse-hero.jpg",
      "/assets/keepinghouse-categorias.jpg",
      "/assets/keepinghouse-busca.png",
      "/assets/keepinghouse-concierge.jpg",
      "/assets/keepinghouse-planos.png",
      "/assets/keepinghouse-mobile.jpg"
    ],
    description: {
      "pt-BR": "Plataforma/marketplace de serviços domésticos da Keeping House: conecta famílias a diaristas, babás, cuidadoras, governantas e mais — com busca por CEP e categoria, perfis avaliados, planos de assinatura, vagas, um Concierge premium de curadoria e áreas logadas para contratante, profissional e administrador.",
      "en-US": "Domestic-services marketplace for Keeping House: connects families with house cleaners, nannies, caregivers, housekeepers and more — with CEP + category search, reviewed profiles, subscription plans, job postings, a premium curated Concierge and logged-in areas for clients, professionals and admins.",
    },
    href: "https://keepinghouse.com.br/",
  },
  {
    title: "Delusional Studio",
    images: [
      "/assets/delusional-studio-preview.png",
      "/assets/delusional-studio-1.png",
      "/assets/delusional-studio-2.png",
      "/assets/delusional-studio-3.png",
      "/assets/delusional-studio-4.png"
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
