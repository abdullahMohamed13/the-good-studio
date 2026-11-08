import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { StartingPoint } from "../data/contactForm";
import {
  getAssets,
  getCollaborationTypes,
  getInterests,
  getStartingPoints,
} from "../i18n/content";
import { useI18n } from "../i18n";
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
  const { locale, copy } = useI18n();
  const form = copy.contact.form;
  const interests = getInterests(locale);
  const assets = getAssets(locale);
  const collaborationTypes = getCollaborationTypes(locale);
  const startingPoints = getStartingPoints(locale);
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
        onSubmit={(event) => {
          event.preventDefault();
          setToastState("hidden");
          setIsSubmitting(true);
        }}
      >
        <div className="min-[701px]:hidden">
          <span className="mb-[6px] block font-mono text-[8px] uppercase tracking-[0.06em] text-[var(--color-secondary)]">
            {form.startWith}
          </span>
          <StartingPointPicker
            value={startingPoint}
            onChange={onStartingPointChange}
          />
        </div>
        <label className="block">
          <FieldLabel>{form.name}</FieldLabel>
          <input
            className="contact-field"
            name="Name"
            placeholder={form.namePlaceholder}
            required
            autoComplete="name"
          />
        </label>
        <label className="block">
          <FieldLabel>{form.email}</FieldLabel>
          <input
            className="contact-field"
            type="email"
            placeholder={form.emailPlaceholder}
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
          {form.newsletter}
        </label>

        {startingPoint === "project" && (
          <>
            <fieldset className="border-0 p-0">
              <legend className="mb-[8px] font-mono text-[24px] uppercase leading-tight text-[var(--color-secondary)] max-[700px]:text-[19px]">
                {form.interestsLegend}{" "}
                <i className="asterisk text-[14px] not-italic opacity-90">*</i>
              </legend>
              <div className="flex flex-wrap gap-[10px]">
                {interests.map((interest) => (
                  <label key={interest.id} className="contact-chip">
                    <input
                      className="peer sr-only"
                      type="checkbox"
                      name="Interest"
                      value={interest.id}
                    />
                    {interest.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="block">
              <FieldLabel>{form.budget}</FieldLabel>
              <span className="flex w-[136px] items-center border border-dashed border-[var(--color-secondary)] px-[7px] font-mono text-[9px]">
                <span>{form.budgetCurrency}</span>
                <input
                  className="w-full border-0 bg-transparent px-1 py-[7px] font-mono text-[9px] text-[var(--color-primary)] outline-none"
                  type="number"
                  name="Budget"
                  min="0"
                  aria-label={form.budgetAria}
                />
              </span>
            </label>
          </>
        )}

        {startingPoint === "collaboration" && (
          <fieldset className="border-0 p-0">
            <legend className="mb-[8px] font-mono text-[24px] uppercase leading-tight text-[var(--color-secondary)] max-[700px]:text-[19px]">
              {form.collaborationLegend}{" "}
              <i className="asterisk text-[14px] not-italic opacity-90">*</i>
            </legend>
            <div className="flex flex-wrap gap-[10px]">
              {collaborationTypes.map((type) => (
                <label key={type.id} className="contact-chip">
                  <input
                    className="peer sr-only"
                    type="checkbox"
                    name="Collaboration type"
                    value={type.id}
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <label className="block">
          <FieldLabel>{form.messageLabels[startingPoint]}</FieldLabel>
          <textarea
            className="contact-field min-h-[68px] resize-y"
            name={
              startingPoint === "hello"
                ? "Message"
                : startingPoint === "collaboration"
                  ? "Collaboration details"
                  : "Project details"
            }
            placeholder={form.messagePlaceholders[startingPoint]}
            required
          />
        </label>

        {startingPoint === "project" && (
          <fieldset className="border-0 p-0">
            <legend className="mb-[8px] font-mono text-[24px] uppercase leading-tight text-[var(--color-secondary)] max-[700px]:text-[19px]">
              {form.assetsLegend}{" "}
              <i className="asterisk text-[14px] not-italic opacity-90">*</i>
            </legend>
            <div className="flex flex-wrap gap-[10px]">
              {assets.map((asset) => (
                <label key={asset.id} className="contact-chip">
                  <input
                    className="sr-only"
                    type="checkbox"
                    name="Already have"
                    value={asset.id}
                  />
                  {asset.label}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {startingPoint !== "hello" && (
          <label className="block">
            <FieldLabel>{form.referralLegend}</FieldLabel>
            <input
              className="contact-field"
              name="Referral"
              placeholder={form.referralPlaceholder}
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
            {activePoint?.submitLabel}
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
          {form.toast}
        </div>
      )}
    </>
  );
}
