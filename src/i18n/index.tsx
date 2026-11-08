import { createContext, useContext, useEffect, type ReactNode } from "react";
import { persistLocale } from "../lib/locale";
import { dictionaries } from "./content";
import type { Dictionary, Locale } from "./types";
import { useLocaleMeta } from "./useLocaleMeta";

type LocaleContextValue = {
  locale: Locale;
  copy: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const copy = dictionaries[locale];

  useEffect(() => {
    persistLocale(locale);
  }, [locale]);

  useLocaleMeta(locale, copy);

  return (
    <LocaleContext.Provider value={{ locale, copy }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useI18n must be used inside a LocaleProvider");
  }

  return context;
}
