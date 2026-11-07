import { siteConfig } from "../data/siteConfig";

export function ContactCallout() {
  return (
    <section className="relative min-h-[390px] bg-[var(--color-primary)] px-[8.5%] py-[40px] text-[#f8f3e9] max-[700px]:min-h-[340px] max-[700px]:px-[7%] max-[700px]:pt-[60px]">
      <span className="font-mono text-[10px] tracking-[0.08em]">
        HAVE A GOOD ONE IN MIND?
      </span>
      <h2 className="text-[var(--color-background)] my-[37px] text-[clamp(76px,12vw,160px)] font-medium leading-[0.77] tracking-[-0.1em] max-[700px]:text-[clamp(78px,17vw,120px)]">
        Let’s make
        <br />
        <em className="font-medium tracking-[-0.08em] text-[var(--color-accent)] [font-family:'Playfair_Display',serif]">
          waves.
        </em>
      </h2>
      <a
        className="absolute bottom-12 right-[4%] inline-flex items-center gap-5 rounded-full border border-[var(--color-background)] px-6 py-4 font-mono text-[10px] text-[var(--color-background)] no-underline transition-colors duration-200 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] max-[700px]:bottom-7 max-[700px]:gap-3 max-[700px]:px-5 max-[700px]:py-3 max-[700px]:text-[9px]"
        href="/contact"
      >
        TELL US ABOUT IT <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
