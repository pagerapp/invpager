import { useEffect, useState } from "react";

const LINKS = [
  { href: "#chapter-04", label: "ПРОДУКТ" },
  { href: "#chapter-03", label: "ДЕМО" },
  { href: "#chapter-06", label: "СТАТУС" },
  { href: "#chapter-07", label: "БИЗНЕС" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      <nav className="shell flex h-14 items-center justify-between gap-6" aria-label="Основная">
        <a href="#top" className="focus-instrument flex items-baseline gap-2">
          <span className="font-mono text-sm font-bold tracking-[0.28em]">PAGER</span>
          <span aria-hidden className="blink h-1.5 w-1.5 bg-personal" />
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
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

        <div className="hidden items-center gap-6 lg:flex">
          <span className="label-tech">PRIVATE COMMUNICATION / 2026</span>
          <a
            href="#chapter-08"
            className="focus-instrument border border-[color:oklch(1_0_0/25%)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 hover:bg-[color:var(--paper)] hover:text-[color:var(--ink)]"
          >
            Запросить презентацию
          </a>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="nav-mobile"
          onClick={() => setOpen((v) => !v)}
          className="focus-instrument label-tech md:hidden"
        >
          {open ? "ЗАКРЫТЬ" : "МЕНЮ"}
        </button>
      </nav>

      <div
        id="nav-mobile"
        hidden={!open}
        className="border-t border-[color:oklch(1_0_0/12%)] bg-[color:var(--ink)] md:hidden"
      >
        <ul className="shell py-4">
          {LINKS.map((l) => (
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
              Запросить презентацию
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
