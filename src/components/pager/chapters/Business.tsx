import { ChapterHead, MaskLine, Rise, Section } from "../primitives";

const TIERS = [
  {
    n: "01",
    title: "Premium",
    items: ["уникальные PAGER ID", "расширенные профили", "дополнительные настройки", "управление связями"],
    color: "var(--personal)",
  },
  {
    n: "02",
    title: "Business",
    items: ["корпоративные профили", "рабочие пространства", "связь без раскрытия номеров", "API-интеграции"],
    color: "var(--work)",
  },
];

const LAYERS = [
  {
    n: "03",
    kicker: "Premium PAGER ID",
    title: "Идентификатор поколения",
    body: "Короткий и запоминающийся ID для личного и профессионального использования.",
    color: "var(--alter)",
  },
  {
    n: "04",
    kicker: "Advanced capabilities",
    title: "Контроль над связью",
    body: "Расширенные правила общения, доступа и представления профиля.",
    color: "var(--guest)",
  },
  {
    n: "05",
    kicker: "B2B / API",
    title: "Инфраструктура",
    body: "Компании смогут создавать безопасные каналы связи с клиентами без раскрытия личных контактов.",
    color: "var(--work)",
  },
];

export function Business() {
  return (
    <Section id="chapter-07" className="py-[var(--chapter-space)]">
      <ChapterHead index="07" title="БИЗНЕС-СЛОЙ" meta="MONETIZATION MODEL" />

      <div className="shell mt-16 md:mt-24">
        <div className="grid-12 gap-y-8">
          <h2 className="display-md col-span-6 md:col-span-6">
            <MaskLine>Потенциал</MaskLine>
            <MaskLine delay={0.07}>монетизации</MaskLine>
          </h2>
          <Rise className="col-span-6 md:col-span-5 md:col-start-8">
            <p className="lead rule-t pt-4">
              От нового способа общения к новой коммуникационной платформе.
            </p>
          </Rise>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px bg-[color:var(--color-hairline)] md:mt-24 md:grid-cols-2">
          {TIERS.map((t, i) => (
            <div key={t.title} className="bg-[color:var(--color-background)] p-6 md:p-8">
              <Rise delay={i * 0.06}>
                <div className="flex items-center justify-between">
                  <span className="label-tech">{t.n}</span>
                  <span aria-hidden className="h-2 w-2" style={{ backgroundColor: t.color }} />
                </div>
                <h3 className="mt-8 text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.035em]">
                  {t.title}
                </h3>
                <ul className="mt-6">
                  {t.items.map((it) => (
                    <li key={it} className="rule-b py-3 text-sm last:border-0">
                      {it}
                    </li>
                  ))}
                </ul>
              </Rise>
            </div>
          ))}
        </div>

        <div className="mt-px grid grid-cols-1 gap-px bg-[color:var(--color-hairline)] md:grid-cols-3">
          {LAYERS.map((l, i) => (
            <div key={l.n} className="bg-[color:var(--color-background)] p-6 md:p-8">
              <Rise delay={i * 0.05}>
                <div className="flex items-baseline justify-between">
                  <span className="label-tech">{l.n}</span>
                  <span className="label-tech" style={{ color: l.color }}>
                    {l.kicker}
                  </span>
                </div>
                <h3 className="mt-10 text-xl font-bold tracking-[-0.025em]">{l.title}</h3>
                <p className="lead mt-3 text-sm">{l.body}</p>
              </Rise>
            </div>
          ))}
        </div>

        <Rise className="mt-16">
          <p className="max-w-[64ch] text-[clamp(1.1rem,1.8vw,1.6rem)] leading-[1.35] tracking-[-0.025em]">
            Сегодня PAGER меняет личное общение. В будущем эта же модель может стать инфраструктурой
            управления цифровыми связями между людьми и организациями.
          </p>
        </Rise>
      </div>
    </Section>
  );
}
