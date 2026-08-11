import { StoryScroll, type StoryState } from "../StoryScroll";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";
import { multiprofileMedia } from "@/lib/localized-media";
import { useLocale, useT } from "@/i18n";

/**
 * MULTIPROFILE — second pinned StoryScroll.
 * INTRO → 01 ПРОБЛЕМА → 02 ОСОЗНАНИЕ → 03 РЕШЕНИЕ, all on ONE 100svh stage.
 * The identity stays anchored; the communication spaces around it change.
 */
export function Multiprofile() {
  const t = useT();
  const { locale } = useLocale();
  const mpMedia = multiprofileMedia(locale);
  const beats = t.multiprofile.beats.slice(0, 3);
  const exit = t.multiprofile.beats[3];

  const intro: StoryState = {
    label: "INTRO",
    kicker: t.multiprofile.head.meta,
    title: t.multiprofile.h,
    body: t.multiprofile.quote,
  };

  const states: StoryState[] = beats.map((b, i) => ({
    code: String(i + 1).padStart(2, "0"),
    label: b.label,
    title: [b.text],
    media: mpMedia[i]!,
    alt: `${t.multiprofile.altDesktop} ${i + 1}`,
  }));

  return (
    <Section id="chapter-04" className="pt-[var(--chapter-space)]">
      <ChapterHead index="04" title={t.multiprofile.head.title} meta={t.multiprofile.head.meta} />

      <StoryScroll states={[intro, ...states]} heightSvh={340} mediaHeight="min(66svh, 94vw)" />

      <div className="shell mt-14 pb-[var(--chapter-space)] md:mt-20">
        {exit ? (
          <Rise className="rule-t pt-4">
            <span className="label-tech">{exit.label}</span>
            <p className="display-md mt-4 max-w-[26ch]">{exit.text}</p>
          </Rise>
        ) : null}

        <div className="mt-14 md:mt-20">
          <MaskLine as="div" className="display-lg">
            {t.multiprofile.outro[0]}
          </MaskLine>
          <MaskLine as="div" delay={0.08} className="display-lg text-[color:var(--personal)]">
            {t.multiprofile.outro[1]}
          </MaskLine>
        </div>
      </div>
    </Section>
  );
}
