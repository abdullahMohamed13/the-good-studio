import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n";
import { localizedHref, localizedPath, parsePath } from "../lib/routes";
import { usePathname } from "../lib/usePathname";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SegmentedText } from "./ui/SegmentedText";

const navLinkClass =
  "text-xs text-inherit no-underline transition-colors hover:border-b hover:border-dashed hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:border-b focus-visible:border-dashed focus-visible:border-[var(--color-accent)] focus-visible:text-[var(--color-accent)]";

export function Header() {
  const { locale, copy } = useI18n();
  const pathname = usePathname();
  const { path } = parsePath(pathname);
  const isHomePage = path === "/";
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

  const sectionHref = (id: string) =>
    isHomePage ? `#${id}` : localizedHref(locale, "/", `#${id}`);
  const contactHref = localizedPath(locale, "/contact");

  return (
    <header className="sticky top-0 z-40 flex h-[83px] items-center justify-between border-b border-dashed border-[var(--color-primary)] bg-[color-mix(in_srgb,var(--color-background)_88%,transparent)] px-[1.5%] backdrop-blur-md max-[700px]:h-[68px] max-[700px]:px-[6%]">
      <a
        className="text-[25px] tracking-[-1.8px] text-[var(--color-primary)] no-underline"
        href={localizedPath(locale, "/")}
        aria-label={copy.nav.homeLabel}
      >
        The Good{" "}
        <span className="ml-2 text-[var(--color-accent)]">[Studio]</span>
      </a>
      <div className="hidden text-xs min-[900px]:flex flex-col items-center gap-2">
        <div>
          <SegmentedText segments={copy.header.tagline} />{" "}
          <span className="asterisk ml-[7px] align-middle text-[19px]">☼</span>
        </div>
        <LanguageSwitcher />
      </div>
      <nav className="flex items-center gap-[14px] min-[1000px]:gap-[22px] max-[900px]:hidden">
        <a className={navLinkClass} href={sectionHref("services")}>
          {copy.nav.services}
        </a>
        <a className={navLinkClass} href={sectionHref("process")}>
          {copy.nav.process}
        </a>
        <a className={navLinkClass} href={sectionHref("work")}>
          {copy.nav.work}
        </a>
        <a className={navLinkClass} href={sectionHref("opinions")}>
          {copy.nav.opinions}
        </a>
        <a
          className="border-b border-dashed border-current text-xs text-inherit no-underline transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          href={contactHref}
        >
          {copy.nav.letsTalk}
          <b className="ml-[5px]">↗</b>
        </a>
      </nav>
      <button
        ref={menuButton}
        className="hidden border-0 bg-transparent max-[900px]:block"
        type="button"
        aria-label={menuOpen ? copy.nav.closeMenu : copy.nav.openMenu}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav
        id="mobile-navigation"
        aria-label={copy.nav.mobileLabel}
        className={`${menuOpen ? "flex" : "hidden"} absolute left-0 right-0 top-[83px] z-30 flex-col border-b border-dashed border-[var(--color-primary)] bg-[var(--color-background)] px-[6%] py-4 max-[700px]:top-[68px] min-[901px]:hidden`}
      >
        {[
          [copy.nav.services, "services"],
          [copy.nav.process, "process"],
          [copy.nav.work, "work"],
          [copy.nav.opinions, "opinions"],
        ].map(([label, id]) => (
          <a
            key={id}
            className="border-b border-dashed border-[var(--color-primary)] py-3 text-sm text-inherit no-underline"
            href={sectionHref(id)}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <a
          className="py-3 text-sm text-inherit no-underline"
          href={contactHref}
          onClick={() => setMenuOpen(false)}
        >
          {copy.nav.contact} ↗
        </a>
        <div className="mt-2 border-t border-dashed border-[var(--color-primary)] pt-1">
          <LanguageSwitcher variant="mobile" />
        </div>
      </nav>
    </header>
  );
}
