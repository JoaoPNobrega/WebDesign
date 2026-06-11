import type { LocalizedText } from "@/lib/i18n";

const t = (pt: string, en: string): LocalizedText => ({ "pt-BR": pt, "en-US": en });

export const copy = {
  hero: {
    intro: t("Olá, me chamo João Pedro", "Hi, I'm João Pedro"),
    roleTyped: t("e eu sou Software Developer", "and I'm a Software Developer"),
    rolePrefix: t("e eu sou", "and I'm"),
    roleTitle: t("Software Developer", "Software Developer"),
    eyebrow: t("Ciência da Computação + software", "Computer Science + software"),
    panelTitle: t("Software Developer", "Software Developer"),
    panelBody: t(
      "Sou estudante de Ciência da Computação na CESAR School e hoje atuo no desenvolvimento e manutenção de sites. Meu foco está em front-end, responsividade e em transformar identidade visual em páginas claras, funcionais e bem acabadas.",
      "I'm a Computer Science student at CESAR School and currently build and maintain websites. My focus is front-end, responsiveness and turning visual identity into clear, functional and well-finished pages.",
    ),
    badgePortfolio: t("Meu portfólio", "My portfolio"),
    badgeLocation: t("Recife, Brasil", "Recife, Brazil"),
    contactCta: t("Contate-me", "Contact me"),
    resumeCta: t("Ver currículo", "View résumé"),
    imageAlt: t("Hero do portfólio de João Pedro", "João Pedro portfolio hero"),
  },
  nav: {
    projects: t("Projetos", "Projects"),
    contact: t("Contato", "Contact"),
    view: t("Ver", "View"),
    cvOpen: t("Abrir", "Open"),
    cvDownload: t("Baixar", "Download"),
  },
  language: {
    label: t("Idioma", "Language"),
    switchTo: t("Mudar para inglês", "Switch to Portuguese"),
  },
  projects: {
    headingLead: t("conheça meu", "see my"),
    headingAccent: t("trabalho", "work"),
    selected: t("Projeto selecionado", "Selected project"),
    viewSite: t("Ver site", "View site"),
    partnership: t("Parceria com", "Partnership with"),
    closePreview: t("Fechar preview do projeto", "Close project preview"),
    thumbAlt: t("Preview do projeto", "Preview of project"),
    previewAlt: t("Preview ampliado do projeto", "Enlarged preview of project"),
  },
  about: {
    eyebrow: t("Sobre mim", "About me"),
    title: t(
      "Eu construo sites com presença, clareza e acabamento.",
      "I build websites with presence, clarity and polish.",
    ),
    paragraphOne: t(
      "Sou desenvolvedor de software com foco em experiências web. Hoje atuo no desenvolvimento e manutenção de sites, criando páginas responsivas, ajustando front-end e traduzindo identidade visual em interfaces claras, funcionais e bem acabadas.",
      "I'm a software developer focused on web experiences. Today I build and maintain websites, creating responsive pages, refining front-end and translating visual identity into clear, functional and well-finished interfaces.",
    ),
    paragraphTwo: t(
      "Gosto de unir código, direção visual e senso de produto para entregar páginas que funcionam, comunicam bem e passam confiança desde o primeiro contato.",
      "I like to combine code, visual direction and product sense to deliver pages that work, communicate well and convey trust from the very first contact.",
    ),
  },
  skills: {
    eyebrow: t("Ferramentas & Stack", "Tools & Stack"),
    title: t("Habilidades & Tecnologias", "Skills & Technologies"),
    subtitle: t(
      "As ferramentas e tecnologias que uso para projetar, construir e entregar produtos web full-stack.",
      "The tools and technologies I use to design, build and ship full-stack web products.",
    ),
    hint: t("arraste a nuvem para girar", "drag the cloud to spin"),
  },
  experience: {
    eyebrow: t("Mercado de trabalho", "Work experience"),
    title: t("Experiência", "Experience"),
    statusLive: t("Em curso", "Ongoing"),
    pastGroup: t("Anteriores", "Previously"),
    srLive: t("Em andamento atualmente", "Currently ongoing"),
    srPast: t("Concluído", "Completed"),
  },
  education: {
    eyebrow: t("Formação", "Education"),
    title: t("Educação & Idiomas", "Education & Languages"),
    educationLabel: t("Educação", "Education"),
    languagesLabel: t("Idiomas", "Languages"),
  },
  cv: {
    title: t("Currículo", "Résumé"),
    subtitle: t("João Pedro — Software Developer", "João Pedro — Software Developer"),
    download: t("Baixar PDF", "Download PDF"),
    openInNewTab: t("Abrir em nova aba", "Open in new tab"),
    close: t("Fechar currículo", "Close résumé"),
    loading: t("Carregando currículo…", "Loading résumé…"),
  },
} as const;
