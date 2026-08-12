import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { MediaSlot } from "./MediaSlot";
import { rng } from "@/lib/scroll-range";

/**
 * StoryScroll ENGINE — one pinned 100svh stage, scenes layered absolutely.
 *
 * - the parent is a multi-screen runway, the stage is sticky and exactly 100svh
 * - native scroll owns position; JS only derives a normalized progress and
 *   smooths it with requestAnimationFrame (never hijacks wheel/touch)
 * - every scene has HOLD → TRANSITION → HOLD: the transition band is a short
 *   slice of the scene window, so the story reads as cut scenes, not a fade
 * - masking is WORD-LEVEL: a mask box can never contain an internal line wrap
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
  /** Optional mobile-specific media source. */
  mobileMedia?: string;
  alt?: string;
  color?: string;
  footer?: ReactNode;
  /**
   * Transition character of the scene:
   *  chaos    — arrives unsettled (more blur, wider scale delta)
   *  order    — arrives organizing (moderate)
   *  control  — arrives calm (almost no movement)
   */
  motionIntent?: "chaos" | "order" | "control";
};

export function StoryScroll({
  states,
  heightSvh,
  className = "",
  /** Desktop media cap. Mobile always uses the near-100vw square. */
  mediaHeight = "min(64svh, 92vw)",
  /** Poster-style centered intro (Hero). */
  introAlign = "start",
  /** Keep the last scene readable through the release (no black hand-off). */
  holdFinal = false,
  /** Preload every media layer when a story is a pinned hero sequence. */
  preloadMedia = false,
}: {
  states: StoryState[];
  heightSvh: number;
  className?: string;
  mediaHeight?: string;
  introAlign?: "start" | "center";
  holdFinal?: boolean;
  preloadMedia?: boolean;
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
          <Rail states={states} progress={progress} holdFinal={holdFinal} />
          {states.map((s, i) => (
            <Panel
              key={s.label}
              state={s}
              index={i}
              count={states.length}
              progress={progress}
              reduced={reduced}
              mediaHeight={mediaHeight}
              introAlign={introAlign}
              holdFinal={holdFinal}
              preloadMedia={preloadMedia}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Window helper — each scene owns an equal slice of the runway, and inside it
 * only a SHORT band is spent transitioning. The rest is a hard hold.
 */
const TRANSITION = 0.11; // share of one scene window spent in motion

function windowFor(index: number, count: number) {
  const span = 1 / count;
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  const first = index === 0;
  const last = index === count - 1;
  const pad = span * TRANSITION;
  const a = first ? 0 : clamp(index * span - pad * 0.5);
  const b = first ? 0.0001 : clamp(index * span + pad * 0.5);
  const c = clamp((index + 1) * span - pad * 0.5);
  const d = last ? 1 : clamp((index + 1) * span + pad * 0.5);
  return { a, b, c, d, first, last };
}

/** Designed handoff: copy clears, then media recedes — never a black void. */
const COPY_OUT = [0.9, 0.96] as const;
const MEDIA_OUT = [0.945, 0.999] as const;
/** holdFinal variant: the last scene never releases — it stays fully composed. */
const COPY_OUT_HOLD = [0.999, 1] as const;

function Panel({
  state,
  index,
  count,
  progress,
  reduced,
  mediaHeight,
  introAlign,
  holdFinal,
  preloadMedia,
}: {
  state: StoryState;
  index: number;
  count: number;
  progress: MotionValue<number>;
  reduced: boolean;
  mediaHeight: string;
  introAlign: "start" | "center";
  holdFinal: boolean;
  preloadMedia: boolean;
}) {
  const { a, b, c, d, first, last } = windowFor(index, count);
  const isIntro = !state.media;
  const intent = state.motionIntent ?? "order";
  const heldFinal = last && holdFinal;
  const copyOut = heldFinal ? COPY_OUT_HOLD : COPY_OUT;
  const mediaOut = heldFinal ? COPY_OUT_HOLD : MEDIA_OUT;
  const finalOpacity = heldFinal ? 1 : 0;

  // Per-intent arrival/exit character: chaos is unsettled, control is calm.
  const IN = {
    chaos: { scale: 0.94, blur: 14, contrast: 0.82, y: "4.5%", x: "-2.5%" },
    order: { scale: 0.968, blur: 7, contrast: 0.92, y: "2.4%", x: "1.6%" },
    control: { scale: 1.03, blur: 3, contrast: 1.04, y: "0.6%", x: "0%" },
  }[intent];

  // Staged choreography inside the scene window:
  // settle (a→b) → headline mask → media depth → supporting copy.
  const span = b - a || 1e-4;
  const hold = c - b || 1e-4;
  const bodyIn = [b - span * 0.1, b + hold * 0.1] as const;

  const opacity = useTransform(
    progress,
    ...rng([a, b, c, d], first ? [1, 1, 1, 0] : last ? [0, 1, 1, 1] : [0, 1, 1, 0]),
  );

  const scale = useTransform(
    progress,
    ...rng(
      [a, b, c, d],
      reduced ? [1, 1, 1, 1] : last ? [IN.scale, 1, 1, 1] : [IN.scale, 1, 1, 0.972],
    ),
  );
  const y = useTransform(
    progress,
    ...rng(
      [a, b, c, d],
      reduced ? ["0%", "0%", "0%", "0%"] : last ? [IN.y, "0%", "0%", "0%"] : [IN.y, "0%", "0%", "-2%"],
    ),
  );
  const x = useTransform(
    progress,
    ...rng(
      [a, b, c, d],
      reduced ? ["0%", "0%", "0%", "0%"] : last ? [IN.x, "0%", "0%", "0%"] : [IN.x, "0%", "0%", "0%"],
    ),
  );
  const filter = useTransform(
    progress,
    ...rng(
      [a, b, c, d],
      reduced
        ? ["none", "none", "none", "none"]
        : last
          ? [`blur(${IN.blur}px) contrast(${IN.contrast})`, "blur(0px) contrast(1)", "blur(0px) contrast(1)", "blur(0px) contrast(1)"]
          : [
              `blur(${IN.blur}px) contrast(${IN.contrast})`,
              "blur(0px) contrast(1)",
              "blur(0px) contrast(1)",
              "blur(6px) contrast(0.88)",
            ],
    ),
  );

  const pointer = useTransform(opacity, (v) => (v > 0.5 ? "auto" : "none"));

  // Release choreography: copy clears first, media then recedes.
  const copyOpacity = useTransform(
    progress,
    ...rng(last ? [copyOut[0], copyOut[1]] : [0, 1], [1, last ? (heldFinal ? 1 : 0) : 1]),
  );
  const releaseOpacity = useTransform(
    progress,
    ...rng(last ? [mediaOut[0], mediaOut[1]] : [0, 1], [1, last ? finalOpacity : 1]),
  );
  const releaseScale = useTransform(
    progress,
    ...rng(
      last && !reduced && !heldFinal ? [mediaOut[0], mediaOut[1]] : [0, 1],
      [1, last && !reduced && !heldFinal ? 0.955 : 1],
    ),
  );

  // Supporting copy arrives AFTER the frame settles — never as one preset fade.
  const bodyOpacity = useTransform(
    progress,
    ...rng(
      last ? [bodyIn[0], bodyIn[1], copyOut[0], copyOut[1]] : [bodyIn[0], bodyIn[1], c, d],
      last ? [0, 1, 1, heldFinal ? 1 : 0] : [0, 1, 1, 0],
    ),
  );
  const bodyY = useTransform(
    progress,
    ...rng(bodyIn as unknown as number[], reduced ? ["0%", "0%"] : ["36%", "0%"]),
  );

  const hasBottom = Boolean(state.body || state.footer);

  if (isIntro) {
    const centered = introAlign === "center";
    // INTRO VARIANT — a deliberate 100svh poster frame: one optically
    // composed group, complete without scrolling.
    return (
      <motion.div
        className="absolute inset-0 z-10 flex flex-col justify-center"
        style={{ opacity, pointerEvents: pointer }}
      >
        <motion.div
          className={`shell pt-[calc(5rem+env(safe-area-inset-top))] pb-[calc(2rem+env(safe-area-inset-bottom))] md:pt-24 ${
            centered ? "text-center" : ""
          }`}
          style={{ opacity: copyOpacity }}
        >
          {state.kicker ? (
            <span className="label-tech block text-[color:var(--color-foreground)]">
              {state.kicker}
            </span>
          ) : null}
          <h2
            className={`display-xl mt-7 uppercase md:mt-10 ${
              centered ? "mx-auto max-w-[16ch]" : "max-w-[22ch]"
            }`}
          >
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
                center={centered}
              >
                {line}
              </ClipLine>
            ))}
          </h2>
          {hasBottom ? (
            <div
              className={`mt-10 pt-5 md:mt-12 ${
                centered ? "mx-auto max-w-[56ch] border-t border-[color:var(--color-hairline)]" : "rule-t max-w-[52ch]"
              }`}
            >
              {state.body ? (
                <p
                  className={`text-[clamp(1.05rem,1.6vw,1.45rem)] leading-[1.45] text-[color:var(--color-foreground)]/85 ${
                    centered ? "mx-auto max-w-[42ch]" : "max-w-[46ch]"
                  }`}
                >
                  {state.body}
                </p>
              ) : null}
              {state.footer}
            </div>
          ) : null}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col justify-center"
      style={{ opacity, pointerEvents: pointer }}
    >
      <div className="shell grid h-full grid-rows-[auto_minmax(0,1fr)_auto] pt-[calc(6rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))] md:grid-cols-12 md:grid-rows-1 md:items-center md:gap-x-10 md:pt-24 md:pb-12">
        {/* MEDIA — the dominant anchor of the composed frame. */}
        <div className="order-2 flex min-h-0 items-center justify-center py-3 md:order-1 md:col-span-7 md:py-0">
          <motion.div
            style={{ scale, filter, opacity: releaseOpacity, y, x }}
            className="w-full"
          >
            <motion.div style={{ scale: releaseScale }}>
              <MediaSlot
                name={state.media!}
                mobileName={state.mobileMedia}
                alt={state.alt ?? state.title.join(" ")}
                label={`STATE ${state.code ?? ""}`}
                priority={preloadMedia || index <= 1}
                maxHeight={mediaHeight}
                className="md:mx-auto"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* COPY COLUMN — headline and supporting text read as one editorial unit. */}
        <div className="order-1 md:order-2 md:col-span-5">
          <motion.div style={{ opacity: copyOpacity, y }}>
            {state.kicker ? (
              <span className="label-tech text-[color:var(--color-foreground)]">{state.kicker}</span>
            ) : null}
            <h2 className="display-lg mt-3 max-w-[16ch] uppercase">
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

          {hasBottom ? (
            <motion.div
              className="rule-t mt-5 pt-5 md:mt-7 md:pt-6"
              style={{ opacity: bodyOpacity, y: bodyY }}
            >
              {state.body ? (
                <p className="max-w-[42ch] text-[clamp(1rem,1.35vw,1.3rem)] leading-[1.5] text-[color:var(--color-foreground)]/85">
                  {state.body}
                </p>
              ) : null}
              {state.footer}
            </motion.div>
          ) : null}
        </div>
      </div>
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
  center,
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
  center?: boolean;
  children: ReactNode;
}) {
  const shift = Math.min(0.02, delay);
  // The intro state is fully composed at progress 0 — no reveal latency.
  const out = last ? "0%" : "-45%";
  const y = useTransform(
    progress,
    ...rng(
      [a + shift, b + shift, c, d],
      first ? ["0%", "0%", "0%", "-45%"] : ["105%", "0%", "0%", out],
    ),
  );

  // CJK has no spaces: a whole line would wrap inside one mask, so it is
  // split per character. Latin/Cyrillic split on spaces.
  const text = String(children);
  const cjk = /[\u3400-\u9FFF\u3000-\u303F\uFF00-\uFFEF]/.test(text);
  const words = cjk ? Array.from(text).filter((ch) => ch.trim()) : text.split(/\s+/).filter(Boolean);

  return (
    <span className={`block ${center ? "text-center" : ""}`}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{
            paddingBottom: "0.26em",
            marginBottom: "-0.26em",
            marginRight: cjk ? "0" : "0.25em",
          }}
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
function Rail({
  states,
  progress,
  holdFinal,
}: {
  states: StoryState[];
  progress: MotionValue<number>;
  holdFinal: boolean;
}) {
  const coded = states.map((s, i) => ({ s, i })).filter(({ s }) => Boolean(s.code));
  const introEnd = 1 / states.length;
  const out = holdFinal ? ([0.94, 0.985] as const) : COPY_OUT;
  const railOpacity = useTransform(
    progress,
    ...rng([introEnd * 0.72, introEnd * 1.02, out[0], out[1]], [0, 1, 1, 0]),
  );
  const scaleX = useTransform(progress, ...rng([introEnd, out[0]], [0, 1]));

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
