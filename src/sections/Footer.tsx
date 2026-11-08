import { siteConfig } from "../data/siteConfig";
import { useI18n } from "../i18n";

export function Footer() {
  const { copy } = useI18n();

  return (
    <footer className="px-[8.5%] max-[700px]:px-[7%]" id="contact">
      <div className="-ml-[8.5vw] flex w-[calc(100%+17vw)] items-center justify-between gap-[18px] border-t border-dashed border-[var(--color-primary)] bg-[#f3efe6] px-[8.5vw] py-4 pb-[14px] text-[var(--color-primary)] max-[700px]:-ml-[7vw] max-[700px]:w-[calc(100%+14vw)] max-[700px]:flex-wrap max-[700px]:justify-between max-[700px]:gap-3 max-[700px]:px-[7vw] max-[700px]:py-[14px]">
        <span className="font-mono text-[9px] max-[700px]:flex-[1_1_100%] max-[700px]:text-[8px]">
          {copy.footer.exploring}
        </span>
        <span className="font-mono text-[9px] max-[700px]:text-[8px]">
          ©{new Date().getFullYear()} {siteConfig.name.toUpperCase()}
        </span>
        <a
          className="font-mono text-[9px] text-inherit max-[700px]:w-full max-[700px]:text-left max-[700px]:text-[8px] underline"
          href="https://github.com/abdullahMohamed13"
          target="_blank"
          rel="noreferrer"
        >
          {copy.footer.github}
        </a>
      </div>
    </footer>
  );
}
