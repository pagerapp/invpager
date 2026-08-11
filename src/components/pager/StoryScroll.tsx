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
 * - masking is WORD-LEVEL: a mask box can never contain an internal line wrap,
 *   so no glyph is ever sliced by a clipping box
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
  className = "",
  /** Desktop media cap. Mobile always uses the near-100vw square. */
  mediaHeight = "min(64svh, 92vw)",
}: {
  states: StoryState[];
  heightSvh: number;
  className?: string;
  mediaHeight?: string;
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
          <Rail states={states} progress={progress} />
          {states.map((s, i) => (
            <Panel
              key={s.label}
              state={s}
              index={i}
              count={states.length}
              progress={progress}
              reduced={reduced}
              mediaHeight={mediaHeight}
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

/** Designed handoff window: the last state clears before the stage releases. */
const COPY_OUT = [0.86, 0.93] as const;
const MEDIA_OUT = [0.9, 0.985] as const;

function Panel({
  state,
  index,
  count,
  progress,
  reduced,
  mediaHeight,
}: {
  state: StoryState;
  index: number;
  count: number;
  progress: MotionValue<number>;
  reduced: boolean;
  mediaHeight: string;
}) {
  const { a, b, c, d, first, last } = windowFor(index, count);
  const isIntro = !state.media;

  const opacity = useTransform(
    progress,
    ...rng([a, b, c, d], first ? [1, 1, 1, 0] : last ? [0, 1, 1, 1] : [0, 1, 1, 0]),
  );

  // Incoming advances 0.98 → 1.00, outgoing recedes 1.00 → 0.975. Restrained.
  const scale = useTransform(
    progress,
    ...rng(
      [a, b, c, d],
      reduced ? [1, 1, 1, 1] : last ? [0.98, 1, 1, 1] : [0.98, 1, 1, 0.975],
    ),
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

  // Release choreography: copy clears first, media then recedes and fades,
  // so the stage never releases as a naked floating frame.
  const copyOpacity = useTransform(
    progress,
    ...rng(last ? [COPY_OUT[0], COPY_OUT[1]] : [0, 1], [1, last ? 0 : 1]),
  );
  const releaseOpacity = useTransform(
    progress,
    ...rng(last ? [MEDIA_OUT[0], MEDIA_OUT[1]] : [0, 1], [1, last ? 0 : 1]),
  );
  const releaseScale = useTransform(
    progress,
    ...rng(
      last && !reduced ? [MEDIA_OUT[0], MEDIA_OUT[1]] : [0, 1],
      [1, last && !reduced ? 0.955 : 1],
    ),
  );

  const hasBottom = Boolean(state.body || state.footer);

  if (isIntro) {
    // INTRO VARIANT — a deliberate 100svh poster frame: one optically
    // composed group, no accidental void between headline and lead.
    return (
      <motion.div
        className="absolute inset-0 z-10 flex flex-col justify-center"
        style={{ opacity, pointerEvents: pointer }}
      >
        <motion.div
          className="shell pt-[calc(5rem+env(safe-area-inset-top))] pb-[calc(2rem+env(safe-area-inset-bottom))] md:pt-24"
          style={{ opacity: copyOpacity }}
        >
          {state.kicker ? (
            <span className="label-tech block text-[color:var(--color-foreground)]">
              {state.kicker}
            </span>
          ) : null}
          <h2 className="display-xl mt-5 max-w-[22ch] uppercase md:mt-6">
            {state.title.map((line, i) => (
              <ClipLine
                key={line}
                progress={progress}
                a={a}
                b={b}
                c={c}
                d={d}
                delay={i * 0.06}
                first={first}
                last={last}
              >
                {line}
              </ClipLine>
            ))}
          </h2>
          {hasBottom ? (
            <div className="rule-t mt-8 max-w-[52ch] pt-4 md:mt-10">
              {state.body ? <p className="lead max-w-[46ch]">{state.body}</p> : null}
              {state.footer}
            </div>
          ) : null}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 z-10 grid grid-rows-[auto_minmax(0,1fr)_auto]"
      style={{ opacity, pointerEvents: pointer }}
    >
      {/* TOP ROW — content-driven, never clipped. */}
      <motion.div
        className="shell pt-[calc(6.5rem+env(safe-area-inset-top))] md:pt-28"
        style={{ opacity: copyOpacity }}
      >
        {state.kicker ? (
          <span className="label-tech text-[color:var(--color-foreground)]">{state.kicker}</span>
        ) : null}
        <h2 className="display-md max-w-[24ch] uppercase">
          {state.title.map((line, i) => (
            <ClipLine
              key={line}
              progress={progress}
              a={a}
              b={b}
              c={c}
              d={d}
              delay={i * 0.06}
              first={first}
              last={last}
            >
              {line}
            </ClipLine>
          ))}
        </h2>
      </motion.div>

      {/* CENTER ROW — media anchor, contained, never cropped.
          Mobile gets a small optical nudge downward so the square reads
          centered in the perceived frame rather than the raw grid row. */}
      <div className="flex min-h-0 items-center justify-center px-0 py-3 md:px-6 md:py-4">
        <motion.div
          style={{ scale, filter, opacity: releaseOpacity }}
          className="w-full translate-y-[1.5vh] md:translate-y-0"
        >
          <motion.div style={{ scale: releaseScale }}>
            <MediaSlot
              name={state.media!}
              alt={state.alt ?? state.title.join(" ")}
              label={`STATE ${state.code ?? ""}`}
              priority={index <= 1}
              maxHeight={mediaHeight}
              className="md:mx-auto"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* BOTTOM ROW — content-driven; fully collapsed for media-only states. */}
      <motion.div
        className={`shell ${hasBottom ? "pb-[calc(2rem+env(safe-area-inset-bottom))] md:pb-12" : "pb-[calc(1rem+env(safe-area-inset-bottom))]"}`}
        style={{ opacity: copyOpacity }}
      >
        {hasBottom ? (
          <div className="rule-t pt-4">
            {state.body ? <p className="lead max-w-[46ch]">{state.body}</p> : null}
            {state.footer}
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

/**
 * Typographic mask reveal, WORD BY WORD.
 * Each word owns its own clipping box, so a wrapped headline can never be
 * sliced mid-glyph — the mask always matches exactly one visual line fragment.
 */
function ClipLine({
  progress,
  a,
  b,
  c,
  d,
  delay,
  first,
  last,
  children,
}: {
  progress: MotionValue<number>;
  a: number;
  b: number;
  c: number;
  d: number;
  delay: number;
  first?: boolean;
  last?: boolean;
  children: ReactNode;
}) {
  const shift = Math.min(0.05, delay);
  // The intro state is fully composed at progress 0 — no reveal latency.
  const out = last ? "0%" : "-45%";
  const y = useTransform(
    progress,
    ...rng(
      [a + shift, b + shift, c, d],
      first ? ["0%", "0%", "0%", "-45%"] : ["105%", "0%", "0%", out],
    ),
  );

  const words = String(children).split(/\s+/).filter(Boolean);

  return (
    <span className="block">
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.16em", marginBottom: "-0.16em", marginRight: "0.25em" }}
        >
          <motion.span className="block whitespace-pre" style={{ y }}>
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Restrained progress rail — appears only once the media states begin. */
function Rail({ states, progress }: { states: StoryState[]; progress: MotionValue<number> }) {
  const coded = states.map((s, i) => ({ s, i })).filter(({ s }) => Boolean(s.code));
  const introEnd = 1 / states.length;
  const railOpacity = useTransform(
    progress,
    ...rng([introEnd * 0.72, introEnd * 1.02, COPY_OUT[0], COPY_OUT[1]], [0, 1, 1, 0]),
  );
  const scaleX = useTransform(progress, ...rng([introEnd, COPY_OUT[0]], [0, 1]));

  if (coded.length === 0) return null;

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 top-0 z-20 pt-[calc(4.25rem+env(safe-area-inset-top))] md:pt-20"
      style={{ opacity: railOpacity }}
      aria-hidden
    >
      <div className="shell">
        <div className="flex items-center justify-between pb-2">
          <span className="label-tech hidden gap-5 md:flex">
            {coded.map(({ s, i }) => (
              <RailItem key={s.label} index={i} count={states.length} progress={progress}>
                {s.code ? `${s.code} / ${s.label}` : s.label}
              </RailItem>
            ))}
          </span>
          <span className="label-tech md:hidden">
            <RailCurrent states={states} progress={progress} />
          </span>
        </div>
        <div className="h-px w-full bg-[color:var(--color-hairline)]">
          <motion.div
            className="h-px bg-[color:var(--color-foreground)]"
            style={{ scaleX, transformOrigin: "left" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/** Mobile rail: only the active state label, so it can never wrap. */
function RailCurrent({
  states,
  progress,
}: {
  states: StoryState[];
  progress: MotionValue<number>;
}) {
  const idx = useTransform(progress, (v) => {
    const i = Math.min(states.length - 1, Math.floor(v * states.length + 0.0001));
    const s = states[i]!;
    return s.code ? `${s.code} / ${s.label}` : "";
  });
  return <motion.span className="whitespace-nowrap text-[color:var(--color-foreground)]">{idx}</motion.span>;
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
  const opacity = useTransform(progress, (v) => (v >= a - 0.001 && v <= d + 0.001 ? 1 : 0.55));
  return (
    <motion.span style={{ opacity }} className="whitespace-nowrap">
      {children}
    </motion.span>
  );
}
