import { useT } from "@/i18n";

/**
 * SYSTEM TELEMETRY — instrument readout strip, not an advertising ticker.
 * Seamless loop: the phrase set is rendered twice and translated by exactly 50%.
 */
export function Telemetry() {
  const t = useT();
  const phrases = t.ticker;
  const run = [...phrases, ...phrases];

  return (
    <div
      aria-hidden
      className="relative w-full overflow-hidden rule-t rule-b bg-[color:var(--color-background)]"
    >
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
  );
}
