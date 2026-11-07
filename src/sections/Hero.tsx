export function Hero() {
  return (
    <section
      className="relative isolate flex h-[calc(100svh-83px)] min-h-[650px] max-h-[850px] flex-col justify-center overflow-hidden px-[8.5%] py-[48px] pb-[44px] before:absolute before:inset-0 before:-z-10 before:bg-[url('/background-image.png')] before:bg-contain before:bg-center before:opacity-20 before:content-[''] max-[700px]:h-auto max-[700px]:min-h-[690px] max-[700px]:px-[7%] max-[700px]:py-[85px] max-[700px]:pb-[42px]"
      id="top"
    >
      <div className="flex items-center gap-[15px] font-mono text-[10px] tracking-[0.08em] max-[700px]:flex-wrap max-[700px]:gap-2 max-[700px]:text-[8px]">
        <span className="asterisk asterisk text-xl">✳</span>{" "}
        INDEPENDENT DESIGN STUDIO <span>BASED EVERYWHERE</span>
      </div>
      <h1 className="my-[42px] mb-[36px] max-w-[1100px] text-[clamp(62px,10.1vw,150px)] font-semibold leading-[0.85] tracking-[-0.095em] max-[700px]:my-[45px] max-[700px]:mb-[36px] max-[700px]:text-[clamp(57px,13vw,90px)]">
        WE MAKE
        <br />
        <em className="font-medium tracking-[-0.08em] text-[var(--color-accent)] [font-family:'Playfair_Display',serif]">
          GOOD
        </em>{" "}
        THINGS
        <br />
        FOR{" "}
        <em className="font-medium tracking-[-0.08em] text-[var(--color-secondary)] [font-family:'Playfair_Display',serif]">
          GOOD
        </em>{" "}
        PEOPLE<span>.</span>
      </h1>
      <div className="grid grid-cols-3 items-end max-[700px]:grid-cols-2 max-[700px]:gap-[25px]">
        <p className="m-0 text-[15px] leading-[1.5]">
          Visual design & web development
          <br />
          for phenomenal humans
          <span className="asterisk">*</span>
        </p>
        <a
          href="#work"
          className="justify-self-center font-mono text-[10px] text-[var(--color-accent)] no-underline max-[700px]:justify-self-end"
        >
          SCROLL TO EXPLORE{" "}
          <span className="ml-3 text-[var(--color-primary)]">↓</span>
        </a>
        <small className="justify-self-end text-[10px] leading-[1.5] max-[700px]:col-span-full max-[700px]:justify-self-start">
          <span className="asterisk">✳</span> Coded & designed by humans,
          <br />
          backed by instinct & intuition.
        </small>
      </div>
      {/*<div className="absolute right-[8%] top-[22%] grid h-[105px] w-[105px] rotate-[11deg] content-center rounded-full border border-[var(--color-primary)] text-center font-mono text-[10px] leading-[1.3] text-[var(--color-primary)] max-[700px]:right-[8%] max-[700px]:top-[14%] max-[700px]:h-[76px] max-[700px]:w-[76px] max-[700px]:text-[8px]">
        GOOD
        <br />
        VIBES
        <br />
        <span>ONLY</span>
      </div>*/}
    </section>
  );
}
