import { MediaSlot } from "../MediaSlot";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";
import { useT } from "@/i18n";

const MEDIA = ["1_email.png", "2_sms.png", "3_chat.png", "4_pager.png"];

export function Evolution() {
  const t = useT();
  const stages = t.evolution.stages;

  return (
    <Section id="chapter-02" light className="py-[var(--chapter-space)]">
      <ChapterHead index="02" title={t.evolution.head.title} meta={t.evolution.head.meta} />

      <div className="shell mt-16 md:mt-24">
        <div className="grid-12 items-end gap-y-8">
          <h2 className="display-lg col-span-6 md:col-span-7">
            {t.evolution.h.map((line, i) => (
              <MaskLine key={line} delay={i * 0.08}>
                {line}
              </MaskLine>
            ))}
          </h2>
          <Rise className="col-span-6 md:col-span-4 md:col-start-9">
            <p className="lead rule-t pt-4">{t.evolution.lead}</p>
          </Rise>
        </div>

        <ol className="mt-20 grid grid-cols-1 gap-px bg-[color:var(--color-hairline)] md:mt-28 md:grid-cols-4">
          {stages.map((s, i) => {
            const n = String(i + 1).padStart(2, "0");
            return (
              <li key={n} className="bg-[color:var(--color-background)]">
                <Rise delay={i * 0.06} className="group flex h-full flex-col p-5 md:p-6">
                  <div className="flex items-baseline justify-between">
                    <span className="label-tech">{n}</span>
                    {i === stages.length - 1 ? (
                      <span className="label-tech text-[color:var(--color-foreground)]">PAGER</span>
                    ) : null}
                  </div>
                  <MediaSlot
                    name={MEDIA[i]!}
                    alt={s.name}
                    label={`STAGE ${n}`}
                    className="my-6 w-full"
                  />
                  <h3 className="text-lg font-bold tracking-[-0.02em]">{s.name}</h3>
                  <p className="mt-1 text-sm text-[color:var(--color-foreground)]/70">{s.role}</p>
                  <p className="label-tech mt-6 normal-case tracking-[0.02em]">{s.q}</p>
                </Rise>
              </li>
            );
          })}
        </ol>

        <div className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-2 rule-t pt-5">
          {t.evolution.progression.map((p, i) => (
            <span key={p} className="flex items-center gap-4">
              <span
                className={`font-mono text-sm uppercase tracking-[0.1em] ${
                  i === t.evolution.progression.length - 1
                    ? "text-[color:var(--color-foreground)]"
                    : "text-[color:var(--color-muted-foreground)]"
                }`}
              >
                {p}
              </span>
              {i < t.evolution.progression.length - 1 ? (
                <span aria-hidden className="label-tech">
                  →
                </span>
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
