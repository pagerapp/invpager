import { MediaSlot } from "../MediaSlot";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";
import { useT } from "@/i18n";

const STATES = ["done", "core", "next"] as const;
const SCREENS = ["hero_dsktp_003.png", "hero_mob_001.png", "pgr_scr_002.jpg", "pgr_scr_003.jpg"];

export function ProductStatus() {
  const t = useT();

  return (
    <Section id="chapter-06" light className="py-[var(--chapter-space)]">
      <ChapterHead index="06" title={t.product.head.title} meta={t.product.head.meta} />

      <div className="shell mt-16 md:mt-24">
        <div className="grid-12 gap-y-8">
          <h2 className="display-md col-span-6 md:col-span-7">
            {t.product.h.map((line, i) => (
              <MaskLine key={line} delay={i * 0.07}>
                {line}
              </MaskLine>
            ))}
          </h2>
          <Rise className="col-span-6 md:col-span-4 md:col-start-9">
            <p className="lead rule-t pt-4">{t.product.lead}</p>
          </Rise>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px bg-[color:var(--color-hairline)] md:mt-24 md:grid-cols-3">
          {t.product.columns.map((c, i) => (
            <Column
              key={c.title}
              title={c.title}
              index={["A", "B", "C"][i]!}
              items={c.items}
              state={STATES[i]!}
            />
          ))}
        </div>

        <div className="mt-16 md:mt-24">
          <p className="label-tech rule-t pt-4">PRODUCT / DESKTOP</p>
          <MediaSlot
            name="hero_dsktp_001.png"
            alt={t.product.altDesktop}
            label="DESKTOP 001"
            className="mt-6 w-full"
          />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {SCREENS.map((m, i) => (
              <div key={m} className="flex flex-col">
                <span className="label-tech mb-3">SCR {String(i + 1).padStart(2, "0")}</span>
                <MediaSlot name={m} alt={`${t.product.altScreen} ${i + 1}`} className="w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Column({
  title,
  index,
  items,
  state,
}: {
  title: string;
  index: string;
  items: readonly string[];
  state: "done" | "core" | "next";
}) {
  return (
    <div className="bg-[color:var(--color-background)] p-6">
      <Rise>
        <div className="flex items-baseline justify-between">
          <span className="label-tech">{index}</span>
          <span className="label-tech">
            {state === "done" ? "BUILT" : state === "core" ? "CORE" : "NEXT"}
          </span>
        </div>
        <h3 className="mt-8 text-xl font-bold tracking-[-0.025em]">{title}</h3>
        <ul className="mt-6">
          {items.map((it) => (
            <li key={it} className="rule-b flex items-center gap-3 py-3 last:border-0">
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0"
                style={{
                  backgroundColor:
                    state === "done"
                      ? "var(--personal)"
                      : state === "core"
                        ? "var(--color-foreground)"
                        : "transparent",
                  border: state === "next" ? "1px solid var(--color-foreground)" : "none",
                }}
              />
              <span className="text-sm tracking-[-0.01em]">{it}</span>
            </li>
          ))}
        </ul>
      </Rise>
    </div>
  );
}
