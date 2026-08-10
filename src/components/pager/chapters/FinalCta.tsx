import { ChapterHead, MaskLine, Rise, Section } from "../primitives";

export function FinalCta() {
  return (
    <Section id="chapter-08" className="pt-[var(--chapter-space)]">
      <ChapterHead index="08" title="КОНТАКТ" meta="INVESTOR MATERIALS" />

      <div className="shell mt-16 md:mt-24">
        <div className="grid-12 gap-y-10">
          <h2 className="display-lg col-span-6 md:col-span-8">
            <MaskLine>Присоединяйтесь</MaskLine>
            <MaskLine delay={0.07}>к созданию нового</MaskLine>
            <MaskLine delay={0.14}>формата общения</MaskLine>
          </h2>
          <Rise className="col-span-6 md:col-span-4">
            <div className="rule-t pt-4">
              <p className="lead">
                Мы показываем текущий продукт, ключевую механику PAGER, план private beta и
                следующие этапы развития платформы.
              </p>
              <a
                href="mailto:hello@pager.app?subject=PAGER%20—%20презентация%20и%20материалы"
                className="focus-instrument mt-8 inline-flex items-center gap-4 bg-[color:var(--color-foreground)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-background)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Запросить презентацию и материалы
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
            Private communication
          </span>
          <a
            href="#top"
            className="focus-instrument label-tech col-span-6 md:col-span-4 md:text-right transition-colors duration-200 hover:text-[color:var(--color-foreground)]"
          >
            Наверх ↑
          </a>
        </div>
      </footer>
    </Section>
  );
}
