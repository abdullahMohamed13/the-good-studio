import { onRequestPost } from "../functions/api/chat";

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
        return new Response(
          JSON.stringify({
            error:
              "The orb needs a breather. Please try again in a little while.",
          }),
          {
            status: 429,
            headers: { "Content-Type": "application/json; charset=utf-8" },
          },
        );
      }

      return onRequestPost({ request, env });
    }

    return env.ASSETS.fetch(request);
  },
};
