import { MediaSlot } from "../MediaSlot";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";

const IDS = ["A490 3880", "B117 4021", "C905 7714"];

const TODAY = [
  "способом найти человека",
  "способом связаться",
  "доступом к личному пространству",
];

const STEPS = [
  { n: "01", t: "Найти человека", d: "Поиск по PAGER ID — без номера телефона." },
  { n: "02", t: "Выбрать профиль", d: "Пользователь решает, какое пространство открыть." },
  { n: "03", t: "Правила", d: "Формат связи и уровень доступа задаются заранее." },
];

export function PagerId() {
  return (
    <Section id="chapter-03" className="py-[var(--chapter-space)]">
      <ChapterHead index="03" title="PAGER ID" meta="IDENTITY OBJECT" />

      <div className="shell mt-16 md:mt-24">
        <div className="grid-12 gap-y-10">
          <div className="col-span-6 md:col-span-7">
            <Rise>
              <p className="label-tech mb-6 text-[color:var(--color-foreground)]">
                Новый способ находить людей
              </p>
            </Rise>
            <h2 className="display-lg">
              <MaskLine>НЕ НОМЕР.</MaskLine>
              <MaskLine delay={0.07}>НЕ НИКНЕЙМ.</MaskLine>
              <MaskLine delay={0.14}>PAGER ID</MaskLine>
            </h2>
            <Rise delay={0.1}>
              <p className="lead mt-8 max-w-[46ch]">
                Новый способ начать связь без немедленного доступа к вашему личному пространству.
              </p>
            </Rise>
          </div>

          <div className="col-span-6 md:col-span-4 md:col-start-9">
            <Rise>
              <div className="rule-t pt-4">
                <p className="label-tech mb-5">Сегодня номер телефона — одновременно:</p>
                <ul>
                  {TODAY.map((t, i) => (
                    <li key={t} className="rule-b flex gap-4 py-3 last:border-0">
                      <span className="label-tech pt-1">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-sm leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Rise>
          </div>
        </div>

        {/* The supplied ID object carries the chapter */}
        <div className="mt-16 md:mt-24">
          <p className="label-tech rule-t pt-4">PAGER ID / OBJECT</p>
          <MediaSlot
            name="pager_id_variation_002.jpg"
            alt="PAGER ID"
            label="PAGER ID / OBJECT"
            className="mt-6 w-full"
          />
        </div>

        <div className="mt-16 grid-12 gap-y-6 md:mt-24">
          <div className="col-span-6 md:col-span-8">
            <div className="rule-t rule-b divide-y divide-[color:var(--color-hairline)]">
              {IDS.map((id, i) => (
                <Rise key={id} delay={i * 0.06}>
                  <div className="group flex items-center justify-between gap-4 py-6 transition-colors duration-200 hover:bg-[color:var(--color-accent)]">
                    <div className="flex min-w-0 items-center gap-5">
                      <span
                        aria-hidden
                        className="h-8 w-px shrink-0"
                        style={{
                          backgroundColor:
                            i === 0 ? "var(--personal)" : i === 1 ? "var(--work)" : "var(--guest)",
                        }}
                      />
                      <span className="truncate font-mono text-[clamp(1.5rem,4vw,2.75rem)] font-semibold tracking-[0.08em]">
                        {id}
                      </span>
                    </div>
                    <span className="label-tech shrink-0 transition-transform duration-200 group-hover:-translate-x-1">
                      ЗАПРОС НА СВЯЗЬ →
                    </span>
                  </div>
                </Rise>
              ))}
            </div>
            <p className="label-tech mt-4">ID FORMAT / XXXX XXXX</p>
          </div>
        </div>


        <Rise className="mt-16">
          <p className="max-w-[62ch] text-[clamp(1.05rem,1.6vw,1.45rem)] leading-[1.4] tracking-[-0.02em]">
            PAGER ID позволяет найти человека и отправить запрос на связь, а пользователь сам
            выбирает, какой профиль открыть и какие условия общения установить.
          </p>
        </Rise>

        <ol className="mt-14 grid grid-cols-1 gap-px bg-[color:var(--color-hairline)] md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.n} className="bg-[color:var(--color-background)] p-6">
              <Rise delay={i * 0.06}>
                <span className="label-tech">{s.n}</span>
                <h3 className="mt-6 text-xl font-bold tracking-[-0.02em]">{s.t}</h3>
                <p className="lead mt-2 text-sm">{s.d}</p>
              </Rise>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
