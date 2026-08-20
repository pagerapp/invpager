import { motion } from "motion/react";
import { MediaSlot } from "../MediaSlot";
import { MaskLine, Rise } from "../primitives";
import { useT } from "@/i18n";
import { useEffect, useRef, useState } from "react";

const KEYS = ["personal", "work", "guest", "alter"];
const COLORS = ["var(--personal)", "var(--work)", "var(--guest)", "var(--alter)"];
const MEDIA = ["Personal_profile.jpg", "Work_profile.jpg", "Guest_profile.jpg", "Alter_ego_profile.jpg"];
const RULE_KEYS = ["text", "audio", "video", "files", "calls", "videoCalls"] as const;
const SCROLL_PREVIEW_STEPS: Array<{ card: number; rule: RuleKey; from: number; to: number }> = [
  { card: 0, rule: "videoCalls", from: 0.08, to: 0.17 },
  { card: 1, rule: "files", from: 0.19, to: 0.28 },
  { card: 2, rule: "audio", from: 0.30, to: 0.39 },
  { card: 3, rule: "files", from: 0.41, to: 0.50 },
  { card: 0, rule: "video", from: 0.52, to: 0.61 },
  { card: 1, rule: "videoCalls", from: 0.63, to: 0.72 },
  { card: 2, rule: "calls", from: 0.74, to: 0.83 },
  { card: 3, rule: "video", from: 0.85, to: 0.94 },
];
const ALTER_TITLE: Record<string, string> = { ru: "АЛЬТЕР ЭГО", en: "ALTER EGO", zh: "另一个我" };
type RuleKey = typeof RULE_KEYS[number];
type ControlCopy = { settings: string; text: string; audio: string; video: string; files: string; calls: string; videoCalls: string };
type ProfileMeta = { name: string; description: string };

const PROFILE_META: Record<string, ProfileMeta[]> = {
  ru: [
    { name: "Оскар", description: "Для близких, друзей и повседневного общения." },
    { name: "Оскар Маркович К.", description: "Рабочая роль с понятными границами и графиком." },
    { name: "Оскар М.К.", description: "Короткое знакомство без доступа к личному." },
    { name: "Mr. Corsa", description: "Отдельная роль для особого круга и сценариев." },
  ],
  en: [
    { name: "Oscar", description: "For close friends and everyday conversations." },
    { name: "Oscar Markovich K.", description: "A work role with clear boundaries and hours." },
    { name: "Oscar M.K.", description: "A brief introduction without access to personal space." },
    { name: "Mr. Corsa", description: "A distinct role for a select circle and special moments." },
  ],
  zh: [
    { name: "奥斯卡", description: "用于亲友与日常交流。" },
    { name: "奥斯卡·马尔科维奇·K.", description: "清晰边界与工作时间的职业身份。" },
    { name: "奥斯卡·M.K.", description: "初次认识，不开放私人空间。" },
    { name: "Mr. Corsa", description: "为特别的人和场景准备的独立身份。" },
  ],
};

const CONTROL_COPY: Record<string, ControlCopy> = {
  ru: { settings: "КАНАЛЫ СВЯЗИ", text: "Текст", audio: "Аудио", video: "Видео", files: "Файлы", calls: "Аудио звонки", videoCalls: "Видео звонки" },
  en: { settings: "CONNECTION CHANNELS", text: "Text", audio: "Voice", video: "Video", files: "Files", calls: "Voice calls", videoCalls: "Video calls" },
  zh: { settings: "沟通方式", text: "文字", audio: "语音", video: "视频", files: "文件", calls: "语音通话", videoCalls: "视频通话" },
};

const INITIAL_RULES: Record<string, Record<RuleKey, boolean>> = {
  personal: { text: true, audio: true, video: true, files: true, calls: true, videoCalls: true },
  work: { text: true, audio: true, video: false, files: true, calls: true, videoCalls: false },
  guest: { text: true, audio: false, video: false, files: false, calls: false, videoCalls: false },
  alter: { text: true, audio: true, video: true, files: false, calls: true, videoCalls: true },
};

export function ContactContext() {
  const t = useT();
  const [rules, setRules] = useState(INITIAL_RULES);
  const controls = CONTROL_COPY[t.code] ?? CONTROL_COPY["en"]!;
  const profileMeta = PROFILE_META[t.code] ?? PROFILE_META["en"]!;
  const contexts = t.contact.contexts.map((context, index) => ({ ...context, ...profileMeta[index]!, key: KEYS[index]!, cardTitle: KEYS[index] === "alter" ? (ALTER_TITLE[t.code] ?? ALTER_TITLE["en"]!) : context.label, color: COLORS[index]!, media: MEDIA[index]! }));
  const toggleRule = (key: string, rule: RuleKey) => setRules((current) => ({ ...current, [key]: { ...current[key]!, [rule]: !current[key]![rule] } }));

  return (
    <div className="shell mt-16 md:mt-24">
      <div className="text-center">
        <Rise className="mx-auto max-w-[56ch]">
          <p className="label-tech text-[#d8c7a7]">{t.multiprofile.quote}</p>
        </Rise>
        <h2 className="display-lg mt-5 md:mt-6"><MaskLine className="text-[clamp(2.1rem,3.2vw,3.6rem)] md:whitespace-nowrap">{t.contact.h.join(" ")}</MaskLine></h2>
        <Rise className="mx-auto mt-5 max-w-[62ch] md:mt-6"><p className="lead text-center">{t.contact.summary}</p></Rise>
      </div>

      <div aria-label={t.contact.tablistAria} className="mt-12 hidden md:mt-16 md:grid md:grid-cols-4 md:gap-px md:bg-[color:var(--color-hairline)]">
        {contexts.map((context, index) => (
          <ProfileCard key={context.key} context={context} index={index} labels={t.contact} controls={controls} ruleState={rules[context.key]!} onToggle={(rule) => toggleRule(context.key, rule)} />
        ))}
      </div>

      <ContactSwitcher contexts={contexts} labels={t.contact} controls={controls} rules={rules} onToggle={toggleRule} />

      <Rise className="mt-5 flex justify-end md:mt-6">
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#d8c7a7] md:whitespace-nowrap md:text-[10px]">{t.contact.lead}</p>
      </Rise>
    </div>
  );
}

type Context = { key: string; label: string; cardTitle: string; name: string; description: string; access: string; rules: string; color: string; media: string };

/**
 * Mobile-only replacement for the swipe carousel — same tile-selector +
 * single detail panel pattern as Evolution's EvolutionSwitcher. The full
 * ProfileCard (photo, access/rules, channel toggles, scroll preview) renders
 * once for whichever persona is active, so the tab row stays a fixed short
 * height regardless of card content length.
 */
function ContactSwitcher({ contexts, labels, controls, rules, onToggle }: {
  contexts: Context[];
  labels: ReturnType<typeof useT>["contact"];
  controls: ControlCopy;
  rules: Record<string, Record<RuleKey, boolean>>;
  onToggle: (key: string, rule: RuleKey) => void;
}) {
  const [active, setActive] = useState(0);
  const context = contexts[active]!;

  return (
    <div className="mt-12 md:hidden">
      <div role="tablist" aria-label={labels.tablistAria} className="grid grid-cols-4 gap-px bg-[color:var(--color-hairline)]">
        {contexts.map((c, i) => {
          const isActive = active === i;
          return (
            <button
              key={c.key}
              type="button"
              role="tab"
              id={`contact-tab-${i}`}
              aria-selected={isActive}
              aria-controls="contact-panel"
              onClick={() => setActive(i)}
              className="relative flex flex-col items-center gap-2 bg-[color:var(--color-background)] px-1 py-3 text-center transition-colors duration-200"
              style={isActive ? { boxShadow: `inset 0 -2px 0 0 ${c.color}` } : undefined}
            >
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[12px]">
                <MediaSlot
                  name={c.media}
                  alt=""
                  label={c.cardTitle}
                  lockHeight
                  className="h-full w-full [&>div:first-child]:opacity-0 [&>picture>img]:object-cover [&>picture>img]:object-top"
                />
              </div>
              <span className="label-tech text-[9px] leading-tight" style={{ color: isActive ? c.color : undefined }}>
                {c.cardTitle}
              </span>
            </button>
          );
        })}
      </div>

      <div id="contact-panel" role="tabpanel" aria-labelledby={`contact-tab-${active}`} className="mt-6">
        <ProfileCard
          context={context}
          index={active}
          labels={labels}
          controls={controls}
          ruleState={rules[context.key]!}
          onToggle={(rule) => onToggle(context.key, rule)}
          compact
        />
      </div>
    </div>
  );
}

function ProfileCard({ context, index, labels, controls, ruleState, onToggle, compact = false }: {
  context: { key: string; label: string; cardTitle: string; name: string; description: string; access: string; rules: string; color: string; media: string };
  index: number;
  labels: ReturnType<typeof useT>["contact"];
  controls: ControlCopy;
  ruleState: Record<RuleKey, boolean>;
  onToggle: (rule: RuleKey) => void;
  compact?: boolean;
}) {
  const enabledCount = RULE_KEYS.filter((rule) => ruleState[rule]).length;
  const isAlter = context.key === "alter";
  const cardRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const [previewRule, setPreviewRule] = useState<RuleKey | null>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;
    let frame: number | undefined;
    const update = () => {
      frame = undefined;
      const rect = rulesRef.current?.getBoundingClientRect() ?? element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (viewport - rect.top) / (viewport + rect.height)));
      const activeStep = SCROLL_PREVIEW_STEPS.find((step) => step.card === index && progress >= step.from && progress < step.to);
      setPreviewRule(activeStep?.rule ?? null);
    };
    const requestUpdate = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
    };
  }, [index]);

  const displayedCount = previewRule
    ? enabledCount + (ruleState[previewRule] ? -1 : 1)
    : enabledCount;

  return (
    <Rise delay={index * 0.07} className="group w-full transition-transform duration-300 hover:-translate-y-1">
      <div ref={cardRef} className={`relative flex h-full flex-col overflow-hidden bg-[color:var(--color-background)] p-5 md:p-6 ${compact ? "" : "min-h-[42rem]"}`} style={{ borderTop: `2px solid ${context.color}`, boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${context.color} 38%, transparent), inset 0 -40px 72px color-mix(in srgb, ${context.color} 9%, transparent)` }}>
        <div className="flex items-center justify-between gap-4">
          <span className="label-tech">{String(index + 1).padStart(2, "0")} / 04</span>
          <span className="label-tech" style={{ color: context.color }}>{context.label.toUpperCase()}</span>
        </div>
        <div className="relative mt-7 h-[14rem] w-full overflow-hidden md:h-[15.5rem]">
          <MediaSlot name={context.media} alt={`${labels.profileAlt}: ${context.label}`} label={context.label.toUpperCase()} lockHeight className="h-full w-full [&>div:first-child]:opacity-0 [&>picture>img]:object-cover [&>picture>img]:object-top" />
          {isAlter ? (
            <span
              className="absolute right-3 top-3 z-20 rounded-full border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] backdrop-blur-sm"
              style={{ borderColor: context.color, color: context.color, backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              selective
            </span>
          ) : null}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/88 via-black/38 to-transparent px-5 pb-5 pt-16 md:px-6 md:pb-6">
            <p className="text-base font-semibold leading-tight text-[color:var(--color-foreground)] [text-shadow:0_1px_12px_rgb(0_0_0_/_0.9)]">{context.name}</p>
            <p className="mt-1.5 max-w-[30ch] text-sm leading-snug text-[color:var(--color-foreground)]/88 [text-shadow:0_1px_12px_rgb(0_0_0_/_0.9)]">{context.description}</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col border-t border-[color:var(--color-hairline)] pt-5">
          <div className="grid grid-cols-2 divide-x divide-[color:var(--color-hairline)] text-sm leading-snug">
            <div className="pr-4">
              <span className="label-tech">{labels.accessLabel}</span>
              <p className="mt-2 font-medium">{context.access}</p>
              {context.key === "guest" ? <GuestAccessToggle color={context.color} /> : null}
            </div>
            <div className="pl-4"><span className="label-tech">{labels.rulesLabel}</span><p className="mt-2 text-[color:var(--color-foreground)]/82">{context.rules}</p></div>
          </div>
          <div ref={rulesRef} className={`border-t border-[color:var(--color-hairline)] pt-6 ${compact ? "mt-6" : "mt-auto"}`}>
            <div className="flex items-center justify-between gap-3">
              <p className="label-tech">{controls.settings}</p>
              <span className="font-mono text-[9px] tracking-[0.12em]" style={{ color: context.color }}>{String(displayedCount).padStart(2, "0")} / 06</span>
            </div>
            <div className="mt-3 grid grid-cols-2 border-y border-[color:var(--color-hairline)]">
              {RULE_KEYS.map((rule) => {
                const enabled = ruleState[rule];
                const isPreviewing = previewRule === rule;
                const displayedEnabled = isPreviewing ? !enabled : enabled;
                return <button key={rule} type="button" onClick={() => onToggle(rule)} aria-pressed={displayedEnabled} className={`focus-instrument flex min-h-10 items-center justify-between gap-2 border-b border-[color:var(--color-hairline)] px-1.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] transition-colors duration-500 hover:bg-white/[.04] last:border-b-0 even:border-l even:pl-3 odd:pr-3 ${isPreviewing ? "motion-safe:animate-pulse" : ""}`} style={{ color: displayedEnabled ? context.color : "var(--color-muted-foreground)", backgroundColor: displayedEnabled ? `color-mix(in srgb, ${context.color} 7%, transparent)` : undefined }}>
                  <span className={displayedEnabled ? "text-[color:var(--color-foreground)]" : undefined}>{controls[rule]}</span>
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full transition-transform duration-500" style={{ backgroundColor: displayedEnabled ? context.color : "var(--color-hairline)", transform: displayedEnabled ? "scale(1)" : "scale(.75)" }} />
                </button>;
              })}
            </div>
          </div>
        </div>
      </div>
    </Rise>
  );
}

function GuestAccessToggle({ color }: { color: string }) {
  const [on, setOn] = useState(true);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="24h"
      onClick={() => setOn((v) => !v)}
      className="focus-instrument relative mt-3 flex h-[1.225rem] w-[2.45rem] shrink-0 items-center rounded-full border transition-colors duration-300"
      style={{
        borderColor: color,
        backgroundColor: on ? `color-mix(in srgb, ${color} 22%, transparent)` : "transparent",
      }}
    >
      <motion.span
        aria-hidden
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="absolute h-[0.875rem] w-[0.875rem] rounded-full"
        style={{ backgroundColor: color, left: on ? "calc(100% - 1.05rem)" : "0.175rem" }}
      />
    </button>
  );
}
