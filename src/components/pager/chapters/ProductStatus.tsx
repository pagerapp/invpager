import { ChapterHead, MaskLine, Rise, Section } from "../primitives";

const BUILT = [
  "Регистрация",
  "PAGER ID",
  "Поиск по ID",
  "Запросы на контакт",
  "1:1-диалоги",
];

const CORE = [
  "Базовый профиль",
  "Контекстные профили",
  "Управление способами общения",
  "Гостевой профиль",
  "Временный доступ",
];

const NEXT = [
  "Аудио- и видеозвонки",
  "Расширение модели профилей",
  "Дополнительные настройки приватности",
];

export function ProductStatus() {
  return (
    <Section id="chapter-06" light className="py-[var(--chapter-space)]">
      <ChapterHead index="06" title="СТАТУС ПРОДУКТА" meta="PRIVATE BETA / Q3 2026 / ANDROID, IOS" />

      <div className="shell mt-16 md:mt-24">
        <div className="grid-12 gap-y-8">
          <h2 className="display-md col-span-6 md:col-span-7">
            <MaskLine>Основа новой модели</MaskLine>
            <MaskLine delay={0.07}>общения уже создана</MaskLine>
          </h2>
          <Rise className="col-span-6 md:col-span-4 md:col-start-9">
            <p className="lead rule-t pt-4">
              PAGER уже реализует ключевую идею продукта: связь начинается не только с сообщения, а
              с выбора профиля, правил и формата взаимодействия.
            </p>
          </Rise>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px bg-[color:var(--color-hairline)] md:mt-24 md:grid-cols-3">
          <Column title="Реализовано" index="A" items={BUILT} state="done" />
          <Column title="Ключевые механики" index="B" items={CORE} state="core" />
          <Column title="Следующие шаги" index="C" items={NEXT} state="next" />
        </div>
      </div>
    </Section>
  );
}

function Column({
  title,
  index,
  items,
  state,
}: {
  title: string;
  index: string;
  items: string[];
  state: "done" | "core" | "next";
}) {
  return (
    <div className="bg-[color:var(--color-background)] p-6">
      <Rise>
        <div className="flex items-baseline justify-between">
          <span className="label-tech">{index}</span>
          <span className="label-tech">
            {state === "done" ? "BUILT" : state === "core" ? "CORE" : "NEXT"}
          </span>
        </div>
        <h3 className="mt-8 text-xl font-bold tracking-[-0.025em]">{title}</h3>
        <ul className="mt-6">
          {items.map((it) => (
            <li key={it} className="rule-b flex items-center gap-3 py-3 last:border-0">
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0"
                style={{
                  backgroundColor:
                    state === "done"
                      ? "var(--personal)"
                      : state === "core"
                        ? "var(--color-foreground)"
                        : "transparent",
                  border: state === "next" ? "1px solid var(--color-foreground)" : "none",
                }}
              />
              <span className="text-sm tracking-[-0.01em]">{it}</span>
            </li>
          ))}
        </ul>
      </Rise>
    </div>
  );
}
