import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { MediaSlot } from "../MediaSlot";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";
import { useT } from "@/i18n";

/**
 * EVOLUTION — light editorial chapter.
 * A pinned chronology: one persistent system axis, four generations that
 * become primary in turn. No cards, no carousel, no cropping.
 */
const MEDIA = ["1_email.png", "2_sms.png", "3_chat.png", "4_pager.png"];

export function Evolution() {
  const t = useT();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const stages = t.evolution.stages;

  return (
    <Section id="chapter-02" light className="py-[var(--chapter-space)]">
      <ChapterHead index="02" title={t.evolution.head.title} meta={t.evolution.head.meta} />

      <div className="shell mt-16 md:mt-28">
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

      {reduced ? (
        <div className="shell mt-20 space-y-20">
          {stages.map((s, i) => (
            <StaticGeneration key={s.name} index={i} stage={s} axis={t.evolution.progression} />
          ))}
        </div>
      ) : (
        <div ref={ref} className="relative mt-20 md:mt-28" style={{ height: "340svh" }}>
          <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
            <div className="shell w-full">
              <Axis labels={t.evolution.progression} progress={scrollYProgress} />
              <div className="relative mt-8 h-[64svh] md:mt-10">
                {stages.map((s, i) => (
                  <Generation
                    key={s.name}
                    index={i}
                    count={stages.length}
                    stage={s}
                    media={MEDIA[i]!}
                    progress={scrollYProgress}
                    final={i === stages.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

type Stage = { name: string; role: string; q: string };

function Axis({ labels, progress }: { labels: string[]; progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        {labels.map((l, i) => (
          <AxisLabel key={l} label={l} index={i} count={labels.length} progress={progress} />
        ))}
      </div>
      <div className="mt-3 h-px w-full bg-[color:var(--color-hairline)]">
        <motion.div
          className="h-px bg-[color:var(--color-foreground)]"
          style={{ scaleX, transformOrigin: "left" }}
        />
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
  const cl = (v: number) => Math.min(1, Math.max(0, v));
  const opacity = useTransform(
    progress,
    [
      cl(index * span - span * 0.3),
      cl(index * span + span * 0.2),
      cl((index + 1) * span),
      cl((index + 1) * span + span * 0.3),
    ],
    [0.35, 1, 1, 0.35],
  );
  return (
    <motion.span
      style={{ opacity }}
      className="font-mono text-[10px] uppercase tracking-[0.16em] md:text-[12px]"
    >
      <span className="mr-2 opacity-50">{String(index + 1).padStart(2, "0")}</span>
      {label}
    </motion.span>
  );
}

function Generation({
  index,
  count,
  stage,
  media,
  progress,
  final,
}: {
  index: number;
  count: number;
  stage: Stage;
  media: string;
  progress: MotionValue<number>;
  final: boolean;
}) {
  const span = 1 / count;
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  const start = index * span;
  const end = start + span;
  const a = index === 0 ? 0 : clamp(start);
  const b = index === 0 ? 0.0001 : clamp(start + span * 0.22);
  const c = clamp(end - span * 0.22);
  const d = final ? 1 : clamp(end);

  const opacity = useTransform(
    progress,
    [a, b, c, d],
    index === 0 ? [1, 1, 1, 0] : final ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );
  // Earlier generations recede into the chronology as the next becomes primary.
  const scale = useTransform(progress, [a, b, c, d], final ? [1.02, 1, 1, 1] : [1.02, 1, 1, 0.94]);
  const x = useTransform(progress, [a, d], ["3%", "-3%"]);
  const y = useTransform(progress, [a, d], ["4%", "-4%"]);

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <div className="grid-12 h-full items-center gap-y-6">
        <motion.div className="col-span-6 md:col-span-6" style={{ scale, y }}>
          <MediaSlot
            name={media}
            alt={stage.name}
            label={`GEN ${index + 1}`}
            maxHeight="min(60svh, 38rem)"
            className="md:mx-0"
          />
        </motion.div>
        <motion.div className="col-span-6 md:col-span-5 md:col-start-8" style={{ x }}>
          <div className="rule-t pt-4">
            <span className="label-tech">{String(index + 1).padStart(2, "0")}</span>
            {final ? (
              <span className="label-tech ml-4 text-[color:var(--color-foreground)]">PAGER</span>
            ) : null}
          </div>
          <h3 className="display-md mt-6">{stage.name}</h3>
          <p className="mt-3 text-lg tracking-[-0.02em]">{stage.role}</p>
          <p className="label-tech mt-8 normal-case tracking-[0.02em]">{stage.q}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function StaticGeneration({
  index,
  stage,
  axis,
}: {
  index: number;
  stage: Stage;
  axis: string[];
}) {
  return (
    <div className="grid-12 items-center gap-y-6">
      <div className="col-span-6 md:col-span-6">
        <MediaSlot name={MEDIA[index]!} alt={stage.name} maxHeight="40svh" className="md:mx-0" />
      </div>
      <div className="col-span-6 md:col-span-5 md:col-start-8">
        <div className="rule-t pt-4">
          <span className="label-tech">
            {String(index + 1).padStart(2, "0")} / {axis[index]}
          </span>
        </div>
        <h3 className="display-md mt-6">{stage.name}</h3>
        <p className="mt-3 text-lg tracking-[-0.02em]">{stage.role}</p>
        <p className="label-tech mt-6 normal-case tracking-[0.02em]">{stage.q}</p>
      </div>
    </div>
  );
}
