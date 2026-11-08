import { services } from "../data/services";
import { Reveal } from "../components/animations/Reveal";

export function Services() {
  return (
    <section
      className="bg-[var(--color-primary)] px-[8.5%] py-[92px] text-[var(--color-background)] max-[700px]:px-[7%] max-[700px]:py-[72px]"
      id="services"
    >
      <div className="grid grid-cols-[1.1fr_0.9fr] items-end gap-10 max-[700px]:grid-cols-1 max-[700px]:gap-7">
        <Reveal>
          <div>
            <span className="font-mono text-[10px] tracking-[0.08em] text-[var(--color-accent)]">
              01 / WHAT WE DO
            </span>
            <h2 className="mt-[19px] max-w-[760px] text-[clamp(58px,8.4vw,120px)] font-medium leading-[0.84] tracking-[-0.095em]">
              Good ideas,
              <br />
              <em className="font-medium tracking-[-0.08em] text-[var(--color-accent)] [font-family:'Playfair_Display',serif]">
                well made.
              </em>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="mb-1 max-w-[290px] text-[14px] leading-[1.5] text-[var(--color-background)] opacity-80 max-[700px]:max-w-[330px] max-[700px]:text-[13px]">
            A small, curious studio for brands that want to feel like themselves
            — only more so. <span className="asterisk">✳</span>
          </p>
        </Reveal>
      </div>

      <div className="mt-[83px] grid grid-cols-4 gap-x-[18px] max-[900px]:grid-cols-2 max-[900px]:gap-y-12 max-[560px]:mt-[58px] max-[560px]:grid-cols-1 max-[560px]:gap-y-9">
        {services.map((service, index) => (
          <Reveal key={service.number} delay={index * 90}>
            <article className="group border-t border-dashed border-[color-mix(in_srgb,var(--color-background)_45%,transparent)] pt-[15px] transition-colors duration-300 hover:border-[var(--color-accent)]">
              <div className="flex items-start justify-between gap-3 font-mono text-[10px] text-[var(--color-accent)]">
                <span>{service.number}</span>
                <span
                  className="transition-transform duration-500 group-hover:rotate-90"
                  aria-hidden="true"
                >
                  ✳
                </span>
              </div>
              <h3 className="mt-[35px] text-[clamp(27px,2.7vw,42px)] font-medium leading-[0.95] tracking-[-0.07em] transition-[color,transform] duration-500 group-hover:-translate-y-1 group-hover:text-[var(--color-accent)]">
                {service.title}
              </h3>
              <p className="mt-[21px] max-w-[230px] text-[13px] leading-[1.45] text-[var(--color-background)] opacity-80">
                {service.description}
              </p>
              <span className="mt-[31px] block font-mono text-[9px] leading-[1.35] tracking-[0.04em] text-[var(--color-background)] opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                {service.tags}
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
