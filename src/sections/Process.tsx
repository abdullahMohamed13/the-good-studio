import { useI18n } from "../i18n";
import { getProcessSteps } from "../i18n/content";
import { ProcessInteractor } from "@/components/ui/connoisseur-stack-interactor";
import { Reveal } from "../components/animations/Reveal";
import { SegmentedText } from "../components/ui/SegmentedText";

export function Process() {
  const { locale, copy } = useI18n();
  const processItems = getProcessSteps(locale).map((step, index) => ({
    num: step.number,
    name: step.title,
    clipId: `process-step-${index}`,
    image: step.image,
    outcome: step.outcome,
    description: step.description,
  }));

  return (
    <section
      className="bg-[var(--color-accent)] px-[8.5%] py-[30px] text-[var(--color-primary)] selection:bg-[var(--color-primary)] selection:text-[var(--color-background)] max-[700px]:px-[7%]"
      id="process"
    >
      <div className="grid grid-cols-[1fr_1fr] items-end gap-10 border-b border-dashed border-[var(--color-primary)] pb-[43px] max-[700px]:grid-cols-1 max-[700px]:gap-7 max-[700px]:pb-[32px]">
        <Reveal>
          <div>
            <span className="font-mono text-[10px] tracking-[0.08em] text-[var(--color-background)]">
              {copy.process.eyebrow}
            </span>
            <h2 className="mt-[15px] max-w-[680px] text-[clamp(50px,7vw,96px)] text-[var(--color-background)] font-medium leading-[0.88] tracking-[-0.09em]">
              <SegmentedText segments={copy.process.headline} />
            </h2>
          </div>
        </Reveal>
        <Reveal
          delay={120}
          className="justify-self-end max-[700px]:justify-self-start"
        >
          <p className="mb-[5px] max-w-[275px] justify-self-end text-[13px] leading-[1.5] max-[700px]:justify-self-start max-[700px]:text-[12px]">
            {copy.process.intro}
          </p>
        </Reveal>
      </div>

      <Reveal>
        <ProcessInteractor
          items={processItems}
          navLabel={copy.process.navLabel}
          imageryLabel={copy.process.imageryLabel}
        />
      </Reveal>
    </section>
  );
}
