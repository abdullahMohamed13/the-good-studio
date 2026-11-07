import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export interface ProcessVisualItem {
  num: string;
  name: string;
  clipId: string;
  image: string;
  outcome: string;
  description: string;
}

interface ComponentProps {
  items: ProcessVisualItem[];
  className?: string;
}

export function ProcessInteractor({ items, className }: ComponentProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<SVGImageElement>(null);
  const mainGroupRef = useRef<SVGGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const firstItem = items[0];
      if (!firstItem || !imageRef.current || !mainGroupRef.current) return;

      const shapes = `#${firstItem.clipId} .path`;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      gsap.set(shapes, { scale: reducedMotion ? 1 : 0, transformOrigin: "50% 50%" });
      if (reducedMotion) return;

      timelineRef.current = gsap
        .timeline({ repeat: -1, repeatDelay: 1 })
        .to(shapes, {
          scale: 1,
          duration: 0.8,
          stagger: { amount: 0.4, from: "random" },
          ease: "expo.out",
        })
        .to(shapes, {
          scale: 1.05,
          duration: 1.5,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
          stagger: { amount: 0.2, from: "center" },
        })
        .to(shapes, {
          scale: 0,
          duration: 0.6,
          stagger: { amount: 0.3, from: "edges" },
          ease: "expo.in",
        });
    }, containerRef);

    return () => {
      timelineRef.current?.kill();
      context.revert();
    };
  }, [items]);

  const selectItem = (index: number) => {
    if (index === activeIndex) return;
    const item = items[index];
    if (!item || !imageRef.current || !mainGroupRef.current) return;

    timelineRef.current?.kill();
    setActiveIndex(index);
    imageRef.current.setAttribute("href", item.image);
    mainGroupRef.current.setAttribute("clip-path", `url(#${item.clipId})`);

    const shapes = `#${item.clipId} .path`;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    gsap.set(shapes, { scale: reducedMotion ? 1 : 0, transformOrigin: "50% 50%" });
    if (reducedMotion) return;

    timelineRef.current = gsap
      .timeline({ repeat: -1, repeatDelay: 1 })
      .to(shapes, {
        scale: 1,
        duration: 0.8,
        stagger: { amount: 0.4, from: "random" },
        ease: "expo.out",
      })
      .to(shapes, {
        scale: 1.05,
        duration: 1.5,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
        stagger: { amount: 0.2, from: "center" },
      })
      .to(shapes, {
        scale: 0,
        duration: 0.6,
        stagger: { amount: 0.3, from: "edges" },
        ease: "expo.in",
      });
  };

  const activeItem = items[activeIndex];
  if (!activeItem) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "grid items-center gap-8 py-10 md:grid-cols-[1fr_0.8fr] md:gap-12 md:py-14",
        className,
      )}
    >
      <nav aria-label="Our process">
        <ul className="flex flex-col gap-8 md:gap-10">
          {items.map((item, index) => (
            <li key={item.num}>
              <button
                type="button"
                aria-pressed={activeIndex === index}
                onMouseEnter={() => selectItem(index)}
                onFocus={() => selectItem(index)}
                onClick={() => selectItem(index)}
                className="group w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]"
              >
                <span className="flex items-start gap-5 md:gap-6">
                  <span
                    className={cn(
                      "mt-1 font-mono text-xl transition-colors",
                      activeIndex === index
                        ? "text-[var(--color-background)]"
                        : "text-[color-mix(in_srgb,var(--color-primary)_55%,transparent)]",
                    )}
                  >
                    {item.num}
                  </span>
                  <span>
                    <span
                      className={cn(
                        "block text-[clamp(32px,5vw,62px)] font-medium leading-[0.9] tracking-[-0.07em] transition-transform duration-500",
                        activeIndex === index
                          ? "translate-x-2 text-[var(--color-background)]"
                          : "text-transparent [-webkit-text-stroke:1px_color-mix(in_srgb,var(--color-primary)_55%,transparent)]",
                      )}
                    >
                      {item.name}
                    </span>
                    <span
                      className={cn(
                        "mt-3 block overflow-hidden font-mono text-[10px] uppercase tracking-wide text-[var(--color-background)] transition-[opacity,transform] duration-300 motion-reduce:transition-none",
                        activeIndex === index
                          ? "translate-y-0 opacity-100"
                          : "-translate-y-1 opacity-0",
                      )}
                    >
                      {item.outcome} <span className="ml-1">↗</span>
                    </span>
                    <span
                      className={cn(
                        "mt-3 block max-w-[390px] text-[13px] leading-[1.45] text-[var(--color-primary)] transition-[opacity,transform] duration-300 md:text-sm motion-reduce:transition-none",
                        activeIndex === index
                          ? "translate-y-0 opacity-100"
                          : "-translate-y-1 opacity-0",
                      )}
                    >
                      {item.description}
                    </span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative mx-auto w-full max-w-[430px]">
        <div className="absolute inset-10 rounded-full bg-[var(--color-background)]/20 blur-3xl" />
        <svg viewBox="0 0 500 500" role="img" aria-label={`${activeItem.name} process imagery`} className="relative z-10 h-auto w-full drop-shadow-xl">
          <defs>
            <clipPath id="process-step-0">
              <path className="path" d="M480 235H20v-30h460z" />
              <path className="path" d="M483 362H17v-20h466z" />
              <path className="path" d="M460 336H40a31 31 0 0 1 0-62h420a31 31 0 0 1 0 62" />
              <path className="path" d="M459 196H41v-35a86 86 0 0 1 86-86h246a86 86 0 0 1 86 86z" />
              <path className="path" d="M459 370v38a17 17 0 0 1-17 17H58a17 17 0 0 1-17-17v-38z" />
            </clipPath>
            <clipPath id="process-step-1">
              <rect className="path" x="20" y="20" width="200" height="280" rx="12" />
              <rect className="path" x="20" y="320" width="200" height="160" rx="12" />
              <rect className="path" x="240" y="20" width="240" height="140" rx="12" />
              <rect className="path" x="240" y="180" width="110" height="160" rx="12" />
              <rect className="path" x="370" y="180" width="110" height="160" rx="12" />
              <rect className="path" x="240" y="360" width="240" height="120" rx="12" />
            </clipPath>
            <clipPath id="process-step-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <rect key={i} className="path" x={(i % 3) * 160 + 20} y={Math.floor(i / 3) * 160 + 20} width="140" height="140" rx="4" />
              ))}
            </clipPath>
            <clipPath id="process-step-3">
              <circle className="path" cx="250" cy="250" r="210" />
              <path className="path" d="M40 250h420v65H40z" />
              <path className="path" d="M250 40h65v420h-65z" />
            </clipPath>
          </defs>
          <g ref={mainGroupRef} clipPath={`url(#${items[0]?.clipId})`}>
            <image ref={imageRef} href={items[0]?.image} width="500" height="500" preserveAspectRatio="xMidYMid slice" />
          </g>
        </svg>
      </div>
    </div>
  );
}
