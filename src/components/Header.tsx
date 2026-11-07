import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "../data/siteConfig";
export function Header() {
  const isHomePage = window.location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

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
        ref={menuButton}
        className="hidden border-0 bg-transparent max-[700px]:block"
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`${menuOpen ? "flex" : "hidden"} absolute left-0 right-0 top-[68px] z-30 flex-col border-b border-dashed border-[var(--color-primary)] bg-[var(--color-background)] px-[6%] py-4 min-[701px]:hidden`}
      >
        {[
          ["Services", "services"],
          ["Process", "process"],
          ["Work", "work"],
          ["Opinions", "opinions"],
        ].map(([label, id]) => (
          <a
            key={id}
            className="border-b border-dashed border-[var(--color-primary)] py-3 text-sm text-inherit no-underline"
            href={isHomePage ? `#${id}` : `/#${id}`}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <a
          className="py-3 text-sm text-inherit no-underline"
          href="/contact"
          onClick={() => setMenuOpen(false)}
        >
          Contact ↗
        </a>
      </nav>
    </header>
  );
}
