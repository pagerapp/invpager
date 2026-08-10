import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { rng } from "@/lib/scroll-range";
import { useRef } from "react";
import { MediaSlot } from "../MediaSlot";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";
import { useT } from "@/i18n";

/**
 * EVOLUTION — pinned chronology instrument.
 * One persistent 4-step axis stays visible; exactly one generation is the
 * dominant stage at a time. Reduced motion keeps the pinning and the state
 * changes, and only shrinks translate/scale amplitude.
 */
const MEDIA = ["1_email.png", "2_sms.png", "3_chat.png", "4_pager.png"];

export function Evolution() {
  const t = useT();
  const reduced = useReducedMotion();
  const amp = reduced ? 0.25 : 1;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const stages = t.evolution.stages;

  return (
    <Section id="chapter-02" light className="pt-[var(--chapter-space)]">
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

      <div
        ref={ref}
        className="relative mt-16 md:mt-24"
        style={{ height: "360svh" }}
      >
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          <div className="shell pt-20 md:pt-24">
            <Axis labels={t.evolution.progression} progress={scrollYProgress} />
          </div>
          <div className="relative min-h-0 flex-1">
            {stages.map((s, i) => (
              <Generation
                key={s.name}
                index={i}
                count={stages.length}
                stage={s}
                media={MEDIA[i]!}
                progress={scrollYProgress}
                final={i === stages.length - 1}
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
    ...rng(
      [
        cl(index * span - span * 0.3),
        cl(index * span + span * 0.2),
        cl((index + 1) * span),
        cl((index + 1) * span + span * 0.3),
      ],
      [0.32, 1, 1, 0.32],
    ),
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
  amp,
}: {
  index: number;
  count: number;
  stage: Stage;
  media: string;
  progress: MotionValue<number>;
  final: boolean;
  amp: number;
}) {
  const span = 1 / count;
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  const start = index * span;
  const end = start + span;
  const a = index === 0 ? 0 : clamp(start);
  const b = index === 0 ? 0.0001 : clamp(start + span * 0.18);
  const c = clamp(end - span * 0.18);
  const d = final ? 1 : clamp(end);

  const opacity = useTransform(
    progress,
    ...rng([a, b, c, d], index === 0 ? [1, 1, 1, 0] : final ? [0, 1, 1, 1] : [0, 1, 1, 0]),
  );
  // The instrument timeline slides horizontally: incoming enters from the
  // right of the frame, outgoing leaves to the left and recedes in depth.
  const x = useTransform(
    progress,
    ...rng(
      [a, b, c, d],
      final
        ? [`${6 * amp}%`, "0%", "0%", "0%"]
        : index === 0
          ? ["0%", "0%", "0%", `${-6 * amp}%`]
          : [`${6 * amp}%`, "0%", "0%", `${-6 * amp}%`],
    ),
  );
  const scale = useTransform(
    progress,
    ...rng([a, b, c, d], final ? [1.02, 1, 1, 1] : [1.03, 1, 1, 0.95]),
  );
  const mediaY = useTransform(progress, ...rng([a, d], [`${3 * amp}%`, `${-3 * amp}%`]));

  return (
    <motion.div className="absolute inset-0 flex items-center" style={{ opacity }}>
      <motion.div className="shell grid-12 w-full items-center gap-y-8" style={{ x }}>
        <div className="col-span-6 md:col-span-5">
          <div className="rule-t pt-4">
            <span className="label-tech">
              GEN {String(index + 1).padStart(2, "0")} / {stage.role}
            </span>
          </div>
          <h3 className="display-lg mt-6 max-w-[14ch] uppercase">{stage.name}</h3>
          <p className="label-tech mt-8 max-w-[30ch] normal-case tracking-[0.02em]">{stage.q}</p>
        </div>
        <motion.div
          className="col-span-6 md:col-span-6 md:col-start-7"
          style={{ scale, y: mediaY, transformOrigin: "50% 50%" }}
        >
          <MediaSlot
            name={media}
            alt={stage.name}
            label={`GEN ${index + 1}`}
            priority={index === 0}
            maxHeight="min(58svh, 38rem)"
            className="md:mx-0"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
