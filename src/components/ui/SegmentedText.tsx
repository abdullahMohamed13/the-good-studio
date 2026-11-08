import type { Segment } from "../../i18n/types";

const toneClasses = {
  accent: "text-[var(--color-accent)]",
  secondary: "text-[var(--color-secondary)]",
  primary: "text-[var(--color-primary)]",
} as const;

const highlightClasses = {
  accent:
    "inline-block rounded-3xl bg-[var(--color-accent)] p-2 pr-4 text-white",
  secondary:
    "inline-block rounded-3xl bg-[var(--color-secondary)] p-2 pr-4 text-white",
  primary:
    "inline-block rounded-3xl bg-[var(--color-primary)] p-2 pr-4 text-white",
} as const;

export function SegmentedText({
  segments,
  highlight = false,
}: {
  segments: Segment[];
  highlight?: boolean;
}) {
  return (
    <>
      {segments.map((segment, index) => {
        const isHighlighted = highlight && Boolean(segment.tone);
        const classes = [
          isHighlighted && segment.tone
            ? highlightClasses[segment.tone]
            : segment.tone
              ? toneClasses[segment.tone]
              : "",
          segment.italic && segment.serif
            ? "font-medium tracking-[-0.08em] [font-family:'Playfair_Display',serif]"
            : "",
          segment.underline ? "underline" : "",
        ]
          .filter(Boolean)
          .join(" ");
        const Tag = segment.italic ? "em" : "span";

        return (
          <Tag className={classes || undefined} key={index}>
            {segment.text}
          </Tag>
        );
      })}
    </>
  );
}
