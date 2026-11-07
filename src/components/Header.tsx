import { Menu } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
export function Header() {
  const isHomePage = window.location.pathname === "/";

  return (
    <header className="flex h-[83px] items-center justify-between border-b border-dashed border-[var(--color-primary)] px-[5.3%] max-[700px]:h-[68px] max-[700px]:px-[6%]">
      <a
        className="text-[25px] font-bold tracking-[-1.8px] text-[var(--color-primary)] no-underline"
        href="/"
        aria-label={`${siteConfig.name} home`}
      >
        The Good{" "}
        <span className="ml-2 text-[var(--color-accent)]">[Studio]</span>
      </a>
      <p className="text-xs max-[700px]:hidden">
        Hi, stranger. Life is funny. So live it{" "}
        <span className="underline text-[var(--color-secondary)]">Good</span>.{" "}
        <span className="asterisk asterisk ml-[7px] align-middle text-[19px]">
          ☼
        </span>
      </p>
      <nav className="flex items-center gap-[30px] max-[700px]:hidden">
        <a
          className="text-xs text-inherit no-underline hover:text-[var(--color-accent)]"
          href={isHomePage ? "#services" : "/#services"}
        >
          Services
        </a>
        <a
          className="text-xs text-inherit no-underline hover:text-[var(--color-accent)]"
          href={isHomePage ? "#process" : "/#process"}
        >
          Process
        </a>
        <a
          className="text-xs text-inherit no-underline hover:text-[var(--color-accent)]"
          href={isHomePage ? "#work" : "/#work"}
        >
          Work
        </a>
        <a
          className="text-xs text-inherit no-underline hover:text-[var(--color-accent)]"
          href={isHomePage ? "#opinions" : "/#opinions"}
        >
          Opinions
        </a>
        <a
          className="border-b border-current py-[9px] text-xs text-inherit no-underline hover:text-[var(--color-accent)]"
          href="/contact"
        >
          Let’s talk <b className="ml-[10px]">↗</b>
        </a>
      </nav>
      <button
        className="hidden border-0 bg-transparent max-[700px]:block"
        aria-label="Open menu"
      >
        <Menu size={21} />
      </button>
    </header>
  );
}
