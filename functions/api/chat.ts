import { siteConfig } from "../../src/data/siteConfig";
import {
  getAssets,
  getCollaborationTypes,
  getDictionary,
  getInterests,
  getProcessSteps,
  getServices,
  getStartingPoints,
  getTestimonials,
  getWorkMedia,
} from "../../src/i18n/content";
import type { Dictionary } from "../../src/i18n/types";
import {
  defaultLocale,
  isLocale,
  localeFromAcceptLanguage,
  type Locale,
} from "../../src/lib/locale";

type ChatRole = "user" | "assistant" | "system";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type AiBinding = {
  run: (
    model: string,
    input: {
      messages: ChatMessage[];
      max_tokens: number;
      chat_template_kwargs: { enable_thinking: boolean };
    },
  ) => Promise<unknown>;
};

type Env = { AI: AiBinding };
type ChatRequest = { messages?: unknown; locale?: unknown };

function buildStudioKnowledge(locale: Locale) {
  const copy = getDictionary(locale);
  const services = getServices(locale);
  const processSteps = getProcessSteps(locale);
  const workMedia = getWorkMedia(locale);
  const testimonials = getTestimonials(locale);
  const interests = getInterests(locale);
  const assets = getAssets(locale);
  const collaborationTypes = getCollaborationTypes(locale);
  const startingPoints = getStartingPoints(locale);

  return [
    `Studio name: ${siteConfig.name}.`,
    "The studio is an independent design studio based everywhere.",
    "The studio makes visual design and web development for phenomenal humans.",
    "The studio is coded and designed by humans, backed by instinct and intuition.",
    "This project was created and designed by Abdallah Mohamed Aziz.",
    "Abdallah Mohamed Aziz's LinkedIn profile is https://www.linkedin.com/in/abdallah-m-aziz/.",
    `Services: ${services.map((service) => `${service.title} — ${service.description} (${service.tags})`).join("; ")}`,
    `Process: ${processSteps.map((step) => `${step.number}. ${step.title} — ${step.description} Outcome: ${step.outcome}`).join("; ")}`,
    `Selected work: ${workMedia.map((project) => `${project.name} (${project.type})`).join(", ")}.`,
    `Testimonials: ${testimonials.map((testimonial) => `${testimonial.name}, ${testimonial.role}, said: ${testimonial.quote}`).join(" ")}`,
    `The contact page accepts: ${startingPoints.map((point) => point.label).join(", ")}.`,
    "The contact form asks for a name, email, project interests, budget, project details, existing assets, and referral information.",
    `Contact interests include: ${interests.map((interest) => interest.label).join(", ")}.`,
    `Visitors can say whether they already have: ${assets.map((asset) => asset.label).join(", ")}.`,
    `Collaboration options include: ${collaborationTypes.map((type) => type.label).join(", ")}.`,
    `The contact page says: ${copy.contact.languagesLine1} ${copy.contact.languagesLine2}`,
    `The contact email configured on the site is ${siteConfig.email}.`,
    `The contact callout says: ${copy.contactCallout.eyebrow}`,
    `The footer says: ${copy.footer.exploring}`,
    "If a question needs exact pricing, availability, or project details, direct the visitor to the contact page instead of inventing an answer.",
  ].join("\n");
}

function buildSystemMessage(locale: Locale, copy: Dictionary): ChatMessage {
  const languageName = copy.nav.languageNames[locale];

  return {
    role: "system",
    content: `You are Good Bot, the warm and concise assistant for The Good Studio.
Answer questions about the studio using only the information below. Reply in ${languageName}. Keep replies human, helpful, and under 80 words. If you do not know something, say so clearly. Never invent services, clients, prices, results, or availability. Do not use Markdown, asterisks, or bullet points. Use plain text and numbered lines for lists.

${buildStudioKnowledge(locale)}`,
  };
}

let rateWindowStarted = 0;
let rateCount = 0;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function isUserMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const message = value as Record<string, unknown>;
  return (
    message.role === "user" &&
    typeof message.content === "string" &&
    message.content.trim().length > 0 &&
    message.content.length <= 1000
  );
}

function getText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) return value.map(getText).filter(Boolean).join(" ");
  if (!value || typeof value !== "object") return "";

  const data = value as Record<string, unknown>;
  const directText = [data.response, data.output_text, data.text, data.content]
    .map(getText)
    .find(Boolean);
  if (directText) return directText;

  return getText(data.choices) || getText(data.message) || getText(data.output);
}

export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) {
  const headerLocale = request.headers.get("X-Locale");
  const initialLocale = isLocale(headerLocale) ? headerLocale : defaultLocale;
  const initialCopy = getDictionary(initialLocale);

  if (
    request.headers.get("content-length") &&
    Number(request.headers.get("content-length")) > 12000
  )
    return json({ error: initialCopy.chatbot.errors.tooLarge }, 413);

  let body: ChatRequest;
  try {
    const raw = await request.text();
    if (raw.length > 12000)
      return json({ error: initialCopy.chatbot.errors.tooLarge }, 413);
    body = JSON.parse(raw) as ChatRequest;
  } catch {
    return json({ error: initialCopy.chatbot.errors.invalidRequest }, 400);
  }

  const locale: Locale = isLocale(
    typeof body.locale === "string" ? body.locale : null,
  )
    ? (body.locale as Locale)
    : isLocale(headerLocale)
      ? headerLocale
      : (localeFromAcceptLanguage(request.headers.get("accept-language")) ??
        defaultLocale);
  const copy = getDictionary(locale);

  const messages = Array.isArray(body.messages)
    ? body.messages.filter(isUserMessage).slice(-6)
    : [];

  if (!messages.some((message) => message.role === "user")) {
    return json({ error: copy.chatbot.errors.missingMessage }, 400);
  }

  const now = Date.now();
  if (now - rateWindowStarted > 60_000) {
    rateWindowStarted = now;
    rateCount = 0;
  }
  if (rateCount >= 12)
    return json({ error: copy.chatbot.errors.rateLimited }, 429);
  rateCount += 1;

  try {
    const result = await env.AI.run("@cf/google/gemma-4-26b-a4b-it", {
      messages: [buildSystemMessage(locale, copy), ...messages],
      max_tokens: 180,
      chat_template_kwargs: { enable_thinking: false },
    });
    const response = getText(result);

    if (!response) {
      console.error("Unexpected Workers AI response", JSON.stringify(result));
      return json({ error: copy.chatbot.errors.noAnswer }, 502);
    }

    return json({ response });
  } catch (error) {
    console.error("Chatbot request failed", error);
    return json({ error: copy.chatbot.errors.serviceUnavailable }, 503);
  }
}
