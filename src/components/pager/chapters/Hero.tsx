import { StoryScroll, type StoryState } from "../StoryScroll";
import { heroMedia } from "@/lib/localized-media";
import { type Locale, useLocale, useT } from "@/i18n";
import { SceneThreeCards } from "./SceneThreeCards";

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
    ...(i === 2 ? { mediaOverlay: (progress, range) => <SceneThreeCards locale={locale} progress={progress} range={range} /> } : {}),
    ...(i === 2 ? { mediaGradualReveal: true } : {}),
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

type SceneCopy = {
  profiles: string;
  profilesLead: string;
  personal: string;
  work: string;
  guest: string;
  alter: string;
  permissions: string;
  text: string;
  audio: string;
  video: string;
  files: string;
  anna: string;
  guestTitle: string;
  temporary: string;
};

const SCENE_COPY: Record<Locale, SceneCopy> = {
  ru: {
    profiles: "Профили общения", profilesLead: "Выберите профиль общения с этим человеком.",
    personal: "ЛИЧНЫЙ", work: "РАБОТА", guest: "ГОСТИ", alter: "АЛЬТЕР ЭГО",
    permissions: "Что разрешить", text: "Текстовые сообщения", audio: "Аудио сообщения",
    video: "Видео сообщения", files: "Отправка файлов", anna: "Анна", guestTitle: "Гостевой", temporary: "Временный чат",
  },
  en: {
    profiles: "Chat profiles", profilesLead: "Choose how you appear to this person.",
    personal: "Personal", work: "Work", guest: "Guest", alter: "Alter ego",
    permissions: "What's allowed", text: "Text messages", audio: "Voice messages",
    video: "Video messages", files: "File sharing", anna: "Anna", guestTitle: "Guest", temporary: "Temporary chat",
  },
  zh: {
    profiles: "沟通档案", profilesLead: "选择你向此人展示的身份。",
    personal: "个人", work: "工作", guest: "访客", alter: "另一个我",
    permissions: "允许内容", text: "文字消息", audio: "语音消息",
    video: "视频消息", files: "发送文件", anna: "安娜", guestTitle: "访客", temporary: "临时聊天",
  },
};

/**
 * The third scene intentionally keeps the person in one universal source image.
 * The product UI is live DOM: localisable, responsive, and ready for the supplied
 * portrait assets to replace the neutral placeholders later.
 */
function SceneThreeInterface({ locale }: { locale: Locale }) {
  const c = SCENE_COPY[locale];
  return (
    <div className="relative h-full w-full font-sans text-white [text-shadow:0_1px_8px_rgba(0,0,0,.7)]">
      <div className="absolute left-[1.4%] top-[17%] w-[34%] rounded-[clamp(.5rem,1.2vw,1rem)] border border-white/25 bg-[#05080d]/85 p-[clamp(.35rem,1vw,.9rem)] shadow-[0_18px_38px_rgba(0,0,0,.5)] backdrop-blur-md">
        <p className="text-center text-[clamp(.35rem,1.05vw,1rem)] font-semibold uppercase tracking-[.08em]">{c.profiles}</p>
        <p className="mt-1 text-center text-[clamp(.26rem,.65vw,.62rem)] leading-[1.35] text-white/72">{c.profilesLead}</p>
        <div className="mt-[clamp(.25rem,.7vw,.7rem)] grid grid-cols-4 gap-[clamp(.15rem,.45vw,.45rem)]">
          {[c.personal, c.work, c.guest, c.alter].map((label, index) => (
            <div key={label} className="min-w-0 text-center">
              <div className={`aspect-[.72] rounded-[clamp(.25rem,.5vw,.5rem)] border ${index === 2 ? "border-[#fff1d5] shadow-[0_0_12px_rgba(255,242,216,.55)]" : "border-white/25"} bg-[radial-gradient(circle_at_50%_28%,#667180_0%,#222a35_34%,#090c11_78%)]`}>
                <div className="mx-auto mt-[22%] h-[26%] w-[26%] rounded-full bg-white/50" />
                <div className="mx-auto mt-[8%] h-[34%] w-[52%] rounded-t-[100%] bg-white/30" />
              </div>
              <span className="mt-1 block truncate text-[clamp(.24rem,.55vw,.55rem)] text-white/90">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[16%] left-[1.5%] w-[31%] rounded-[clamp(.5rem,1.2vw,1rem)] border border-white/25 bg-[#05080d]/85 p-[clamp(.4rem,1vw,.9rem)] shadow-[0_18px_38px_rgba(0,0,0,.5)] backdrop-blur-md">
        <p className="text-center text-[clamp(.35rem,.95vw,.9rem)] font-semibold uppercase tracking-[.08em]">{c.permissions}</p>
        {[c.text, c.audio, c.video, c.files].map((label, index) => (
          <div key={label} className="mt-[clamp(.2rem,.45vw,.45rem)] flex items-center gap-2 text-[clamp(.28rem,.68vw,.66rem)] text-white/90">
            <span className="h-[.85em] w-[.85em] rounded-[.15em] border border-white/70" />
            <span className="flex-1">{label}</span>
            <span className={`h-[.85em] w-[1.55em] rounded-full ${index === 0 || index === 3 ? "bg-[#dca44d]" : "bg-white/75"}`} />
          </div>
        ))}
      </div>

      <div className="absolute right-[1.4%] top-[17%] w-[32%] rounded-[clamp(.5rem,1.2vw,1rem)] border border-white/25 bg-[#05080d]/85 p-[clamp(.4rem,1vw,.9rem)] shadow-[0_18px_38px_rgba(0,0,0,.5)] backdrop-blur-md">
        <div className="flex gap-[clamp(.35rem,.9vw,.8rem)]">
          <AvatarPlaceholder accent="bg-[#dcb092]" />
          <div className="min-w-0 pt-1">
            <p className="text-[clamp(.7rem,1.8vw,1.6rem)] leading-none">{c.anna}</p>
            <p className="mt-1 text-[clamp(.3rem,.68vw,.68rem)] text-white/70">ID A770 7070</p>
            <p className="mt-[clamp(.35rem,.8vw,.8rem)] text-[clamp(.28rem,.63vw,.62rem)] leading-[1.35] text-white/72">{locale === "zh" ? "喜欢旅行和户外活动" : locale === "en" ? "Loves travel and outdoor adventures" : "Любит путешествия и активный отдых"}</p>
          </div>
        </div>
        <div className="mt-[clamp(.45rem,1vw,1rem)] border-t border-white/20 pt-[clamp(.35rem,.7vw,.7rem)] text-[clamp(.28rem,.62vw,.62rem)] text-[#f6c86f]">⌛&nbsp; {c.temporary}</div>
      </div>

      <div className="absolute bottom-[15%] right-[1.4%] w-[31%] rounded-[clamp(.5rem,1.2vw,1rem)] border border-white/25 bg-[#05080d]/85 p-[clamp(.4rem,1vw,.9rem)] shadow-[0_18px_38px_rgba(0,0,0,.5)] backdrop-blur-md">
        <div className="flex items-end gap-[clamp(.35rem,.8vw,.75rem)]">
          <div className="min-w-0 flex-1">
            <p className="text-[clamp(.3rem,.7vw,.7rem)] uppercase text-white/70">{c.guestTitle}</p>
            <p className="mt-1 text-[clamp(.75rem,1.8vw,1.65rem)] leading-none">Оскар</p>
            <p className="mt-2 text-[clamp(.28rem,.62vw,.62rem)] leading-[1.35] text-white/72">{locale === "zh" ? "交流由你决定边界。" : locale === "en" ? "Communication on your terms." : "Общение — на ваших условиях."}</p>
            <p className="mt-[clamp(.35rem,.8vw,.8rem)] text-[clamp(.28rem,.62vw,.62rem)] text-white/70">PAGER ID<br /><span className="text-white">A147 0865</span></p>
          </div>
          <AvatarPlaceholder accent="bg-[#9c7253]" />
        </div>
      </div>
    </div>
  );
}

function AvatarPlaceholder({ accent }: { accent: string }) {
  return (
    <div className={`w-[31%] shrink-0 self-stretch overflow-hidden rounded-[clamp(.3rem,.7vw,.65rem)] border border-white/20 bg-[radial-gradient(circle_at_50%_26%,#c4c9ca_0_13%,transparent_14%),linear-gradient(to_top,rgba(255,255,255,.22)_0_38%,transparent_39%),#151b22] ${accent}`}>
      <div className="h-full w-full bg-[linear-gradient(135deg,transparent_35%,rgba(0,0,0,.34))]" />
    </div>
  );
}
