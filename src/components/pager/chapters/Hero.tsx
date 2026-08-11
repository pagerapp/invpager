import { StoryScroll, type StoryState } from "../StoryScroll";
import { heroMedia } from "@/lib/localized-media";
import { useLocale, useT } from "@/i18n";

/**
 * HERO вЂ” one pinned 100svh cinematic stage.
 * SCENE 0 MANIFESTO (poster) в†’ 01 РҐРђРћРЎ в†’ 02 РћРўРќРћРЁР•РќРРЇ в†’ 03 РљРћРќРўР РћР›Р¬.
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
    kicker: t.hero.kicker,
    title: t.hero.h1,
    body: t.hero.lead,
    footer: (
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a
          href="#chapter-08"
          className="focus-instrument border border-[color:var(--color-border)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 hover:bg-[color:var(--color-accent)]"
        >
          {t.hero.ctaPrimary}
        </a>
        <a
          href="#chapter-03"
          className="focus-instrument px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-muted-foreground)] underline-offset-4 transition-colors duration-200 hover:text-[color:var(--color-foreground)] hover:underline"
        >
          {t.hero.ctaSecondary}
        </a>
      </div>
    ),
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
          footer: (
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#chapter-08"
                className="focus-instrument bg-[color:var(--color-foreground)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-background)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                {t.hero.ctaPrimary}
              </a>
              <span className="label-tech">{t.hero.launch.label}</span>
              <span className="label-tech text-[color:var(--color-foreground)]">
                {t.hero.launch.beta}
              </span>
              <span className="label-tech">{t.hero.launch.stores}</span>
            </div>
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

