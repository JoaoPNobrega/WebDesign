import type { SiteLanguage } from "@/lib/site-language";

/** Traduções de rótulos/itens de skills que não são nomes próprios de tecnologia. */
const SKILL_TEXT: Record<string, Record<SiteLanguage, string>> = {
  Tools: { "pt-BR": "Ferramentas", "en-US": "Tools" },
  "Arquitetura de Software": { "pt-BR": "Arquitetura de Software", "en-US": "Software Architecture" },
  "Testes Automatizados": { "pt-BR": "Testes Automatizados", "en-US": "Automated Testing" },
  "Metodologias Ágeis": { "pt-BR": "Metodologias Ágeis", "en-US": "Agile Methodologies" },
};

export function skillText(value: string, lang: SiteLanguage): string {
  return SKILL_TEXT[value]?.[lang] ?? value;
}
