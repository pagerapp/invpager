import { useState, type ReactNode } from "react";

/**
 * MediaSlot — full-frame media holder.
 *
 * NON-NEGOTIABLE: supplied media is never cropped, never zoomed, never clipped.
 * - object-fit is always `contain`
 * - the container adopts the media's OWN aspect ratio once it loads
 * - `ratio` is only a pre-load reservation so layout does not jump
 * - transparent PNGs keep their alpha (no background fill behind loaded media)
 */
export function MediaSlot({
  name,
  alt,
  ratio = "4 / 5",
  label,
  className = "",
  priority = false,
  maxHeight,
  children,
}: {
  name: string;
  alt: string;
  /** Fallback aspect ratio used ONLY until the real media reports its own. */
  ratio?: string;
  label?: string;
  className?: string;
  priority?: boolean;
  /** Optional cap, e.g. "62vh". The image scales down entirely — never crops. */
  maxHeight?: string;
  children?: ReactNode;
}) {
  const [natural, setNatural] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const loaded = natural !== null;

  return (
    <figure
      className={`relative ${loaded ? "" : "bg-[color-mix(in_oklab,var(--color-foreground)_5%,transparent)]"} ${className}`}
      style={{ aspectRatio: natural ?? ratio, maxHeight }}
      data-media-slot={name}
    >
      {!loaded ? <Placeholder name={name} label={label} /> : null}
      {!failed ? (
        <img
          src={`/media/${name}`}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={(e) => {
            const img = e.currentTarget;
            if (img.naturalWidth && img.naturalHeight) {
              setNatural(`${img.naturalWidth} / ${img.naturalHeight}`);
            } else {
              setNatural(ratio);
            }
          }}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-contain ${loaded ? "opacity-100" : "opacity-0"}`}
          style={{ objectPosition: "center" }}
        />
      ) : null}
      {children}
    </figure>
  );
}

function Placeholder({ name, label }: { name: string; label?: string | undefined }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-hairline) 1px, transparent 1px), linear-gradient(to bottom, var(--color-hairline) 1px, transparent 1px)",
          backgroundSize: "clamp(28px, 6%, 64px) clamp(28px, 6%, 64px)",
        }}
      />
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full text-[color:var(--color-hairline)]"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" />
      </svg>
      <div className="absolute inset-0 flex flex-col justify-between p-3">
        <span className="label-tech">{label ?? "MEDIA SLOT"}</span>
        <span className="label-tech break-all opacity-70">{name}</span>
      </div>
    </div>
  );
}
