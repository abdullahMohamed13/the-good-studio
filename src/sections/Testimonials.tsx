import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../data/testimonials";

export function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"next" | "previous">(
    "next",
  );
  const [animationKey, setAnimationKey] = useState(0);
  const count = testimonials.length;
  const getIndex = (index: number) => (index + count) % count;
  const visibleIndexes = [0, 1, 2, 3].map((offset) =>
    getIndex(startIndex + offset),
  );

  function changeSlide(direction: "next" | "previous") {
    setSlideDirection(direction);
    setAnimationKey((current) => current + 1);
    setStartIndex((current) => getIndex(current - 1));
  }

  function showPrevious() {
    changeSlide("previous");
  }

  function showNext() {
    setSlideDirection("next");
    setAnimationKey((current) => current + 1);
    setStartIndex((current) => getIndex(current + 1));
  }

  return (
    <section
      className="bg-[#f4f0e3] px-[8.5%] py-[105px] max-[700px]:px-[7%] max-[700px]:py-[75px]"
      id="opinions"
    >
      <div className="mb-[43px] flex items-end justify-between max-[700px]:items-start">
        <div>
          <span className="font-mono text-[10px] tracking-[0.08em]">
            KIND WORDS, REAL HUMANS
          </span>
          <h2 className="mt-[15px] text-[clamp(48px,7vw,92px)] font-medium leading-[0.9] tracking-[-0.08em] max-[700px]:text-[56px]">
            People <em>talk</em>
            <span className="asterisk">*</span>
          </h2>
        </div>
        <p className="mb-[5px] mr-[2%] text-[13px] leading-[1.5] max-[700px]:mt-6 max-[700px]:text-[11px]">
          <span className="asterisk">✳</span> The calm authority of
          <br />
          real human feedback.
        </p>
      </div>
      <div className="overflow-hidden" aria-roledescription="carousel">
        <div className="mt-[50px] overflow-hidden max-[700px]:mt-[30px]">
          <div
            key={animationKey}
            className={`grid w-full grid-flow-col gap-[18px] overflow-visible [grid-auto-columns:calc((100%-36px)/3)] max-[700px]:gap-5 max-[700px]:[grid-auto-columns:100%] ${
              slideDirection === "next"
                ? "testimonials-slide-next"
                : "testimonials-slide-previous"
            }`}
          >
            {visibleIndexes.map((index) => {
              const q = testimonials[index];
              return (
                <article
                  className="flex min-h-[260px] flex-col border-t border-[var(--color-accent)] border-dashed py-5 pr-5 pb-3 max-[700px]:min-h-[215px]"
                  key={q.name}
                >
                  <span className="h-[55px] font-serif text-[60px] text-[var(--color-primary)]">
                    “
                  </span>
                  <p className="my-[10px] mb-[35px] max-w-[340px] font-serif text-[21px] leading-[1.38] max-[700px]:text-2xl">
                    {q.quote}
                  </p>
                  <div className="mt-auto flex items-center gap-[11px]">
                    <span className="grid h-[33px] w-[33px] place-items-center rounded-full bg-[var(--color-accent)] font-serif text-base text-[var(--color-background)]">
                      {q.name[0]}
                    </span>
                    <div className="flex flex-col gap-1">
                      <b className="font-mono text-[9px]">{q.name}</b>
                      <small className="font-mono text-[9px] opacity-60">
                        {q.role}
                      </small>
                    </div>
                    <span className="ml-auto font-mono text-[10px] opacity-50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="mt-7 flex items-center justify-between font-mono text-[10px]">
          <span aria-live="polite">
            {String(startIndex + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            <button
              className="grid h-[38px] w-[38px] cursor-pointer place-items-center rounded-full border border-[#20201d55] bg-transparent text-[var(--color-primary)] transition-colors duration-[180ms] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-background)]"
              type="button"
              onClick={showPrevious}
              aria-label="Show previous testimonials"
            >
              <ChevronLeft size={17} strokeWidth={1.5} />
            </button>
            <button
              className="grid h-[38px] w-[38px] cursor-pointer place-items-center rounded-full border border-[#20201d55] bg-transparent text-[var(--color-primary)] transition-colors duration-[180ms] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-background)]"
              type="button"
              onClick={showNext}
              aria-label="Show next testimonials"
            >
              <ChevronRight size={17} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
