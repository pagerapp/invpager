import { StoryScroll, type StoryState } from "../StoryScroll";
import { useLocale, useT } from "@/i18n";

/**
 * HERO — one pinned 100svh stage.
 * INTRO / MANIFESTO → 01 ХАОС → 02 ОСОЗНАНИЕ → 03 КОНТРОЛЬ.
 * Nothing stacks vertically: every state lives on the same stage.
 */

/** Locale-aware source frames. Media is never altered; only the variant changes. */
function heroMedia(locale: string): string[] {
  const ru = locale === "ru";
  return [
    "Hero_storyscroll_img_RU_ENG_1.jpg",
    ru ? "Hero_storyscroll_img_RU_2.jpg" : "Hero_storyscroll_img_ENG_2.jpg",
    ru ? "Hero_storyscroll_img_RU_3.jpg" : "Hero_storyscroll_img_ENG_3.jpg",
  ];
}

const COLORS = ["var(--guest)", "var(--work)", "var(--personal)"];

export function Hero() {
  const t = useT();
  const { locale } = useLocale();
  // Chinese has no dedicated hero art: the shared RU/EN frames are used as-is.
  const media = heroMedia(locale === "zh" ? "en" : locale);

  const intro: StoryState = {
    label: "INTRO",
    kicker: t.hero.kicker,
    title: t.hero.h1,
    body: t.hero.lead,
    footer: (
      <div className="mt-6 flex flex-wrap gap-3">
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
    ...(i === t.hero.frames.length - 1
      ? {
          footer: (
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-1">
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
    <StoryScroll states={[intro, ...frames]} heightSvh={400} railTitle="HERO / STORYSCROLL" />
  );
}
