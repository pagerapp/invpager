import { MediaSlot } from "../MediaSlot";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";
import { useT } from "@/i18n";

const KEYS = ["personal", "work", "guest", "alter"];
const COLORS = ["var(--personal)", "var(--work)", "var(--guest)", "var(--alter)"];
const MEDIA = [
  "Personal_profile.png",
  "Work_profile.png",
  "Guest_profile.png",
  "Alter_ego_profile.png",
];

export function ContactContext() {
  const t = useT();

  const contexts = t.contact.contexts.map((c, i) => ({
    ...c,
    key: KEYS[i]!,
    color: COLORS[i]!,
    media: MEDIA[i]!,
  }));

  return (
    <Section id="chapter-05" className="py-[var(--chapter-space)]">
      <ChapterHead index="05" title={t.contact.head.title} meta={t.contact.head.meta} />

      <div className="shell mt-16 md:mt-24">
        <div className="grid-12 gap-y-8">
          <h2 className="display-lg col-span-6 md:col-span-7">
            {t.contact.h.map((line, i) => (
              <MaskLine key={line} delay={i * 0.07}>
                {line}
              </MaskLine>
            ))}
          </h2>
          <Rise className="col-span-6 md:col-span-4 md:col-start-9">
            <p className="lead rule-t pt-4">{t.contact.lead}</p>
          </Rise>
        </div>

        <div
          aria-label={t.contact.tablistAria}
          className="mt-14 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-20 md:grid md:grid-cols-4 md:gap-px md:overflow-visible md:bg-[color:var(--color-hairline)] md:pb-0"
        >
          {contexts.map((context, index) => (
            <ProfileCard key={context.key} context={context} index={index} labels={t.contact} />
          ))}
        </div>

        <Rise className="mt-10 max-w-[62ch] md:mt-14">
          <p className="lead">{t.contact.summary}</p>
        </Rise>
      </div>
    </Section>
  );
}

function ProfileCard({
  context,
  index,
  labels,
}: {
  context: { key: string; label: string; access: string; rules: string; color: string; media: string };
  index: number;
  labels: ReturnType<typeof useT>["contact"];
}) {
  return (
    <Rise
      delay={index * 0.07}
      className="group relative flex min-h-[34rem] min-w-[84vw] snap-start flex-col overflow-hidden bg-[color:var(--color-background)] p-5 transition-transform duration-300 hover:-translate-y-1 md:min-w-0 md:p-6"
      style={{ borderTop: `2px solid ${context.color}` }}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="label-tech">{String(index + 1).padStart(2, "0")} / 04</span>
        <span className="label-tech" style={{ color: context.color }}>{context.label.toUpperCase()}</span>
      </div>

      <MediaSlot
        name={context.media}
        alt={`${labels.profileAlt}: ${context.label}`}
        label={context.label.toUpperCase()}
        className="mt-7 h-[17rem] w-full [&>div:first-child]:opacity-0"
      />

      <div className="mt-auto border-t border-[color:var(--color-hairline)] pt-5">
        <h3 className="text-[clamp(1.7rem,2.4vw,2.25rem)] font-bold uppercase leading-[.95] tracking-[-0.045em]">
          {context.label}
        </h3>
        <div className="mt-5 grid grid-cols-2 gap-4 text-sm leading-snug">
          <div>
            <span className="label-tech">{labels.accessLabel}</span>
            <p className="mt-2">{context.access}</p>
          </div>
          <div>
            <span className="label-tech">{labels.rulesLabel}</span>
            <p className="mt-2">{context.rules}</p>
          </div>
        </div>
      </div>
    </Rise>
  );
}
