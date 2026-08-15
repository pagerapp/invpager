import { motion, useTransform, type MotionValue } from "motion/react";
import { Check, MessageSquare, Mic, Paperclip, Phone, Video } from "lucide-react";
import { type Locale } from "@/i18n";

type SceneRange = { a: number; b: number; c: number; d: number };

type Props = {
  locale: Locale;
  progress: MotionValue<number>;
  range: SceneRange;
};

type Copy = {
  profiles: string; profilesLead: string; personal: string; work: string; guest: string; alter: string;
  permissions: string; text: string; audio: string; video: string; files: string; calls: string; videoCalls: string;
  access24: string; access24Lead: string; anna: string; temporary: string; expires: string;
  guestTitle: string; guestName: string; guestBody: string;
};

const COPY: Record<Locale, Copy> = {
  ru: {
    profiles: "ПРОФИЛИ ОБЩЕНИЯ", profilesLead: "Выберите профиль общения с этим человеком.",
    personal: "ЛИЧНЫЙ", work: "РАБОТА", guest: "ГОСТИ", alter: "АЛЬТЕР ЭГО",
    permissions: "ЧТО РАЗРЕШИТЬ", text: "Текстовые сообщения", audio: "Аудио сообщения", video: "Видео сообщения", files: "Отправка файлов", calls: "Аудио звонки", videoCalls: "Видео звонки",
    access24: "Доступ на 24 часа", access24Lead: "Чат закроется автоматически.", anna: "Анна", temporary: "Временный чат", expires: "До 24 июл., 15:56",
    guestTitle: "ГОСТЕВОЙ", guestName: "Оскар", guestBody: "Буду рад общению, но прошу уважать мою приватность.",
  },
  en: {
    profiles: "CHAT PROFILES", profilesLead: "Choose how you appear to this person.",
    personal: "Personal", work: "Work", guest: "Guest", alter: "Alter ego",
    permissions: "WHAT'S ALLOWED", text: "Text messages", audio: "Voice messages", video: "Video messages", files: "File sharing", calls: "Voice calls", videoCalls: "Video calls",
    access24: "24-hour access", access24Lead: "The chat closes automatically.", anna: "Anna", temporary: "Temporary chat", expires: "Expires Jul 24, 15:56",
    guestTitle: "GUEST PROFILE", guestName: "Oscar", guestBody: "Happy to chat, but please respect my privacy.",
  },
  zh: {
    profiles: "沟通档案", profilesLead: "选择此人看到的你的身份。", personal: "个人", work: "工作", guest: "访客", alter: "另一个我",
    permissions: "允许什么", text: "文字消息", audio: "语音消息", video: "视频消息", files: "文件发送", calls: "语音通话", videoCalls: "视频通话",
    access24: "24 小时访问", access24Lead: "聊天将在 24 小时后自动关闭。", anna: "安娜", temporary: "限时聊天", expires: "截至 7 月 24 日 15:56",
    guestTitle: "访客档案", guestName: "奥斯卡", guestBody: "乐于交流，也请尊重我的隐私。",
  },
};

const PORTRAITS = {
  personal: "media/Hero_img_scene_3_interface_personal_profile.png",
  work: "media/Hero_img_scene_3_interface_work_profile.png",
  guest: "media/Hero_img_scene_3_interface_guest_profile.png",
  alter: "media/Hero_img_scene_3_interface_alterego_profile.png",
  anna: "media/Hero_img_scene_3_interface_anna_profile.png",
};

const CARD = "overflow-hidden rounded-[clamp(.5rem,1.1vw,1rem)] border border-white/25 bg-[linear-gradient(145deg,rgba(24,30,39,.96),rgba(4,7,11,.96))] p-[clamp(.42rem,1vw,.92rem)] shadow-[0_18px_42px_rgba(0,0,0,.58)] backdrop-blur-md";

const within = (value: number) => Math.max(0, Math.min(1, value));

export function SceneThreeChoreography({ locale, progress, range }: Props) {
  const c = COPY[locale];
  const scene = useTransform(progress, (value) => within((value - range.a) / Math.max(0.001, range.c - range.a)));
  const veil = useTransform(scene, [0, 0.23], [0.52, 0]);

  return (
    <div className="relative h-full w-full font-sans text-white [text-shadow:0_1px_8px_rgba(0,0,0,.72)]">
      <motion.div className="absolute inset-0 z-10 bg-black" style={{ opacity: veil }} />
      <AnimatedCard progress={scene} phase={[0.07, 0.27]} fromX="88%" fromY="74%" className="left-[1.2%] top-[15%] w-[34%]" angle="perspective(900px) rotateY(16deg) rotateZ(2deg)">
        <ProfilePicker copy={c} progress={scene} />
      </AnimatedCard>
      <AnimatedCard progress={scene} phase={[0.25, 0.45]} fromX="-104%" fromY="-64%" className="bottom-[14%] right-[1.2%] w-[31%]" angle="perspective(900px) rotateY(-16deg) rotateZ(-2deg)">
        <GuestCard copy={c} progress={scene} />
      </AnimatedCard>
      <AnimatedCard progress={scene} phase={[0.43, 0.64]} fromX="94%" fromY="-74%" className="bottom-[15%] left-[1.2%] w-[33%]" angle="perspective(900px) rotateY(14deg) rotateZ(2deg)">
        <Permissions copy={c} progress={scene} />
      </AnimatedCard>
      <AnimatedCard progress={scene} phase={[0.61, 0.80]} fromX="-100%" fromY="75%" className="right-[1.2%] top-[15%] w-[32%]" angle="perspective(900px) rotateY(-15deg) rotateZ(-2deg)">
        <AnnaCard copy={c} progress={scene} />
      </AnimatedCard>
    </div>
  );
}

function AnimatedCard({ progress, phase, fromX, fromY, className, angle, children }: { progress: MotionValue<number>; phase: [number, number]; fromX: string; fromY: string; className: string; angle: string; children: React.ReactNode }) {
  const [start, end] = phase;
  const opacity = useTransform(progress, [0, start, start + 0.055, end], [0, 0, 1, 1]);
  const x = useTransform(progress, [0, start, end], [fromX, fromX, "0%"]);
  const y = useTransform(progress, [0, start, end], [fromY, fromY, "0%"]);
  const scale = useTransform(progress, [0, start, end], [0.82, 0.82, 1]);
  const filter = useTransform(progress, [0, start, end], ["blur(8px)", "blur(8px)", "blur(0px)"]);
  return <motion.div className={`absolute z-20 ${className}`} style={{ opacity, x, y, scale, filter }}><section className={CARD} style={{ transform: angle, transformStyle: "preserve-3d" }}>{children}</section></motion.div>;
}

function ProfilePicker({ copy, progress }: { copy: Copy; progress: MotionValue<number> }) {
  const selectionX = useTransform(progress, [0.12, 0.20], ["0%", "215%"]);
  const entries = [[copy.personal, PORTRAITS.personal], [copy.work, PORTRAITS.work], [copy.guest, PORTRAITS.guest], [copy.alter, PORTRAITS.alter]] as const;
  return <>
    <p className="text-center text-[clamp(.34rem,1vw,.92rem)] font-semibold uppercase tracking-[.08em]">{copy.profiles}</p><p className="mt-1 text-center text-[clamp(.25rem,.62vw,.6rem)] leading-[1.35] text-white/72">{copy.profilesLead}</p>
    <div className="relative mt-[clamp(.25rem,.7vw,.7rem)] grid grid-cols-4 gap-[clamp(.14rem,.42vw,.42rem)]">
      <motion.span className="pointer-events-none absolute left-0 top-0 z-10 aspect-[.7] w-[21.8%] rounded-[clamp(.24rem,.5vw,.5rem)] border border-[#fff2d7] shadow-[0_0_14px_rgba(255,242,215,.58)]" style={{ x: selectionX }} />
      {entries.map(([label, src]) => <div key={label} className="min-w-0 text-center"><div className="aspect-[.7] overflow-hidden rounded-[clamp(.24rem,.5vw,.5rem)] border border-white/15 bg-[#10151c]"><img src={src} alt="" className="h-full w-full object-cover object-top" /></div><span className="mt-1 block truncate text-[clamp(.23rem,.53vw,.52rem)] text-white/90">{label}</span></div>)}
    </div>
  </>;
}

function GuestCard({ copy, progress }: { copy: Copy; progress: MotionValue<number> }) {
  const highlight = useTransform(progress, [0.37, 0.44, 0.54], [0, 1, 0.76]);
  const scale = useTransform(progress, [0.37, 0.44], [0.94, 1]);
  return <div className="flex items-end gap-[clamp(.35rem,.8vw,.75rem)]"><div className="min-w-0 flex-1"><p className="text-[clamp(.29rem,.66vw,.64rem)] uppercase text-white/68">{copy.guestTitle}</p><p className="mt-1 text-[clamp(.7rem,1.7vw,1.55rem)] leading-none">{copy.guestName}</p><p className="mt-2 text-[clamp(.26rem,.58vw,.58rem)] leading-[1.35] text-white/72">{copy.guestBody}</p><div className="relative mt-[clamp(.35rem,.75vw,.75rem)]"><p className="text-[clamp(.25rem,.56vw,.55rem)] text-white/68">PAGER ID</p><p className="text-[clamp(.48rem,1.05vw,1rem)] tracking-[.07em]">A147 0865</p><motion.span className="pointer-events-none absolute -inset-x-1 -inset-y-1 rounded border border-[#41a8ff] shadow-[0_0_14px_rgba(65,168,255,.7)]" style={{ opacity: highlight, scale }} /></div></div><Portrait src={PORTRAITS.guest} /></div>;
}

function Permissions({ copy, progress }: { copy: Copy; progress: MotionValue<number> }) {
  const items = [[MessageSquare, copy.text, 0.48], [Mic, copy.audio, 0.52], [Video, copy.video, 0.56], [Paperclip, copy.files, 0.60], [Phone, copy.calls, 0.64], [Video, copy.videoCalls, 0.68]] as const;
  const accessOpacity = useTransform(progress, [0.59, 0.66], [0, 1]);
  const checkOpacity = useTransform(progress, [0.65, 0.70], [0, 1]);
  return <><p className="text-center text-[clamp(.34rem,.96vw,.88rem)] font-semibold uppercase tracking-[.08em]">{copy.permissions}</p><div className="mt-[clamp(.3rem,.7vw,.7rem)] space-y-[clamp(.18rem,.4vw,.38rem)]">{items.map(([Icon, label, at]) => <PermissionRow key={label} Icon={Icon} label={label} progress={progress} at={at} />)}</div><motion.div className="mt-[clamp(.32rem,.7vw,.7rem)] flex items-center gap-2 rounded border border-white/15 bg-white/[.035] p-[clamp(.24rem,.55vw,.5rem)]" style={{ opacity: accessOpacity }}><span className="relative grid h-[1.05em] w-[1.05em] place-items-center rounded-[.18em] border border-[#f6c86f]"><motion.span style={{ opacity: checkOpacity }}><Check className="h-[.8em] w-[.8em] text-[#f6c86f]" strokeWidth={3} /></motion.span></span><span className="min-w-0"><b className="block text-[clamp(.26rem,.58vw,.56rem)] font-medium text-white/95">{copy.access24}</b><span className="block text-[clamp(.22rem,.48vw,.47rem)] text-white/58">{copy.access24Lead}</span></span></motion.div></>;
}

function PermissionRow({ Icon, label, progress, at }: { Icon: typeof MessageSquare; label: string; progress: MotionValue<number>; at: number }) {
  const on = useTransform(progress, [at, at + 0.05], [0, 1]);
  const knob = useTransform(progress, [at, at + 0.05], ["0%", "82%"]);
  return <div className="flex items-center gap-2 text-[clamp(.25rem,.61vw,.6rem)] text-white/90"><Icon className="h-[.9em] w-[.9em] shrink-0 text-white/72" /><span className="flex-1 truncate">{label}</span><span className="relative h-[1em] w-[1.72em] shrink-0 rounded-full border border-white/25 bg-[#171d26]"><motion.span className="absolute inset-0 rounded-full bg-[#d9a34f]" style={{ opacity: on }} /><motion.span className="absolute left-[.12em] top-[.12em] h-[.7em] w-[.7em] rounded-full bg-white shadow-sm" style={{ x: knob }} /></span></div>;
}

function AnnaCard({ copy, progress }: { copy: Copy; progress: MotionValue<number> }) {
  const temporary = useTransform(progress, [0.75, 0.82], [0, 1]);
  return <><div className="flex gap-[clamp(.35rem,.85vw,.78rem)]"><Portrait src={PORTRAITS.anna} /><div className="min-w-0 pt-1"><p className="text-[clamp(.7rem,1.75vw,1.6rem)] leading-none">{copy.anna}</p><p className="mt-1 text-[clamp(.27rem,.61vw,.6rem)] text-white/70">ID A770 7070</p><p className="mt-[clamp(.3rem,.65vw,.65rem)] text-[clamp(.25rem,.56vw,.55rem)] leading-[1.35] text-white/72">{copy.guestBody}</p></div></div><motion.div className="mt-[clamp(.4rem,.85vw,.8rem)] flex items-center gap-2 border-t border-white/20 pt-[clamp(.32rem,.65vw,.65rem)] text-[clamp(.25rem,.58vw,.56rem)]" style={{ opacity: temporary }}><span className="h-[.65em] w-[.65em] rounded-full bg-[#f6c86f] shadow-[0_0_9px_rgba(246,200,111,.9)]" /><span className="text-[#f6c86f]">{copy.temporary}</span><span className="ml-auto text-white/64">{copy.expires}</span></motion.div></>;
}

function Portrait({ src }: { src: string }) {
  return <div className="w-[31%] shrink-0 self-stretch overflow-hidden rounded-[clamp(.3rem,.7vw,.65rem)] border border-white/20 bg-[#111821]"><img src={src} alt="" className="h-full w-full object-cover object-top" /></div>;
}
