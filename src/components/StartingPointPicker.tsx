import { useI18n } from "../i18n";
import { getStartingPoints } from "../i18n/content";
import type { StartingPoint } from "../data/contactForm";

type StartingPointPickerProps = {
  value: StartingPoint;
  onChange: (value: StartingPoint) => void;
};

export function StartingPointPicker({
  value,
  onChange,
}: StartingPointPickerProps) {
  const { locale } = useI18n();
  const startingPoints = getStartingPoints(locale);

  return (
    <div className="flex flex-wrap gap-[6px]">
      {startingPoints.map((point) => {
        const isActive = point.id === value;

        return (
          <button
            key={point.id}
            className={`inline-flex cursor-pointer items-center gap-[5px] rounded-[2px] border px-[8px] py-[5px] font-mono text-[8px] uppercase tracking-[0.04em] transition-colors ${
              isActive
                ? "border-solid border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-background)]"
                : "border-dashed border-[var(--color-secondary)] text-[var(--color-primary)] hover:border-solid hover:bg-[var(--color-accent)] hover:text-[var(--color-background)]"
            }`}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(point.id)}
          >
            {point.label}
          </button>
        );
      })}
    </div>
  );
}
