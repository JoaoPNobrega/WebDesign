import type { LocalizedText } from "@/lib/i18n";

const t = (pt: string, en: string): LocalizedText => ({ "pt-BR": pt, "en-US": en });

export const copy = {
  hero: {
    intro: t("João Pedro", "João Pedro"),
    roleTitle: t("Software Developer", "Software Developer"),
    eyebrow: t("Ciência da Computação + software", "Computer Science + software"),
    panelBody: t(
      "Sites e interfaces do briefing à entrega — front-end sólido, responsividade real e identidade visual virando páginas que comunicam e convertem.",
      "Websites and interfaces from briefing to delivery — solid front-end, true responsiveness and visual identity turned into pages that communicate and convert.",
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
    viewAll: t("Ver todos os projetos", "View all projects"),
    learnMore: t("Saiba mais", "Learn more"),
    myRole: t("Como participei", "My role"),
    stackLabel: t("Tecnologias", "Stack"),
    toolsLabel: t("Ferramentas", "Tools"),
    creditsLabel: t("Colaboração", "Collaboration"),
    videoLabel: t("Demonstração", "Demo"),
    videoPlay: t("Assistir à demonstração", "Watch the demo"),
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
