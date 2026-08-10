import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { MediaSlot } from "./MediaSlot";
import { rng } from "@/lib/scroll-range";

/**
 * StoryScroll ENGINE — one pinned 100svh stage, states layered absolutely.
 *
 * - the parent is multi-screen tall, the stage is sticky and exactly 100svh
 * - native scroll owns position; JS only derives a normalized progress and
 *   smooths it with requestAnimationFrame (never hijacks wheel/touch)
 * - three spatially stable zones: rail+title / media / description
 * - media is always object-contain, never cropped (see MediaSlot)
 */

export type StoryState = {
  /** "01", "02"… — omitted for the intro state. */
  code?: string;
  /** Rail label, e.g. ХАОС. */
  label: string;
  kicker?: string;
  /** Title lines. */
  title: string[];
  body?: string;
  media?: string;
  alt?: string;
  color?: string;
  footer?: ReactNode;
};

export function StoryScroll({
  states,
  heightSvh,
  railTitle,
  className = "",
}: {
  states: StoryState[];
  heightSvh: number;
  railTitle: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = !!useReducedMotion();
  const progress = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let target = 0;
    let current = 0;
    let raf = 0;
    let running = false;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const passed = -rect.top;
      target = scrollable > 0 ? Math.min(1, Math.max(0, passed / scrollable)) : 0;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      // rAF interpolation: premium easing instead of a 1:1 wheel tie.
      current += (target - current) * (reduced ? 1 : 0.14);
      if (Math.abs(target - current) < 0.0002) current = target;
      progress.set(current);
      if (current === target) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
    };
  }, [progress, reduced]);

  return (
    <div ref={ref} className={`relative ${className}`} style={{ height: `${heightSvh}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="relative h-[100svh]">
          <Rail states={states} progress={progress} title={railTitle} />
          {states.map((s, i) => (
            <Panel
              key={s.label}
              state={s}
              index={i}
              count={states.length}
              progress={progress}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Window helper: each state owns an equal slice of the timeline. */
function windowFor(index: number, count: number) {
  const span = 1 / count;
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  const first = index === 0;
  const last = index === count - 1;
  const a = first ? 0 : clamp(index * span);
  const b = first ? 0.0001 : clamp(index * span + span * 0.26);
  const c = clamp((index + 1) * span - span * 0.26);
  const d = last ? 1 : clamp((index + 1) * span);
  return { a, b, c, d, first, last };
}

function Panel({
  state,
  index,
  count,
  progress,
  reduced,
}: {
  state: StoryState;
  index: number;
  count: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const { a, b, c, d, first, last } = windowFor(index, count);

  const opacity = useTransform(
    progress,
    ...rng([a, b, c, d], first ? [1, 1, 1, 0] : last ? [0, 1, 1, 1] : [0, 1, 1, 0]),
  );

  // Incoming advances 0.98 → 1.00, outgoing recedes 1.00 → 0.975. Restrained.
  const scale = useTransform(
    progress,
    ...rng([a, b, c, d], reduced ? [1, 1, 1, 1] : last ? [0.98, 1, 1, 1] : [0.98, 1, 1, 0.975]),
  );
  const filter = useTransform(
    progress,
    ...rng(
      [a, b, c, d],
      reduced
        ? ["none", "none", "none", "none"]
        : last
          ? ["blur(6px) contrast(0.94)", "blur(0px) contrast(1)", "blur(0px) contrast(1)", "blur(0px) contrast(1)"]
          : [
              "blur(6px) contrast(0.94)",
              "blur(0px) contrast(1)",
              "blur(0px) contrast(1)",
              "blur(5px) contrast(0.9)",
            ],
    ),
  );

  const pointer = useTransform(opacity, (v) => (v > 0.5 ? "auto" : "none"));

  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col"
      style={{ opacity, pointerEvents: pointer }}
    >
      {/* TOP ZONE — stable height, holds the frame title. */}
      <div className="shell shrink-0 pt-[calc(4.5rem+env(safe-area-inset-top))] md:pt-24">
        <div className="min-h-[4.5rem] md:min-h-[6rem]">
          {state.kicker ? (
            <span className="label-tech text-[color:var(--color-foreground)]">{state.kicker}</span>
          ) : null}
          <h2
            className={`${state.media ? "display-md" : "display-xl"} max-w-[24ch] overflow-hidden uppercase`}
          >
            {state.title.map((line, i) => (
              <ClipLine key={line} progress={progress} a={a} b={b} c={c} d={d} delay={i * 0.06}>
                {line}
              </ClipLine>
            ))}
          </h2>
        </div>
      </div>

      {/* CENTER ZONE — media anchor, contained, never cropped. */}
      <div className="flex min-h-0 flex-1 items-center justify-center px-0 md:px-6">
        {state.media ? (
          <motion.div style={{ scale, filter }} className="w-full">
            <MediaSlot
              name={state.media}
              alt={state.alt ?? state.title.join(" ")}
              label={`STATE ${state.code ?? ""}`}
              priority={index <= 1}
              maxHeight="min(46svh, 100vw)"
              className="md:mx-auto"
            />
          </motion.div>
        ) : null}
      </div>

      {/* BOTTOM ZONE — description / launch info. */}
      <div className="shell shrink-0 pb-[calc(2rem+env(safe-area-inset-bottom))] md:pb-12">
        <div className="rule-t min-h-[5.5rem] pt-4 md:min-h-[6rem]">
          {state.body ? <p className="lead max-w-[46ch]">{state.body}</p> : null}
          {state.footer}
        </div>
      </div>
    </motion.div>
  );
}

/** Title lines clip in and out of their own mask — never a generic fade. */
function ClipLine({
  progress,
  a,
  b,
  c,
  d,
  delay,
  children,
}: {
  progress: MotionValue<number>;
  a: number;
  b: number;
  c: number;
  d: number;
  delay: number;
  children: ReactNode;
}) {
  const shift = Math.min(0.05, delay);
  const y = useTransform(
    progress,
    ...rng([a + shift, b + shift, c, d], ["105%", "0%", "0%", "-45%"]),
  );
  return (
    <span className="mask-line block">
      <motion.span className="block" style={{ y }}>
        {children}
      </motion.span>
    </span>
  );
}

/** Restrained top progress rail — hairlines and tiny mono labels only. */
function Rail({
  states,
  progress,
  title,
}: {
  states: StoryState[];
  progress: MotionValue<number>;
  title: string;
}) {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 pt-[calc(3.5rem+env(safe-area-inset-top))] md:pt-16">
      <div className="shell">
        <div className="flex items-center justify-between pb-2">
          <span className="label-tech">{title}</span>
          <span className="label-tech flex gap-3 md:gap-5">
            {states.map((s, i) => (
              <RailItem key={s.label} index={i} count={states.length} progress={progress}>
                {s.code ? `${s.code} / ${s.label}` : s.label}
              </RailItem>
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

function RailItem({
  index,
  count,
  progress,
  children,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  const { a, d } = windowFor(index, count);
  const opacity = useTransform(progress, (v) => (v >= a - 0.001 && v <= d + 0.001 ? 1 : 0.38));
  return (
    <motion.span style={{ opacity }} className="whitespace-nowrap">
      {children}
    </motion.span>
  );
}
