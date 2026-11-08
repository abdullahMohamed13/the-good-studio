import { FormEvent, useState } from "react";
import { LiveOrb } from "./ui/live-orb";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const welcomeMessage: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I’m Good Bot. Ask me about the studio, services, or how we work.",
};

function formatAssistantText(content: string) {
  const withoutMarkdown = content
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/\s+[*-]\s+(?=[A-Z])/g, "\n");

  let listNumber = 0;
  return withoutMarkdown
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      if (/^[^.!?\n]{1,42}:\s/.test(line) && !/^\d+\.\s/.test(line)) {
        listNumber += 1;
        return `${listNumber}. ${line}`;
      }
      return line;
    })
    .join("\n");
}

export function ChatbotOrb() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = input.trim();
    if (!content || isLoading) return;

    const nextMessage: ChatMessage = { role: "user", content };
    const nextMessages = [...messages, nextMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => message.role === "user")
            .slice(-6),
        }),
      });
      const data = (await response.json()) as {
        response?: string;
        error?: string;
      };

      if (!response.ok || !data.response) {
        throw new Error(data.error ?? "The orb could not answer right now.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.response! },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            error instanceof DOMException && error.name === "TimeoutError"
              ? "That took too long. Please try again, or reach us at /contact."
              : error instanceof Error
                ? error.message
                : "The orb could not answer right now.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-auto bottom-5 right-4 z-40 max-[700px]:bottom-4 max-[700px]:right-4">
      <div
        className={`absolute bottom-[calc(100%+12px)] right-0 flex max-h-[460px] w-[320px] origin-bottom-right flex-col border border-dashed border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-primary)] shadow-[6px_6px_0_var(--color-primary)] transition-[opacity,transform,visibility] duration-300 ease-out max-[430px]:w-[calc(100vw-32px)] ${
          isOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
        role="dialog"
        aria-label="Good Studio chatbot"
        aria-hidden={!isOpen}
      >
        <div className="flex items-start justify-between border-b border-dashed border-[var(--color-primary)] p-4">
          <div>
            <span className="font-mono text-[9px] uppercase text-[var(--color-secondary)]">
              GOOD BOT / LIVE
            </span>
            <p className="mt-1 font-serif text-lg leading-[1.2]">
              Ask the studio.
            </p>
          </div>
          <button
            className="font-mono text-xs text-[var(--color-accent)]"
            type="button"
            onClick={() => setIsOpen(false)}
            tabIndex={isOpen ? 0 : -1}
            aria-label="Close chatbot"
          >
            ×
          </button>
        </div>

        <div className="flex min-h-[150px] flex-col gap-3 overflow-y-auto p-4 font-mono text-[10px] leading-[1.45]">
          {messages.map((message, index) => (
            <p
              className={
                message.role === "user"
                  ? "self-end border border-dashed border-[var(--color-accent)] px-2 py-1 text-right"
                  : "max-w-[245px] whitespace-pre-line border-l-2 border-[var(--color-secondary)] pl-2"
              }
              key={`${message.role}-${index}`}
            >
              {message.role === "assistant"
                ? formatAssistantText(message.content)
                : message.content}
            </p>
          ))}
          {isLoading && (
            <p className="border-l-2 border-[var(--color-secondary)] pl-2 opacity-60">
              The orb is thinking…
            </p>
          )}
        </div>

        <p className="px-4 pb-2 font-mono text-[9px] opacity-60">
          Answers are based on information published on this website.
        </p>
        <a
          className="px-4 pb-3 font-mono text-[10px] text-[var(--color-accent)]"
          href="/contact"
        >
          Need a specific answer? Contact the studio ↗
        </a>

        <form
          className="flex border-t border-dashed border-[var(--color-primary)] p-2"
          onSubmit={sendMessage}
        >
          <input
            className="min-w-0 flex-1 bg-transparent px-2 py-2 font-mono text-[10px] outline-none placeholder:text-[var(--color-secondary)]"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask something good…"
            maxLength={1000}
            disabled={!isOpen}
            aria-label="Chat message"
          />
          <button
            className="px-2 font-mono text-[10px] uppercase text-[var(--color-accent)] disabled:opacity-40"
            type="submit"
            disabled={!isOpen || isLoading || !input.trim()}
          >
            Send ↗
          </button>
        </form>
      </div>
      <button
        className="group relative block rounded-full border-0 bg-transparent p-0"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        aria-expanded={isOpen}
      >
        <LiveOrb
          size={76}
          variant="custom"
          color="#102f23"
          eyeColor="#ee6845"
          interactive
          blink
          className="transition-transform duration-200 group-hover:scale-105"
        />
      </button>
    </div>
  );
}
