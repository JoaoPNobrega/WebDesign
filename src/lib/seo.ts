import type { SiteLanguage } from "./site-language";
import { navProjectItems, projectSlug, getProjectBySlug, getProjectImages } from "./projects";

// Metadados por rota. Usado no cliente (título/descrição ao navegar) e no build
// (scripts/seo-prerender.ts gera um HTML estático por rota com essas tags).

export const SITE_URL = "https://www.jpnobrega.me";
export const SITE_NAME = "João Pedro Nóbrega";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const GITHUB_URL = "https://github.com/JoaoPNobrega";
export const LINKEDIN_URL = "https://www.linkedin.com/in/joaopedro-nobrega";

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  type: "website" | "article" | "profile";
};

const HOME_DESCRIPTION =
  "Portfólio de João Pedro Nóbrega, desenvolvedor front-end júnior em Recife. Sites e produtos digitais do design ao deploy: front-end caprichado, full-stack quando precisa, SEO e performance.";

export function truncate(text: string, max = 158): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

/** Rotas que o SPA conhece; qualquer outra renderiza a página 404. */
export function isKnownRoute(pathname: string): boolean {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/" || path === "/projetos" || path === "/3d") return true;
  return /^\/projetos\/[^/]+$/.test(path);
}

export function getRouteMeta(pathname: string, lang: SiteLanguage = "pt-BR"): RouteMeta {
  const path = pathname.replace(/\/+$/, "") || "/";
  const en = lang === "en-US";

  if (!isKnownRoute(path)) {
    return {
      path,
      title: en ? "Page not found | João Pedro Nóbrega" : "Página não encontrada | João Pedro Nóbrega",
      description: HOME_DESCRIPTION,
      image: OG_IMAGE,
      imageAlt: SITE_NAME,
      type: "website",
    };
  }

  if (path === "/projetos") {
    return {
      path,
      title: en
        ? "Projects | João Pedro Nóbrega — Junior Front-end Developer"
        : "Projetos | João Pedro Nóbrega — Desenvolvedor Front-end Júnior",
      description: `Sites, dashboards e produtos digitais desenvolvidos por João Pedro Nóbrega: ${navProjectItems
        .slice(0, 5)
        .map((item) => item.title)
        .join(", ")} e mais.`,
      image: OG_IMAGE,
      imageAlt: "Portfólio de João Pedro Nóbrega",
      type: "website",
    };
  }

  const match = path.match(/^\/projetos\/([^/]+)$/);
  const project = match ? getProjectBySlug(decodeURIComponent(match[1])) : undefined;
  if (project) {
    const cover = getProjectImages(project)[0];
    return {
      path: `/projetos/${projectSlug(project.title)}`,
      title: `${project.title} — ${en ? "Project" : "Projeto"} | João Pedro Nóbrega`,
      description: truncate(project.description[lang]),
      image: cover ? absoluteUrl(cover) : OG_IMAGE,
      imageAlt: `${en ? "Preview of project" : "Preview do projeto"} ${project.title}`,
      type: "article",
    };
  }

  return {
    path: "/",
    title: en
      ? "João Pedro Nóbrega | Junior Front-end Developer in Recife — Portfolio"
      : "João Pedro Nóbrega | Desenvolvedor Front-end Júnior em Recife — Portfólio",
    description: HOME_DESCRIPTION,
    image: OG_IMAGE,
    imageAlt: "João Pedro Nóbrega — Desenvolvedor Front-end Júnior",
    type: "profile",
  };
}

/** Atualiza título, descrição e canonical ao navegar no SPA. */
export function applyRouteMeta(pathname: string, lang: SiteLanguage = "pt-BR") {
  const meta = getRouteMeta(pathname, lang);
  document.title = meta.title;
  const set = (selector: string, attr: string, value: string) => {
    document.head.querySelector(selector)?.setAttribute(attr, value);
  };
  set('meta[name="description"]', "content", meta.description);
  set('link[rel="canonical"]', "href", absoluteUrl(meta.path));
  set('meta[property="og:title"]', "content", meta.title);
  set('meta[property="og:description"]', "content", meta.description);
  set('meta[property="og:url"]', "content", absoluteUrl(meta.path));
  set('meta[property="og:image"]', "content", meta.image);
  let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (!isKnownRoute(pathname)) {
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "noindex";
  } else if (robots?.content === "noindex") {
    robots.remove();
  }
}
