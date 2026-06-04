import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  SITE_LANGUAGE_STORAGE_KEY,
  isSiteLanguage,
  type SiteLanguage,
} from "@/lib/site-language";

/** A piece of copy available in both site languages. */
export type LocalizedText = Record<SiteLanguage, string>;

type LanguageContextValue = {
  lang: SiteLanguage;
  setLang: (next: SiteLanguage) => void;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectInitialLanguage(): SiteLanguage {
  if (typeof window === "undefined") {
    return "pt-BR";
  }

  const stored = window.localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY);
  if (isSiteLanguage(stored)) {
    return stored;
  }

  const navigatorLang = window.navigator.language?.toLowerCase() ?? "";
  return navigatorLang.startsWith("en") ? "en-US" : "pt-BR";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<SiteLanguage>(detectInitialLanguage);

  const setLang = useCallback((next: SiteLanguage) => {
    setLangState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, next);
    }
  }, []);

  const toggle = useCallback(() => {
    setLangState((current) => {
      const next: SiteLanguage = current === "pt-BR" ? "en-US" : "pt-BR";
      if (typeof window !== "undefined") {
        window.localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, next);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggle }),
    [lang, setLang, toggle],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLang must be used within a LanguageProvider");
  }

  const { lang } = context;
  const tx = useCallback((node: LocalizedText) => node[lang], [lang]);

  return { ...context, tx };
}
