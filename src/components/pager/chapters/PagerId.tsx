import { MediaSlot } from "../MediaSlot";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";
import { useT } from "@/i18n";

const IDS = ["A490 3880", "B117 4021", "C905 7714"];

export function PagerId() {
  const t = useT();

  return (
    <Section id="chapter-03" className="py-[var(--chapter-space)]">
      <ChapterHead index="03" title={t.pagerId.head.title} meta={t.pagerId.head.meta} />

      <div className="shell mt-16 md:mt-24">
        <div className="grid-12 gap-y-10">
          <div className="col-span-6 md:col-span-7">
            <Rise>
              <p className="label-tech mb-6 text-[color:var(--color-foreground)]">
                {t.pagerId.kicker}
              </p>
            </Rise>
            <h2 className="display-lg">
              {t.pagerId.h.map((line, i) => (
                <MaskLine key={line} delay={i * 0.07}>
                  {line}
                </MaskLine>
              ))}
            </h2>
            <Rise delay={0.1}>
              <p className="lead mt-8 max-w-[46ch]">{t.pagerId.lead}</p>
            </Rise>
          </div>

          <div className="col-span-6 md:col-span-4 md:col-start-9">
            <Rise>
              <div className="rule-t pt-4">
                <p className="label-tech mb-5">{t.pagerId.todayLabel}</p>
                <ul>
                  {t.pagerId.today.map((item, i) => (
                    <li key={item} className="rule-b flex gap-4 py-3 last:border-0">
                      <span className="label-tech pt-1">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Rise>
          </div>
        </div>

        {/* The supplied ID object carries the chapter */}
        <div className="mt-16 md:mt-24">
          <p className="label-tech rule-t pt-4">PAGER ID / OBJECT</p>
          <MediaSlot
            name="pager_id_variation_002.jpg"
            alt="PAGER ID"
            label="PAGER ID / OBJECT"
            className="mt-6 w-full"
          />
        </div>

        <div className="mt-16 grid-12 gap-y-6 md:mt-24">
          <div className="col-span-6 md:col-span-8">
            <div className="rule-t rule-b divide-y divide-[color:var(--color-hairline)]">
              {IDS.map((id, i) => (
                <Rise key={id} delay={i * 0.06}>
                  <div className="group flex items-center justify-between gap-4 py-6 transition-colors duration-200 hover:bg-[color:var(--color-accent)]">
                    <div className="flex min-w-0 items-center gap-5">
                      <span
                        aria-hidden
                        className="h-8 w-px shrink-0"
                        style={{
                          backgroundColor:
                            i === 0 ? "var(--personal)" : i === 1 ? "var(--work)" : "var(--guest)",
                        }}
                      />
                      <span className="truncate font-mono text-[clamp(1.5rem,4vw,2.75rem)] font-semibold tracking-[0.08em]">
                        {id}
                      </span>
                    </div>
                    <span className="label-tech shrink-0 transition-transform duration-200 group-hover:-translate-x-1">
                      {t.pagerId.request}
                    </span>
                  </div>
                </Rise>
              ))}
            </div>
            <p className="label-tech mt-4">{t.pagerId.idFormat}</p>
          </div>
        </div>

        <Rise className="mt-16">
          <p className="max-w-[62ch] text-[clamp(1.05rem,1.6vw,1.45rem)] leading-[1.4] tracking-[-0.02em]">
            {t.pagerId.summary}
          </p>
        </Rise>

        <ol className="mt-14 grid grid-cols-1 gap-px bg-[color:var(--color-hairline)] md:grid-cols-3">
          {t.pagerId.steps.map((s, i) => (
            <li key={s.t} className="bg-[color:var(--color-background)] p-6">
              <Rise delay={i * 0.06}>
                <span className="label-tech">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-xl font-bold tracking-[-0.02em]">{s.t}</h3>
                <p className="lead mt-2 text-sm">{s.d}</p>
              </Rise>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
