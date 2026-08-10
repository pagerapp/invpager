import { MediaSlot } from "../MediaSlot";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";

const STAGES = [
  { n: "01", name: "E-mail", role: "Передача информации", q: "Как отправить сообщение?", media: "1_email.png" },
  { n: "02", name: "SMS", role: "Доступная связь", q: "Как связаться быстрее?", media: "2_sms.png" },
  { n: "03", name: "Чаты, голос, видео", role: "Мгновенное общение", q: "Как общаться в реальном времени?", media: "3_chat.png" },
  { n: "04", name: "Мультипрофиль", role: "Управляемое общение", q: "Как выбирать формат связи?", media: "4_pager.png" },
];

const PROGRESSION = ["Передать", "Соединять", "Общаться", "Управлять"];

export function Evolution() {
  return (
    <Section id="chapter-02" light className="py-[var(--chapter-space)]">
      <ChapterHead index="02" title="ЭВОЛЮЦИЯ" meta="DIGITAL COMMUNICATION / 1971—2026" />

      <div className="shell mt-16 md:mt-24">
        <div className="grid-12 items-end gap-y-8">
          <h2 className="display-lg col-span-6 md:col-span-7">
            <MaskLine>НЕ СКОРОСТЬ.</MaskLine>
            <MaskLine delay={0.08}>ВЫБОР!</MaskLine>
          </h2>
          <Rise className="col-span-6 md:col-span-4 md:col-start-9">
            <p className="lead rule-t pt-4">
              Цифровое общение сделало нас доступными. Пора выбирать, как именно мы общаемся. Мы
              добавляем новый уровень коммуникации — разные профили, персональные правила и
              возможность управлять каждой связью.
            </p>
          </Rise>
        </div>

        <ol className="mt-20 grid grid-cols-1 gap-px bg-[color:var(--color-hairline)] md:mt-28 md:grid-cols-4">
          {STAGES.map((s, i) => (
            <li key={s.n} className="bg-[color:var(--color-background)]">
              <Rise delay={i * 0.06} className="group flex h-full flex-col p-5 md:p-6">
                <div className="flex items-baseline justify-between">
                  <span className="label-tech">{s.n}</span>
                  {i === STAGES.length - 1 ? (
                    <span className="label-tech text-[color:var(--color-foreground)]">PAGER</span>
                  ) : null}
                </div>
                <MediaSlot
                  name={s.media}
                  alt={s.name}
                  ratio="1 / 1"
                  fit="contain"
                  label={`STAGE ${s.n}`}
                  className="my-6 bg-transparent"
                />
                <h3 className="text-lg font-bold tracking-[-0.02em]">{s.name}</h3>
                <p className="mt-1 text-sm text-[color:var(--color-foreground)]/70">{s.role}</p>
                <p className="label-tech mt-6 normal-case tracking-[0.02em]">{s.q}</p>
              </Rise>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-2 rule-t pt-5">
          {PROGRESSION.map((p, i) => (
            <span key={p} className="flex items-center gap-4">
              <span
                className={`font-mono text-sm uppercase tracking-[0.1em] ${
                  i === PROGRESSION.length - 1
                    ? "text-[color:var(--color-foreground)]"
                    : "text-[color:var(--color-muted-foreground)]"
                }`}
              >
                {p}
              </span>
              {i < PROGRESSION.length - 1 ? (
                <span aria-hidden className="label-tech">
                  →
                </span>
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
