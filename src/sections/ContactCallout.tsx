import { useI18n } from "../i18n";
import { localizedPath } from "../lib/routes";
import { Reveal } from "../components/animations/Reveal";
import { Magnetic } from "../components/ui/Magnetic";
import { SegmentedText } from "../components/ui/SegmentedText";

export function ContactCallout() {
  const { locale, copy } = useI18n();

  return (
    <section className="relative isolate min-h-[390px] overflow-hidden bg-[var(--color-primary)] px-[8.5%] py-[40px] text-[#f8f3e9] max-[700px]:min-h-[340px] max-[700px]:px-[7%] max-[700px]:pt-[60px]">
      <span
        className="ghost-spin pointer-events-none absolute -right-[2%] top-1/2 -z-10 -translate-y-1/2 select-none text-[clamp(220px,30vw,420px)] leading-none text-[var(--color-background)] opacity-[0.05]"
        aria-hidden="true"
      >
        ✳
      </span>

      <Reveal>
        <span className="font-mono text-[10px] tracking-[0.08em]">
          {copy.contactCallout.eyebrow}
        </span>
        <h2 className="my-[37px] text-[clamp(76px,12vw,160px)] font-medium leading-[0.77] tracking-[-0.1em] text-[var(--color-background)] max-[700px]:text-[clamp(78px,17vw,120px)]">
          {copy.contactCallout.headline.map((line, index) => (
            <span key={index}>
              <SegmentedText segments={line} />
              {index < copy.contactCallout.headline.length - 1 && <br />}
            </span>
          ))}
        </h2>
      </Reveal>

      <Magnetic className="absolute bottom-12 right-[4%] max-[700px]:bottom-7 max-[700px]:right-[7%]">
        <a
          className="group inline-flex items-center gap-5 rounded-full border border-[var(--color-background)] px-6 py-4 font-mono text-[10px] text-[var(--color-background)] no-underline transition-colors duration-300 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] max-[700px]:gap-3 max-[700px]:px-5 max-[700px]:py-3 max-[700px]:text-[9px]"
          href={localizedPath(locale, "/contact")}
        >
          {copy.contactCallout.cta}{" "}
          <span
            className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            aria-hidden="true"
          >
            ↗
          </span>
        </a>
      </Magnetic>
    </section>
  );
}
