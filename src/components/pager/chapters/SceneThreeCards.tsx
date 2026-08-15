import { motion, useTransform, type MotionValue } from "motion/react";
import {
  MessageSquare,
  Mic,
  Paperclip,
  Phone,
  Video,
  Clock3,
  Check,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/i18n";

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
  calls: string;
  videoCalls: string;
  anna: string;
  guestTitle: string;
  guestName: string;
  temporary: string;
  guestBody: string;
  annaBody: string;
};

const COPY: Record<Locale, SceneCopy> = {
  ru: {
    profiles: "ПРОФИЛИ ОБЩЕНИЯ",
    profilesLead: "Выберите профиль общения с этим человеком. Права можно изменить позже в настройках чата.",
    personal: "Личные",
    work: "Рабочие",
    guest: "Гостевые",
    alter: "Альтер эго",
    permissions: "ЧТО РАЗРЕШИТЬ",
    text: "Текстовые сообщения",
    audio: "Аудио сообщения",
    video: "Видео сообщения",
    files: "Отправка файлов",
    calls: "Аудио звонки",
    videoCalls: "Видео звонки",
    anna: "Анна",
    guestTitle: "ГОСТЕВОЙ",
    guestName: "Оскар",
    temporary: "Временный чат",
    annaBody: "Любит путешествия и активный отдых.",
    guestBody: "Буду рад общению, но прошу уважать мою приватность.",
  },
  en: {
    profiles: "CHAT PROFILES",
    profilesLead: "Choose a chat profile for this person. You can change permissions later in chat settings.",
    personal: "Personal",
    work: "Work",
    guest: "Guest",
    alter: "Alter ego",
    permissions: "WHAT'S ALLOWED",
    text: "Text messages",
    audio: "Voice messages",
    video: "Video messages",
    files: "File sharing",
    calls: "Voice calls",
    videoCalls: "Video calls",
    anna: "Anna",
    guestTitle: "GUEST PROFILE",
    guestName: "Oscar",
    temporary: "Disappearing messages",
    annaBody: "Loves travel and outdoor adventures.",
    guestBody: "Happy to chat, but please respect my privacy.",
  },
  zh: {
    profiles: "沟通档案",
    profilesLead: "为此人选择沟通档案。权限可稍后在聊天设置中修改。",
    personal: "个人",
    work: "工作",
    guest: "访客",
    alter: "另一个我",
    permissions: "允许什么",
    text: "文字消息",
    audio: "语音消息",
    video: "视频消息",
    files: "文件发送",
    calls: "语音通话",
    videoCalls: "视频通话",
    anna: "安娜",
    guestTitle: "访客档案",
    guestName: "奥斯卡",
    temporary: "限时聊天",
    annaBody: "热爱旅行与户外探索。",
    guestBody: "乐于交流，也请尊重我的隐私。",
  },
};

const PORTRAITS = {
  personal: "media/Hero_img_scene_3_interface_personal_profile.png",
  work: "media/Hero_img_scene_3_interface_work_profile.png",
  guest: "media/Hero_img_scene_3_interface_guest_profile.png",
  alter: "media/Hero_img_scene_3_interface_alterego_profile.png",
  anna: "media/Hero_img_scene_3_interface_anna_profile.png",
} as const;

const EDITORIAL_CARD = "overflow-hidden border border-white/18 bg-[#0a0d11] p-[clamp(.5rem,1.08vw,1rem)] shadow-[0_18px_36px_rgba(0,0,0,.42)]";
const EDITORIAL_RULE = "border-white/12";
const CARD_HEADING = "min-w-0 text-[clamp(.34rem,.68vw,.64rem)] font-bold uppercase leading-[1.06] tracking-[.008em] text-white";
const CARD_META = "shrink-0 font-mono text-[clamp(.19rem,.41vw,.39rem)] leading-none tracking-[.13em] text-white/42";
const CARD_BODY = "text-[clamp(.27rem,.56vw,.54rem)] leading-[1.34] text-white/74";

const TEMPORARY_ACCESS: Record<Locale, {
  access: string;
  active: string;
  duration: string;
  expires: string;
  note: string;
  sees: string;
  granted: string;
  restricted: string;
}> = {
  ru: {
    access: "ВРЕМЕННЫЙ ДОСТУП",
    active: "АКТИВЕН",
    duration: "24 ЧАСА",
    expires: "До 24 июля · 15:56",
    note: "После окончания срока чат закроется автоматически.",
    sees: "ВИДИТ ВАС КАК",
    granted: "ТЕКСТ + ФАЙЛЫ",
    restricted: "БЕЗ ЗВОНКОВ",
  },
  en: {
    access: "TEMPORARY ACCESS",
    active: "ACTIVE",
    duration: "24 HOURS",
    expires: "Until Jul 24 · 15:56",
    note: "The chat closes automatically when the time runs out.",
    sees: "SEES YOU AS",
    granted: "TEXT + FILES",
    restricted: "NO CALLS",
  },
  zh: {
    access: "限时访问",
    active: "已启用",
    duration: "24 小时",
    expires: "截止 7月24日 · 15:56",
    note: "到期后，聊天将自动关闭。",
    sees: "对方看到的身份",
    granted: "文字 + 文件",
    restricted: "不含通话",
  },
};

type SceneRange = { a: number; b: number; c: number; d: number };

export function SceneThreeCards({ locale, progress, range }: { locale: Locale; progress: MotionValue<number>; range: SceneRange }) {
  const c = COPY[locale];
  const temporaryAccess = TEMPORARY_ACCESS[locale];
  const selectLabel = locale === "ru" ? "01 / ВЫБОР" : locale === "zh" ? "01 / 选择" : "01 / SELECT";
  const temporaryCardTitle = locale === "ru" ? "ВРЕМЕННЫЙ ДОСТУП" : locale === "zh" ? "临时访问" : "TEMPORARY ACCESS";
  const pagerIdCardTitle = "PAGER ID";
  const temporaryAccessIntro = locale === "ru" ? "Вам открыт временный доступ к чату." : locale === "zh" ? "已为您开启限时聊天访问。" : "Temporary chat access has been opened for you.";
  const temporaryAccessRemaining = locale === "ru" ? "Осталось 17 ч 42 мин" : locale === "zh" ? "剩余 17 小时 42 分钟" : "17 h 42 min remaining";
  const scene = useTransform(progress, (value) => Math.max(0, Math.min(1, (value - range.a) / Math.max(0.001, range.c - range.a))));
  // Cards no longer travel through the frame. They appear directly in their
  // final places, so the story is expressed through the product states rather
  // than a fragile four-card choreography.
  const profileOpacity = useTransform(scene, [0.02, 0.12], [0, 1]);
  const guestCardOpacity = useTransform(scene, [0.20, 0.30], [0, 1]);
  const permissionOpacity = useTransform(scene, [0.38, 0.48], [0, 1]);
  const annaOpacity = useTransform(scene, [0.66, 0.76], [0, 1]);
  // A profile is highlighted in place. No floating outline travels between
  // cards, so every step is tied precisely to its own profile tile.
  const personalHighlight = useTransform(scene, [0.12, 0.15, 0.18, 0.21], [0, 1, 0.55, 0]);
  const workHighlight = useTransform(scene, [0.18, 0.21, 0.24, 0.27], [0, 1, 0.55, 0]);
  const alterHighlight = useTransform(scene, [0.24, 0.27, 0.30, 0.33], [0, 1, 0.48, 0]);
  const guestHighlight = useTransform(scene, [0.30, 0.34, 0.40, 0.44], [0, 1, 1, 0.9]);
  const profiles = [
    { label: c.personal, src: PORTRAITS.personal, accent: "#27d5a7", glow: "0 0 15px rgba(39,213,167,.82)", highlight: personalHighlight },
    { label: c.work, src: PORTRAITS.work, accent: "#4e9cff", glow: "0 0 15px rgba(78,156,255,.84)", highlight: workHighlight },
    { label: c.guest, src: PORTRAITS.guest, accent: "#f6c86f", glow: "0 0 16px rgba(246,200,111,.88)", highlight: guestHighlight },
    { label: c.alter, src: PORTRAITS.alter, accent: "#c48cff", glow: "0 0 15px rgba(196,140,255,.82)", highlight: alterHighlight },
  ];

  return (
    <div className="relative h-full w-full font-sans text-white [text-shadow:0_1px_8px_rgba(0,0,0,.7)]">
      <motion.div className="absolute z-30 aspect-[1.25] w-[35%]" style={{ opacity: profileOpacity, left: "1.2%", top: "16%" }}>
      <section className={`flex h-full flex-col ${EDITORIAL_CARD}`}>
        <div className={`flex items-baseline justify-between gap-2 border-b ${EDITORIAL_RULE} pb-[clamp(.24rem,.55vw,.52rem)]`}>
          <p className={`${CARD_HEADING} whitespace-nowrap text-[clamp(.27rem,.54vw,.52rem)] tracking-normal`}>{c.profiles}</p>
          <span className={CARD_META}>{selectLabel}</span>
        </div>
        <p className={`mt-[clamp(.26rem,.58vw,.55rem)] max-w-[96%] line-clamp-2 ${CARD_BODY}`}>{c.profilesLead}</p>
        <div className="relative mt-auto grid grid-cols-4 gap-[clamp(.17rem,.5vw,.5rem)] pt-[clamp(.34rem,.7vw,.66rem)]">
          {profiles.map((profile) => (
            <div key={profile.label} className="min-w-0 text-center">
              <div
                className="relative aspect-[.7] overflow-hidden border bg-[#10161e]"
                style={{ borderColor: `${profile.accent}55` }}
              >
                <img src={profile.src} alt="" className="absolute inset-0 h-full w-full object-contain object-bottom" />
                <motion.span
                  className="pointer-events-none absolute inset-0 z-10 border-2"
                  style={{ opacity: profile.highlight, borderColor: profile.accent, boxShadow: profile.glow }}
                />
              </div>
              <span className="mt-[.28rem] block truncate text-[clamp(.24rem,.52vw,.5rem)] font-semibold leading-none text-white/88">{profile.label}</span>
            </div>
          ))}
        </div>
      </section></motion.div>

      <PermissionCard copy={c} locale={locale} scene={scene} opacity={permissionOpacity} />

      <motion.section
        className={`absolute z-10 flex aspect-[1.25] w-[35%] flex-col ${EDITORIAL_CARD}`}
        style={{ opacity: annaOpacity, left: "63.75%", top: "16%" }}
      >
        <div className={`mb-[clamp(.3rem,.65vw,.6rem)] flex items-baseline justify-between gap-2 border-b ${EDITORIAL_RULE} pb-[clamp(.24rem,.55vw,.52rem)]`}>
          <p className={CARD_HEADING}>{temporaryCardTitle}</p>
          <span className={CARD_META}>02 / ACCESS</span>
        </div>
        <div className={`flex min-h-0 flex-[0_0_33%] gap-[clamp(.3rem,.72vw,.68rem)] border-b ${EDITORIAL_RULE} pb-[clamp(.24rem,.55vw,.52rem)]`}>
          <Portrait src={PORTRAITS.anna} className="w-[27%]" />
          <div className="min-w-0 pt-[.1em]">
            <p className="text-[clamp(.62rem,1.42vw,1.32rem)] font-medium leading-[.96] tracking-[-.035em]">{c.anna}</p>
            <p className="mt-[.24rem] font-mono text-[clamp(.2rem,.46vw,.44rem)] tracking-[.08em] text-white/46">ID A770 7070</p>
            <p className={`mt-[clamp(.22rem,.5vw,.46rem)] line-clamp-2 ${CARD_BODY}`}>{temporaryAccessIntro}</p>
          </div>
        </div>
        <div className="mt-[clamp(.28rem,.6vw,.56rem)] min-h-0 flex-1 border-l-2 border-[#f6c86f] bg-[#f6c86f]/[.035] p-[clamp(.24rem,.52vw,.5rem)]">
          <div className="flex items-center justify-between gap-2 font-mono text-[clamp(.19rem,.43vw,.42rem)] tracking-[.09em] text-[#f6c86f]">
            <span className="flex items-center gap-[.45em] font-semibold"><Clock3 className="size-[1.1em]" strokeWidth={1.8} />{temporaryAccess.access}</span>
            <span className="inline-flex items-center gap-[.35em] border border-[#f6c86f]/35 px-[.55em] py-[.2em] text-[.88em]"><Check className="size-[.85em]" strokeWidth={2.6} />{temporaryAccess.active}</span>
          </div>
          <div className="mt-[clamp(.18rem,.42vw,.38rem)] flex items-end justify-between gap-2">
            <span className="font-mono text-[clamp(.35rem,.76vw,.7rem)] font-medium tracking-[.07em] text-white/94">{temporaryAccess.duration}</span>
            <span className="text-right text-[clamp(.18rem,.42vw,.4rem)] text-white/62">{temporaryAccess.expires}</span>
          </div>
          <div className="mt-[clamp(.18rem,.45vw,.4rem)] h-px overflow-hidden bg-white/15"><span className="block h-full w-[72%] bg-[#f6c86f] shadow-[0_0_8px_rgba(246,200,111,.7)]" /></div>
          <div className="mt-[clamp(.18rem,.42vw,.38rem)] grid grid-cols-2 gap-x-[.75em] font-mono text-[clamp(.19rem,.43vw,.42rem)] leading-[1.35]">
            <span className="text-white/86">✓ {temporaryAccess.granted}</span>
            <span className="text-white/48">— {temporaryAccess.restricted}</span>
          </div>
          <p className="mt-[clamp(.18rem,.42vw,.38rem)] font-mono text-[clamp(.21rem,.46vw,.44rem)] tracking-[.06em] text-[#f6c86f]">{temporaryAccessRemaining}</p>
        </div>
      </motion.section>

      <motion.section
        className={`absolute z-20 flex aspect-[1.25] w-[35%] flex-col ${EDITORIAL_CARD}`}
        style={{ opacity: guestCardOpacity, left: "63.9%", top: "54%" }}
      >
        <div className={`mb-[clamp(.3rem,.65vw,.6rem)] flex items-baseline justify-between gap-2 border-b ${EDITORIAL_RULE} pb-[clamp(.24rem,.55vw,.52rem)]`}>
          <p className={CARD_HEADING}>{pagerIdCardTitle}</p>
          <span className={CARD_META}>04 / IDENTITY</span>
        </div>
        <div className="flex min-h-0 flex-1 items-stretch gap-[clamp(.3rem,.72vw,.68rem)]">
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="text-[clamp(.64rem,1.42vw,1.32rem)] font-medium leading-[.96] tracking-[-.035em]">{c.guestName}</p>
            <p className={`mt-[clamp(.24rem,.52vw,.48rem)] line-clamp-3 ${CARD_BODY}`}>{c.guestBody}</p>
            <div className="mt-[clamp(.24rem,.55vw,.52rem)] border-l-2 border-[#4e9cff]/70 pl-[.45em] font-mono text-[clamp(.22rem,.5vw,.48rem)] leading-[1.42] text-white/52">PAGER ID<br /><span className="text-[1.22em] tracking-[.06em] text-white/94">A147 0865</span></div>
            <div className={`mt-auto border-y ${EDITORIAL_RULE} py-[clamp(.18rem,.4vw,.38rem)]`}>
              <p className="font-mono text-[clamp(.18rem,.4vw,.38rem)] tracking-[.14em] text-white/42">{temporaryAccess.sees}</p>
              <p className="mt-[.3em] font-mono text-[clamp(.26rem,.59vw,.56rem)] font-medium tracking-[.07em] text-[#f6c86f]">{c.guestTitle}</p>
            </div>
          </div>
          <div className="flex h-full w-[34%] min-w-0 flex-col justify-between">
            <Portrait src={PORTRAITS.guest} className="h-[61%]" />
            <div className="border-l-2 border-[#f6c86f]/80 bg-white/[.025] px-[.45em] py-[.44em] font-mono text-[clamp(.18rem,.4vw,.38rem)] leading-[1.42] text-white/66">
              <span className="block text-[#f6c86f]">{temporaryAccess.granted}</span>
              <span className="block text-white/48">{temporaryAccess.restricted}</span>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

function PermissionCard({ copy, locale, scene, opacity }: { copy: SceneCopy; locale: Locale; scene: MotionValue<number>; opacity: MotionValue<number> }) {
  // The card starts as an open channel. During its focused moment, the four
  // non-essential permissions close together; time limits now belong to the
  // recipient's card, where their meaning is immediately clear.
  const openUntilRule = useTransform(scene, [0, 0.77, 0.81], [1, 1, 0]);
  const alwaysEnabled = useTransform(scene, [0, 1], [1, 1]);
  const rows: Array<{ label: string; icon: LucideIcon; enabled: MotionValue<number>; group: "messages" | "calls" }> = [
    { label: copy.text, icon: MessageSquare, enabled: alwaysEnabled, group: "messages" },
    { label: copy.audio, icon: Mic, enabled: openUntilRule, group: "messages" },
    { label: copy.video, icon: Video, enabled: openUntilRule, group: "messages" },
    { label: copy.files, icon: Paperclip, enabled: alwaysEnabled, group: "messages" },
    { label: copy.calls, icon: Phone, enabled: openUntilRule, group: "calls" },
    { label: copy.videoCalls, icon: Video, enabled: openUntilRule, group: "calls" },
  ];
  const messageRows = rows.filter((row) => row.group === "messages");
  const callRows = rows.filter((row) => row.group === "calls");
  const messagesLabel = locale === "ru" ? "СООБЩЕНИЯ" : locale === "zh" ? "消息" : "MESSAGES";
  const callsLabel = locale === "ru" ? "ЗВОНКИ" : locale === "zh" ? "通话" : "CALLS";
  const rulesLabel = locale === "ru" ? "03 / ПРАВИЛА" : locale === "zh" ? "03 / 规则" : "03 / RULES";
  return (
    <motion.section
      className={`absolute z-[15] aspect-[1.25] w-[35%] ${EDITORIAL_CARD}`}
      style={{ opacity, left: "1.15%", top: "54%" }}
    >
      <div className={`mb-[clamp(.28rem,.6vw,.6rem)] flex items-baseline justify-between gap-2 border-b ${EDITORIAL_RULE} pb-[clamp(.28rem,.58vw,.56rem)]`}>
        <p className={CARD_HEADING}>{copy.permissions}</p>
        <span className={CARD_META}>{rulesLabel}</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
      <PermissionGroup label={messagesLabel} rows={messageRows} />
      <PermissionGroup label={callsLabel} rows={callRows} className="mt-[clamp(.26rem,.56vw,.54rem)] border-t border-white/15 pt-[clamp(.26rem,.54vw,.52rem)]" />
      <div className={`mt-auto flex items-center justify-between border-t ${EDITORIAL_RULE} pt-[clamp(.24rem,.5vw,.48rem)] font-mono text-[clamp(.2rem,.44vw,.42rem)] tracking-[.12em] text-white/48`}>
        <span>{locale === "ru" ? "УПРАВЛЕНИЕ КАНАЛАМИ" : locale === "zh" ? "沟通权限" : "CHANNEL CONTROL"}</span>
        <span className="text-[#f6c86f]">02 / 06</span>
      </div>
      </div>
    </motion.section>
  );
}

function AccessControl({ enabled }: { enabled: MotionValue<number> }) {
  const knobX = useTransform(enabled, [0, 1], ["0.14em", "1.02em"]);
  const background = useTransform(enabled, [0, 1], ["#202936", "#c98b37"]);
  const borderColor = useTransform(enabled, [0, 1], ["rgba(255,255,255,.2)", "rgba(245,189,103,.7)"]);
  return <motion.span className="relative inline-flex h-[1.28em] w-[2.18em] shrink-0 items-center border" style={{ backgroundColor: background, borderColor }}><motion.span className="absolute size-[.98em] bg-[#fbf5ec] shadow-[0_1px_3px_rgba(0,0,0,.65)]" style={{ left: knobX }} /></motion.span>;
}

function PermissionGroup({ label, rows, className = "" }: { label: string; rows: Array<{ label: string; icon: LucideIcon; enabled: MotionValue<number> }>; className?: string }) {
  return <div className={className}>
    <p className="mb-[clamp(.14rem,.3vw,.3rem)] font-mono text-[clamp(.19rem,.42vw,.4rem)] font-semibold tracking-[.13em] text-white/50">{label}</p>
    <div className="space-y-[clamp(.15rem,.34vw,.34rem)]">
      {rows.map(({ label: rowLabel, icon: Icon, enabled }) => (
        <div key={rowLabel} className="flex items-center gap-[clamp(.26rem,.54vw,.52rem)] text-[clamp(.3rem,.64vw,.62rem)] font-medium leading-[1.12] text-white/94">
          <Icon className="size-[1.1em] shrink-0 text-white/76" strokeWidth={1.7} />
          <span className="min-w-0 flex-1 truncate">{rowLabel}</span>
          <AccessControl enabled={enabled} />
        </div>
      ))}
    </div>
  </div>;
}

function Portrait({ src, className }: { src: string; className: string }) {
  return <div className={`relative shrink-0 self-stretch overflow-hidden border border-white/25 bg-[#10161e] ${className}`}><img src={src} alt="" className="absolute inset-0 h-full w-full object-contain object-bottom" /></div>;
}
