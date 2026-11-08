import { isLocale, type Locale } from "./locale";

export type ParsedPath = {
  locale: Locale | null;
  path: string;
};

export function parsePath(pathname: string): ParsedPath {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const segments = clean.split("/").filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    const rest = `/${segments.slice(1).join("/")}`;
    return {
      locale: segments[0],
      path: rest === "/" ? "/" : rest,
    };
  }

  return { locale: null, path: clean };
}

export function localizedPath(locale: Locale, path: string): string {
  const normalized =
    path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;

  return `/${locale}${normalized}`;
}

export function localizedHref(locale: Locale, path: string, hash = ""): string {
  return `${localizedPath(locale, path)}${hash}`;
}

export function swapLocaleInPath(pathname: string, nextLocale: Locale): string {
  const { path } = parsePath(pathname);
  return localizedPath(nextLocale, path);
}
