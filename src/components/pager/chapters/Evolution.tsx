import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { rng } from "@/lib/scroll-range";
import { MediaSlot } from "../MediaSlot";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";
import { useT } from "@/i18n";

const MEDIA = ["Evo_1.png", "Evo_2.png", "Evo_3.png", "Evo_4.png"];

/**
 * EVOLUTION — a quiet four-step instrument. The page keeps its native scroll;
 * the pinned rail only stages the artwork and copy while the user moves
 * through the chapter. No cards, no carousel controls, no scroll hijacking.
 */
export function Evolution() {
  const t = useT();
  const reduced = useReducedMotion();
  const amp = reduced ? 0.25 : 1;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const stages = t.evolution.stages;

  return (
    <Section id="chapter-02" className="pt-[var(--chapter-space)]">
      <ChapterHead index="02" title={t.evolution.head.title} meta={t.evolution.head.meta} />

      <div className="shell mt-14 md:mt-24">
        <div className="grid-12 items-end gap-y-8">
          <h2 className="display-xl col-span-6 md:col-span-8">
            {t.evolution.h.map((line, i) => (
              <MaskLine key={line} delay={i * 0.09} className={i === 1 ? "md:pl-[10%]" : ""}>
                {line}
              </MaskLine>
            ))}
          </h2>
          <Rise className="col-span-6 md:col-span-4">
            <p className="lead rule-t pt-4">{t.evolution.lead}</p>
          </Rise>
        </div>
      </div>

      <div ref={ref} className="relative mt-16 h-[320svh] md:mt-24">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          <div className="shell pt-10 md:pt-14">
            <Axis labels={t.evolution.progression} progress={scrollYProgress} />
          </div>

          <div className="relative min-h-0 flex-1">
            {stages.map((stage, i) => (
              <Generation
                key={stage.name}
                index={i}
                count={stages.length}
                stage={stage}
                media={MEDIA[i]!}
                progress={scrollYProgress}
                amp={amp}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pb-[var(--chapter-space)]" />
    </Section>
  );
}

type Stage = { name: string; role: string; q: string };

function Axis({ labels, progress }: { labels: string[]; progress: MotionValue<number> }) {
  const fill = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div aria-label="Evolution stages">
      <div className="grid grid-cols-4 gap-3">
        {labels.map((label, index) => (
          <AxisLabel key={label} label={label} index={index} count={labels.length} progress={progress} />
        ))}
      </div>
      <div className="relative mt-5 h-px w-full bg-[color:var(--color-hairline)]">
        <motion.div
          className="absolute inset-y-0 left-0 bg-[color:var(--color-foreground)]"
          style={{ scaleX: fill, transformOrigin: "left" }}
        />
        <div className="absolute -top-1 left-0 h-2 w-2 rounded-full border border-[color:var(--color-foreground)] bg-[color:var(--color-background)]" />
        <div className="absolute -top-1 right-0 h-2 w-2 rounded-full border border-[color:var(--color-hairline)] bg-[color:var(--color-background)]" />
      </div>
    </div>
  );
}

function AxisLabel({
  label,
  index,
  count,
  progress,
}: {
  label: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const span = 1 / count;
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  const opacity = useTransform(
    progress,
    ...rng(
      [clamp(index * span - span * 0.32), clamp(index * span + span * 0.15), clamp((index + 1) * span)],
      [0.35, 1, 0.45],
    ),
  );
  const dotScale = useTransform(
    progress,
    ...rng(
      [clamp(index * span - span * 0.15), clamp(index * span + span * 0.12), clamp(index * span + span * 0.42)],
      [0.7, 1.35, 0.8],
    ),
  );
  return (
    <motion.div style={{ opacity }} className="flex min-w-0 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.13em] md:text-[11px]">
      <motion.span
        style={{ scale: dotScale }}
        className="h-2 w-2 shrink-0 rounded-full border border-current bg-[color:var(--color-background)]"
      />
      <span className="truncate">
        <span className="mr-1 opacity-45">{String(index + 1).padStart(2, "0")}</span>
        {label}
      </span>
    </motion.div>
  );
}

function Generation({
  index,
  count,
  stage,
  media,
  progress,
  amp,
}: {
  index: number;
  count: number;
  stage: Stage;
  media: string;
  progress: MotionValue<number>;
  amp: number;
}) {
  const span = 1 / count;
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  const start = index * span;
  const end = start + span;
  const a = index === 0 ? 0 : clamp(start - span * 0.08);
  const b = index === 0 ? 0.0001 : clamp(start + span * 0.14);
  const c = clamp(end - span * 0.16);
  const d = index === count - 1 ? 1 : clamp(end + span * 0.06);

  const opacity = useTransform(
    progress,
    ...rng([a, b, c, d], index === 0 ? [1, 1, 1, 0] : index === count - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]),
  );
  const x = useTransform(
    progress,
    ...rng([a, b, c, d], index === 0 ? ["0%", "0%", "0%", "-4%"] : ["6%", "0%", "0%", "-4%"]),
  );
  const scale = useTransform(progress, ...rng([a, b, c, d], [1.04, 1, 1, 0.97]));
  const mediaY = useTransform(progress, ...rng([a, d], [`${2 * amp}%`, `${-2 * amp}%`]));

  return (
    <motion.div className="absolute inset-0 flex items-center" style={{ opacity }}>
      <motion.div className="shell grid-12 w-full items-center gap-y-8 md:gap-x-10" style={{ x }}>
        <div className="order-2 col-span-6 md:order-1 md:col-span-5">
          <div className="rule-t pt-4">
            <span className="label-tech">{stage.role}</span>
          </div>
          <h3 className="display-lg mt-5 max-w-[18ch] uppercase">{stage.name}</h3>
          <p className="mt-6 max-w-[32ch] text-sm leading-relaxed text-[color:var(--color-muted-foreground)] md:text-base">
            {stage.q}
          </p>
          <div className="mt-8 hidden font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-muted-foreground)] md:block">
            {String(index + 1).padStart(2, "0")} / 04
          </div>
        </div>

        <motion.div
          className="order-1 col-span-6 md:order-2 md:col-span-6 md:col-start-7"
          style={{ scale, y: mediaY, transformOrigin: "50% 50%" }}
        >
          <MediaSlot
            name={media}
            alt={stage.name}
            label={stage.role}
            priority={index === 0}
            maxHeight="min(58svh, 38rem)"
            className="evolution-media [&>div:first-child]:opacity-0"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
