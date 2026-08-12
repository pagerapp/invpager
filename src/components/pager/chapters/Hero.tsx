import { StoryScroll, type StoryState } from "../StoryScroll";
import { heroMedia } from "@/lib/localized-media";
import { useLocale, useT } from "@/i18n";

/**
 * HERO — one pinned 100svh cinematic stage.
 * SCENE 0 MANIFESTO (poster) → 01 ХАОС → 02 ОТНОШЕНИЯ → 03 КОНТРОЛЬ.
 * Media is language-resolved at the SOURCE level (never overlaid text).
 */

const COLORS = ["var(--guest)", "var(--work)", "var(--personal)"];
const INTENT = ["chaos", "order", "control"] as const;

export function Hero() {
  const t = useT();
  const { locale } = useLocale();
  const media = heroMedia(locale);

  const intro: StoryState = {
    label: "INTRO",
    introMark: (
      <div className="flex justify-center" aria-label="PAGER">
        <img
          src="media/pager_logo.png"
          alt="PAGER"
          width={420}
          height={370}
          className="h-20 w-auto object-contain md:h-24"
        />
      </div>
    ),
    kicker: t.hero.kicker,
    title: t.hero.h1,
    body: t.hero.lead,
  };

  const frames: StoryState[] = t.hero.frames.map((f, i) => ({
    code: String(i + 1).padStart(2, "0"),
    label: f.tag,
    title: [f.title],
    body: f.body,
    media: media[i]!,
    alt: f.title,
    color: COLORS[i]!,
    motionIntent: INTENT[i]!,
    ...(i === t.hero.frames.length - 1
      ? {
          finaleLaunch: (
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[#f6c86f]">{t.hero.launch.label}</span>
              <span className="text-[#fff2d8]">{t.hero.launch.beta}</span>
              <span className="text-[#b7aa92]">{t.hero.launch.stores}</span>
            </div>
          ),
          finaleCta: (
            <a
              href="#chapter-08"
              className="focus-instrument inline-flex bg-[color:var(--color-foreground)] px-8 py-4 font-mono text-[clamp(0.75rem,0.9vw,0.9rem)] uppercase tracking-[0.14em] text-[color:var(--color-background)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              {t.hero.ctaPrimary}
            </a>
          ),
        }
      : {}),
  }));

  return (
    <StoryScroll
      states={[intro, ...frames]}
      heightSvh={520}
      mediaHeight="min(70svh, 92vw)"
      introAlign="center"
      holdFinal
      preloadMedia
    />
  );
}
