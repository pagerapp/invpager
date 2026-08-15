import { MediaSlot } from "../MediaSlot";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";
import { useT } from "@/i18n";

const MEDIA = ["Multiprofile_img_01.jpg", "Multiprofile_img_02.jpg", "Multiprofile_img_03.jpg"];

/** MULTIPROFILE — an editorial cover and three product proofs, without pinning scroll. */
export function Multiprofile() {
  const t = useT();

  return (
    <Section id="chapter-04" className="pt-[var(--chapter-space)]">
      <ChapterHead index="04" title={t.multiprofile.head.title} meta={t.multiprofile.head.meta} />

      <div className="shell mt-14 pb-[var(--chapter-space)] md:mt-20">
        <div className="text-center">
          <h2 className="display-lg mx-auto max-w-[23ch]">
            {t.multiprofile.h.map((line, i) => (
              <MaskLine key={line} delay={i * 0.09}>
                {line}
              </MaskLine>
            ))}
          </h2>
        </div>

        <Rise className="mt-6 md:mt-8">
          <MediaSlot
            name="Multiprofile_img_hero.jpg"
            alt={t.multiprofile.heroAlt}
            priority
            className="w-full [&>div:first-child]:opacity-0"
          />
        </Rise>

        <Rise className="mx-auto mt-8 max-w-[62ch] text-center md:mt-10">
          <p className="lead">{t.multiprofile.body}</p>
        </Rise>

        <div
          aria-label={t.multiprofile.head.title}
          role="list"
          className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-8 md:grid md:grid-cols-3 md:gap-px md:overflow-visible md:bg-[color:var(--color-hairline)] md:pb-0"
        >
          {t.multiprofile.cards.map((card, index) => (
            <ProfileCard key={card.title} card={card} media={MEDIA[index]!} index={index} />
          ))}
        </div>

        <Rise className="mt-14 rule-t pt-4 md:mt-20">
          <p className="label-tech">{t.multiprofile.quote}</p>
          <div className="mt-6">
            <MaskLine as="div" className="display-lg">
              {t.multiprofile.outro[0]}
            </MaskLine>
            <MaskLine as="div" delay={0.08} className="display-lg text-[color:var(--personal)]">
              {t.multiprofile.outro[1]}
            </MaskLine>
          </div>
        </Rise>
      </div>
    </Section>
  );
}

function ProfileCard({
  card,
  media,
  index,
}: {
  card: { title: string; body: string };
  media: string;
  index: number;
}) {
  return (
    <Rise
      delay={index * 0.08}
      className="group min-w-[86vw] snap-start border border-[color:var(--color-hairline)] bg-[color:var(--color-background)] p-5 md:min-w-0 md:border-0 md:p-7"
    >
      <span className="label-tech">{String(index + 1).padStart(2, "0")} / 03</span>
      <div className="mt-6 grid grid-cols-[42%_minmax(0,1fr)] items-center gap-5 md:grid-cols-1 md:gap-0">
        <MediaSlot
          name={media}
          alt={card.title}
          label={card.title}
          className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.025] [&>div:first-child]:opacity-0"
        />
        <div className="min-w-0 border-l border-[color:var(--color-hairline)] pl-5 md:mt-7 md:border-l-0 md:border-t md:pl-0 md:pt-5">
          <h3 className="text-xl font-semibold uppercase leading-[1.04] tracking-[-0.035em] md:text-2xl">
            {card.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted-foreground)] md:text-[15px]">
            {card.body}
          </p>
        </div>
      </div>
    </Rise>
  );
}
