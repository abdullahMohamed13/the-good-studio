import type React from "react";
import { cn } from "../../lib/utils";

type WanderingEyesProps = React.ComponentProps<"span"> & {
  eyeScale?: number;
  gapScale?: number;
  pupilScale?: number;
  blinkScale?: number;
  travelScale?: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function WanderingEyes({
  className,
  style,
  eyeScale = 0.62,
  gapScale = 0.09,
  pupilScale = 0.32,
  blinkScale = 0.375,
  travelScale = 0.3125,
  ...props
}: WanderingEyesProps) {
  const eyesStyle = {
    ...style,
    "--loading-ui-wandering-eyes-eye": `${(clamp(eyeScale, 0.28, 0.7) * 100).toFixed(2)}cqmin`,
    "--loading-ui-wandering-eyes-gap": `${(clamp(gapScale, 0.04, 0.3) * 100).toFixed(2)}cqmin`,
    "--loading-ui-wandering-eyes-pupil-scale": `${clamp(pupilScale, 0.12, 0.45)}`,
    "--loading-ui-wandering-eyes-blink": `${clamp(blinkScale, 0.15, 1)}`,
    "--loading-ui-wandering-eyes-travel-scale": `${clamp(travelScale, 0.08, 0.5)}`,
  } as React.CSSProperties;

  return (
    <>
      <style>{`
      @keyframes loading-ui-wandering-eyes-move { 0%,10%,93%,100%{background-position:0 0} 13%,40%{background-position:calc(var(--loading-ui-wandering-eyes-eye)*var(--loading-ui-wandering-eyes-travel-scale)*-1) 0} 43%,70%{background-position:calc(var(--loading-ui-wandering-eyes-eye)*var(--loading-ui-wandering-eyes-travel-scale)) 0} 73%,90%{background-position:0 calc(var(--loading-ui-wandering-eyes-eye)*var(--loading-ui-wandering-eyes-travel-scale))} }
      @keyframes loading-ui-wandering-eyes-blink { 0%,10%,12%,20%,22%,40%,42%,60%,62%,70%,72%,90%,92%,98%,100%{height:var(--loading-ui-wandering-eyes-eye)} 11%,21%,41%,61%,71%,91%,99%{height:calc(var(--loading-ui-wandering-eyes-eye)*var(--loading-ui-wandering-eyes-blink))} }
    `}</style>
      <span
        role="status"
        className={cn(
          "[container-type:size] absolute inset-0 inline-flex aspect-[9/4] items-center justify-center text-[var(--color-primary)] [z-index:1]",
          className,
        )}
        style={eyesStyle}
        {...props}
      >
        <span
          aria-hidden="true"
          className="inline-flex items-center gap-[var(--loading-ui-wandering-eyes-gap)]"
        >
          {Array.from({ length: 2 }, (_, index) => (
            <span
              key={index}
              className="inline-block h-[var(--loading-ui-wandering-eyes-eye)] w-[var(--loading-ui-wandering-eyes-eye)] animate-[loading-ui-wandering-eyes-move_var(--duration,10s)_infinite,loading-ui-wandering-eyes-blink_var(--duration,10s)_infinite] rounded-full bg-[color-mix(in_srgb,currentColor_16%,transparent)] bg-[radial-gradient(circle_calc(var(--loading-ui-wandering-eyes-eye)*var(--loading-ui-wandering-eyes-pupil-scale)),currentColor_100%,transparent_0)] bg-no-repeat"
            />
          ))}
        </span>
        <span className="sr-only">Loading</span>
      </span>
    </>
  );
}

export { WanderingEyes };
export default WanderingEyes;
