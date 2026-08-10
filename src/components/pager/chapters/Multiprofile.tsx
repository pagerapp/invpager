import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MediaSlot } from "../MediaSlot";
import { ChapterHead, MaskLine, Rise, Section } from "../primitives";
import { useT } from "@/i18n";

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
  const t = useT();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["4%", "-8%"]);

  return (
    <Section id="chapter-04" className="py-[var(--chapter-space)]">
      <ChapterHead index="04" title={t.multiprofile.head.title} meta={t.multiprofile.head.meta} />

      <div className="shell mt-16 md:mt-24">
        <div className="grid-12 gap-y-8">
          <h2 className="display-lg col-span-6 md:col-span-8">
            {t.multiprofile.h.map((line, i) => (
              <MaskLine key={line} delay={i * 0.07}>
                {line}
              </MaskLine>
            ))}
          </h2>
          <Rise className="col-span-6 md:col-span-4">
            <div className="rule-t pt-4">
              <p className="text-lg tracking-[-0.02em]">{t.multiprofile.quote}</p>
              <p className="lead mt-5">{t.multiprofile.body}</p>
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
              alt={`${t.multiprofile.altDesktop} ${i + 1}`}
              label={`MPF DESKTOP ${i + 1}`}
              className="w-[52vw] max-w-[56rem]"
            />
          ))}
        </motion.div>
      </div>

      {/* Mobile screens — mobile breakpoint only */}
      <div className="mt-16 md:hidden">
        <p className="shell label-tech mb-4">{t.multiprofile.mobileLabel}</p>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,4rem)] pb-2">
          {MOBILE.map((m, i) => (
            <MediaSlot
              key={m}
              name={m}
              alt={`${t.multiprofile.altMobile} ${i + 1}`}
              label={`M${i + 1}`}
              className="w-[74vw] shrink-0 snap-center"
            />
          ))}
        </div>
      </div>

      <div className="shell mt-16 md:mt-24">
        <ol className="grid grid-cols-1 gap-px bg-[color:var(--color-hairline)] md:grid-cols-4">
          {t.multiprofile.beats.map((b, i) => (
            <li key={b.label} className="bg-[color:var(--color-background)] p-6">
              <Rise delay={i * 0.05}>
                <div className="flex items-baseline justify-between">
                  <span className="label-tech">{String(i + 1).padStart(2, "0")}</span>
                  <span className="label-tech">{b.label}</span>
                </div>
                <p className="mt-10 text-lg leading-snug tracking-[-0.02em]">{b.text}</p>
              </Rise>
            </li>
          ))}
        </ol>

        <div className="mt-20 md:mt-28">
          <MaskLine as="div" className="display-lg">
            {t.multiprofile.outro[0]}
          </MaskLine>
          <MaskLine as="div" delay={0.08} className="display-lg text-[color:var(--personal)]">
            {t.multiprofile.outro[1]}
          </MaskLine>
        </div>
      </div>
    </Section>
  );
}
