import { Suspense, lazy } from "react";
import { useMediaQuery } from "../lib/useMediaQuery";
import { GoodMarkFallback } from "../components/three/GoodMarkFallback";
import { useI18n } from "../i18n";
import { SegmentedText } from "../components/ui/SegmentedText";

const GoodMarkCanvas = lazy(() => import("../components/three/GoodMarkCanvas"));

export function Hero() {
  const show3D = useMediaQuery("(min-width: 768px)");
  const { copy } = useI18n();

  return (
    <section
      className="relative isolate flex h-[calc(100svh-83px)] min-h-[650px] flex-col justify-center overflow-hidden px-[8.5%] py-[48px] pb-[44px] before:absolute before:inset-0 before:-z-10 before:bg-[url('/background-image.png')] before:bg-contain before:bg-center before:opacity-25 before:content-[''] max-[700px]:px-[7%] max-[700px]:py-[85px] max-[700px]:pb-[42px]"
      id="top"
    >
      <div
        className="pointer-events-none absolute right-[2.5%] top-[8%] z-0 hidden w-[30vw] min-w-[250px] max-w-[420px] md:block"
        aria-hidden="true"
      >
        <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_34%_30%,rgba(49,121,89,0.18),transparent_66%)]" />
        <div className="absolute inset-0 rounded-full border border-dashed border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]" />
        <div className="absolute bottom-[10%] left-1/2 h-[8%] w-[44%] -translate-x-1/2 rounded-[50%] bg-[var(--color-primary)] opacity-20 blur-2xl" />
        <div className="stage-fade relative aspect-square w-full">
          {show3D ? (
            <Suspense fallback={<GoodMarkFallback />}>
              <GoodMarkCanvas />
            </Suspense>
          ) : (
            <GoodMarkFallback />
          )}
        </div>
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--color-secondary)]">
          {copy.hero.figure}
        </span>
      </div>

      <div
        className="hero-rise relative z-10 flex flex-wrap items-center gap-[15px] font-mono text-[10px] tracking-[0.08em] max-[700px]:gap-2 max-[700px]:text-[8px]"
        style={{ animationDelay: "40ms" }}
      >
        <span className="asterisk text-xl">✳</span> {copy.hero.kicker}{" "}
        <span>{copy.hero.kickerLocation}</span>
      </div>

      <h1
        className={`relative z-10 my-[42px] mb-[36px] max-w-[1180px] font-semibold leading-[0.85] tracking-[-0.095em] max-[700px]:my-[45px] max-[700px]:mb-[36px] md:max-w-[76vw] text-[clamp(50px,7.8vw,108px)] max-[700px]:text-[clamp(48px,13.5vw,82px)]`}
      >
        {copy.hero.headline.map((line, index) => (
          <span
            className="hero-rise mb-[6px] block last:mb-0"
            style={{ animationDelay: `${140 + index * 100}ms` }}
            key={index}
          >
            <SegmentedText segments={line} highlight />
          </span>
        ))}
      </h1>

      <div
        className="hero-rise relative z-10 grid grid-cols-3 items-end max-[700px]:grid-cols-2 max-[700px]:gap-[25px]"
        style={{ animationDelay: "500ms" }}
      >
        <p className="m-0 text-[15px] leading-[1.5]">
          {copy.hero.introLine1}
          <br />
          {copy.hero.introLine2}
          <span className="asterisk">*</span>
        </p>
        <a
          href="#work"
          className="group justify-self-center font-mono text-[10px] text-[var(--color-accent)] no-underline max-[700px]:justify-self-end"
        >
          {copy.hero.scroll}{" "}
          <span className="bob ml-3 inline-block text-[var(--color-primary)]">
            ↓
          </span>
        </a>
        <small className="justify-self-end text-[10px] leading-[1.5] max-[700px]:col-span-full max-[700px]:justify-self-start">
          <span className="asterisk">✳</span> {copy.hero.footnoteLine1}
          <br />
          {copy.hero.footnoteLine2}
        </small>
      </div>
    </section>
  );
}
