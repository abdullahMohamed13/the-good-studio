import { useEffect } from "react";
import { locales } from "../lib/locale";
import { localizedPath, parsePath } from "../lib/routes";
import type { Dictionary, Locale } from "./types";

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    if (hreflang) element.setAttribute("hreflang", hreflang);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export function useLocaleMeta(locale: Locale, copy: Dictionary) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = copy.meta.title;

    upsertMeta("name", "description", copy.meta.description);
    upsertMeta("property", "og:title", copy.meta.ogTitle);
    upsertMeta("property", "og:description", copy.meta.ogDescription);
    upsertMeta("property", "og:locale", copy.meta.ogLocale);
    upsertMeta("name", "twitter:title", copy.meta.ogTitle);
    upsertMeta("name", "twitter:description", copy.meta.ogDescription);

    const origin = window.location.origin;
    const { path } = parsePath(window.location.pathname);
    const routePath = path === "/contact" ? "/contact" : "/";
    const canonical = `${origin}${localizedPath(locale, routePath)}`;

    upsertLink("canonical", canonical);
    upsertMeta("property", "og:url", canonical);

    locales.forEach((alternate) => {
      upsertLink(
        "alternate",
        `${origin}${localizedPath(alternate, routePath)}`,
        alternate,
      );
    });
    upsertLink(
      "alternate",
      `${origin}${localizedPath("en", routePath)}`,
      "x-default",
    );
  }, [locale, copy]);
}
