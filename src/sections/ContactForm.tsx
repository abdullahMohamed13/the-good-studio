import { useEffect, useRef, useState, type CSSProperties } from "react";
import { siteConfig } from "../data/siteConfig";
import {
  assets,
  collaborationTypes,
  interests,
  startingPoints,
  type StartingPoint,
} from "../data/contactForm";
import { StartingPointPicker } from "../components/StartingPointPicker";
import { WanderingEyes } from "../components/ui/wandering-eyes";

type ContactFormProps = {
  startingPoint: StartingPoint;
  onStartingPointChange: (value: StartingPoint) => void;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-[3px] block font-mono text-[24px] uppercase leading-tight text-[var(--color-secondary)] max-[700px]:text-[19px]">
      {children} <i className="asterisk text-[14px] not-italic opacity-90">*</i>
    </span>
  );
}

export function ContactForm({
  startingPoint,
  onStartingPointChange,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [toastState, setToastState] = useState<
    "hidden" | "visible" | "leaving"
  >("hidden");
  const activePoint =
    startingPoints.find((point) => point.id === startingPoint) ??
    startingPoints[0];

  useEffect(() => {
    if (!isSubmitting) return;

    const timeout = window.setTimeout(() => {
      setIsSubmitting(false);
      formRef.current?.reset();
      setToastState("visible");
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [isSubmitting]);

  useEffect(() => {
    if (toastState !== "visible") return;

    const timeout = window.setTimeout(() => setToastState("leaving"), 3500);
    return () => window.clearTimeout(timeout);
  }, [toastState]);

  useEffect(() => {
    if (toastState !== "leaving") return;

    const timeout = window.setTimeout(() => setToastState("hidden"), 280);
    return () => window.clearTimeout(timeout);
  }, [toastState]);

  return (
    <>
      <form
        ref={formRef}
        className="space-y-[12px]"
        action={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
          activePoint.subject,
        )}`}
        method="post"
        encType="text/plain"
        onSubmit={(event) => {
          event.preventDefault();
          setToastState("hidden");
          setIsSubmitting(true);
        }}
      >
        <div className="min-[701px]:hidden">
          <span className="mb-[6px] block font-mono text-[8px] uppercase tracking-[0.06em] text-[var(--color-secondary)]">
            Start with
          </span>
          <StartingPointPicker
            value={startingPoint}
            onChange={onStartingPointChange}
          />
        </div>
        <label className="block">
          <FieldLabel>Name</FieldLabel>
          <input
            className="contact-field"
            name="Name"
            placeholder="Name"
            required
            autoComplete="name"
          />
        </label>
        <label className="block">
          <FieldLabel>Email</FieldLabel>
          <input
            className="contact-field"
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

        {startingPoint === "project" && (
          <>
            <fieldset className="border-0 p-0">
              <legend className="mb-[8px] font-mono text-[24px] uppercase leading-tight text-[var(--color-secondary)] max-[700px]:text-[19px]">
                I’m interested in...{" "}
                <i className="asterisk text-[14px] not-italic opacity-90">*</i>
              </legend>
              <div className="flex flex-wrap gap-[10px]">
                {interests.map((interest) => (
                  <label key={interest} className="contact-chip">
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
          </>
        )}

        {startingPoint === "collaboration" && (
          <fieldset className="border-0 p-0">
            <legend className="mb-[8px] font-mono text-[24px] uppercase leading-tight text-[var(--color-secondary)] max-[700px]:text-[19px]">
              How could we work together?{" "}
              <i className="asterisk text-[14px] not-italic opacity-90">*</i>
            </legend>
            <div className="flex flex-wrap gap-[10px]">
              {collaborationTypes.map((type) => (
                <label key={type} className="contact-chip">
                  <input
                    className="peer sr-only"
                    type="checkbox"
                    name="Collaboration type"
                    value={type}
                  />
                  {type}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <label className="block">
          <FieldLabel>
            {startingPoint === "hello"
              ? "Your message"
              : startingPoint === "collaboration"
                ? "What are you working on?"
                : "Project details"}
          </FieldLabel>
          <textarea
            className="contact-field min-h-[68px] resize-y"
            name={
              startingPoint === "hello"
                ? "Message"
                : startingPoint === "collaboration"
                  ? "Collaboration details"
                  : "Project details"
            }
            placeholder={
              startingPoint === "hello"
                ? "A note, a thought, a hello — anything goes."
                : startingPoint === "collaboration"
                  ? "Tell us what you’re making and how you’d like to work together."
                  : "Describe your project in detail including deadlines."
            }
            required
          />
        </label>

        {startingPoint === "project" && (
          <fieldset className="border-0 p-0">
            <legend className="mb-[8px] font-mono text-[24px] uppercase leading-tight text-[var(--color-secondary)] max-[700px]:text-[19px]">
              I already have{" "}
              <i className="asterisk text-[14px] not-italic opacity-90">*</i>
            </legend>
            <div className="flex flex-wrap gap-[10px]">
              {assets.map((asset) => (
                <label key={asset} className="contact-chip">
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
        )}

        {startingPoint !== "hello" && (
          <label className="block">
            <FieldLabel>
              Expressing gratitude &amp; giving back to friends
            </FieldLabel>
            <input
              className="contact-field"
              name="Referral"
              placeholder="How did you hear about me?"
            />
          </label>
        )}
        <button
          className="relative inline-flex min-w-[132px] cursor-pointer items-center justify-center overflow-hidden bg-[var(--color-primary)] px-4 py-[10px] font-mono text-[9px] uppercase text-[#f3efe6] disabled:cursor-wait"
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          <span
            className={`transition-opacity duration-200 ${
              isSubmitting ? "opacity-0" : "opacity-100"
            }`}
          >
            {activePoint.submitLabel}
          </span>
          {isSubmitting && (
            <WanderingEyes
              className="!text-[#f3efe6]"
              style={{ "--duration": "3s" } as CSSProperties}
            />
          )}
        </button>
      </form>

      {toastState !== "hidden" && (
        <div
          className={`fixed bottom-6 right-6 z-50 border border-dashed border-[var(--color-secondary)] bg-[var(--color-background)] px-4 py-3 font-mono text-sm text-[var(--color-secondary)] shadow-lg max-[700px]:right-4 max-[700px]:bottom-4 ${
            toastState === "visible" ? "toast-enter" : "toast-leave"
          }`}
          role="status"
          aria-live="polite"
        >
          We got your message
        </div>
      )}
    </>
  );
}
