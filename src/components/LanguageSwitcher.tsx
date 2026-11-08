import type { MouseEvent } from "react";
import { useI18n } from "../i18n";
import { locales, persistLocale, type Locale } from "../lib/locale";
import { localizedHref, parsePath } from "../lib/routes";
import { navigate, usePathname } from "../lib/usePathname";

type LanguageSwitcherProps = {
  variant?: "desktop" | "mobile";
};

const languageCodes: Record<Locale, string> = {
  en: "ENG",
  es: "SPA",
  fr: "FRA",
};

export function LanguageSwitcher({
  variant = "desktop",
}: LanguageSwitcherProps) {
  const { locale, copy } = useI18n();
  const pathname = usePathname();
  const { path } = parsePath(pathname);
  const isMobile = variant === "mobile";

  function selectLocale(
    event: MouseEvent<HTMLAnchorElement>,
    nextLocale: Locale,
  ) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    if (nextLocale === locale) return;

    persistLocale(nextLocale);
    navigate(localizedHref(nextLocale, path), { preserveScroll: true });
  }

  return (
    <div
      className={`flex items-center font-mono uppercase tracking-[0.08em] ${
        isMobile ? "gap-3 py-3 text-[11px]" : "gap-2 text-[10px]"
      }`}
    >
      {locales.map((option) => {
        const isActive = option === locale;

        return (
          <span className="flex items-center gap-1" key={option}>
            <a
              className={`inline-flex items-center border border-[var(--color-primary)] border-dashed justify-center rounded-full bg-[var(--color-accent)] px-3 py-1.5 font-semibold text-white no-underline transition-opacity hover:opacity-90 ${
                isActive ? "opacity-100" : "opacity-75"
              }`}
              href={localizedHref(option, path)}
              hrefLang={option}
              aria-label={`${copy.nav.language}: ${languageCodes[option]}`}
              aria-current={isActive ? "page" : undefined}
              onClick={(event) => selectLocale(event, option)}
            >
              {languageCodes[option]}
            </a>
          </span>
        );
      })}
    </div>
  );
}
