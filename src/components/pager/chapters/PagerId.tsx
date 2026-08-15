import { MediaSlot } from "../MediaSlot";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";
import { useT } from "@/i18n";

const STEP_MEDIA = ["find_001.png", "choose_profile_001.png", "secure_001.png"] as const;

export function PagerId() {
  const t = useT();

  return (
    <Section id="chapter-03">
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

        <div className="mt-8 md:mt-12">
          <MediaSlot
            name="pager_id_variation_002.jpg"
            alt="PAGER ID"
            label="PAGER ID"
            className="w-full"
          />
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
                <div className="flex items-start justify-between gap-5">
                  <div className="min-w-0">
                    <span className="label-tech">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-6 text-xl font-bold tracking-[-0.02em]">{s.t}</h3>
                    <p className="lead mt-2 text-sm">{s.d}</p>
                  </div>
                  <MediaSlot
                    name={STEP_MEDIA[i]!}
                    alt=""
                    label={s.t}
                    maxHeight="7.5rem"
                    className="w-[6.5rem] shrink-0 [&>div:first-child]:opacity-0"
                  />
                </div>
              </Rise>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
