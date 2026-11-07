import { workMedia } from "../data/workMedia";
import { useState } from "react";
import { WanderingEyes } from "../components/ui/wandering-eyes";

function WorkItem({ index }: { index: number }) {
  const media = workMedia[index];
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-w-0 text-[var(--color-primary)]">
      <div className="relative aspect-[1.34/1] overflow-hidden border border-dashed border-[var(--color-accent)] p-0.5 max-[560px]:p-[5px]">
        {!loaded && (
          <WanderingEyes
            className="inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)] bg-[#e8e2d5]"
            aria-label={`Loading portfolio item ${index + 1}`}
          />
        )}
        {media.type === "video" ? (
          <video
            className={`block h-full w-full object-cover transition-[opacity,transform] duration-[180ms,250ms] ${loaded ? "opacity-100" : "opacity-0"}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`Portfolio video ${index + 1}`}
            onLoadedData={() => setLoaded(true)}
          >
            <source src={media.src} type="video/mp4" />
          </video>
        ) : (
          <img
            className={`block h-full w-full object-cover transition-[opacity,transform] duration-[180ms,250ms] hover:scale-[1.04] ${loaded ? "opacity-100" : "opacity-0"}`}
            src={media.src}
            alt={media.alt}
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
      <span className="mt-[13px] flex justify-between gap-2 font-mono text-xs uppercase leading-[1.35] max-[560px]:mt-[9px] max-[560px]:text-[10px]">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{media.name}</span>
      </span>
    </div>
  );
}

export function Work() {
  return (
    <section className="bg-[#f4f0e3] px-[10px] pb-[18px] pt-[10px]" id="work">
      <div className="mb-[31px] font-mono text-xs uppercase leading-[1.2] tracking-[0.035em] text-[var(--color-primary)] max-[560px]:mb-[22px] max-[560px]:text-[10px]">
        SELECTED WORK: 100% AT THE GOOD STUDIO
      </div>
      <div className="grid grid-cols-5 gap-x-[11px] gap-y-7 max-[900px]:grid-cols-3 max-[560px]:grid-cols-2 max-[560px]:gap-x-[9px] max-[560px]:gap-y-[22px]">
        {workMedia.map((_, index) => (
          <WorkItem key={index} index={index} />
        ))}
      </div>
    </section>
  );
}
