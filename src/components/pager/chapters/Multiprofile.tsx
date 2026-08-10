import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { rng } from "@/lib/scroll-range";
import { useRef } from "react";
import { MediaSlot } from "../MediaSlot";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";
import { multiprofileStates } from "@/lib/multiprofile-media";
import { useT } from "@/i18n";

/**
 * MULTIPROFILE — second StoryScroll.
 * Three states: PROBLEM → REALIZATION → SOLUTION. The identity stays anchored,
 * the context around it changes. Media is square and never cropped.
 */
export function Multiprofile() {
  const t = useT();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const states = multiprofileStates();
  const beats = t.multiprofile.beats.slice(0, 3);
  const exit = t.multiprofile.beats[3];

  return (
    <Section id="chapter-04" className="pt-[var(--chapter-space)]">
      <ChapterHead index="04" title={t.multiprofile.head.title} meta={t.multiprofile.head.meta} />

      <div className="shell mt-16 md:mt-24">
        <div className="grid-12 gap-y-8">
          <h2 className="display-lg col-span-6 md:col-span-8">
            {t.multiprofile.h.map((line, i) => (
              <MaskLine key={line} delay={i * 0.07}>
                {line}
              </MaskLine>
            ))}
          </h2>
          <Rise className="col-span-6 md:col-span-4">
            <div className="rule-t pt-4">
              <p className="text-lg tracking-[-0.02em]">{t.multiprofile.quote}</p>
              <p className="lead mt-5">{t.multiprofile.body}</p>
            </div>
          </Rise>
        </div>
      </div>

      {reduced ? (
        <div className="shell mt-16 space-y-16">
          {beats.map((b, i) => (
            <div key={b.label} className="grid-12 items-center gap-y-6">
              <div className="col-span-6 md:col-span-6">
                <MediaSlot
                  name={states[i]!}
                  alt={`${t.multiprofile.altDesktop} ${i + 1}`}
                  maxHeight="46svh"
                  className="md:mx-0"
                />
              </div>
              <div className="col-span-6 md:col-span-5 md:col-start-8">
                <span className="label-tech">
                  {String(i + 1).padStart(2, "0")} / {b.label}
                </span>
                <p className="display-md mt-5">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div ref={ref} className="relative mt-14 md:mt-20" style={{ height: "280svh" }}>
          <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
            <div className="relative h-[86svh] w-full">
              {beats.map((b, i) => (
                <ProfileState
                  key={b.label}
                  index={i}
                  count={beats.length}
                  label={b.label}
                  text={b.text}
                  media={states[i]!}
                  alt={`${t.multiprofile.altDesktop} ${i + 1}`}
                  progress={scrollYProgress}
                />
              ))}
              <StateAxis labels={beats.map((b) => b.label)} progress={scrollYProgress} />
            </div>
          </div>
        </div>
      )}

      <div className="shell mt-16 pb-[var(--chapter-space)] md:mt-24">
        {exit ? (
          <Rise className="rule-t pt-4">
            <span className="label-tech">{exit.label}</span>
            <p className="display-md mt-4 max-w-[26ch]">{exit.text}</p>
          </Rise>
        ) : null}

        <div className="mt-16 md:mt-24">
          <MaskLine as="div" className="display-lg">
            {t.multiprofile.outro[0]}
          </MaskLine>
          <MaskLine as="div" delay={0.08} className="display-lg text-[color:var(--personal)]">
            {t.multiprofile.outro[1]}
          </MaskLine>
        </div>
      </div>
    </Section>
  );
}

function ProfileState({
  index,
  count,
  label,
  text,
  media,
  alt,
  progress,
}: {
  index: number;
  count: number;
  label: string;
  text: string;
  media: string;
  alt: string;
  progress: MotionValue<number>;
}) {
  const span = 1 / count;
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  const first = index === 0;
  const last = index === count - 1;
  const a = first ? 0 : clamp(index * span);
  const b = first ? 0.0001 : clamp(index * span + span * 0.22);
  const c = clamp((index + 1) * span - span * 0.22);
  const d = last ? 1 : clamp((index + 1) * span);

  const opacity = useTransform(
    progress,
    [a, b, c, d],
    first ? [1, 1, 1, 0] : last ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );
  // The final state settles: no residual drift once control is established.
  const amp = last ? 0.2 : first ? 1 : 0.6;
  const scale = useTransform(progress, [a, b, c, d], last ? [1.02, 1, 1, 1] : [1.025, 1, 1, 0.97]);
  const mediaY = useTransform(progress, ...rng([a, d], [`${3 * amp}%`, `${-3 * amp}%`]));
  const textY = useTransform(progress, ...rng([a, d], [`${8 * amp}%`, `${-8 * amp}%`]));

  return (
    <motion.div className="absolute inset-0 flex items-center" style={{ opacity }}>
      <div className="shell grid-12 w-full items-center gap-y-6">
        <motion.div
          className="col-span-6 md:col-span-7"
          style={{ y: mediaY, scale, transformOrigin: "50% 50%" }}
        >
          <MediaSlot
            name={media}
            alt={alt}
            label={`STATE ${index + 1}`}
            priority={index === 0}
            maxHeight="min(58svh, 40rem)"
            className="md:mx-0"
          />
        </motion.div>
        <motion.div className="col-span-6 md:col-span-5 md:col-start-8" style={{ y: textY }}>
          <span className="label-tech text-[color:var(--color-foreground)]">
            STATE {String(index + 1).padStart(2, "0")} / {label}
          </span>
          <h3 className="display-md mt-5 max-w-[22ch] overflow-hidden">
            <StateLine progress={progress} a={a} b={b} c={c} d={d}>
              {text}
            </StateLine>
          </h3>
        </motion.div>
      </div>
    </motion.div>
  );
}

function StateLine({
  progress,
  a,
  b,
  c,
  d,
  children,
}: {
  progress: MotionValue<number>;
  a: number;
  b: number;
  c: number;
  d: number;
  children: React.ReactNode;
}) {
  const y = useTransform(progress, ...rng([a, b, c, d], ["105%", "0%", "0%", "-40%"]));
  return (
    <motion.span className="block" style={{ y }}>
      {children}
    </motion.span>
  );
}

function StateAxis({ labels, progress }: { labels: string[]; progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0">
      <div className="shell">
        <div className="flex items-center justify-between pb-3">
          <span className="label-tech">MULTIPROFILE / STORYSCROLL</span>
          <span className="label-tech hidden gap-4 md:flex">
            {labels.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </span>
        </div>
        <div className="h-px w-full bg-[color:var(--color-hairline)]">
          <motion.div
            className="h-px bg-[color:var(--color-foreground)]"
            style={{ scaleX, transformOrigin: "left" }}
          />
        </div>
      </div>
    </div>
  );
}
