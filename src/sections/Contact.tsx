import { useState } from "react";
import { useI18n } from "../i18n";
import type { StartingPoint } from "../data/contactForm";
import { ContactIntro } from "./ContactIntro";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const { copy } = useI18n();
  const [startingPoint, setStartingPoint] = useState<StartingPoint>("project");

  return (
    <div className="bg-[#f3efe6] text-[var(--color-primary)]">
      <div className="flex items-end justify-between border-b border-dashed border-[var(--color-secondary)] px-[10px] pb-[6px] pt-[14px] max-[700px]:items-start max-[700px]:gap-3">
        <h1 className="m-0 text-[clamp(72px,8.5vw,110px)] text-[var(--color-accent)] font-semibold uppercase leading-[0.95] tracking-[-0.065em]">
          {copy.contact.title}
        </h1>
        <p className="mb-[9px] text-right font-mono text-[9px] text-[var(--color-accent)] uppercase leading-[1.5] max-[700px]:hidden">
          {copy.contact.languagesLine1}
          <br />
          {copy.contact.languagesLine2}
        </p>
      </div>
      <main className="grid grid-cols-2 px-[10px] pb-4 pt-[27px] max-[700px]:grid-cols-1 max-[700px]:pt-6">
        <ContactIntro
          startingPoint={startingPoint}
          onStartingPointChange={setStartingPoint}
        />
        <ContactForm
          startingPoint={startingPoint}
          onStartingPointChange={setStartingPoint}
        />
      </main>
    </div>
  );
}
