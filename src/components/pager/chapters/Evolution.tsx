import { motion } from "motion/react";
import { MediaSlot } from "../MediaSlot";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";
import { useT } from "@/i18n";

const MEDIA = ["Evo_1.png", "Evo_2.png", "Evo_3.png", "Evo_4.png"];

type Stage = { name: string; role: string; prompt: string; q: string; body: string };

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

        <div
          aria-label={t.evolution.head.title}
          role="list"
          className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-16 md:grid md:grid-cols-2 md:gap-px md:overflow-visible md:bg-[color:var(--color-hairline)] md:pb-0"
        >
          {stages.map((stage, i) => (
            <StageCard key={stage.name} stage={stage} media={MEDIA[i]!} index={i} />
          ))}
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
      className="group relative flex min-h-[25rem] min-w-[88vw] snap-start flex-col overflow-hidden border border-[color:var(--color-hairline)] bg-[color:var(--color-background)] px-5 py-5 md:min-h-[31rem] md:min-w-0 md:border-0 md:px-8 md:py-7"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="label-tech transition-colors duration-300 group-hover:text-[color:var(--color-foreground)]">
          {stage.role}
        </span>
        <span className="font-mono text-[10px] tracking-[0.16em] text-[color:var(--color-muted-foreground)]">
          {String(index + 1).padStart(2, "0")} / 04
        </span>
      </div>

      <div className="grid flex-1 grid-cols-[34%_minmax(0,1fr)] items-center gap-5 py-6 md:grid-cols-[38%_minmax(0,1fr)] md:gap-8 md:py-9">
        <div className="flex min-w-0 items-center justify-center">
          <MediaSlot
            name={media}
            alt={stage.name}
            label={stage.role}
            priority={index === 0}
            maxHeight="min(12rem, 32vw)"
            className="evolution-media w-full max-w-[12rem] transition-transform duration-500 ease-out group-hover:scale-[1.04] [&>div:first-child]:opacity-0"
          />
        </div>

        <div className="min-w-0 border-l border-[color:var(--color-hairline)] pl-5 md:pl-8">
          <p className="label-tech mb-4 text-[color:var(--color-foreground)]">{stage.prompt}</p>
          <h3 className="text-xl font-semibold uppercase leading-[1.05] tracking-[-0.03em] md:text-3xl">
            {stage.name}
          </h3>
          <p className="mt-4 text-sm font-medium leading-snug text-[color:var(--color-foreground)] md:text-base">
            {stage.q}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-muted-foreground)] md:text-[15px]">
            {stage.body}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
