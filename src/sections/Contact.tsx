import { useEffect, useState } from "react";
import { siteConfig } from "../data/siteConfig";

const interests = [
  "Website Design",
  "Squarespace Development",
  "Shopify Development",
  "Web Development (Other)",
  "Collaboration",
  "Site Maintenance",
  "Studio Day",
  "Brand Identity",
  "Something Else",
];

const assets = ["Copy", "Photography / Videos", "Branding Style"];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-[3px] block font-mono text-[24px] uppercase leading-tight text-[var(--color-secondary)] max-[700px]:text-[19px]">
      {children} <i className="asterisk text-[14px] not-italic opacity-90">*</i>
    </span>
  );
}

const fieldClass =
  "block w-full border border-dashed border-[var(--color-secondary)] bg-transparent px-[7px] py-[7px] font-mono text-[9px] text-[var(--color-primary)] outline-none placeholder:text-[var(--color-secondary)]/60 focus:border-solid";
const chipClass =
  "cursor-pointer rounded-[2px] border border-dashed border-[var(--color-secondary)] px-[8px] py-[7px] font-mono text-[9px] text-[var(--color-primary)] has-[:checked]:border-solid has-[:checked]:bg-[var(--color-accent)] has-[:checked]:text-[var(--color-background)]";

export function Contact() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!showToast) return;

    const timeout = window.setTimeout(() => setShowToast(false), 4000);
    return () => window.clearTimeout(timeout);
  }, [showToast]);

  return (
    <div className="min-h-screen border-r-[4px] border-[var(--color-primary)] bg-[#f3efe6] text-[var(--color-primary)]">
      <div className="flex items-end justify-between border-b border-dashed border-[var(--color-secondary)] px-[10px] pb-[6px] pt-[14px] max-[700px]:items-start max-[700px]:gap-3">
        <h1 className="m-0 text-[clamp(72px,8.5vw,110px)] text-[var(--color-accent)] font-semibold uppercase leading-[0.95] tracking-[-0.065em]">
          Contact
        </h1>
        <p className="mb-[9px] text-right font-mono text-[9px] text-[var(--color-accent)] uppercase leading-[1.5] max-[700px]:hidden">
          We speak
          <br />
          English, español &amp; deutsch!
        </p>
      </div>
      <main className="grid grid-cols-2 px-[10px] pb-4 pt-[27px] max-[700px]:grid-cols-1 max-[700px]:pt-6">
        <div aria-hidden="true" />
        <form
          className="space-y-[12px]"
          action={`mailto:${siteConfig.email}`}
          method="post"
          encType="text/plain"
          onSubmit={(event) => {
            event.preventDefault();
            setShowToast(true);
          }}
        >
          <label className="block">
            <FieldLabel>Name</FieldLabel>
            <input
              className={fieldClass}
              name="Name"
              placeholder="Name"
              required
              autoComplete="name"
            />
          </label>
          <label className="block">
            <FieldLabel>Email</FieldLabel>
            <input
              className={fieldClass}
							type="email"
              placeholder="good-person@gmail.com"
              name="Email"
              required
              autoComplete="email"
            />
          </label>
          <label className="flex w-fit cursor-pointer items-center gap-[7px] font-mono text-[9px]">
            <input
              className="accent-[var(--color-secondary)]"
              type="checkbox"
              name="Newsletter"
            />{" "}
            Sign up for news and updates
          </label>

          <fieldset className="border-0 p-0">
            <legend className="mb-[8px] font-mono text-[24px] uppercase leading-tight text-[var(--color-secondary)] max-[700px]:text-[19px]">
              I’m interested in...{" "}
              <i className="asterisk text-[14px] not-italic opacity-90">*</i>
            </legend>
            <div className="flex flex-wrap gap-[10px]">
              {interests.map((interest) => (
                <label key={interest} className={chipClass}>
                  <input
                    className="peer sr-only"
                    type="checkbox"
                    name="Interest"
                    value={interest}
                  />
                  {interest}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <FieldLabel>What’s your budget?</FieldLabel>
            <span className="flex w-[136px] items-center border border-dashed border-[var(--color-secondary)] px-[7px] font-mono text-[9px]">
              <span>$</span>
              <input
                className="w-full border-0 bg-transparent px-1 py-[7px] font-mono text-[9px] text-[var(--color-primary)] outline-none"
                type="number"
                name="Budget"
                min="0"
                aria-label="Budget in USD"
              />
            </span>
          </label>
          <label className="block">
            <FieldLabel>Project details</FieldLabel>
            <textarea
              className={`${fieldClass} min-h-[68px] resize-y`}
              name="Project details"
              placeholder="Describe your project in detail including deadlines."
              required
            />
          </label>

          <fieldset className="border-0 p-0">
            <legend className="mb-[8px] font-mono text-[24px] uppercase leading-tight text-[var(--color-secondary)] max-[700px]:text-[19px]">
              I already have{" "}
              <i className="asterisk text-[14px] not-italic opacity-90">*</i>
            </legend>
            <div className="flex flex-wrap gap-[10px]">
              {assets.map((asset) => (
                <label key={asset} className={chipClass}>
                  <input
                    className="sr-only"
                    type="checkbox"
                    name="Already have"
                    value={asset}
                  />
                  {asset}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <FieldLabel>
              Expressing gratitude &amp; giving back to friends
            </FieldLabel>
            <input
              className={fieldClass}
              name="Referral"
              placeholder="How did you hear about me?"
            />
          </label>
          <button
            className="bg-[var(--color-primary)] px-4 py-[10px] font-mono text-[9px] uppercase text-[#f3efe6]"
            type="submit"
          >
            Submit
          </button>
        </form>
      </main>
      {showToast && (
        <div
          className="fixed bottom-6 right-6 z-50 border border-dashed border-[var(--color-secondary)] bg-[var(--color-background)] px-4 py-3 font-mono text-sm text-[var(--color-secondary)] shadow-lg max-[700px]:right-4 max-[700px]:bottom-4"
          role="status"
          aria-live="polite"
        >
          We got your message
        </div>
      )}
    </div>
  );
}
