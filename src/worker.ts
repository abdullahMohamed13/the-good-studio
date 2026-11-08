import { onRequestPost } from "../functions/api/chat";
import { getDictionary } from "../src/i18n/content";
import {
  LOCALE_COOKIE,
  detectLocale,
  isLocale,
  readCookie,
} from "../src/lib/locale";
import { localizedPath, parsePath } from "../src/lib/routes";

type Env = {
  CHAT_RATE_LIMITER: {
    limit: (options: { key: string }) => Promise<{ success: boolean }>;
  };
  AI: {
    run: (
      model: string,
      input: {
        messages: unknown[];
        max_tokens: number;
        chat_template_kwargs: { enable_thinking: boolean };
      },
    ) => Promise<unknown>;
  };
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/chat") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", {
          status: 405,
          headers: { Allow: "POST" },
        });
      }

      // Workers rate limiting is approximate and location-based, not a globally exact quota.
      const visitorIp = request.headers.get("cf-connecting-ip") ?? "unknown";
      const { success } = await env.CHAT_RATE_LIMITER.limit({ key: visitorIp });
      if (!success) {
        const headerLocale = request.headers.get("X-Locale");
        const locale = isLocale(headerLocale) ? headerLocale : "en";
        return new Response(
          JSON.stringify({
            error: getDictionary(locale).chatbot.errors.breather,
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Cache-Control": "no-store",
            },
          },
        );
      }

      return onRequestPost({ request, env });
    }

    const isLocaleEntry =
      request.method === "GET" &&
      (url.pathname === "/" ||
        url.pathname === "/contact" ||
        url.pathname === "/contact/");

    if (isLocaleEntry) {
      const country = (request as Request & { cf?: { country?: string } }).cf
        ?.country;
      const locale = detectLocale({
        cookie: readCookie(request.headers.get("cookie"), LOCALE_COOKIE),
        acceptLanguage: request.headers.get("accept-language"),
        country,
      });
      const location = `${localizedPath(locale, parsePath(url.pathname).path)}${
        url.search
      }`;

      return new Response(null, {
        status: 302,
        headers: {
          Location: location,
          "Cache-Control": "no-store",
          Vary: "Accept-Language, Cookie",
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
