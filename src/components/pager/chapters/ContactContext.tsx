import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { MediaSlot } from "../MediaSlot";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";

const CONTEXTS = [
  {
    key: "personal",
    label: "Личное",
    color: "var(--personal)",
    media: "Hero_man_personal_1x.png",
    access: "Полный доступ",
    rules: "Звонки, голос, медиа",
  },
  {
    key: "work",
    label: "Работа",
    color: "var(--work)",
    media: "Hero_man_work_3x.png",
    access: "Рабочие часы",
    rules: "Текст, файлы, звонки по согласованию",
  },
  {
    key: "guest",
    label: "Гостевое",
    color: "var(--guest)",
    media: "Hero_man_guest_4x.png",
    access: "Временный доступ",
    rules: "Только текст, ограниченный период",
  },
  {
    key: "alter",
    label: "Особый контекст",
    color: "var(--alter)",
    media: "Hero_man_alter_ego_5x.png",
    access: "По запросу",
    rules: "Отдельное пространство и правила",
  },
];

export function ContactContext() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const ctx = CONTEXTS[active]!;

  return (
    <Section id="chapter-05" className="py-[var(--chapter-space)]">
      <ChapterHead index="05" title="КОНТАКТ И КОНТЕКСТ" meta="ONE IDENTITY / MANY STATES" />

      <div className="shell mt-16 md:mt-24">
        <div className="grid-12 gap-y-8">
          <h2 className="display-lg col-span-6 md:col-span-7">
            <MaskLine>ОДИН ЧЕЛОВЕК.</MaskLine>
            <MaskLine delay={0.07}>РАЗНЫЕ СПОСОБЫ ОБЩЕНИЯ.</MaskLine>
          </h2>
          <Rise className="col-span-6 md:col-span-4 md:col-start-9">
            <p className="lead rule-t pt-4">
              Один человек может быть представлен по-разному — в зависимости от того, кто находится
              по другую сторону связи.
            </p>
          </Rise>
        </div>

        <div className="mt-16 grid-12 items-start gap-y-10 md:mt-24">
          {/* Identity stays constant, context changes */}
          <div className="col-span-6 md:col-span-5">
            <div
              className="relative rule-t rule-b"
              style={{ borderTopColor: ctx.color, transition: "border-color 400ms" }}
            >
              <div className="relative aspect-[4/5]">
                <AnimatePresence initial={false} mode="sync">
                  <motion.div
                    key={ctx.key}
                    className="absolute inset-0"
                    initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <MediaSlot
                      name={ctx.media}
                      alt={`Профиль: ${ctx.label}`}
                      fit="contain"
                      ratio="4 / 5"
                      label={ctx.label.toUpperCase()}
                      className="h-full bg-transparent"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="label-tech">PAGER ID / A490 3880</span>
                <span className="label-tech" style={{ color: ctx.color }}>
                  {ctx.label.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-6 md:col-span-6 md:col-start-7">
            <div role="tablist" aria-label="Контексты общения" className="rule-t">
              {CONTEXTS.map((c, i) => {
                const on = i === active;
                return (
                  <button
                    key={c.key}
                    role="tab"
                    aria-selected={on}
                    id={`ctx-tab-${c.key}`}
                    aria-controls="ctx-panel"
                    onClick={() => setActive(i)}
                    className="focus-instrument rule-b group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200 hover:bg-[color:var(--color-accent)]"
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <span
                        aria-hidden
                        className="h-2 w-2 shrink-0 transition-opacity duration-200"
                        style={{ backgroundColor: c.color, opacity: on ? 1 : 0.3 }}
                      />
                      <span
                        className={`truncate text-[clamp(1.15rem,2.2vw,1.8rem)] tracking-[-0.03em] transition-opacity duration-200 ${
                          on ? "font-bold opacity-100" : "font-medium opacity-45"
                        }`}
                      >
                        {c.label}
                      </span>
                    </span>
                    <span className="label-tech shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </div>

            <div
              id="ctx-panel"
              role="tabpanel"
              aria-labelledby={`ctx-tab-${ctx.key}`}
              className="mt-8 grid grid-cols-2 gap-px bg-[color:var(--color-hairline)]"
            >
              <div className="bg-[color:var(--color-background)] p-5">
                <span className="label-tech">ДОСТУП</span>
                <p className="mt-4 text-base tracking-[-0.02em]">{ctx.access}</p>
              </div>
              <div className="bg-[color:var(--color-background)] p-5">
                <span className="label-tech">ПРАВИЛА</span>
                <p className="mt-4 text-base tracking-[-0.02em]">{ctx.rules}</p>
              </div>
            </div>

            <p className="lead mt-8 max-w-[48ch]">
              PAGER связывает контакт и профиль: вы выбираете, какую версию себя показать, какие
              правила установить и какой уровень доступа открыть.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
