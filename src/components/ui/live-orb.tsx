import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type LiveOrbVariant = "white" | "black" | "webgl" | "custom";
export type LiveOrbTheme = "light" | "dark" | "auto";

export type LiveOrbOptions = {
  variant?: LiveOrbVariant;
  theme?: LiveOrbTheme;
  color?: string;
  eyeColor?: string;
  colors?: string[];
  interactive?: boolean;
  blink?: boolean;
};

export type LiveOrbProps = LiveOrbOptions & {
  className?: string;
  size?: number;
};

const presets = {
  white: { color: "#F4F4F5", eyeColor: "#09090B" },
  black: { color: "#18181B", eyeColor: "#F4F4F5" },
  custom: { color: "#7C5CFF", eyeColor: "#FAFAFA" },
};

const webglColors = ["#7C6AF7", "#7DD3C7", "#E8B4D4"];

function isDarkTheme(theme: LiveOrbTheme = "auto") {
  if (theme === "dark") return true;
  if (theme === "light") return false;
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function hexToRgb(hex: string) {
  const cssVariable = hex.match(/^var\((--[^)]+)\)$/)?.[1];
  const resolved = cssVariable
    ? getComputedStyle(document.documentElement)
        .getPropertyValue(cssVariable)
        .trim()
    : hex;
  const value = resolved.replace("#", "");
  const normalized =
    value.length === 3
      ? value
          .split("")
          .map((character) => character + character)
          .join("")
      : value.padEnd(6, "0").slice(0, 6);
  const number = Number.parseInt(normalized, 16);
  return [(number >> 16) & 255, (number >> 8) & 255, number & 255] as const;
}

function resolveColors(
  variant: LiveOrbVariant | undefined,
  color: string | undefined,
  eyeColor: string | undefined,
  colors: string[] | undefined,
  theme: LiveOrbTheme | undefined,
) {
  const resolvedVariant = variant ?? (isDarkTheme(theme) ? "white" : "black");
  if (resolvedVariant === "webgl") {
    return {
      body: colors?.[1] ?? webglColors[1],
      eye: "#0C0C10",
      palette: colors?.length ? colors : webglColors,
      gradient: true,
    };
  }
  const preset =
    presets[resolvedVariant === "custom" ? "custom" : resolvedVariant];
  return {
    body: color ?? preset.color,
    eye: eyeColor ?? preset.eyeColor,
    palette: [color ?? preset.color],
    gradient: false,
  };
}

export function LiveOrb({
  className,
  size = 280,
  variant,
  theme = "auto",
  color,
  eyeColor,
  colors,
  interactive = true,
  blink = true,
}: LiveOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0.08;
    let blinkAt = 0;
    let last = performance.now();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const draw = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, rect.width, rect.height);

      const resolved = resolveColors(variant, color, eyeColor, colors, theme);
      const radius = Math.min(rect.width, rect.height) * 0.47;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const body = resolved.gradient
        ? context.createLinearGradient(0, 0, rect.width, rect.height)
        : null;
      if (body) {
        const palette = resolved.palette;
        body.addColorStop(0, palette[0] ?? webglColors[0]);
        body.addColorStop(0.5, palette[1] ?? webglColors[1]);
        body.addColorStop(1, palette[2] ?? webglColors[2]);
      }
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.fillStyle = body ?? resolved.body;
      context.fill();

      const elapsed = now - last;
      last = now;
      if (blink && !reduceMotion.matches && now - blinkAt > 3200) {
        blinkAt = now;
      }
      const blinkProgress =
        blink && now - blinkAt < 180
          ? Math.sin(((now - blinkAt) / 180) * Math.PI)
          : 0;
      const eyeHeight = radius * (0.28 - blinkProgress * 0.23);
      const eyeWidth = radius * 0.13;
      const eyeOffset = radius * 0.48;
      const lookX = interactive ? pointerX * radius * 0.12 : 0;
      const lookY = interactive ? pointerY * radius * 0.08 : radius * 0.006;
      context.fillStyle = resolved.eye;
      for (const eyeX of [centerX - eyeOffset, centerX + eyeOffset]) {
        context.beginPath();
        context.ellipse(
          eyeX + lookX,
          centerY + lookY,
          eyeWidth,
          Math.max(1, eyeHeight),
          0,
          0,
          Math.PI * 2,
        );
        context.fill();
      }

      if (!reduceMotion.matches && (interactive || elapsed > 0)) {
        frame = requestAnimationFrame(draw);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      pointerX = Math.max(
        -1,
        Math.min(
          1,
          (event.clientX - rect.left - rect.width / 2) / (rect.width / 2),
        ),
      );
      pointerY = Math.max(
        -1,
        Math.min(
          1,
          (rect.height / 2 - (event.clientY - rect.top)) / (rect.height / 2),
        ),
      );
    };

    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener("pointermove", onPointerMove);
    };
  }, [variant, theme, color, eyeColor, colors, interactive, blink]);

  return (
    <div
      data-slot="live-orb"
      role="img"
      aria-label="Orb character"
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
