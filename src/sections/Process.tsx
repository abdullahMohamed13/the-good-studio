import { processSteps } from "../data/processSteps";

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

      <div>
        {processSteps.map((step, index) => (
          <article
            className={`grid grid-cols-[0.15fr_0.85fr_0.8fr] py-[28px] max-[700px]:grid-cols-[48px_1fr] max-[700px]:gap-4 max-[700px]:py-[23px] ${
              index < processSteps.length - 1
                ? "border-b border-dashed border-[color-mix(in_srgb,var(--color-primary)_45%,transparent)]"
                : ""
            }`}
            key={step.number}
          >
            <span className="font-mono text-[32px] text-[var(--color-background)]">
              {step.number}
            </span>
            <div>
              <h3 className="text-[clamp(27px,3vw,43px)] font-medium leading-[0.95] tracking-[-0.07em]">
                {step.title}
              </h3>
              <p className="mt-[14px] max-w-[390px] text-[14px] leading-[1.45] max-[700px]:text-[13px]">
                {step.description}
              </p>
            </div>
            <span className="self-center justify-self-end text-right font-mono text-[10px] uppercase leading-[1.4] text-[var(--color-background)] max-[700px]:col-start-2 max-[700px]:justify-self-start max-[700px]:text-left">
              {step.outcome}{" "}
              <span className="ml-2 text-[var(--color-primary)]">↗</span>
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
