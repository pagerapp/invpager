import { MediaSlot } from "../MediaSlot";
import { MaskLine, Rise, Section } from "../primitives";
import { useT } from "@/i18n";
import type { CSSProperties } from "react";

const STATES = ["done", "core", "next"] as const;

export function ProductStatus() {
  const t = useT();

  return (
    <Section
      id="chapter-06"
      light
      className="pt-6 md:pt-8"
      style={
        {
          backgroundColor: "#e2dfd9",
          "--background": "#e2dfd9",
          "--card": "#ebe8e2",
        } as CSSProperties
      }
    >
      <div
        className="shell"
        style={
          {
            "--foreground": "#181715",
            "--muted-foreground": "#3159ae",
            "--hairline": "rgba(24, 23, 21, 0.16)",
          } as CSSProperties
        }
      >
        <div className="rule-t flex items-center justify-between py-4">
          <span className="paper-meta">06 / {t.product.head.title}</span>
          <span className="paper-meta text-right">{t.product.head.meta}</span>
        </div>

        <div className="grid-12 items-end gap-y-8 pt-10 md:pt-14">
          <Rise className="col-span-6 md:col-span-7">
            <p className="paper-ink max-w-[56ch] border-l-2 border-[#3159ae] pl-5 text-[clamp(1.1rem,1.6vw,1.5rem)] leading-[1.42]">
              {t.product.lead}
            </p>
          </Rise>
          <h2 className="paper-pencil col-span-6 text-[clamp(2rem,3.9vw,4rem)] leading-[0.98] md:col-span-5 md:text-right">
            {t.product.h.map((line, i) => (
              <MaskLine key={line} delay={i * 0.07}>
                {line}
              </MaskLine>
            ))}
          </h2>
        </div>

        <Rise className="mt-10 md:mt-14">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#3159ae]" />
            <span className="paper-meta">CORE IDEA / PROFILES — REQUEST — PERMISSIONS</span>
          </div>
          <MediaSlot
            name="pager_handwritten.jpg"
            alt="PAGER product principles: profiles, requests and granular permissions"
            label="PRODUCT PRINCIPLES"
            className="mt-5 w-full border border-black/15 bg-[#e2dfd9]"
          />
        </Rise>

      </div>

      <div
        className="relative -mt-16 bg-fixed bg-top bg-cover bg-no-repeat pb-[var(--chapter-space)] pt-44 text-[#f3efe8] md:-mt-20 md:pt-48"
        style={
          {
            backgroundImage: "url(media/product_roadmap_bg.jpg)",
            "--background": "#0b0b0b",
            "--foreground": "#f3efe8",
            "--muted-foreground": "#a8a29e",
            "--hairline": "rgba(243, 239, 232, 0.16)",
          } as CSSProperties
        }
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgb(226 223 217 / 0) 0, #ddd9d3 3rem, #b6b3ad 4.2rem, #898680 5.8rem, #585650 7.2rem, #2d2c29 8.8rem, rgba(11,11,11,0.55) 10rem, rgba(11,11,11,0.55) 100%)",
          }}
        />

        <div className="shell relative">
          <Rise>
            <h2 className="display-lg mx-auto max-w-[20ch] text-center text-[#f3efe8] md:max-w-none md:whitespace-nowrap">
              {t.product.bridge}
            </h2>
          </Rise>

          <Rise className="mx-auto mt-12 grid max-w-2xl grid-cols-2 divide-x divide-[color:var(--color-hairline)] border-y border-[color:var(--color-hairline)] md:mt-16">
            {t.product.metrics.map((metric) => (
              <div key={metric.value} className="px-5 py-6 text-center md:px-10 md:py-8">
                <div className="display-md text-[#f3efe8]">{metric.value}</div>
                <div className="label-tech mt-3">{metric.label}</div>
              </div>
            ))}
          </Rise>

          <div className="mt-12 grid grid-cols-1 gap-px bg-[color:var(--color-hairline)] md:mt-16 md:grid-cols-3">
            {t.product.columns.map((c, i) => (
              <Column
                key={c.title}
                title={c.title}
                index={["A", "B", "C"][i]!}
                statement={c.statement}
                body={c.body}
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
              edgeFade
              className="mt-6 w-full"
            />
          </div>

          <div className="mt-16 grid grid-cols-1 gap-px border-y border-[color:var(--color-hairline)] bg-[color:var(--color-hairline)] md:mt-24 md:grid-cols-2">
            {t.product.stories.map((story, i) => (
              <Rise key={story.title} delay={i * 0.04} className="bg-[#0b0b0b] p-6 md:p-8">
                <span className="label-tech">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-xl font-bold tracking-[-0.025em] text-[#f3efe8]">{story.title}</h3>
                <p className="mt-3 font-semibold leading-snug text-[#f3efe8]">{story.statement}</p>
                <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-[#a8a29e]">{story.body}</p>
              </Rise>
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
  statement,
  body,
  items,
  state,
}: {
  title: string;
  index: string;
  statement: string;
  body: string;
  items: readonly string[];
  state: "done" | "core" | "next";
}) {
  return (
    <div
      className="bg-[#0b0b0b] p-6 text-[#f3efe8]"
      style={
        {
          "--foreground": "#f3efe8",
          "--muted-foreground": "#a8a29e",
          "--hairline": "rgba(243, 239, 232, 0.16)",
        } as CSSProperties
      }
    >
      <Rise>
        <div className="flex items-baseline justify-between">
          <span className="label-tech">{index}</span>
          <span className="label-tech">
            {state === "done" ? "BUILT" : state === "core" ? "CORE" : "NEXT"}
          </span>
        </div>
        <h3 className="mt-8 text-xl font-bold tracking-[-0.025em]">{title}</h3>
        <p className="mt-4 font-semibold leading-snug">{statement}</p>
        <p className="mt-3 text-sm leading-relaxed text-[#a8a29e]">{body}</p>
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
