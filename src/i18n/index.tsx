import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { ru, type Dict } from "./ru";
import { en } from "./en";
import { zh } from "./zh";

export type Locale = "ru" | "en" | "zh";

export const DICTS: Record<Locale, Dict> = { ru, en, zh };
export const LOCALES: { code: Locale; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
];

const STORAGE_KEY = "pager.locale";

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
}>({ locale: "ru", setLocale: () => {}, t: ru });

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Russian is the default; browser language is never auto-detected.
  const [locale, setLocaleState] = useState<Locale>("ru");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "ru" || stored === "en" || stored === "zh") setLocaleState(stored);
  }, []);

  useEffect(() => {
    const dict = DICTS[locale];
    document.documentElement.lang = dict.htmlLang;
    document.documentElement.dataset["locale"] = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage unavailable */
    }
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: DICTS[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useT(): Dict {
  return useContext(LocaleContext).t;
}
