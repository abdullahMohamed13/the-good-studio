import { onRequestPost } from "../functions/api/chat";

type Env = {
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

      return onRequestPost({ request, env });
    }

    return env.ASSETS.fetch(request);
  },
};
