import { motion } from "motion/react";
import { MediaSlot } from "../MediaSlot";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";
import { useT } from "@/i18n";

const MEDIA = ["Evo_1.png", "Evo_2.png", "Evo_3.png", "Evo_4.png"];

type Stage = { name: string; role: string; q: string };

/**
 * EVOLUTION — an editorial index, not a story scroll.
 *
 * The four transparent illustrations are compact product signals. Desktop
 * presents the full system as a quiet 2×2 grid; mobile keeps the same cards in
 * a native horizontal snap carousel without taking control of page scrolling.
 */
export function Evolution() {
  const t = useT();
  const stages = t.evolution.stages;

  return (
    <Section id="chapter-02" className="pt-[var(--chapter-space)]">
      <ChapterHead index="02" title={t.evolution.head.title} meta={t.evolution.head.meta} />

      <div className="shell mt-14 md:mt-20">
        <div className="grid-12 items-end gap-y-8 md:gap-x-12">
          <h2 className="display-lg col-span-6 max-w-[15ch] md:col-span-7">
            {t.evolution.h.map((line, i) => (
              <MaskLine key={line} delay={i * 0.09} className={i === 1 ? "md:pl-[10%]" : ""}>
                {line}
              </MaskLine>
            ))}
          </h2>
          <Rise className="col-span-6 md:col-span-5">
            <p className="lead rule-t pt-4">{t.evolution.lead}</p>
          </Rise>
        </div>

        <div className="mt-12 flex items-center justify-between border-y border-[color:var(--color-hairline)] py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-muted-foreground)] md:mt-16">
          <span>04 / {t.evolution.head.title}</span>
          <span className="hidden md:inline">{t.evolution.progression.join("  /  ")}</span>
          <span className="md:hidden">SWIPE / 04</span>
        </div>

        <div
          aria-label={t.evolution.head.title}
          role="list"
          className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:gap-px md:overflow-visible md:bg-[color:var(--color-hairline)] md:pb-0"
        >
          {stages.map((stage, i) => (
            <StageCard key={stage.name} stage={stage} media={MEDIA[i]!} index={i} />
          ))}
        </div>
      </div>

      <div className="pb-[var(--chapter-space)]" />
    </Section>
  );
}

function StageCard({ stage, media, index }: { stage: Stage; media: string; index: number }) {
  return (
    <motion.article
      role="listitem"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex min-h-[25rem] min-w-[82vw] snap-start flex-col justify-between overflow-hidden border border-[color:var(--color-hairline)] bg-[color:var(--color-background)] px-5 py-5 md:min-h-[28rem] md:min-w-0 md:border-0 md:px-8 md:py-7"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="label-tech transition-colors duration-300 group-hover:text-[color:var(--color-foreground)]">
          {stage.role}
        </span>
        <span className="font-mono text-[10px] tracking-[0.16em] text-[color:var(--color-muted-foreground)]">
          {String(index + 1).padStart(2, "0")} / 04
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center py-8">
        <MediaSlot
          name={media}
          alt={stage.name}
          label={stage.role}
          priority={index === 0}
          maxHeight="min(14rem, 42vw)"
          className="evolution-media w-full max-w-[14rem] transition-transform duration-500 ease-out group-hover:scale-[1.04] [&>div:first-child]:opacity-0"
        />
      </div>

      <div className="border-t border-[color:var(--color-hairline)] pt-4">
        <h3 className="display-md uppercase">{stage.name}</h3>
        <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-[color:var(--color-muted-foreground)]">
          {stage.q}
        </p>
      </div>
    </motion.article>
  );
}
