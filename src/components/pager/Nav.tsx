import { useEffect, useState } from "react";
import { LOCALES, useLocale } from "@/i18n";

const logo = { url: "favicon.png" };

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[color-mix(in_oklab,var(--ink)_88%,transparent)] backdrop-blur-[6px] border-b border-[color:oklch(1_0_0/12%)]"
          : "border-b border-transparent"
      }`}
      style={{ color: "var(--paper)" }}
    >
      <nav className="shell flex h-14 items-center justify-between gap-5" aria-label={t.nav.aria}>
        <a href="#top" className="focus-instrument flex items-center gap-2.5">
          <img
            src={logo.url}
            alt="PAGER"
            width={43}
            height={43}
            className="h-6 w-auto object-contain"
          />
          <span className="font-mono text-sm font-bold tracking-[0.28em]">PAGER</span>
          <span aria-hidden className="blink h-1.5 w-1.5 bg-personal" />
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {t.nav.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="focus-instrument label-tech transition-colors duration-200 hover:text-[color:var(--paper)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 lg:gap-6">
          <span className="label-tech hidden xl:inline">{t.nav.meta}</span>
          <LangSwitch />
          <a
            href="#chapter-08"
            className="focus-instrument hidden border border-[color:oklch(1_0_0/25%)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 hover:bg-[color:var(--paper)] hover:text-[color:var(--ink)] lg:inline-block"
          >
            {t.nav.cta}
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="nav-mobile"
            onClick={() => setOpen((v) => !v)}
            className="focus-instrument label-tech md:hidden"
          >
            {open ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </nav>

      <div
        id="nav-mobile"
        hidden={!open}
        className="border-t border-[color:oklch(1_0_0/12%)] bg-[color:var(--ink)] md:hidden"
      >
        <ul className="shell py-4">
          {t.nav.links.map((l) => (
            <li key={l.href} className="rule-b py-3">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="focus-instrument label-tech text-[color:var(--paper)]"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a
              href="#chapter-08"
              onClick={() => setOpen(false)}
              className="focus-instrument block border border-[color:oklch(1_0_0/25%)] px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.14em]"
            >
              {t.nav.cta}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

/** Compact three-state locale selector — an instrument switch, not a dropdown. */
function LangSwitch() {
  const { locale, setLocale, t } = useLocale();
  return (
    <div
      role="group"
      aria-label={t.nav.langAria}
      className="flex items-center border border-[color:oklch(1_0_0/22%)]"
    >
      {LOCALES.map((l, i) => {
        const on = l.code === locale;
        return (
          <button
            key={l.code}
            type="button"
            lang={l.code === "zh" ? "zh-CN" : l.code}
            aria-pressed={on}
            onClick={() => setLocale(l.code)}
            className={`focus-instrument px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-200 ${
              i > 0 ? "border-l border-[color:oklch(1_0_0/22%)]" : ""
            } ${
              on
                ? "bg-[color:var(--paper)] text-[color:var(--ink)]"
                : "text-[color:oklch(1_0_0/55%)] hover:text-[color:var(--paper)]"
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
