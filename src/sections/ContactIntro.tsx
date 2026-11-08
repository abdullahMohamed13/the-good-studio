import { siteConfig } from "../data/siteConfig";
import type { StartingPoint } from "../data/contactForm";
import { StartingPointPicker } from "../components/StartingPointPicker";
import { useI18n } from "../i18n";
import { SegmentedText } from "../components/ui/SegmentedText";
import contactGif from "../assets/contact.gif";

type ContactIntroProps = {
  startingPoint: StartingPoint;
  onStartingPointChange: (value: StartingPoint) => void;
};

export function ContactIntro({
  startingPoint,
  onStartingPointChange,
}: ContactIntroProps) {
  const { copy } = useI18n();
  const intro = copy.contact.intro;

  return (
    <div className="relative isolate pr-[8%] max-[700px]:hidden">
      <div className="sticky top-[100px] flex flex-col">
        <span
          className="ghost-spin pointer-events-none absolute -top-[3%] -z-10 select-none text-[clamp(180px,20vw,280px)] leading-none text-[var(--color-secondary)] opacity-[0.2]"
          aria-hidden="true"
        >
          ✳
        </span>

        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-secondary)]">
          {intro.eyebrow}
        </span>
        <h2 className="mt-[14px] text-[clamp(38px,4vw,58px)] font-medium leading-[0.95] tracking-[-0.06em]">
          {intro.headline.map((line, index) => (
            <span key={index}>
              <SegmentedText segments={line} />
              {index < intro.headline.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <p className="mt-[16px] max-w-[34ch] text-[13px] leading-[1.5]">
          {intro.description}
        </p>

        <div className="mt-[18px]">
          <span className="block font-mono text-[8px] uppercase tracking-[0.06em] text-[var(--color-secondary)]">
            {intro.startWith}
          </span>
          <div className="mt-[7px]">
            <StartingPointPicker
              value={startingPoint}
              onChange={onStartingPointChange}
            />
          </div>
        </div>

        <figure className="mt-[26px]">
          <div className="border border-dashed border-[var(--color-secondary)] bg-[#f8f4ea] p-[6px]">
            <img
              className="block w-full rounded-[2px] object-cover"
              src={contactGif}
              alt={intro.figureAlt}
              loading="lazy"
            />
          </div>
          <figcaption className="mt-[7px] flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.06em] text-[var(--color-secondary)]">
            <span>{intro.figureCaption}</span>
            <span className="asterisk" aria-hidden="true">
              ✳
            </span>
          </figcaption>
        </figure>

        <div className="mt-[24px] border-t border-dashed border-[var(--color-secondary)] pt-[14px]">
          <span className="block font-mono text-[8px] uppercase tracking-[0.06em] text-[var(--color-secondary)]">
            {intro.directLine}
          </span>
          <a
            className="mt-[5px] inline-flex items-center gap-[6px] font-mono text-[11px] lowercase text-[var(--color-primary)] underline decoration-dashed underline-offset-4 transition-colors hover:text-[var(--color-accent)]"
            href={`mailto:${siteConfig.email}`}
          >
            {siteConfig.email}
            <span aria-hidden="true">↗</span>
          </a>
          <p className="mt-[7px] font-mono text-[8px] uppercase tracking-[0.04em] opacity-60">
            {intro.replyTime}
          </p>
        </div>

        <span className="mt-[22px] font-mono text-[8px] uppercase tracking-[0.18em] text-[var(--color-secondary)] opacity-70">
          {intro.signature}
        </span>
      </div>
    </div>
  );
}
