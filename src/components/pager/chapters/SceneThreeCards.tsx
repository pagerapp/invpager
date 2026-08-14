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

type AccessMode = "on" | "off";
type SceneRange = { a: number; b: number; c: number; d: number };

export function SceneThreeCards({ locale, progress, range }: { locale: Locale; progress: MotionValue<number>; range: SceneRange }) {
  const c = COPY[locale];
  const scene = useTransform(progress, (value) => Math.max(0, Math.min(1, (value - range.a) / Math.max(0.001, range.c - range.a))));
  // The profile selector is the first card in the narrative and must own the
  // centre immediately. The remaining cards settle behind it a beat later.
  const profileOpacity = useTransform(scene, [0, 0.012], [0, 1]);
  const deckOpacity = useTransform(scene, [0.012, 0.06], [0, 1]);
  // First the card holds in the centre for its own interaction. Only after
  // the profile choice is clear does it travel to its final place.
  const profileLeft = useTransform(scene, [0, 0.42, 0.52], ["50%", "50%", "1.2%"]);
  const profileTop = useTransform(scene, [0, 0.42, 0.52], ["50%", "50%", "16%"]);
  const profileX = useTransform(scene, [0, 0.42, 0.52], ["-50%", "-50%", "0%"]);
  const profileY = useTransform(scene, [0, 0.42, 0.52], ["-50%", "-50%", "0%"]);
  // The UI is deliberately larger while it is centred and interactive, then
  // settles back to the scale required by the final four-card composition.
  const profileScale = useTransform(scene, [0, 0.08, 0.42, 0.52], [1, 1, 1.04, 1]);
  const profileBlur = useTransform(scene, [0, 0.08], ["blur(7px)", "blur(0px)"]);
  // The scene opens as a genuine deck made from the four actual interface
  // cards. Supporting cards recede while the top card is being explained.
  const companionCardOpacity = deckOpacity;
  const permissionLeft = useTransform(scene, [0, 0.84, 0.92], ["50%", "50%", "1.15%"]);
  const permissionTop = useTransform(scene, [0, 0.84, 0.92], ["50%", "50%", "54%"]);
  const permissionX = useTransform(scene, [0, 0.77, 0.84, 0.92], ["calc(-50% + 7px)", "calc(-50% + 7px)", "-50%", "0%"]);
  const permissionY = useTransform(scene, [0, 0.77, 0.84, 0.92], ["calc(-50% + 8px)", "calc(-50% + 8px)", "-50%", "0%"]);
  const permissionScale = useTransform(scene, [0, 0.84, 0.92], [1, 1, 1]);
  const permissionRotateY = useTransform(scene, [0, 0.84, 0.92], [0, 0, 14]);
  const annaLeft = useTransform(scene, [0, 0.94, 1], ["50%", "50%", "63.75%"]);
  const annaTop = useTransform(scene, [0, 0.94, 1], ["50%", "50%", "16%"]);
  const annaX = useTransform(scene, [0, 0.86, 0.94, 1], ["calc(-50% + 12px)", "calc(-50% + 12px)", "-50%", "0%"]);
  const annaY = useTransform(scene, [0, 0.86, 0.94, 1], ["calc(-50% + 14px)", "calc(-50% + 14px)", "-50%", "0%"]);
  const annaScale = useTransform(scene, [0, 0.94, 1], [1, 1, 1]);
  const annaRotateY = useTransform(scene, [0, 0.94, 1], [0, 0, -14]);
  // The final composition is spatial: each card turns its inside edge slightly
  // toward the viewer, so both card pairs read as facing the person in the centre.
  const profileRotateY = useTransform(scene, [0, 0.47, 0.70], [0, 0, 14]);
  // A profile is highlighted in place. No floating outline travels between
  // cards, so every step is tied precisely to its own profile tile.
  const personalHighlight = useTransform(scene, [0.12, 0.15, 0.17, 0.19], [0, 1, 0.55, 0]);
  const workHighlight = useTransform(scene, [0.18, 0.21, 0.23, 0.25], [0, 1, 0.55, 0]);
  const alterHighlight = useTransform(scene, [0.24, 0.27, 0.29, 0.31], [0, 1, 0.48, 0]);
  const guestHighlight = useTransform(scene, [0.30, 0.33, 0.37, 0.40], [0, 1, 1, 0.9]);
  // After the profile has been chosen, the guest identity becomes the second
  // focused interaction before it takes its place in the composition.
  const guestCardOpacity = companionCardOpacity;
  const guestLeft = useTransform(scene, [0, 0.67, 0.75], ["50%", "50%", "63.9%"]);
  const guestTop = useTransform(scene, [0, 0.67, 0.75], ["50%", "50%", "54%"]);
  const guestCardX = useTransform(scene, [0, 0.55, 0.67, 0.75], ["calc(-50% + 4px)", "calc(-50% + 4px)", "-50%", "0%"]);
  const guestCardY = useTransform(scene, [0, 0.55, 0.67, 0.75], ["calc(-50% + 5px)", "calc(-50% + 5px)", "-50%", "0%"]);
  const guestCardScale = useTransform(scene, [0, 0.52, 0.67, 0.75], [1, 1, 1.04, 1]);
  const guestCardRotateY = useTransform(scene, [0, 0.67, 0.75], [0, 0, -14]);
  // A restrained, one-pass confirmation of the guest PAGER ID.
  const guestIdScan = useTransform(scene, [0.55, 0.58, 0.63, 0.65], [0, 1, 1, 0]);
  const guestIdScanOpacity = useTransform(scene, [0.55, 0.58, 0.63, 0.65], [0, 1, 1, 0]);
  const profiles = [
    { label: c.personal, src: PORTRAITS.personal, accent: "#27d5a7", glow: "0 0 15px rgba(39,213,167,.82)", highlight: personalHighlight },
    { label: c.work, src: PORTRAITS.work, accent: "#4e9cff", glow: "0 0 15px rgba(78,156,255,.84)", highlight: workHighlight },
    { label: c.guest, src: PORTRAITS.guest, accent: "#f6c86f", glow: "0 0 16px rgba(246,200,111,.88)", highlight: guestHighlight },
    { label: c.alter, src: PORTRAITS.alter, accent: "#c48cff", glow: "0 0 15px rgba(196,140,255,.82)", highlight: alterHighlight },
  ];

  return (
    <div className="relative h-full w-full font-sans text-white [perspective:1200px] [text-shadow:0_1px_8px_rgba(0,0,0,.7)]">
      <motion.div className="absolute z-30 aspect-[1.25] w-[35%]" style={{ opacity: profileOpacity, left: profileLeft, top: profileTop, x: profileX, y: profileY, scale: profileScale, filter: profileBlur, rotateY: profileRotateY }}>
      <section className="h-full rounded-[clamp(.5rem,1.2vw,1rem)] border border-white/30 bg-[linear-gradient(145deg,rgba(24,30,39,.94),rgba(2,5,9,.93))] p-[clamp(.4rem,1vw,.9rem)] shadow-[0_20px_42px_rgba(0,0,0,.62),inset_0_1px_0_rgba(255,255,255,.18)] backdrop-blur-md">
        <p className="text-center text-[clamp(.35rem,1.05vw,1rem)] font-semibold uppercase tracking-[.08em]">{c.profiles}</p>
        <p className="mt-1 text-center text-[clamp(.25rem,.65vw,.62rem)] leading-[1.35] text-white/74">{c.profilesLead}</p>
        <div className="relative mt-[clamp(.28rem,.7vw,.7rem)] grid grid-cols-4 gap-[clamp(.15rem,.45vw,.45rem)]">
          {profiles.map((profile) => (
            <div key={profile.label} className="min-w-0 text-center">
              <div
                className="relative aspect-[.72] overflow-hidden rounded-[clamp(.25rem,.5vw,.5rem)] border bg-[radial-gradient(circle_at_50%_28%,#27303a_0%,#111720_45%,#05070a_100%)]"
                style={{ borderColor: `${profile.accent}55` }}
              >
                <img src={profile.src} alt="" className="absolute inset-0 h-full w-full object-contain object-bottom" />
                <motion.span
                  className="pointer-events-none absolute inset-0 z-10 rounded-[clamp(.25rem,.5vw,.5rem)] border-2"
                  style={{ opacity: profile.highlight, borderColor: profile.accent, boxShadow: profile.glow }}
                />
              </div>
              <span className="mt-1 block truncate text-[clamp(.23rem,.55vw,.55rem)] text-white/90">{profile.label}</span>
            </div>
          ))}
        </div>
      </section></motion.div>

      <PermissionCard copy={c} locale={locale} scene={scene} opacity={companionCardOpacity} left={permissionLeft} top={permissionTop} x={permissionX} y={permissionY} scale={permissionScale} rotateY={permissionRotateY} />

      <motion.section
        className="absolute z-10 aspect-[1.25] w-[35%] overflow-hidden rounded-[clamp(.5rem,1.2vw,1rem)] border border-white/30 bg-[linear-gradient(145deg,rgba(24,30,39,.94),rgba(2,5,9,.93))] p-[clamp(.4rem,1vw,.9rem)] shadow-[0_20px_42px_rgba(0,0,0,.62),inset_0_1px_0_rgba(255,255,255,.18)] backdrop-blur-md"
        style={{ opacity: companionCardOpacity, left: annaLeft, top: annaTop, x: annaX, y: annaY, scale: annaScale, rotateY: annaRotateY }}
      >
        <div className="flex gap-[clamp(.35rem,.9vw,.8rem)]">
          <Portrait src={PORTRAITS.anna} className="w-[34%]" />
          <div className="min-w-0 pt-1">
            <p className="text-[clamp(.7rem,1.8vw,1.6rem)] leading-none">{c.anna}</p>
            <p className="mt-1 text-[clamp(.3rem,.68vw,.68rem)] text-white/70">ID A770 7070</p>
            <p className="mt-[clamp(.35rem,.8vw,.8rem)] text-[clamp(.28rem,.63vw,.62rem)] leading-[1.35] text-white/74">{c.annaBody}</p>
          </div>
        </div>
        <div className="mt-[clamp(.45rem,1vw,1rem)] flex items-center gap-1 border-t border-white/20 pt-[clamp(.35rem,.7vw,.7rem)] text-[clamp(.28rem,.62vw,.62rem)] text-[#f6c86f]">
          <span className="size-[.55em] rounded-full bg-[#f6c86f] shadow-[0_0_8px_rgba(246,200,111,.55)]" />
          <span>{c.temporary}</span>
        </div>
      </motion.section>

      <motion.section
        className="absolute z-20 aspect-[1.25] w-[35%] overflow-hidden rounded-[clamp(.5rem,1.2vw,1rem)] border border-white/30 bg-[linear-gradient(145deg,rgba(24,30,39,.94),rgba(2,5,9,.93))] p-[clamp(.4rem,1vw,.9rem)] shadow-[0_20px_42px_rgba(0,0,0,.62),inset_0_1px_0_rgba(255,255,255,.18)] backdrop-blur-md"
        style={{ opacity: guestCardOpacity, left: guestLeft, top: guestTop, x: guestCardX, y: guestCardY, scale: guestCardScale, rotateY: guestCardRotateY }}
      >
        <div className="flex items-end gap-[clamp(.35rem,.8vw,.75rem)]">
          <div className="min-w-0 flex-1">
            <p className="text-[clamp(.3rem,.7vw,.7rem)] uppercase tracking-[.04em] text-white/70">{c.guestTitle}</p>
            <p className="mt-1 text-[clamp(.75rem,1.8vw,1.65rem)] leading-none">{c.guestName}</p>
            <p className="mt-2 text-[clamp(.28rem,.62vw,.62rem)] leading-[1.35] text-white/74">{c.guestBody}</p>
            <p className="relative mt-[clamp(.35rem,.8vw,.8rem)] pb-[.32em] text-[clamp(.28rem,.62vw,.62rem)] text-white/70">PAGER ID<br /><span className="text-white">A147 0865</span><motion.span className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#4e9cff]" style={{ scaleX: guestIdScan, opacity: guestIdScanOpacity }} /></p>
          </div>
          <Portrait src={PORTRAITS.guest} className="w-[37%]" />
        </div>
      </motion.section>
    </div>
  );
}

function PermissionCard({ copy, locale, scene, opacity, left, top, x, y, scale, rotateY }: { copy: SceneCopy; locale: Locale; scene: MotionValue<number>; opacity: MotionValue<number>; left: MotionValue<string>; top: MotionValue<string>; x: MotionValue<string>; y: MotionValue<string>; scale: MotionValue<number>; rotateY: MotionValue<number> }) {
  // The card starts as an open channel. During its focused moment, the four
  // non-essential permissions close together, then a timed-access rule turns on.
  const openUntilRule = useTransform(scene, [0, 0.77, 0.81], [1, 1, 0]);
  const alwaysEnabled = useTransform(scene, [0, 1], [1, 1]);
  const timedAccess = useTransform(scene, [0, 0.815, 0.835], [0, 0, 1]);
  const access24 = locale === "ru" ? "Доступ на 24 часа" : locale === "zh" ? "24小时访问" : "24-hour access";
  const access24Hint = locale === "ru" ? "Чат закроется автоматически" : locale === "zh" ? "对话将自动关闭" : "Chat closes automatically";
  const rows: Array<{ label: string; icon: LucideIcon; enabled: MotionValue<number> }> = [
    { label: copy.text, icon: MessageSquare, enabled: alwaysEnabled },
    { label: copy.audio, icon: Mic, enabled: openUntilRule },
    { label: copy.video, icon: Video, enabled: openUntilRule },
    { label: copy.files, icon: Paperclip, enabled: alwaysEnabled },
    { label: copy.calls, icon: Phone, enabled: openUntilRule },
    { label: copy.videoCalls, icon: Video, enabled: openUntilRule },
  ];
  return (
    <motion.section
      className="absolute z-[15] aspect-[1.25] w-[35%] overflow-hidden rounded-[clamp(.5rem,1.2vw,1rem)] border border-white/30 bg-[linear-gradient(145deg,rgba(24,30,39,.94),rgba(2,5,9,.93))] p-[clamp(.42rem,1vw,.95rem)] shadow-[0_20px_42px_rgba(0,0,0,.62),inset_0_1px_0_rgba(255,255,255,.18)] backdrop-blur-md"
      style={{ opacity, left, top, x, y, scale, rotateY }}
    >
      <p className="mb-[clamp(.25rem,.65vw,.65rem)] text-center text-[clamp(.35rem,.95vw,.9rem)] font-semibold uppercase tracking-[.08em]">{copy.permissions}</p>
      <div className="space-y-[clamp(.16rem,.42vw,.42rem)]">
        {rows.map(({ label, icon: Icon, enabled }) => (
          <div key={label} className="flex items-center gap-[clamp(.25rem,.65vw,.6rem)] text-[clamp(.28rem,.68vw,.66rem)] text-white/94">
            <Icon className="size-[1.05em] shrink-0 text-white/85" strokeWidth={1.7} />
            <span className="min-w-0 flex-1 truncate">{label}</span>
            <AccessControl enabled={enabled} />
          </div>
        ))}
      </div>
      <div className="mt-[clamp(.24rem,.55vw,.5rem)] flex min-w-0 items-center gap-[clamp(.25rem,.65vw,.6rem)] border-t border-white/20 pt-[clamp(.22rem,.5vw,.45rem)] text-[clamp(.28rem,.68vw,.66rem)]">
        <Clock3 className="size-[1.05em] shrink-0 text-[#f6c86f]" strokeWidth={1.7} />
        <div className="min-w-0 flex-1">
          <p className="text-[clamp(.27rem,.65vw,.63rem)] text-white/94">{access24}</p>
          <p className="text-[clamp(.22rem,.5vw,.48rem)] text-white/55">{access24Hint}</p>
        </div>
        <motion.span className="grid size-[1.1em] shrink-0 place-items-center rounded-[.18em] border border-[#f6c86f] bg-[#f6c86f] text-[#15191e]" style={{ opacity: timedAccess, scale: timedAccess }}>
          <Check className="size-[.75em]" strokeWidth={3} />
        </motion.span>
      </div>
    </motion.section>
  );
}

function AccessControl({ enabled }: { enabled: MotionValue<number> }) {
  const knobX = useTransform(enabled, [0, 1], ["0.12em", "0.88em"]);
  const background = useTransform(enabled, [0, 1], ["#202936", "#c98b37"]);
  const borderColor = useTransform(enabled, [0, 1], ["rgba(255,255,255,.2)", "rgba(245,189,103,.7)"]);
  return <motion.span className="relative inline-flex h-[1.1em] w-[1.9em] shrink-0 items-center rounded-full border" style={{ backgroundColor: background, borderColor }}><motion.span className="absolute size-[.88em] rounded-full bg-[#fbf5ec] shadow-[0_1px_3px_rgba(0,0,0,.65)]" style={{ left: knobX }} /></motion.span>;
}

function Portrait({ src, className }: { src: string; className: string }) {
  return <div className={`relative shrink-0 self-stretch overflow-hidden rounded-[clamp(.3rem,.7vw,.65rem)] border border-white/25 bg-[radial-gradient(circle_at_50%_15%,#25303c,transparent_45%),#070a0e] ${className}`}><img src={src} alt="" className="absolute inset-0 h-full w-full object-contain object-bottom" /></div>;
}
