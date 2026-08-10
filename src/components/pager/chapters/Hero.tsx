import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MediaSlot } from "../MediaSlot";
import { MaskLine } from "../primitives";
import { useT } from "@/i18n";

const MEDIA = [
  "Hero_storyscroll_img_RU_ENG_1.jpg",
  "Hero_storyscroll_img_RU_2.jpg",
  "Hero_storyscroll_img_RU_3.jpg",
];
const COLORS = ["var(--guest)", "var(--work)", "var(--personal)"];

type FrameData = {
  n: string;
  tag: string;
  title: string;
  body: string;
  media: string;
  color: string;
};

function useFrames(): FrameData[] {
  const t = useT();
  return t.hero.frames.map((f, i) => ({
    n: String(i + 1).padStart(2, "0"),
    tag: f.tag,
    title: f.title,
    body: f.body,
    media: MEDIA[i]!,
    color: COLORS[i]!,
  }));
}

export function Hero() {
  return (
    <>
      <Manifesto />
      <StoryScroll />
      <Launch />
    </>
  );
}

function Manifesto() {
  const t = useT();
  return (
    <div className="shell pt-28 pb-[clamp(4rem,10vw,9rem)] md:pt-40">
      <div className="grid-12 items-end">
        <div className="col-span-6 md:col-span-8">
          <MaskLine className="label-tech mb-8 md:mb-12" as="div">
            <span className="label-tech text-[color:var(--color-foreground)]">
              {t.hero.kicker}
            </span>
          </MaskLine>
          <h1 className="display-xl">
            {t.hero.h1.map((line, i) => (
              <MaskLine
                key={line}
                delay={0.05 + i * 0.07}
                className={i === 1 ? "md:pl-[6%]" : i === 2 ? "md:pl-[12%]" : ""}
              >
                {line}
              </MaskLine>
            ))}
          </h1>
        </div>
        <div className="col-span-6 md:col-span-4 md:pb-3">
          <div className="rule-t pt-4">
            <p className="lead max-w-sm">{t.hero.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#chapter-08"
                className="focus-instrument bg-[color:var(--color-foreground)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-background)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                {t.hero.ctaPrimary}
              </a>
              <a
                href="#chapter-03"
                className="focus-instrument border border-[color:var(--color-border)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 hover:bg-[color:var(--color-accent)]"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const frames = useFrames();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative" style={{ height: reduced ? "auto" : "300vh" }}>
      <div
        className={reduced ? "" : "sticky top-0 h-screen overflow-hidden"}
        style={{ minHeight: reduced ? undefined : "40rem" }}
      >
        {reduced ? (
          <div className="shell space-y-16 py-16">
            {frames.map((f) => (
              <StaticFrame key={f.n} frame={f} />
            ))}
          </div>
        ) : (
          <div className="relative h-full">
            {frames.map((f, i) => (
              <Frame
                key={f.n}
                frame={f}
                index={i}
                count={frames.length}
                progress={scrollYProgress}
              />
            ))}
            <Progress progress={scrollYProgress} />
          </div>
        )}
      </div>
    </div>
  );
}

function StaticFrame({ frame }: { frame: FrameData }) {
  return (
    <div className="grid-12 items-center gap-y-6">
      <div className="col-span-6 md:col-span-7">
        <MediaSlot name={frame.media} alt={frame.title} label={`FRAME ${frame.n}`} />
      </div>
      <div className="col-span-6 md:col-span-5 md:col-start-8">
        <FrameText frame={frame} />
      </div>
    </div>
  );
}

function FrameText({ frame }: { frame: FrameData }) {
  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <span aria-hidden className="h-2 w-2" style={{ backgroundColor: frame.color }} />
        <span className="label-tech text-[color:var(--color-foreground)]">
          FRAME {frame.n} / {frame.tag}
        </span>
      </div>
      <h2 className="display-md max-w-[20ch] uppercase">{frame.title}</h2>
      <p className="lead mt-6 max-w-[42ch]">{frame.body}</p>
    </>
  );
}

function Frame({
  frame,
  index,
  count,
  progress,
}: {
  frame: FrameData;
  index: number;
  count: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const pad = 0.045;
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  const start = index / count;
  const end = (index + 1) / count;
  const a = clamp(start - pad);
  const b = clamp(start + pad);
  const c = clamp(end - pad);
  const d = clamp(end + pad);

  const opacity = useTransform(
    progress,
    [a, b, c, d],
    index === 0 ? [1, 1, 1, 0] : index === count - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(progress, [a, d], [40, -40]);
  const mediaY = useTransform(progress, [a, d], [70, -70]);

  return (
    <motion.div className="absolute inset-0 flex items-center" style={{ opacity }}>
      <div className="shell grid-12 w-full items-center gap-y-8">
        <motion.div className="col-span-6 md:col-span-7" style={{ y: mediaY }}>
          <MediaSlot
            name={frame.media}
            alt={frame.title}
            label={`FRAME ${frame.n}`}
            priority={index === 0}
            maxHeight="74vh"
            className="md:mx-0"
          />
        </motion.div>
        <motion.div className="col-span-6 md:col-span-5 md:col-start-8" style={{ y }}>
          <FrameText frame={frame} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function Progress({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0">
      <div className="shell">
        <div className="flex items-center justify-between pb-4">
          <span className="label-tech">HERO / STORYSCROLL</span>
          <span className="label-tech">01</span>
        </div>
        <div className="h-px w-full bg-[color:var(--color-hairline)]">
          <motion.div
            className="h-px bg-[color:var(--color-foreground)]"
            style={{ scaleX, transformOrigin: "left" }}
          />
        </div>
      </div>
    </div>
  );
}

function Launch() {
  const t = useT();
  return (
    <div className="shell pt-16 pb-[var(--chapter-space)]">
      <div className="grid-12 rule-t pt-4">
        <span className="label-tech col-span-6 md:col-span-4">{t.hero.launch.label}</span>
        <span className="label-tech col-span-6 md:col-span-4 text-[color:var(--color-foreground)]">
          {t.hero.launch.beta}
        </span>
        <span className="label-tech col-span-6 md:col-span-4 md:text-right">
          {t.hero.launch.stores}
        </span>
      </div>
    </div>
  );
}
