import { MediaSlot } from "../MediaSlot";
import { ContactContext } from "./ContactContext";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";
import { useT } from "@/i18n";
import { useEffect, useRef, useState } from "react";

const MEDIA = ["multiprofile_icon_001.png", "multiprofile_icon_002.png", "multiprofile_icon_003.png"];

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
            edgeFade
            className="w-full [&>div:first-child]:opacity-0"
          />
        </Rise>

        <div
          aria-label={t.multiprofile.head.title}
          role="list"
          className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:grid-cols-3 md:gap-px md:bg-[color:var(--color-hairline)]"
        >
          {t.multiprofile.cards.map((card, index) => (
            <ProfileCard key={card.title} card={card} media={MEDIA[index]!} index={index} wide={index === 2} />
          ))}
        </div>

        <ScrubLead text={t.multiprofile.body} locale={t.code} />

        <ContactContext />

        <Rise className="mx-auto mt-16 max-w-[62ch] text-center md:mt-24">
          <MaskLine as="div" className="display-lg md:whitespace-nowrap">
            <span>{t.multiprofile.outro[0]}</span>{" "}<span className="text-[#f6c86f]">{t.multiprofile.outro[1]}</span>
          </MaskLine>
        </Rise>
      </div>
    </Section>
  );
}

type ScrubToken = { text: string; highlight: boolean; spaced: boolean };

const HIGHLIGHT_WORDS: Record<string, string[]> = {
  ru: ["мультипрофиль", "создавать", "пространства", "одного", "аккаунта", "контроль", "взаимодействие"],
  en: ["multiprofile", "create", "spaces", "single", "account", "control", "interaction"],
};
const HIGHLIGHT_PHRASES_ZH = ["多重身份", "建立", "不同的沟通空间", "同一个账号", "掌控", "每一次互动"];

function scrubTokens(text: string, locale: string): ScrubToken[] {
  if (locale !== "zh") {
    const highlighted = new Set(HIGHLIGHT_WORDS[locale] ?? HIGHLIGHT_WORDS.en);
    return text.split(/\s+/).filter(Boolean).map((word) => ({
      text: word,
      highlight: highlighted.has(word.toLocaleLowerCase().replace(/[^\p{L}]/gu, "")),
      spaced: true,
    }));
  }

  const tokens: ScrubToken[] = [];
  let rest = text;
  while (rest) {
    const match = HIGHLIGHT_PHRASES_ZH
      .map((phrase) => ({ phrase, index: rest.indexOf(phrase) }))
      .filter(({ index }) => index >= 0)
      .sort((a, b) => a.index - b.index)[0];
    if (!match) {
      tokens.push(...Array.from(rest).map((character) => ({ text: character, highlight: false, spaced: false })));
      break;
    }
    if (match.index > 0) {
      tokens.push(...Array.from(rest.slice(0, match.index)).map((character) => ({ text: character, highlight: false, spaced: false })));
    }
    tokens.push({ text: match.phrase, highlight: true, spaced: false });
    rest = rest.slice(match.index + match.phrase.length);
  }
  return tokens;
}

function ScrubLead({ text, locale }: { text: string; locale: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const words = scrubTokens(text, locale);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const start = window.innerHeight * 0.86;
      const end = window.innerHeight * 0.28;
      const distance = start - end + rect.height;
      const next = Math.min(1, Math.max(0, (start - rect.top) / distance));
      setProgress((current) => Math.abs(current - next) > 0.002 ? next : current);
    };
    const tick = () => {
      update();
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="mt-8 flex min-h-[24vh] items-center justify-center md:mt-10 md:min-h-[32vh]"
    >
      <p className="lead mx-auto max-w-[43ch] text-center text-[1.5rem] font-bold leading-[1.32] tracking-[-0.03em] md:text-[clamp(2rem,2.45vw,2.7rem)]">
        {words.map((word, index) => (
          <ScrubWord
            key={`${word.text}-${index}`}
            word={word}
            index={index}
            total={words.length}
            progress={progress}
          />
        ))}
      </p>
    </div>
  );
}

function ScrubWord({
  word,
  index,
  total,
  progress,
}: {
  word: ScrubToken;
  index: number;
  total: number;
  progress: number;
}) {
  const interval = 0.82 / total;
  const localProgress = Math.min(1, Math.max(0, (progress - index * interval) / (interval * 2.8)));
  const opacity = 0.2 + localProgress * 0.8;
  const y = (1 - localProgress) * 7;

  return (
    <span
      className="inline-block"
      style={{ opacity, transform: `translateY(${y}px)`, color: word.highlight ? "#f6c86f" : "#f3efe8" }}
    >
      {word.text}{word.spaced ? "\u00a0" : ""}
    </span>
  );
}

function ProfileCard({
  card,
  media,
  index,
  wide = false,
}: {
  card: { title: string; body: string };
  media: string;
  index: number;
  wide?: boolean;
}) {
  return (
    <Rise
      delay={index * 0.08}
      className={`group relative flex min-h-[8.5rem] overflow-hidden border p-4 text-left md:p-5 ${
        wide
          ? "col-span-2 flex-row items-center gap-4 border-[#f6c86f]/35 bg-[linear-gradient(135deg,rgba(246,200,111,0.12),rgba(246,200,111,0)_65%)] md:col-span-1"
          : "flex-col gap-3 border-[color:var(--color-hairline)] bg-[color:var(--color-background)] md:flex-row md:items-center md:gap-4 md:border-0"
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-3 select-none text-[3.75rem] font-black leading-none text-[color:var(--color-hairline)] opacity-40 md:right-4 md:top-4 md:text-[4.5rem]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      {wide ? (
        <MediaSlot
          name={media}
          alt={card.title}
          label={card.title}
          maxHeight="6.5rem"
          className="w-20 shrink-0 transition-transform duration-500 ease-out group-hover:scale-[1.04] md:w-20 [&>div:first-child]:opacity-0"
        />
      ) : (
        <div className="relative flex items-center gap-3 md:contents">
          <MediaSlot
            name={media}
            alt={card.title}
            label={card.title}
            maxHeight="5rem"
            className="w-14 shrink-0 transition-transform duration-500 ease-out group-hover:scale-[1.04] md:w-20 [&>div:first-child]:opacity-0"
          />
          <h3 className="min-w-0 text-[13px] font-semibold uppercase leading-[1.15] tracking-[-0.02em] md:hidden">
            {card.title}
          </h3>
        </div>
      )}
      <div className="relative min-w-0 md:border-l md:border-[color:var(--color-hairline)] md:pl-4">
        <h3
          className={`text-base font-semibold uppercase leading-[1.04] tracking-[-0.03em] md:text-lg ${
            wide ? "" : "hidden md:block"
          }`}
        >
          {card.title}
        </h3>
        <p
          className={`text-sm leading-snug text-[color:var(--color-muted-foreground)] ${
            wide ? "mt-2" : "md:mt-2"
          }`}
        >
          {card.body}
        </p>
      </div>
    </Rise>
  );
}
