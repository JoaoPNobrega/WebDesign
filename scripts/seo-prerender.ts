import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { Plugin } from "vite";

import { navProjectItems, projectSlug, getProjectImages } from "../src/lib/projects";
import { projectDetails } from "../src/lib/project-details";
import { copy } from "../src/lib/portfolio-copy";
import {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
  GITHUB_URL,
  LINKEDIN_URL,
  absoluteUrl,
  getRouteMeta,
  type RouteMeta,
} from "../src/lib/seo";

// Pós-build: gera um index.html por rota com title/description/OG próprios,
// JSON-LD e o conteúdo principal em HTML puro. WhatsApp, LinkedIn e crawlers de
// IA (GPTBot, ClaudeBot, PerplexityBot…) não executam JS — sem isso eles só
// enxergam uma <div> vazia. Também gera sitemap.xml e llms.txt.

const esc = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: SITE_NAME,
  alternateName: "João Pedro",
  jobTitle: "Software Developer",
  description: copy.about.paragraphOne["pt-BR"],
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/assets/joao-pedro-about.jpeg`,
  address: { "@type": "PostalAddress", addressLocality: "Recife", addressRegion: "PE", addressCountry: "BR" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "CESAR School" },
  knowsAbout: ["Desenvolvimento web", "Front-end", "React", "TypeScript", "Full-stack", "SEO", "UI design"],
  sameAs: [GITHUB_URL, LINKEDIN_URL],
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: ["pt-BR", "en-US"],
  publisher: { "@id": `${SITE_URL}/#person` },
};

function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function headTags(meta: RouteMeta, jsonLd: object[]) {
  const url = absoluteUrl(meta.path === "/" ? "/" : meta.path);
  const isDefaultImage = meta.image === OG_IMAGE;
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:locale:alternate" content="en_US" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${meta.image}" />`,
    ...(isDefaultImage
      ? [`<meta property="og:image:width" content="1200" />`, `<meta property="og:image:height" content="630" />`]
      : []),
    `<meta property="og:image:alt" content="${esc(meta.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${meta.image}" />`,
    `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": jsonLd })}</script>`,
  ].join("\n    ");
}

function contactBlock() {
  return `<h2>Contato</h2>
<ul>
  <li><a href="${LINKEDIN_URL}">LinkedIn</a></li>
  <li><a href="${GITHUB_URL}">GitHub</a></li>
  <li><a href="/curriculo-joao-pedro.pdf">Currículo (PDF)</a></li>
</ul>`;
}

function projectList() {
  return `<ul>
${navProjectItems
  .map(
    (item) =>
      `  <li><h3><a href="/projetos/${projectSlug(item.title)}">${esc(item.title)}</a></h3><p>${esc(
        item.description["pt-BR"],
      )}</p></li>`,
  )
  .join("\n")}
</ul>`;
}

type Page = { meta: RouteMeta; jsonLd: object[]; body: string };

function buildPages(): Page[] {
  const home: Page = {
    meta: getRouteMeta("/"),
    jsonLd: [
      person,
      website,
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: `${SITE_URL}/`,
        name: getRouteMeta("/").title,
        inLanguage: "pt-BR",
        mainEntity: { "@id": `${SITE_URL}/#person` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
    ],
    body: `<header>
  <h1>João Pedro Nóbrega</h1>
  <p><strong>Software Developer</strong> · Recife, Brasil</p>
  <p>${esc(copy.hero.panelBody["pt-BR"])}</p>
</header>
<section>
  <h2>Sobre mim</h2>
  <p>${esc(copy.about.paragraphOne["pt-BR"])}</p>
  <p>${esc(copy.about.paragraphTwo["pt-BR"])}</p>
</section>
<section>
  <h2>Projetos</h2>
  ${projectList()}
  <p><a href="/projetos">Ver todos os projetos</a></p>
</section>
<section>${contactBlock()}</section>`,
  };

  const projects: Page = {
    meta: getRouteMeta("/projetos"),
    jsonLd: [
      person,
      website,
      {
        "@type": "CollectionPage",
        url: `${SITE_URL}/projetos`,
        name: getRouteMeta("/projetos").title,
        author: { "@id": `${SITE_URL}/#person` },
        hasPart: navProjectItems.map((item) => ({
          "@type": "CreativeWork",
          name: item.title,
          url: `${SITE_URL}/projetos/${projectSlug(item.title)}`,
        })),
      },
      breadcrumb([
        { name: "Início", path: "/" },
        { name: "Projetos", path: "/projetos" },
      ]),
    ],
    body: `<p><a href="/">← João Pedro Nóbrega</a></p>
<h1>Projetos</h1>
<p>Sites, dashboards e produtos digitais que desenvolvi.</p>
${projectList()}
${contactBlock()}`,
  };

  const details: Page[] = navProjectItems.map((item) => {
    const slug = projectSlug(item.title);
    const meta = getRouteMeta(`/projetos/${slug}`);
    const detail = projectDetails[item.title];
    const images = getProjectImages(item);
    const external = "href" in item ? (item.href as string) : undefined;
    const partner = "partner" in item ? (item.partner as string) : undefined;
    return {
      meta,
      jsonLd: [
        person,
        {
          "@type": "CreativeWork",
          name: item.title,
          url: `${SITE_URL}/projetos/${slug}`,
          description: item.description["pt-BR"],
          image: images.map(absoluteUrl),
          creator: { "@id": `${SITE_URL}/#person` },
          inLanguage: "pt-BR",
          ...(detail?.tags ? { keywords: detail.tags.join(", ") } : {}),
          ...(external ? { sameAs: external } : {}),
        },
        breadcrumb([
          { name: "Início", path: "/" },
          { name: "Projetos", path: "/projetos" },
          { name: item.title, path: `/projetos/${slug}` },
        ]),
      ],
      body: `<p><a href="/projetos">← Projetos</a></p>
<article>
  <h1>${esc(item.title)}</h1>
  ${partner ? `<p>Parceria com ${esc(partner)}</p>` : ""}
  ${images[0] ? `<img src="${images[0]}" alt="${esc(meta.imageAlt)}" width="1200" />` : ""}
  <p>${esc(item.description["pt-BR"])}</p>
  ${detail ? `<h2>Como participei</h2><p>${esc(detail.role["pt-BR"])}</p>` : ""}
  ${detail?.tags?.length ? `<h2>Tecnologias</h2><p>${esc(detail.tags.join(", "))}</p>` : ""}
  ${external ? `<p><a href="${external}" rel="noopener">Ver site do projeto</a></p>` : ""}
</article>
<p>Projeto por <a href="/">João Pedro Nóbrega</a>, Software Developer em Recife.</p>`,
    };
  });

  return [home, projects, ...details];
}

function llmsTxt() {
  return `# João Pedro Nóbrega — Software Developer

> ${copy.hero.panelBody["pt-BR"]}

João Pedro Nóbrega é desenvolvedor de software em Recife (PE, Brasil), estudante de Ciência da Computação na CESAR School. ${copy.about.paragraphOne["pt-BR"]}

- Site: ${SITE_URL}/
- LinkedIn: ${LINKEDIN_URL}
- GitHub: ${GITHUB_URL}
- Currículo (PDF): ${SITE_URL}/curriculo-joao-pedro.pdf

## Projetos

${navProjectItems
  .map((item) => `- [${item.title}](${SITE_URL}/projetos/${projectSlug(item.title)}): ${item.description["pt-BR"]}`)
  .join("\n")}
`;
}

function sitemap(pages: Page[]) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map((page) => {
      const loc = absoluteUrl(page.meta.path === "/" ? "/" : page.meta.path);
      const image = `<image:image><image:loc>${page.meta.image}</image:loc></image:image>`;
      return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod>${image}</url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}

export default function seoPrerender(): Plugin {
  let outDir = "dist";
  return {
    name: "seo-prerender",
    apply: "build",
    configResolved(config) {
      outDir = join(config.root, config.build.outDir);
    },
    closeBundle() {
      const template = readFileSync(join(outDir, "index.html"), "utf8");
      const pages = buildPages();

      for (const page of pages) {
        const html = template
          .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, headTags(page.meta, page.jsonLd))
          .replace("<!--seo:content-->", `<div class="seo-static">\n${page.body}\n</div>`);
        const file = page.meta.path === "/" ? "index.html" : join(page.meta.path.slice(1), "index.html");
        mkdirSync(dirname(join(outDir, file)), { recursive: true });
        writeFileSync(join(outDir, file), html);
      }

      writeFileSync(join(outDir, "sitemap.xml"), sitemap(pages));
      writeFileSync(join(outDir, "llms.txt"), llmsTxt());
    },
  };
}
