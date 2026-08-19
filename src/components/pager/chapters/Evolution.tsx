import { useState } from "react";
import { motion } from "motion/react";
import { MediaSlot } from "../MediaSlot";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";
import { useT } from "@/i18n";

const MEDIA = ["Evo_1.png", "Evo_2.png", "Evo_3.png", "Evo_4.png"];
/** The fourth stage is PAGER itself, not another chapter of prior art — it
 * carries the same accent used for it elsewhere on the page (Hero's guest
 * highlight, Multiprofile's outro word). */
const PAGER_INDEX = 3;
const ACCENT = "#f6c86f";

type Stage = { name: string; role: string; prompt: string; q: string; body: string };

/**
 * EVOLUTION — an editorial index, not a story scroll.
 *
 * The four transparent illustrations are compact product signals. Desktop
 * presents the full system as a quiet 2×2 grid. Mobile can't fit that same
 * full-detail grid without every tile growing tall, so it gets its own
 * compact tile-selector + single detail panel (see EvolutionSwitcher) —
 * all four stages stay reachable without a swipe carousel.
 */
export function Evolution() {
  const t = useT();
  const stages = t.evolution.stages;
  const [metaFrom, metaTo] = t.evolution.head.meta.split(" / ");
  const evolutionMeta = metaTo ? (
    <span className="flex justify-end whitespace-nowrap">
      <span>{metaFrom} /</span>
      <span className="ml-1 md:ml-[clamp(2.5rem,8vw,11rem)]">{metaTo}</span>
    </span>
  ) : t.evolution.head.meta;

  return (
    <Section id="chapter-02" className="pt-[var(--chapter-space)]">
      <ChapterHead index="02" title={t.evolution.head.title} meta={evolutionMeta} />

      <div className="shell mt-14 md:mt-20">
        <div className="grid-12 items-start gap-y-8 md:gap-x-12">
          <h2 className="display-lg col-span-6 max-w-[15ch] md:col-span-7">
            {t.evolution.h.map((line, i) => (
              <MaskLine key={line} delay={i * 0.09} className={i === 1 ? "md:pl-[10%]" : ""}>
                {line}
              </MaskLine>
            ))}
          </h2>
          <Rise className="col-span-6 pt-1 md:col-span-5">
            <div className="border-l border-[color:var(--color-hairline)] pl-5 md:pl-6">
              <p className="lead">{t.evolution.lead}</p>
            </div>
          </Rise>
        </div>

        <div className="mt-12 md:mt-16">
          <div
            aria-label={t.evolution.head.title}
            role="list"
            className="hidden md:grid md:grid-cols-2 md:gap-px md:bg-[color:var(--color-hairline)]"
          >
            {stages.map((stage, i) => (
              <StageCard key={stage.name} stage={stage} media={MEDIA[i]!} index={i} />
            ))}
          </div>
          <EvolutionSwitcher stages={stages} title={t.evolution.head.title} />
        </div>

        <Rise className="mt-14 border-y border-[color:var(--color-hairline)] py-8 md:mt-20 md:grid md:grid-cols-12 md:gap-8 md:py-12">
          <div className="md:col-span-3">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.16em] text-[color:var(--color-foreground)] md:text-base">
              {t.evolution.whyNow.title}
            </p>
          </div>
          <div className="mt-5 flex items-center gap-5 md:col-span-8 md:col-start-5 md:mt-0 md:gap-7">
            <img
              src="media/why_now.png"
              alt=""
              aria-hidden="true"
              className="h-24 w-24 shrink-0 object-contain md:h-28 md:w-28"
            />
            <p className="max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-foreground)] md:text-xl">
              {t.evolution.whyNow.body}
            </p>
          </div>
        </Rise>
      </div>

    </Section>
  );
}

function StageCard({ stage, media, index }: { stage: Stage; media: string; index: number }) {
  const isPager = index === PAGER_INDEX;
  return (
    <motion.article
      role="listitem"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex min-h-[31rem] flex-col overflow-hidden bg-[color:var(--color-background)] px-8 py-7"
      style={isPager ? { boxShadow: `inset 0 0 0 2px ${ACCENT}` } : undefined}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="label-tech transition-colors duration-300 group-hover:text-[color:var(--color-foreground)]">
          {stage.role}
        </span>
        {isPager ? (
          <span
            className="border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em]"
            style={{ borderColor: ACCENT, color: ACCENT }}
          >
            PAGER
          </span>
        ) : (
          <span className="font-mono text-[10px] tracking-[0.16em] text-[color:var(--color-muted-foreground)]">
            {String(index + 1).padStart(2, "0")} / 04
          </span>
        )}
      </div>

      <div className="grid flex-1 grid-cols-[38%_minmax(0,1fr)] items-center gap-8 py-9">
        <div
          className="flex min-w-0 items-center justify-center"
          style={isPager ? { filter: `drop-shadow(0 0 20px ${ACCENT}66)` } : undefined}
        >
          <MediaSlot
            name={media}
            alt={stage.name}
            label={stage.role}
            priority={index === 0}
            maxHeight="min(12rem, 32vw)"
            className="evolution-media w-full max-w-[12rem] transition-transform duration-500 ease-out group-hover:scale-[1.04] [&>div:first-child]:opacity-0"
          />
        </div>

        <div className="min-w-0 border-l pl-8" style={{ borderColor: isPager ? ACCENT : "var(--color-hairline)" }}>
          <p className="label-tech mb-4 text-[color:var(--color-foreground)]">{stage.prompt}</p>
          <h3 className="break-words text-3xl font-semibold uppercase leading-[1.05] tracking-[-0.03em]">
            {stage.name}
          </h3>
          <p className="mt-4 text-base font-medium leading-snug text-[color:var(--color-foreground)]">
            {stage.q}
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--color-muted-foreground)]">
            {stage.body}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * Mobile-only replacement for the swipe carousel. A compact 2×2 tile grid
 * (icon + role + name, fixed short height) acts as a selector; the full
 * prompt/title/q/body for whichever stage is active renders once, below —
 * so the grid itself never grows tall no matter how long a stage's body
 * text is, and all four stages stay reachable without horizontal paging.
 */
function EvolutionSwitcher({ stages, title }: { stages: Stage[]; title: string }) {
  const [active, setActive] = useState(0);
  const stage = stages[active]!;
  const activeIsPager = active === PAGER_INDEX;

  return (
    <div className="md:hidden">
      <div role="tablist" aria-label={title} className="grid grid-cols-2 gap-px bg-[color:var(--color-hairline)]">
        {stages.map((s, i) => {
          const isActive = active === i;
          return (
            <button
              key={s.name}
              type="button"
              role="tab"
              id={`evo-tab-${i}`}
              aria-selected={isActive}
              aria-controls="evo-panel"
              onClick={() => setActive(i)}
              className="relative flex items-stretch gap-3 overflow-hidden bg-[color:var(--color-background)] py-3 pl-3 pr-2 text-left transition-colors duration-200"
              style={isActive ? { backgroundColor: "color-mix(in srgb, var(--color-foreground) 5%, transparent)" } : undefined}
            >
              <div className="w-[34%] shrink-0 self-stretch">
                <MediaSlot
                  name={MEDIA[i]!}
                  alt=""
                  label={s.role}
                  lockHeight
                  className="h-full w-full [&>div:first-child]:opacity-0"
                />
              </div>
              <div className="relative min-w-0 flex-1 overflow-hidden">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1 top-1/2 -translate-y-1/2 select-none text-[3.25rem] font-black leading-none text-[color:var(--color-hairline)] opacity-40"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative flex min-h-full flex-col justify-center">
                  <span className="text-[13px] font-semibold leading-snug">{s.q}</span>
                  <span className="label-tech mt-1 normal-case text-[10px] leading-snug text-[color:var(--color-muted-foreground)]">
                    {s.prompt}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div
        id="evo-panel"
        role="tabpanel"
        aria-labelledby={`evo-tab-${active}`}
        className="mt-6 border-l pl-5"
        style={{ borderColor: activeIsPager ? ACCENT : "var(--color-hairline)" }}
      >
        <p className="label-tech mb-3 text-[color:var(--color-foreground)]">{stage.prompt}</p>
        <h3 className="text-2xl font-semibold uppercase leading-[1.05] tracking-[-0.03em]">{stage.name}</h3>
        <p className="mt-3 text-sm font-medium leading-snug text-[color:var(--color-foreground)]">{stage.q}</p>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted-foreground)]">{stage.body}</p>
        {activeIsPager ? (
          <span
            className="mt-4 inline-block border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em]"
            style={{ borderColor: ACCENT, color: ACCENT }}
          >
            PAGER
          </span>
        ) : null}
      </div>
    </div>
  );
}
