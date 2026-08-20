import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";

/** Typographic mask reveal: the line is clipped upward, never a generic fade. */
export function MaskLine({
  children,
  delay = 0,
  className = "",
  as: As = "span",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "span" | "div";
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0 });
  return (
    <As ref={ref as never} className={`mask-line ${className}`}>
      <motion.span
        className="block"
        initial={false}
        animate={{ y: reduced || inView ? 0 : "110%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.span>
    </As>
  );
}

/** Restrained entrance for supporting blocks. */
export function Rise({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/** Hairline that draws itself as the chapter enters. */
export function DrawnRule({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();
  return (
    <div ref={ref} className={`h-px w-full overflow-hidden ${className}`}>
      <motion.div
        className="h-px w-full bg-[color:var(--color-hairline)]"
        initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: inView ? 1 : 0 }}
        style={{ transformOrigin: "left" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

export function ChapterHead({
  index,
  title,
  meta,
  className = "",
}: {
  index: string;
  title: string;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`shell ${className}`}>
      <DrawnRule />
      <div className="grid-12 py-4">
        <span className="label-tech col-span-2 md:col-span-2">{index}</span>
        <span className="label-tech col-span-4 md:col-span-6 text-[color:var(--color-foreground)]">
          {title}
        </span>
        {meta ? (
          <span className="label-tech col-span-6 hidden md:col-span-4 md:block md:text-right">{meta}</span>
        ) : null}
      </div>
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  light = false,
  style,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  light?: boolean;
  style?: CSSProperties;
}) {
  return (
    <section
      id={id}
      className={`${light ? "chapter-light" : ""} relative ${className}`}
      style={{ scrollMarginTop: "5rem", ...style }}
    >
      {children}
    </section>
  );
}
