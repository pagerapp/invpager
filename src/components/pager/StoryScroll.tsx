import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { MediaSlot } from "./MediaSlot";
import { rng } from "@/lib/scroll-range";
import { useIsMobile } from "@/hooks/use-mobile";

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
  /** Optional brand lockup rendered above the manifesto kicker. */
  introMark?: ReactNode;
  kicker?: string;
  /** Title lines. */
  title: string[];
  body?: string;
  media?: string;
  /** Optional scroll-driven DOM interface rendered above the key art. */
  mediaOverlay?: (progress: MotionValue<number>, range: SceneRange) => ReactNode;
  /** Holds the key art back while an interface sequence establishes the scene. */
  mediaLateReveal?: boolean;
  /** Keeps key art present from the entrance but lets it resolve across the whole scene. */
  mediaGradualReveal?: boolean;
  /** Optional mobile-specific media source. */
  mobileMedia?: string;
  alt?: string;
  color?: string;
  footer?: ReactNode;
  /** Dedicated layers staged at the end of a held final frame. */
  finaleLaunch?: ReactNode;
  finaleCta?: ReactNode;
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
  const isMobile = useIsMobile();
  // This page uses purposeful, scroll-driven choreography rather than looping
  // decorative motion. Keep it active even where the browser reports a reduced
  // motion preference so the product narrative does not collapse into slides.
  const reduced = false;
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
      current += (target - current) * (reduced ? 1 : 0.1);
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
  }, [progress, reduced, states.length]);

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
              isMobile={isMobile}
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
const TRANSITION = 0.08; // share of one scene window spent in motion
/** The manifesto is an invitation, not a full scroll chapter. */
const INTRO_SHARE = 0.12;

type SceneRange = { a: number; b: number; c: number; d: number };

function windowFor(index: number, count: number) {
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  const first = index === 0;
  const last = index === count - 1;
  const remainingSpan = count > 1 ? (1 - INTRO_SHARE) / (count - 1) : 1;
  const span = first ? INTRO_SHARE : remainingSpan;
  const start = first ? 0 : INTRO_SHARE + (index - 1) * remainingSpan;
  const end = first ? INTRO_SHARE : start + span;
  const pad = span * TRANSITION;
  // First media deliberately arrives beneath the departing manifesto so the
  // opening movement reads as one reveal instead of two consecutive scenes.
  const a = first ? 0 : clamp(start - (index === 1 ? pad * 0.85 : pad * 0.5));
  const b = first ? 0.0001 : clamp(start + pad * 0.5);
  const c = first ? INTRO_SHARE * 0.68 : clamp(end - pad * 0.5);
  const d = last ? 1 : first ? INTRO_SHARE : clamp(end + pad * 0.5);
  return { a, b, c, d, first, last };
}

/** Designed handoff: copy clears, then media recedes — never a black void. */
const COPY_OUT = [0.9, 0.96] as const;
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
  isMobile,
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
  isMobile: boolean;
}) {
  const { a, b, c, d, first, last } = windowFor(index, count);
  const isIntro = !state.media;
  const heldFinal = last && holdFinal;
  const lateMedia = Boolean(state.mediaLateReveal);
  const gradualMedia = Boolean(state.mediaGradualReveal);
  // The hero subject stays hidden while the interface tells its story and
  // becomes visible only as the scene resolves into its final composition.
  const lateMediaStart = b + (c - b) * 0.72;
  const copyOut = heldFinal ? COPY_OUT_HOLD : COPY_OUT;

  // Staged choreography inside the scene window:
  // settle (a→b) → headline mask → media depth → supporting copy.
  const span = b - a || 1e-4;
  const hold = c - b || 1e-4;
  const bodyIn = [b - span * 0.1, b + hold * 0.1] as const;

  const opacity = useTransform(
    progress,
    ...rng([a, b, c, d], first ? [1, 1, 1, 0] : last ? [0, 1, 1, 1] : [0, 1, 1, 0]),
  );

  // Each still rises into its exact resting position, remains perfectly stable
  // while it is read, then leaves upward. Directional veils soften the cut.
  const mediaY = useTransform(
    progress,
    ...rng(
      [a, b, c, d],
      lateMedia
        ? ["14%", "14%", "8%", "0%"]
        : reduced
        ? ["0%", "0%", "0%", "0%"]
        : heldFinal
          ? ["10%", "0%", "0%", "0%"]
          : ["10%", "0%", "0%", "-10%"],
    ),
  );
  const mediaOpacity = useTransform(
    progress,
    ...(lateMedia
      ? rng([lateMediaStart, c], [0, 1])
      : gradualMedia
        ? rng([a, b, c, d], [0.18, 0.38, 1, 1])
      : rng([a, b, c, d], heldFinal ? [0, 1, 1, 1] : [0, 1, 1, 0])),
  );
  const mediaFilter = useTransform(
    progress,
    ...rng(
      [a, b, c, d],
      lateMedia
        ? ["blur(10px) brightness(0.28)", "blur(10px) brightness(0.28)", "blur(5px) brightness(0.45)", "blur(0px) brightness(1)"]
        : gradualMedia
          ? ["blur(4px) brightness(0.42)", "blur(3px) brightness(0.58)", "blur(0px) brightness(1)", "blur(0px) brightness(1)"]
        : reduced
        ? ["none", "none", "none", "none"]
        : heldFinal
          ? ["blur(7px) brightness(0.82)", "blur(0px) brightness(1)", "blur(0px) brightness(1)", "blur(0px) brightness(1)"]
          : ["blur(7px) brightness(0.82)", "blur(0px) brightness(1)", "blur(0px) brightness(1)", "blur(7px) brightness(0.82)"],
    ),
  );
  const mediaScale = useTransform(
    progress,
    ...rng(
      [a, b, c, d],
      lateMedia
        ? [0.92, 0.92, 0.96, 1]
        : gradualMedia
          ? [0.95, 0.965, 1, 1]
          : reduced
            ? [1, 1, 1, 1]
            : heldFinal
              ? [0.93, 1, 1, 1]
              : [0.96, 1, 1, 0.97],
    ),
  );
  const entryVeilOpacity = useTransform(progress, ...rng([a, b, c, d], [1, 0, 0, 0]));
  const exitVeilOpacity = useTransform(
    progress,
    ...rng([a, b, c, d], heldFinal ? [0, 0, 0, 0] : [0, 0, 0, 1]),
  );

  const pointer = useTransform(opacity, (v) => (v > 0.5 ? "auto" : "none"));

  // Release choreography: copy clears first, then the image continues upward.
  const copyOpacity = useTransform(
    progress,
    ...rng(last ? [copyOut[0], copyOut[1]] : [0, 1], [1, last ? (heldFinal ? 1 : 0) : 1]),
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
  // Text has a separate, deliberate trajectory from the key art. On desktop
  // it slows across the reading zone; the supporting paragraph follows with a
  // small lag, giving the two layers a restrained magnetic relationship.
  const textStart = b - span * (isMobile ? 0.04 : 0.12);
  const textCruiseIn = b + hold * (isMobile ? 0.16 : 0.27);
  const textCruiseOut = b + hold * (isMobile ? 0.58 : 0.62);
  const textEnd = heldFinal ? d : c + (d - c) * 0.92;
  const headlineY = useTransform(
    progress,
    ...rng(
      [textStart, textCruiseIn, textCruiseOut, textEnd],
      reduced
        ? ["0%", "0%", "0%", "0%"]
        : isMobile
          ? ["42%", "5%", "0%", heldFinal ? "0%" : "-42%"]
          : ["64%", "7%", "0%", heldFinal ? "0%" : "-66%"],
    ),
  );
  const headlineOpacity = useTransform(
    progress,
    ...rng(
      [textStart, textCruiseIn, textCruiseOut, textEnd],
      heldFinal ? [0, 1, 1, 1] : [0, 1, 1, 0],
    ),
  );
  const headlineBlur = useTransform(
    progress,
    ...rng(
      [textStart, textCruiseIn, textCruiseOut, textEnd],
      reduced
        ? ["none", "none", "none", "none"]
        : heldFinal
          ? ["blur(5px)", "blur(0px)", "blur(0px)", "blur(0px)"]
          : ["blur(5px)", "blur(0px)", "blur(0px)", "blur(4px)"],
    ),
  );
  const headlineVeil = useTransform(
    progress,
    ...rng([textStart, textCruiseIn, textCruiseOut, textEnd], heldFinal ? [1, 0, 0, 0] : [1, 0, 0, 1]),
  );
  const finaleLaunchAt = b + (d - b) * 0.8;
  const finaleCtaAt = b + (d - b) * 0.9;
  // Supporting copy begins only after the headline has reached its reading zone.
  const supportStart = textCruiseIn + hold * (isMobile ? 0.055 : 0.08);
  const supportCruiseIn = supportStart + hold * (isMobile ? 0.12 : 0.16);
  const supportCruiseOut = textCruiseOut + hold * (isMobile ? 0.025 : 0.04);
  const supportY = useTransform(
    progress,
    ...rng(
      [supportStart, supportCruiseIn, supportCruiseOut, textEnd],
      reduced
        ? ["0%", "0%", "0%", "0%"]
        : isMobile
          ? ["28%", "6%", "2%", heldFinal ? "0%" : "-25%"]
          : ["38%", "8%", "3%", heldFinal ? "0%" : "-38%"],
    ),
  );
  const supportOpacity = useTransform(
    progress,
    ...rng(
      [supportStart, supportCruiseIn, isMobile && heldFinal ? finaleLaunchAt - 0.035 : supportCruiseOut, textEnd],
      heldFinal && !isMobile ? [0, 1, 1, 1] : [0, 1, 1, 0],
    ),
  );
  const finaleLaunchOpacity = useTransform(progress, ...rng([finaleLaunchAt, finaleLaunchAt + 0.035], [0, 1]));
  const finaleLaunchY = useTransform(progress, ...rng([finaleLaunchAt, finaleLaunchAt + 0.035], ["18%", "0%"]));
  const finaleCtaOpacity = useTransform(progress, ...rng([finaleCtaAt, finaleCtaAt + 0.03], [0, 1]));
  const finaleCtaY = useTransform(progress, ...rng([finaleCtaAt, finaleCtaAt + 0.03], ["18%", "0%"]));
  // The poster clears only after its parts have physically left the frame.
  // This prevents a generic fade from swallowing the reverse choreography.
  const introPanelOpacity = useTransform(progress, ...rng([INTRO_SHARE * 0.975, INTRO_SHARE], [1, 0]));
  const introMarkOpacity = useTransform(progress, ...rng([0.075, 0.115], [1, 0]));
  const introMarkY = useTransform(progress, ...rng([0.075, 0.115], ["0%", "-18%"]));
  const introLeadOpacity = useTransform(progress, ...rng([0.05, 0.085], [1, 0]));
  const introLeadY = useTransform(progress, ...rng([0.05, 0.085], ["0%", "-28%"]));

  const hasBottom = Boolean(state.body || state.footer);

  if (isIntro) {
    const centered = introAlign === "center";
    // INTRO VARIANT — a deliberate 100svh poster frame: one optically
    // composed group, complete without scrolling.
    return (
      <motion.div
        className="absolute inset-0 z-10 flex flex-col justify-center"
        style={{ opacity: introPanelOpacity, pointerEvents: pointer }}
      >
        <motion.div
          className={`shell pt-[calc(5rem+env(safe-area-inset-top))] pb-[calc(2rem+env(safe-area-inset-bottom))] md:pt-24 ${
            centered ? "text-center" : ""
          }`}
          style={{ opacity: copyOpacity }}
        >
          <motion.div style={{ opacity: introMarkOpacity, y: introMarkY }} className="mb-7 md:mb-9">
            <motion.div
              // The manifesto entrance is a short, non-looping brand cue.
              // Keep it available even when scroll motion is reduced.
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.46, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {state.introMark ? <div className="mb-5 md:mb-6">{state.introMark}</div> : null}
              {state.kicker ? (
                <span className="label-tech block text-[color:var(--color-foreground)]">
                  {state.kicker}
                </span>
              ) : null}
            </motion.div>
          </motion.div>
          <h2
            className={`display-xl uppercase ${
              centered ? "mx-auto max-w-[16ch]" : "max-w-[22ch]"
            }`}
          >
            {state.title.map((line, i) => (
              <IntroManifestoLine key={line} line={line} index={i} progress={progress} centered={centered} />
            ))}
          </h2>
          {hasBottom ? (
            <motion.div
              className={`mt-8 pt-5 md:mt-10 ${
                centered ? "mx-auto max-w-[56ch] border-t border-[color:var(--color-hairline)]" : "rule-t max-w-[52ch]"
              }`}
              style={{ opacity: introLeadOpacity, y: introLeadY }}
            >
              {state.body ? (
                <p
                  className={`${centered ? "text-[clamp(1.25rem,2vw,1.85rem)]" : "text-[clamp(1.05rem,1.6vw,1.45rem)]"} leading-[1.45] text-[color:var(--color-foreground)]/85 ${
                    centered ? "mx-auto max-w-[42ch]" : "max-w-[46ch]"
                  }`}
                >
                  <IntroLetterReveal text={state.body} progress={progress} />
                </p>
              ) : null}
              {state.footer}
            </motion.div>
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
          <div className="relative w-full">
            <motion.div style={{ filter: mediaFilter, opacity: mediaOpacity, scale: mediaScale, y: mediaY }} className="relative w-full">
            <MediaSlot
              name={state.media!}
              mobileName={state.mobileMedia}
              alt={state.alt ?? state.title.join(" ")}
              label={`STATE ${state.code ?? ""}`}
              priority={preloadMedia || index <= 1}
              maxHeight={mediaHeight}
              className="md:mx-auto"
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[68%]"
              style={{
                opacity: entryVeilOpacity,
                background:
                  "linear-gradient(to top, var(--color-background) 3%, color-mix(in srgb, var(--color-background) 84%, transparent) 48%, transparent 100%)",
              }}
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[68%]"
              style={{
                opacity: exitVeilOpacity,
                background:
                  "linear-gradient(to bottom, var(--color-background) 3%, color-mix(in srgb, var(--color-background) 84%, transparent) 48%, transparent 100%)",
              }}
            />
            </motion.div>
            {state.mediaOverlay ? (
              <div className="pointer-events-none absolute inset-0 z-20">
                {state.mediaOverlay(progress, { a, b, c, d })}
              </div>
            ) : null}
          </div>
        </div>

        {/* COPY COLUMN — headline and supporting text read as one editorial unit. */}
        {hasBottom ? (
          <motion.div className="relative -top-9 order-3 mt-3 text-center md:hidden" style={{ opacity: supportOpacity, y: supportY }}>
            {state.body ? (
              <p className="mx-auto max-w-[34ch] text-[clamp(1rem,4.5vw,1.2rem)] leading-[1.48] text-[color:var(--color-foreground)]/88">
                <ScrubbedBody text={state.body} progress={progress} start={supportStart} end={supportCruiseIn} />
              </p>
            ) : null}
            {state.footer}
          </motion.div>
        ) : null}

        <div className="relative top-8 order-1 text-center md:top-0 md:order-2 md:col-span-5 md:text-left">
          <motion.div style={{ opacity: headlineOpacity, y: headlineY, filter: headlineBlur }}>
            {state.kicker ? (
              <span className="label-tech text-[color:var(--color-foreground)]">{state.kicker}</span>
            ) : null}
            <h2 className="display-lg mx-auto mt-3 max-w-[16ch] uppercase md:mx-0">
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
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              opacity: headlineVeil,
              background:
                "linear-gradient(to top, var(--color-background) 0%, color-mix(in srgb, var(--color-background) 92%, transparent) 36%, color-mix(in srgb, var(--color-background) 46%, transparent) 68%, transparent 100%)",
            }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              opacity: headlineVeil,
              background:
                "linear-gradient(to bottom, var(--color-background) 0%, color-mix(in srgb, var(--color-background) 92%, transparent) 36%, color-mix(in srgb, var(--color-background) 46%, transparent) 68%, transparent 100%)",
            }}
          />

          {hasBottom ? (
            <motion.div
              className="mt-7 hidden pt-6 text-left md:block"
              style={{ opacity: supportOpacity, y: supportY }}
            >
              {state.body ? (
                <p className="mx-auto max-w-[42ch] text-[clamp(1rem,1.35vw,1.3rem)] leading-[1.5] text-[color:var(--color-foreground)]/85 md:mx-0">
                  <ScrubbedBody text={state.body} progress={progress} start={supportStart} end={supportCruiseIn} />
                </p>
              ) : null}
              {state.footer}
            </motion.div>
          ) : null}
        </div>
      </div>
      {state.finaleLaunch || state.finaleCta ? (
        <div className="pointer-events-none absolute inset-x-5 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-20 flex flex-col items-center text-center md:inset-x-0 md:bottom-[7svh]">
          {state.finaleLaunch ? (
            <motion.div
              style={{ opacity: finaleLaunchOpacity, y: finaleLaunchY }}
              className="mb-7 max-w-[36rem] font-mono text-[clamp(0.85rem,1.15vw,1.1rem)] uppercase leading-[1.9] tracking-[0.13em] text-[color:var(--color-muted)]"
            >
              {state.finaleLaunch}
            </motion.div>
          ) : null}
          {state.finaleCta ? (
            <motion.div style={{ opacity: finaleCtaOpacity, y: finaleCtaY }} className="pointer-events-auto">
              {state.finaleCta}
            </motion.div>
          ) : null}
        </div>
      ) : null}
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
          className="inline-block align-bottom"
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

function IntroManifestoLine({
  line,
  index,
  progress,
  centered,
}: {
  line: string;
  index: number;
  progress: MotionValue<number>;
  centered: boolean;
}) {
  const entry = index === 0 ? { x: "-34vw" } : index === 1 ? { x: "34vw" } : { y: "18vh" };
  const exit = index === 0 ? { x: "-42vw", y: "0%" } : index === 1 ? { x: "42vw", y: "0%" } : { x: "0%", y: "24vh" };
  const exitStart = 0.09 + index * 0.009;
  const x = useTransform(progress, ...rng([exitStart, 0.145], ["0%", exit.x]));
  const y = useTransform(progress, ...rng([exitStart, 0.145], ["0%", exit.y]));
  const opacity = useTransform(progress, ...rng([0.11 + index * 0.006, 0.15], [1, 0]));

  return (
    <motion.div
      initial={{ opacity: 0, ...entry }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.62, delay: index * 0.17, ease: [0.22, 1, 0.36, 1] }}
      style={{ x, y, opacity }}
    >
      <ClipLine
        progress={progress}
        a={0}
        b={0.0001}
        c={INTRO_SHARE * 0.68}
        d={INTRO_SHARE}
        delay={index * 0.06}
        first
        last
        center={centered}
      >
        {line}
      </ClipLine>
    </motion.div>
  );
}

/**
 * Lightweight UI signals settle around the static key art on entry. They are
 * intentionally abstract — they add interface motion without pretending to
 * separate baked-in cards from a supplied image.
 */
/** Intro-only letter reveal. Words stay intact so wrapping never splits a word. */
function IntroLetterReveal({ text, progress }: { text: string; progress: MotionValue<number> }) {
  const words = text.match(/\S+\s*/g) ?? [text];
  let letter = 0;

  return (
    <>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block whitespace-pre">
          {Array.from(word).map((character, characterIndex) => {
            const position = letter;
            letter += 1;
            return <IntroLetter key={`${character}-${characterIndex}`} character={character} position={position} progress={progress} />;
          })}
        </span>
      ))}
    </>
  );
}

function IntroLetter({
  character,
  position,
  progress,
}: {
  character: string;
  position: number;
  progress: MotionValue<number>;
}) {
  const exitStart = 0.062 + position * 0.0008;
  const opacity = useTransform(progress, ...rng([exitStart, 0.104 + position * 0.00035], [1, 0]));
  const y = useTransform(progress, ...rng([exitStart, 0.104 + position * 0.00035], ["0%", "-90%"]));

  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 1.12 + position * 0.014, ease: [0.22, 1, 0.36, 1] }}
      style={{ opacity, y }}
    >
      {character}
    </motion.span>
  );
}

/** Restrained progress rail — appears only once the media states begin. */
/**
 * Supporting copy illuminates in short semantic groups rather than arriving
 * as a single paragraph. Word wrappers preserve normal line breaking.
 */
function ScrubbedBody({
  text,
  progress,
  start,
  end,
}: {
  text: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const words = text.match(/\S+\s*/g) ?? [text];
  const groupSize = 3;

  return (
    <>
      {words.map((word, index) => (
        <ScrubbedWord
          key={`${word}-${index}`}
          word={word}
          index={index}
          total={words.length}
          progress={progress}
          start={start}
          end={end}
          groupSize={groupSize}
        />
      ))}
    </>
  );
}

function ScrubbedWord({
  word,
  index,
  total,
  progress,
  start,
  end,
  groupSize,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  start: number;
  end: number;
  groupSize: number;
}) {
  const groups = Math.ceil(total / groupSize);
  const group = Math.floor(index / groupSize);
  const span = (end - start) / Math.max(groups, 1);
  const revealStart = start + group * span;
  const revealEnd = revealStart + span * 0.72;
  const opacity = useTransform(progress, ...rng([revealStart, revealEnd], [0.32, 1]));
  const y = useTransform(progress, ...rng([revealStart, revealEnd], ["0.32em", "0em"]));

  return (
    <motion.span className="inline-block whitespace-pre" style={{ opacity, y }}>
      {word}
    </motion.span>
  );
}

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
  const introEnd = states.length > 1 ? INTRO_SHARE : 1;
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
        <div className="relative h-[4.75rem]">
          <div className="absolute inset-x-2.5 top-7 h-px bg-[color:var(--color-hairline)]">
            <motion.div
              className="h-px bg-[color:var(--color-foreground)]"
              style={{ scaleX, transformOrigin: "left" }}
            />
          </div>
          <div className="absolute inset-x-0 top-0 grid grid-cols-3">
            {coded.map(({ s, i }, railIndex) => (
              <RailNode
                key={s.label}
                state={s}
                index={i}
                count={states.length}
                railIndex={railIndex}
                progress={progress}
              />
            ))}
          </div>
          <RailPercent progress={progress} introEnd={introEnd} />
        </div>
      </div>
    </motion.div>
  );
}

function RailNode({
  state,
  index,
  count,
  railIndex,
  progress,
}: {
  state: StoryState;
  index: number;
  count: number;
  railIndex: number;
  progress: MotionValue<number>;
}) {
  const { a, d } = windowFor(index, count);
  const active = useTransform(progress, (v) => v >= a - 0.001 && v <= d + 0.001);
  const opacity = useTransform(active, (v) => (v ? 1 : 0.42));
  const dotScale = useTransform(active, (v) => (v ? 1.25 : 1));
  const glowOpacity = useTransform(active, (v) => (v ? 1 : 0));
  const alignment = railIndex === 0 ? "items-start text-left" : railIndex === 2 ? "items-end text-right" : "items-center text-center";

  return (
    <div className={`flex flex-col ${alignment}`}>
      <motion.span
        className="label-tech mb-2 whitespace-nowrap text-[color:var(--color-foreground)]"
        style={{ opacity }}
      >
        {state.code} / {state.label}
      </motion.span>
      <div className="relative flex h-5 w-5 items-center justify-center">
        <motion.span
          className="absolute h-5 w-5 rounded-full border border-[color:var(--color-foreground)]/30"
          style={{ opacity: glowOpacity, boxShadow: "0 0 18px rgba(246, 200, 111, 0.42)" }}
        />
        <motion.span
          className="h-2.5 w-2.5 rounded-full border border-[color:var(--color-foreground)]/55 bg-[color:var(--color-background)]"
          style={{ opacity, scale: dotScale }}
        >
          <motion.span
            className="block h-full w-full rounded-full bg-[#fff2d8]"
            style={{ opacity: glowOpacity }}
          />
        </motion.span>
      </div>
    </div>
  );
}

function RailPercent({ progress, introEnd }: { progress: MotionValue<number>; introEnd: number }) {
  const left = useTransform(progress, (v) => {
    const value = Math.min(1, Math.max(0, (v - introEnd) / (1 - introEnd)));
    // The rail itself is inset by half a node: keep 0% and 100% centred
    // precisely over the first and last dots rather than at the shell edges.
    return `calc(${value * 100}% + ${10 - value * 20}px)`;
  });
  const value = useTransform(progress, (v) => {
    const percent = Math.min(100, Math.max(0, Math.round(((v - introEnd) / (1 - introEnd)) * 100)));
    return `${percent}%`;
  });

  return (
    <motion.span
      className="label-tech absolute top-[2.6rem] -translate-x-1/2 whitespace-nowrap text-[#f6c86f]"
      style={{ left }}
    >
      {value}
    </motion.span>
  );
}
