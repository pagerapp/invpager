import { ChapterHead, MaskLine, Rise, Section } from "../primitives";
import { useT } from "@/i18n";

export function FinalCta() {
  const t = useT();

  return (
    <Section id="chapter-08" className="pt-[var(--chapter-space)]">
      <ChapterHead index="08" title={t.cta.head.title} meta={t.cta.head.meta} />

      <div className="shell mt-16 md:mt-24">
        <div className="grid-12 gap-y-10">
          <h2 className="display-lg col-span-6 md:col-span-8">
            {t.cta.h.map((line, i) => (
              <MaskLine key={line} delay={i * 0.07}>
                {line}
              </MaskLine>
            ))}
          </h2>
          <Rise className="col-span-6 md:col-span-4">
            <div className="rule-t pt-4">
              <p className="lead">{t.cta.lead}</p>
              <a
                href={`mailto:hello@pager.app?subject=${encodeURIComponent(t.cta.mailSubject)}`}
                className="focus-instrument mt-8 inline-flex items-center gap-4 bg-[color:var(--color-foreground)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-background)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                {t.cta.button}
                <span aria-hidden>→</span>
              </a>
            </div>
          </Rise>
        </div>
      </div>

      <footer className="shell mt-[var(--chapter-space)] pb-10">
        <div className="grid-12 rule-t items-center gap-y-3 pt-5">
          <span className="label-tech col-span-6 md:col-span-4">PAGER © 2026</span>
          <span className="label-tech col-span-6 md:col-span-4 md:text-center">
            {t.cta.footerCenter}
          </span>
          <a
            href="#top"
            className="focus-instrument label-tech col-span-6 md:col-span-4 md:text-right transition-colors duration-200 hover:text-[color:var(--color-foreground)]"
          >
            {t.cta.top}
          </a>
        </div>
      </footer>
    </Section>
  );
}
