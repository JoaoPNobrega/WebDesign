export type SiteLanguage = "pt-BR" | "en-US";

export const SITE_LANGUAGE_STORAGE_KEY = "jp-site-language";

export function isSiteLanguage(value: string | null): value is SiteLanguage {
  return value === "pt-BR" || value === "en-US";
}
