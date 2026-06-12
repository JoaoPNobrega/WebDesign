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
    image: "/assets/flynotch.png",
    description: {
      "pt-BR": "App web mobile feito para gerenciar partidas e acompanhar estatísticas. Criei para ajudar no vôlei que jogo com meus primos, com inspiração no anime Haikyu!!.",
      "en-US": "A mobile web app to manage matches and track statistics. I built it for the volleyball games I play with my cousins, inspired by the anime Haikyu!!.",
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
      "/assets/keepinghouse-preview.png",
      "/assets/keepinghouse-1.png",
      "/assets/keepinghouse-2.png",
      "/assets/keepinghouse-3.png",
      "/assets/keepinghouse-4.png"
    ],
    description: {
      "pt-BR": "Site desenvolvido para a Keeping House, empresa de serviços de limpeza e organização residencial. Landing page com foco em conversão, apresentando planos, depoimentos e agendamento direto pelo WhatsApp.",
      "en-US": "Website built for Keeping House, a residential cleaning and organization company. A conversion-focused landing page featuring service plans, testimonials and direct WhatsApp booking.",
    },
    partner: "Delusional",
    partnerLogo: "/assets/delusional-logo.png",
    partnerLogoClassName: "h-5 w-auto object-contain sm:h-6",
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
      "pt-BR": "Portfólio e site institucional da Delusional, minha empresa de desenvolvimento web freelance. Design imersivo com animações interativas, showcases de projetos e identidade visual marcante.",
      "en-US": "Portfolio and institutional website for Delusional, my freelance web development company. Immersive design with interactive animations, project showcases and a bold visual identity.",
    },
    partner: "Delusional",
    partnerLogo: "/assets/delusional-logo.png",
    partnerLogoClassName: "h-5 w-auto object-contain sm:h-6",
    href: "https://delusionalstudio.vercel.app/",
  },
  {
    title: "Delulu Painel",
    images: [
      "/assets/delulu-painel-preview.png",
      "/assets/delulu-painel-1.png",
      "/assets/delulu-painel-2.png",
      "/assets/delulu-painel-3.png"
    ],
    description: {
      "pt-BR": "Dashboard exclusivo para organizar a rotina do time na nossa iniciativa freelancer, a Delusional. Desenvolvido com uma estética Neumorphism, o painel conta com Kanban pessoal, gestão financeira e de projetos, cofre de contratos assinados e monitoramento de status (uptime) dos sites no ar.",
      "en-US": "Exclusive dashboard to organize the team's routine in our freelance initiative, Delusional. Built with a Neumorphism aesthetic, the panel features a personal Kanban, financial and project management, a vault for signed contracts, and uptime status monitoring for live websites.",
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
