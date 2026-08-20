import { MediaSlot } from "../MediaSlot";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";
import { useT } from "@/i18n";

const STEP_MEDIA = ["find_001.png", "choose_profile_001.png", "secure_001.png"] as const;
const ACCENT = "#f6c86f";

export function PagerId() {
  const t = useT();

  return (
    <Section id="chapter-03">
      <ChapterHead index="03" title={t.pagerId.head.title} meta={t.pagerId.head.meta} />

      <div className="shell mt-16 md:mt-24">
        <div className="grid-12 items-start gap-y-8 md:gap-x-12">
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
          </div>

          <Rise delay={0.1} className="col-span-6 pt-1 md:col-span-5">
            <div className="border-l border-[color:var(--color-hairline)] pl-5 md:pl-6">
              <p className="lead">{t.pagerId.lead}</p>
            </div>
          </Rise>
        </div>

        <div className="mt-12 md:mt-16">
          <MediaSlot
            name="pager_id_variation_002.jpg"
            alt="PAGER ID"
            label="PAGER ID"
            edgeFade
            className="w-full"
          />
        </div>

        <Rise className="mt-16">
          <p className="max-w-[62ch] text-[clamp(1.05rem,1.6vw,1.45rem)] leading-[1.4] tracking-[-0.02em]">
            {t.pagerId.summary}
          </p>
        </Rise>

        <ol className="mt-10">
          {t.pagerId.steps.map((s, i) => (
            <li
              key={s.t}
              className="flex items-center justify-between gap-5 border-b border-[color:var(--color-hairline)] py-5"
            >
              <Rise delay={i * 0.06} className="flex min-w-0 items-center gap-5">
                <span className="label-tech shrink-0 text-[color:var(--color-muted-foreground)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-bold tracking-[-0.02em] md:text-lg">{s.t}</h3>
                  <p className="lead mt-0.5 text-sm">{s.d}</p>
                </div>
              </Rise>
              <MediaSlot
                name={STEP_MEDIA[i]!}
                alt=""
                label={s.t}
                maxHeight="3.25rem"
                className="w-10 shrink-0 [&>div:first-child]:opacity-0"
              />
            </li>
          ))}
        </ol>

        <Rise className="mt-14 md:mt-20">
          <div className="grid grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))] items-center gap-x-2 border-b border-[color:var(--color-hairline)] pb-3">
            <span />
            {t.pagerId.compare.columns.map((col, i) => (
              <span
                key={col}
                className="label-tech text-center"
                style={i === 2 ? { color: ACCENT } : undefined}
              >
                {col}
              </span>
            ))}
          </div>
          {t.pagerId.compare.rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))] items-center gap-x-2 border-b border-[color:var(--color-hairline)] py-4"
            >
              <span className="text-sm leading-snug">{row.label}</span>
              {row.values.map((v, i) => (
                <span
                  key={i}
                  className="text-center text-lg"
                  style={{
                    color: v
                      ? i === 2
                        ? ACCENT
                        : "var(--color-foreground)"
                      : "var(--color-muted-foreground)",
                  }}
                >
                  {v ? "✓" : "✕"}
                </span>
              ))}
            </div>
          ))}
        </Rise>
      </div>
    </Section>
  );
}
