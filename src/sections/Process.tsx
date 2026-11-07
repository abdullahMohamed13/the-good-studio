import { processSteps } from "../data/processSteps";
import { ProcessInteractor } from "@/components/ui/connoisseur-stack-interactor";

const processItems = processSteps.map((step, index) => ({
  num: step.number,
  name: step.title,
  clipId: `process-step-${index}`,
  image: step.image,
  outcome: step.outcome,
  description: step.description,
}));

export function Process() {
  return (
    <section
      className="bg-[var(--color-accent)] px-[8.5%] py-[30px] text-[var(--color-primary)] selection:bg-[var(--color-primary)] selection:text-[var(--color-background)] max-[700px]:px-[7%] max-[700px]:py-[75px]"
      id="process"
    >
      <div className="grid grid-cols-[1fr_1fr] items-end gap-10 border-b border-dashed border-[var(--color-primary)] pb-[43px] max-[700px]:grid-cols-1 max-[700px]:gap-7 max-[700px]:pb-[32px]">
        <div>
          <span className="font-mono text-[10px] tracking-[0.08em] text-[var(--color-background)]">
            THE WAY WE WORK
          </span>
          <h2 className="mt-[15px] max-w-[680px] text-[clamp(50px,7vw,96px)] text-[var(--color-background)] font-medium leading-[0.88] tracking-[-0.09em]">
            A good process makes room for{" "}
            <em className="font-medium text-[var(--color-primary)]">
              good work.
            </em>
          </h2>
        </div>
        <p className="mb-[5px] max-w-[275px] justify-self-end text-[13px] leading-[1.5] max-[700px]:justify-self-start max-[700px]:text-[12px]">
          No mystery boxes. No disappearing acts. Just clear thinking, kind
          collaboration, and a little bit of magic along the way.
        </p>
      </div>

      <ProcessInteractor items={processItems} />
    </section>
  );
}
