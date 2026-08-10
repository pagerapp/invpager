import { ChapterHead, MaskLine, Rise, Section } from "../primitives";
import { useT } from "@/i18n";

const TIER_COLORS = ["var(--personal)", "var(--work)"];
const LAYER_COLORS = ["var(--alter)", "var(--guest)", "var(--color-foreground)"];

export function Business() {
  const t = useT();

  return (
    <Section id="chapter-07" className="py-[var(--chapter-space)]">
      <ChapterHead index="07" title={t.business.head.title} meta={t.business.head.meta} />

      <div className="shell mt-16 md:mt-24">
        <div className="grid-12 gap-y-8">
          <h2 className="display-md col-span-6 md:col-span-6">
            {t.business.h.map((line, i) => (
              <MaskLine key={line} delay={i * 0.07}>
                {line}
              </MaskLine>
            ))}
          </h2>
          <Rise className="col-span-6 md:col-span-5 md:col-start-8">
            <p className="lead rule-t pt-4">{t.business.lead}</p>
          </Rise>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px bg-[color:var(--color-hairline)] md:mt-24 md:grid-cols-2">
          {t.business.tiers.map((tier, i) => (
            <div key={tier.title} className="bg-[color:var(--color-background)] p-6 md:p-8">
              <Rise delay={i * 0.06}>
                <div className="flex items-center justify-between">
                  <span className="label-tech">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    aria-hidden
                    className="h-2 w-2"
                    style={{ backgroundColor: TIER_COLORS[i] }}
                  />
                </div>
                <h3 className="mt-8 text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.035em]">
                  {tier.title}
                </h3>
                <ul className="mt-6">
                  {tier.items.map((it) => (
                    <li key={it} className="rule-b py-3 text-sm last:border-0">
                      {it}
                    </li>
                  ))}
                </ul>
              </Rise>
            </div>
          ))}
        </div>

        <div className="mt-px grid grid-cols-1 gap-px bg-[color:var(--color-hairline)] md:grid-cols-3">
          {t.business.layers.map((l, i) => (
            <div key={l.title} className="bg-[color:var(--color-background)] p-6 md:p-8">
              <Rise delay={i * 0.05}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="label-tech">{String(i + 3).padStart(2, "0")}</span>
                  <span className="label-tech text-right" style={{ color: LAYER_COLORS[i] }}>
                    {l.kicker}
                  </span>
                </div>
                <h3 className="mt-10 text-xl font-bold tracking-[-0.025em]">{l.title}</h3>
                <p className="lead mt-3 text-sm">{l.body}</p>
              </Rise>
            </div>
          ))}
        </div>

        <Rise className="mt-16">
          <p className="max-w-[64ch] text-[clamp(1.1rem,1.8vw,1.6rem)] leading-[1.35] tracking-[-0.025em]">
            {t.business.outro}
          </p>
        </Rise>
      </div>
    </Section>
  );
}
