import { useState } from "react";
import { useI18n } from "../i18n";
import { getWorkMedia } from "../i18n/content";
import { WanderingEyes } from "../components/ui/wandering-eyes";
import { Reveal } from "../components/animations/Reveal";

type WorkMediaItem = ReturnType<typeof getWorkMedia>[number];

function WorkItem({ media, index }: { media: WorkMediaItem; index: number }) {
  const { copy } = useI18n();
  const [loaded, setLoaded] = useState(false);
  const number = String(index + 1);

  return (
    <div className="group min-w-0 text-[var(--color-primary)]">
      <div className="relative aspect-[1.34/1] overflow-hidden border border-dashed border-[var(--color-accent)] p-0.5 max-[560px]:p-[5px]">
        {!loaded && (
          <WanderingEyes
            className="inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)] bg-[#e8e2d5]"
            aria-label={copy.work.loadingItem.replace("{number}", number)}
          />
        )}
        {media.type === "video" ? (
          <video
            className={`block h-full w-full object-cover transition-[opacity,transform] duration-[180ms,600ms] ease-out group-hover:scale-[1.04] ${loaded ? "opacity-100" : "opacity-0"}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={copy.work.videoLabel.replace("{number}", number)}
            onLoadedData={() => setLoaded(true)}
          >
            <source src={media.src} type="video/mp4" />
          </video>
        ) : (
          <img
            className={`block h-full w-full object-cover transition-[opacity,transform] duration-[180ms,600ms] ease-out group-hover:scale-[1.04] ${loaded ? "opacity-100" : "opacity-0"}`}
            src={media.src}
            alt={media.alt}
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
      <span className="mt-[13px] flex justify-between gap-2 font-mono text-xs uppercase leading-[1.35] transition-colors duration-300 group-hover:text-[var(--color-accent)] max-[560px]:mt-[9px] max-[560px]:text-[10px]">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{media.name}</span>
      </span>
    </div>
  );
}

export function Work() {
  const { locale, copy } = useI18n();
  const workMedia = getWorkMedia(locale);

  return (
    <section className="bg-[#f4f0e3] px-[10px] pb-[18px] pt-[28px]" id="work">
      <Reveal>
        <div className="mb-[31px] font-mono text-xs uppercase leading-[1.2] tracking-[0.035em] text-[var(--color-primary)] max-[560px]:mb-[22px] max-[560px]:text-[10px]">
          {copy.work.label}
        </div>
      </Reveal>
      <div className="grid grid-cols-5 gap-x-[11px] gap-y-7 max-[900px]:grid-cols-3 max-[560px]:grid-cols-2 max-[560px]:gap-x-[9px] max-[560px]:gap-y-[22px]">
        {workMedia.map((media, index) => (
          <Reveal key={media.id} className="min-w-0" delay={(index % 5) * 60}>
            <WorkItem media={media} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
