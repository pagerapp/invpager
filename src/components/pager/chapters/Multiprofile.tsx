import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MediaSlot } from "../MediaSlot";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";

const BEATS = [
  { n: "01", label: "ПРОБЛЕМА", text: "Одно цифровое представление для всех отношений." },
  { n: "02", label: "ОСОЗНАНИЕ", text: "Цифровой профиль не отражает всего человека." },
  { n: "03", label: "РЕШЕНИЕ", text: "PAGER создает разные пространства общения." },
  { n: "04", label: "МАСШТАБ", text: "Один человек. Несколько способов быть собой." },
];

const DESKTOP = ["mpf_desktop_1.png", "mpf_desktop_2.png", "mpf_desktop_3.png", "mpf_desktop_4.png"];
const MOBILE = [
  "Multiprofiles_mobile_img_1.png",
  "Multiprofiles_mobile_img_2.png",
  "Multiprofiles_mobile_img_3.png",
  "Multiprofiles_mobile_img_.png",
];

export function Multiprofile() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["4%", "-8%"]);

  return (
    <Section id="chapter-04" className="py-[var(--chapter-space)]">
      <ChapterHead index="04" title="МУЛЬТИПРОФИЛЬ" meta="ONE ACCOUNT / MANY SPACES" />

      <div className="shell mt-16 md:mt-24">
        <div className="grid-12 gap-y-8">
          <h2 className="display-lg col-span-6 md:col-span-8">
            <MaskLine>ОДИН ЧЕЛОВЕК.</MaskLine>
            <MaskLine delay={0.07}>НЕСКОЛЬКО</MaskLine>
            <MaskLine delay={0.14}>СПОСОБОВ БЫТЬ СОБОЙ.</MaskLine>
          </h2>
          <Rise className="col-span-6 md:col-span-4">
            <div className="rule-t pt-4">
              <p className="text-lg tracking-[-0.02em]">Я остаюсь собой, но открываюсь по-разному.</p>
              <p className="lead mt-5">
                Мультипрофиль меняет привычную модель цифрового общения. Один человек может
                создавать разные пространства общения внутри одного аккаунта, сохраняя контроль над
                тем, как он представлен и как происходит каждое взаимодействие.
              </p>
            </div>
          </Rise>
        </div>
      </div>

      {/* Desktop screens — desktop breakpoint only */}
      <div ref={ref} className="mt-20 hidden overflow-hidden md:mt-28 md:block">
        <motion.div className="flex w-max gap-4 px-[clamp(1.25rem,4vw,4rem)]" style={{ x }}>
          {DESKTOP.map((m, i) => (
            <MediaSlot
              key={m}
              name={m}
              alt={`Мультипрофиль — экран ${i + 1}`}
              label={`MPF DESKTOP ${i + 1}`}
              className="w-[52vw] max-w-[56rem]"
            />
          ))}
        </motion.div>
      </div>

      {/* Mobile screens — mobile breakpoint only */}
      <div className="mt-16 md:hidden">
        <p className="shell label-tech mb-4">MOBILE / ПРОФИЛИ</p>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,4rem)] pb-2">
          {MOBILE.map((m, i) => (
            <MediaSlot
              key={m}
              name={m}
              alt={`Мультипрофиль мобильный экран ${i + 1}`}
              label={`M${i + 1}`}
              className="w-[74vw] shrink-0 snap-center"
            />
          ))}
        </div>
      </div>


      <div className="shell mt-16 md:mt-24">
        <ol className="grid grid-cols-1 gap-px bg-[color:var(--color-hairline)] md:grid-cols-4">
          {BEATS.map((b, i) => (
            <li key={b.n} className="bg-[color:var(--color-background)] p-6">
              <Rise delay={i * 0.05}>
                <div className="flex items-baseline justify-between">
                  <span className="label-tech">{b.n}</span>
                  <span className="label-tech">{b.label}</span>
                </div>
                <p className="mt-10 text-lg leading-snug tracking-[-0.02em]">{b.text}</p>
              </Rise>
            </li>
          ))}
        </ol>

        <div className="mt-20 grid-12 items-center gap-y-10 md:mt-28">
          <div className="col-span-6 md:col-span-5">
            <p className="label-tech mb-6">MOBILE / ПРОФИЛИ</p>
            <div className="grid grid-cols-4 gap-3">
              {MOBILE.map((m, i) => (
                <MediaSlot
                  key={m}
                  name={m}
                  alt={`Мультипрофиль мобильный экран ${i + 1}`}
                  label={`M${i + 1}`}
                  className="w-full"
                />
              ))}
            </div>
          </div>
          <div className="col-span-6 md:col-span-6 md:col-start-7">
            <MaskLine as="div" className="display-lg">
              Разный.
            </MaskLine>
            <MaskLine as="div" delay={0.08} className="display-lg text-[color:var(--personal)]">
              Но всегда я!
            </MaskLine>
          </div>
        </div>
      </div>
    </Section>
  );
}
