import { motion, useReducedMotion } from "motion/react";
import { useT } from "@/i18n";
import { DrawnRule } from "./primitives";

/**
 * SYSTEM TELEMETRY — instrument readout strip, not an advertising ticker.
 * Seamless loop: the phrase set is rendered twice and translated by exactly 50%.
 *
 * A plain Rise (18px/0.7s) turned out to be lost in the noise here — the
 * marquee is already in constant motion, the viewport trigger fires the
 * instant 10% is visible, and by the time a normal scroll gesture brings
 * this into view the fade has already finished. This entrance is deliberately
 * bigger and delayed, so the strip reads as "powering on" a beat after the
 * Hero pin lets go, not as background noise arriving unnoticed.
 */
export function Telemetry() {
  const t = useT();
  const reduced = useReducedMotion();
  const phrases = t.ticker;
  const run = [...phrases, ...phrases];

  return (
    <motion.div
      initial={reduced ? { opacity: 1, y: 0, filter: "brightness(1)" } : { opacity: 0, y: 46, filter: "brightness(0.3)" }}
      whileInView={{ opacity: 1, y: 0, filter: "brightness(1)" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.1, delay: reduced ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        aria-hidden
        className="relative w-full overflow-hidden rule-b bg-[color:var(--color-background)]"
      >
        <DrawnRule />
        <div className="flex h-[52px] items-center md:h-[70px]">
          <div className="pager-marquee flex w-max shrink-0 items-center">
            {run.map((p, i) => (
              <span key={`${p}-${i}`} className="flex items-center">
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.28em] whitespace-nowrap md:text-[12px] ${
                    i % 2 === 0
                      ? "text-[color:var(--color-foreground)]"
                      : "text-[color:var(--color-muted-foreground)]"
                  }`}
                >
                  {p}
                </span>
                <span className="label-tech px-6 md:px-10">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
