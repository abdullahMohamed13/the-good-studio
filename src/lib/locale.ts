export const locales = ["en", "es", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE = "good-studio-locale";
export const LOCALE_STORAGE_KEY = "good-studio-locale";

const spanishCountries = new Set([
  "AR",
  "BO",
  "CL",
  "CO",
  "CR",
  "CU",
  "DO",
  "EC",
  "ES",
  "GQ",
  "GT",
  "HN",
  "MX",
  "NI",
  "PA",
  "PE",
  "PR",
  "PY",
  "SV",
  "UY",
  "VE",
]);

const frenchCountries = new Set([
  "BE",
  "BF",
  "BI",
  "BJ",
  "BL",
  "CA",
  "CD",
  "CF",
  "CG",
  "CH",
  "CI",
  "CM",
  "DJ",
  "FR",
  "GA",
  "GF",
  "GN",
  "GP",
  "HT",
  "KM",
  "LU",
  "MC",
  "MF",
  "MG",
  "ML",
  "MQ",
  "NC",
  "NE",
  "PF",
  "PM",
  "RE",
  "RW",
  "SC",
  "SN",
  "TD",
  "TG",
  "VU",
  "WF",
  "YT",
]);

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "es" || value === "fr";
}

export function localeFromCountry(
  country: string | null | undefined,
): Locale | null {
  if (!country) return null;

  const code = country.toUpperCase();
  if (spanishCountries.has(code)) return "es";
  if (frenchCountries.has(code)) return "fr";

  return null;
}

export function localeFromAcceptLanguage(
  header: string | null | undefined,
): Locale | null {
  if (!header) return null;

  const languages = header
    .split(",")
    .map((part) => {
      const [tag, ...parameters] = part.trim().split(";");
      const quality = parameters.find((parameter) =>
        parameter.trim().startsWith("q="),
      );
      const weight = quality ? Number(quality.split("=")[1]) : 1;

      return {
        tag: tag.toLowerCase(),
        weight: Number.isFinite(weight) ? weight : 0,
      };
    })
    .filter((language) => language.weight > 0)
    .sort((a, b) => b.weight - a.weight);

  for (const { tag } of languages) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }

  return null;
}

export function readCookie(
  cookieHeader: string | null | undefined,
  name: string,
): string | null {
  if (!cookieHeader) return null;

  for (const part of cookieHeader.split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return decodeURIComponent(value.join("="));
  }

  return null;
}

export function detectLocale({
  cookie,
  acceptLanguage,
  country,
}: {
  cookie?: string | null;
  acceptLanguage?: string | null;
  country?: string | null;
}): Locale {
  if (isLocale(cookie)) return cookie;

  return (
    localeFromAcceptLanguage(acceptLanguage) ??
    localeFromCountry(country) ??
    defaultLocale
  );
}

export function getStoredLocale(): Locale | null {
  try {
    const value = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(value) ? value : null;
  } catch {
    return null;
  }
}

export function persistLocale(locale: Locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Storage can be unavailable in private or restricted contexts.
  }

  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax${secure}`;
}

export function detectLocaleFromClient(): Locale {
  const stored = getStoredLocale();
  if (stored) return stored;

  const cookie = readCookie(document.cookie, LOCALE_COOKIE);
  if (isLocale(cookie)) return cookie;

  return (
    localeFromAcceptLanguage(navigator.languages?.join(",")) ?? defaultLocale
  );
}
