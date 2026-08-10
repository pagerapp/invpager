import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { rng } from "@/lib/scroll-range";
import { useRef } from "react";
import { MediaSlot } from "../MediaSlot";
import { MaskLine } from "../primitives";
import { useLocale, useT } from "@/i18n";

/**
 * Hero StoryScroll — one pinned stage, three story states.
 * CHAOS MOVES → SYSTEM ORGANIZES → CONTROL STOPS: motion amplitude decays per state.
 */

/** Locale-aware source frames. Media is never altered; only the source variant changes. */
function heroMedia(locale: string): string[] {
  const ru = locale === "ru";
  return [
    "Hero_storyscroll_img_RU_ENG_1.jpg",
    ru ? "Hero_storyscroll_img_RU_2.jpg" : "Hero_storyscroll_img_ENG_2.jpg",
    ru ? "Hero_storyscroll_img_RU_3.jpg" : "Hero_storyscroll_img_ENG_3.jpg",
  ];
}

const COLORS = ["var(--guest)", "var(--work)", "var(--personal)"];
/** Motion settles state by state — chaos moves, control stops. */
const AMPLITUDE = [1, 0.55, 0.18];

type FrameData = {
  n: string;
  tag: string;
  title: string;
  body: string;
  media: string;
  color: string;
  amp: number;
};

function useFrames(): FrameData[] {
  const t = useT();
  const { locale } = useLocale();
  const media = heroMedia(locale);
  return t.hero.frames.map((f, i) => ({
    n: String(i + 1).padStart(2, "0"),
    tag: f.tag,
    title: f.title,
    body: f.body,
    media: media[i]!,
    color: COLORS[i]!,
    amp: AMPLITUDE[i]!,
  }));
}

export function Hero() {
  return (
    <>
      <Manifesto />
      <StoryScroll />
      <Launch />
    </>
  );
}

function Manifesto() {
  const t = useT();
  return (
    <div className="shell pt-28 pb-[clamp(4rem,10vw,9rem)] md:pt-40">
      <div className="grid-12 items-end">
        <div className="col-span-6 md:col-span-8">
          <MaskLine className="label-tech mb-8 md:mb-12" as="div">
            <span className="label-tech text-[color:var(--color-foreground)]">
              {t.hero.kicker}
            </span>
          </MaskLine>
          <h1 className="display-xl">
            {t.hero.h1.map((line, i) => (
              <MaskLine
                key={line}
                delay={0.05 + i * 0.07}
                className={i === 1 ? "md:pl-[6%]" : i === 2 ? "md:pl-[12%]" : ""}
              >
                {line}
              </MaskLine>
            ))}
          </h1>
        </div>
        <div className="col-span-6 md:col-span-4 md:pb-3">
          <div className="rule-t pt-4">
            <p className="lead max-w-sm">{t.hero.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#chapter-08"
                className="focus-instrument bg-[color:var(--color-foreground)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-background)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                {t.hero.ctaPrimary}
              </a>
              <a
                href="#chapter-03"
                className="focus-instrument border border-[color:var(--color-border)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 hover:bg-[color:var(--color-accent)]"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const frames = useFrames();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative" style={{ height: "300svh" }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="relative h-full">
          {frames.map((f, i) => (
            <Frame
              key={f.n}
              frame={f}
              index={i}
              count={frames.length}
              progress={scrollYProgress}
              motionScale={reduced ? 0.25 : 1}
            />
          ))}
          <Readout progress={scrollYProgress} frames={frames} />
        </div>
      </div>
    </div>
  );
}

function Frame({
  frame,
  index,
  count,
  progress,
  motionScale,
}: {
  frame: FrameData;
  index: number;
  count: number;
  progress: MotionValue<number>;
  motionScale: number;
}) {
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  const span = 1 / count;
  const start = index * span;
  const end = start + span;
  // Windows never overlap: the outgoing state is fully gone before the next appears.
  const inA = clamp(start);
  const inB = clamp(start + span * 0.2);
  const outA = clamp(end - span * 0.2);
  const outB = clamp(end);

  const first = index === 0;
  const last = index === count - 1;
  const a = first ? 0 : inA;
  const b = first ? 0.0001 : inB;

  const opacity = useTransform(
    progress,
    ...rng(
    [a, b, outA, outB],
    first ? [1, 1, 1, 0] : last ? [0, 1, 1, 1] : [0, 1, 1, 0],
    ),
  );

  // Incoming comes forward, outgoing recedes — spatial, never a slideshow.
  const scale = useTransform(
    progress,
    ...rng(
    [a, b, outA, outB],
    last ? [1.03, 1, 1, 1] : first ? [1, 1, 1, 0.965] : [1.03, 1, 1, 0.965],
    ),
  );
  const amp = frame.amp * motionScale;
  const mediaY = useTransform(progress, ...rng([a, outB], [`${4 * amp}%`, `${-4 * amp}%`]));
  const textY = useTransform(progress, ...rng([a, outB], [`${9 * amp}%`, `${-9 * amp}%`]));
  const metaY = useTransform(progress, ...rng([a, outB], [`${14 * amp}%`, `${-14 * amp}%`]));
  // Outgoing state recedes: slight contrast/brightness loss, incoming comes forward.
  const filter = useTransform(
    progress,
    ...rng(
    [a, b, outA, outB],
    last
      ? ["contrast(0.92)", "contrast(1)", "contrast(1)", "contrast(1)"]
      : ["contrast(0.9)", "contrast(1)", "contrast(1)", "contrast(0.82)"],
    ),
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center"
      style={{ opacity }}
      aria-hidden={false}
    >
      <div className="shell grid-12 w-full items-center gap-y-6">
        <motion.div
          className="col-span-6 md:col-span-7"
          style={{ y: mediaY, scale, filter }}
        >
          <MediaSlot
            name={frame.media}
            alt={frame.title}
            label={`FRAME ${frame.n}`}
            priority={index === 0}
            maxHeight="min(72svh, 46rem)"
            className="md:mx-0"
          />
        </motion.div>
        <motion.div className="col-span-6 md:col-span-5 md:col-start-8" style={{ y: textY }}>
          <motion.div style={{ y: metaY }} className="mb-5 flex items-center gap-3">
            <span aria-hidden className="h-2 w-2" style={{ backgroundColor: frame.color }} />
            <span className="label-tech text-[color:var(--color-foreground)]">
              FRAME {frame.n} / {frame.tag}
            </span>
          </motion.div>
          <h2 className="display-md max-w-[20ch] overflow-hidden uppercase">
            <StateLine progress={progress} a={a} b={b} outA={outA} outB={outB}>
              {frame.title}
            </StateLine>
          </h2>
          <p className="lead mt-5 max-w-[42ch]">{frame.body}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

/** Heading clipped in and out of its own mask — never a generic fade. */
function StateLine({
  progress,
  a,
  b,
  outA,
  outB,
  children,
}: {
  progress: MotionValue<number>;
  a: number;
  b: number;
  outA: number;
  outB: number;
  children: React.ReactNode;
}) {
  const y = useTransform(progress, ...rng([a, b, outA, outB], ["105%", "0%", "0%", "-45%"]));
  return (
    <motion.span className="block" style={{ y }}>
      {children}
    </motion.span>
  );
}

function Readout({
  progress,
  frames,
}: {
  progress: MotionValue<number>;
  frames: FrameData[];
}) {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0">
      <div className="shell">
        <div className="flex items-center justify-between pb-3">
          <span className="label-tech">HERO / STORYSCROLL</span>
          <span className="label-tech flex gap-3">
            {frames.map((f) => (
              <span key={f.n}>{f.n}</span>
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

function Launch() {
  const t = useT();
  return (
    <div className="shell pt-16 pb-[clamp(2.5rem,5vw,4rem)]">
      <div className="grid-12 rule-t pt-4">
        <span className="label-tech col-span-6 md:col-span-4">{t.hero.launch.label}</span>
        <span className="label-tech col-span-6 md:col-span-4 text-[color:var(--color-foreground)]">
          {t.hero.launch.beta}
        </span>
        <span className="label-tech col-span-6 md:col-span-4 md:text-right">
          {t.hero.launch.stores}
        </span>
      </div>
    </div>
  );
}
