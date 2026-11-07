import { processSteps } from "../../src/data/processSteps";
import { services } from "../../src/data/services";
import { siteConfig } from "../../src/data/siteConfig";

type ChatRole = "user" | "assistant" | "system";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type AiBinding = {
  run: (
    model: string,
    input: { messages: ChatMessage[]; max_tokens: number },
  ) => Promise<unknown>;
};

type Env = { AI: AiBinding };
type ChatRequest = { messages?: unknown };

const studioKnowledge = [
  `Studio name: ${siteConfig.name}.`,
  `Services: ${services.map((service) => `${service.title} — ${service.description}`).join("; ")}`,
  `Process: ${processSteps.map((step) => `${step.title} — ${step.description}`).join("; ")}`,
  "The studio makes thoughtful digital experiences for phenomenal humans.",
  "If a question needs exact pricing, availability, or project details, direct the visitor to the contact page instead of inventing an answer.",
].join("\n");

const systemMessage: ChatMessage = {
  role: "system",
  content: `You are Good Bot, the warm and concise assistant for The Good Studio.
Answer questions about the studio using only the information below. Keep replies human, helpful, and under 80 words. If you do not know something, say so clearly. Never invent services, clients, prices, results, or availability.

${studioKnowledge}`,
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function isMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const message = value as Record<string, unknown>;
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0 &&
    message.content.length <= 1000
  );
}

function getText(result: unknown) {
  if (!result || typeof result !== "object") return "";
  const data = result as Record<string, any>;
  if (typeof data.response === "string") return data.response;
  const choice = data.choices?.[0];
  if (typeof choice?.message?.content === "string")
    return choice.message.content;
  if (typeof choice?.text === "string") return choice.text;
  return "";
}

export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) {
  let body: ChatRequest;
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return json({ error: "Please send a valid JSON request." }, 400);
  }

  const messages = Array.isArray(body.messages)
    ? body.messages.filter(isMessage).slice(-8)
    : [];

  if (!messages.some((message) => message.role === "user")) {
    return json({ error: "Please include a message." }, 400);
  }

  try {
    const result = await env.AI.run("@cf/google/gemma-4-26b-a4b-it", {
      messages: [systemMessage, ...messages],
      max_tokens: 180,
    });
    const response = getText(result);

    if (!response) {
      return json(
        { error: "The orb could not find an answer this time." },
        502,
      );
    }

    return json({ response });
  } catch (error) {
    console.error("Chatbot request failed", error);
    return json(
      { error: "The orb is taking a little rest. Please try again soon." },
      503,
    );
  }
}
