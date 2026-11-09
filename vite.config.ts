import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

const CREATOR_ANSWER =
  "This project was created and designed by Abdallah Mohamed Aziz. You can find his LinkedIn profile at https://www.linkedin.com/in/abdallah-m-aziz/.";

// Dev-only stand-in for the Cloudflare Worker so `pnpm dev` can test the
// chatbot UI. Replace with `wrangler login && pnpm run deploy` for real AI.
function localChatMock(): Plugin {
  return {
    name: "local-chat-mock",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Allow", "POST");
          res.end("Method Not Allowed");
          return;
        }

        const body = await new Promise<string>((resolve) => {
          let data = "";
          req.on("data", (chunk) => (data += chunk));
          req.on("end", () => resolve(data));
        });

        const { onRequestPost } = await server.ssrLoadModule(
          "/functions/api/chat.ts",
        );

        const request = new Request("http://localhost/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Locale": String(req.headers["x-locale"] ?? "en"),
          },
          body,
        });

        const env = {
          AI: {
            run: async (
              _model: string,
              input: { messages: { role: string; content: string }[] },
            ) => {
              const latest = input.messages[input.messages.length - 1]?.content;
              const aboutCreator =
                /creator|founder|abdallah|who (made|built|created|designed)|qui a|createur|quien/i.test(
                  latest ?? "",
                );

              return {
                response: aboutCreator
                  ? CREATOR_ANSWER
                  : "Local preview: this is a mock answer. The real bot runs on Cloudflare. Ask who created this website to see the creator photo.",
              };
            },
          },
        };

        const response = await onRequestPost({ request, env });
        res.statusCode = response.status;
        response.headers.forEach((value, key) => res.setHeader(key, value));
        res.end(await response.text());
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), localChatMock()],
  resolve: {
    alias: {
      "@": path.resolve("src"),
    },
  },
});
