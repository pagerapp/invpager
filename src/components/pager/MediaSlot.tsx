import { useState, type CSSProperties, type ReactNode } from "react";
import { media } from "@/lib/media";

/**
 * MediaSlot — full-frame media holder.
 *
 * NON-NEGOTIABLE: supplied media is never cropped, zoomed or clipped.
 * Desktop and mobile may use different supplied source files, but both keep
 * their native intrinsic ratio.
 */
export function MediaSlot({
  name,
  mobileName,
  alt,
  ratio,
  label,
  className = "",
  priority = false,
  maxHeight,
  lockHeight = false,
  edgeFade = false,
  children,
}: {
  name: string;
  /** Optional mobile-specific media source. */
  mobileName?: string;
  alt: string;
  /** Fallback aspect ratio, used only when the file is unknown to the manifest. */
  ratio?: string;
  label?: string;
  className?: string;
  priority?: boolean;
  /** Optional cap, e.g. "58vh". Scales the entire image down — never crops. */
  maxHeight?: string;
  lockHeight?: boolean;
  /** Softly blends a large standalone image into a black page background. */
  edgeFade?: boolean;
  children?: ReactNode;
}) {
  const entry = media(name);
  const mobileEntry = mobileName ? media(mobileName) : undefined;
  const [measured, setMeasured] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  const src = entry?.url ?? "media/" + name;
  const mobileSrc = mobileEntry?.url ?? (mobileName ? "media/" + mobileName : undefined);
  const aspect = entry?.ratio ?? measured ?? ratio ?? "4 / 5";
  const mobileAspect = mobileEntry?.ratio;
  const [rw, rh] = aspect.split("/").map((v) => Number(v.trim()));
  const [mrw, mrh] = mobileAspect?.split("/").map((v) => Number(v.trim())) ?? [];
  const maxWidth = maxHeight && rw && rh
    ? "calc(" + maxHeight + " * " + (rw / rh).toFixed(6) + ")"
    : undefined;
  const mobileMaxWidth = maxHeight && mrw && mrh
    ? "calc(" + maxHeight + " * " + (mrw / mrh).toFixed(6) + ")"
    : undefined;

  const slotStyle = {
    ...(lockHeight ? {} : { aspectRatio: aspect }),
    maxHeight,
    maxWidth,
    ...(edgeFade ? { overflow: "visible" } : {}),
    ...(mobileAspect ? { "--media-mobile-ratio": mobileAspect } : {}),
    ...(mobileMaxWidth ? { "--media-mobile-max-width": mobileMaxWidth } : {}),
  } as CSSProperties;

  return (
    <figure
      className={"relative mx-auto " + className}
      style={slotStyle}
      data-media-slot={name}
      {...(mobileEntry ? { "data-mobile-media": mobileName } : {})}
    >
      <Placeholder name={name} label={label} />
      {edgeFade && !failed ? (
        <img
          aria-hidden
          src={src}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full scale-[1.1] object-contain opacity-70 blur-3xl"
        />
      ) : null}
      {!failed ? (
        <picture className="absolute inset-0 z-10 block">
          {mobileEntry && mobileSrc ? <source media="(max-width: 767px)" srcSet={mobileSrc} /> : null}
          <img
            src={src}
            alt={alt}
            {...(entry ? { width: entry.width, height: entry.height } : {})}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={(e) => {
              const img = e.currentTarget;
              if (!entry && img.naturalWidth && img.naturalHeight) {
                setMeasured(img.naturalWidth + " / " + img.naturalHeight);
              }
            }}
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-contain"
          />
        </picture>
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
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-hairline) 1px, transparent 1px), linear-gradient(to bottom, var(--color-hairline) 1px, transparent 1px)",
          backgroundSize: "clamp(28px, 6%, 64px) clamp(28px, 6%, 64px)",
        }}
      />
      <div className="sr-only">{label ?? "MEDIA"} {name}</div>
    </div>
  );
}
