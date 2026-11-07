import { cn } from "@/lib/utils";

export function GoodMarkFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-[15%] rounded-full bg-[radial-gradient(circle_at_34%_28%,#317959_0%,#102f23_64%)] shadow-[0_40px_80px_-32px_rgba(16,47,35,0.55)]" />
      <span className="slow-spin relative select-none text-[clamp(64px,13vw,150px)] leading-none text-[var(--color-accent)]">
        ✳
      </span>
    </div>
  );
}
