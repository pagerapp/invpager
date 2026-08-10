import { useState, type ReactNode } from "react";
import { media } from "@/lib/media";

/**
 * MediaSlot — full-frame media holder.
 *
 * NON-NEGOTIABLE: supplied media is never cropped, zoomed or clipped.
 * - object-fit is always `contain`
 * - the container is BUILT AROUND the media's true intrinsic aspect ratio
 *   (from the generated manifest, or read from the file on load)
 * - `maxHeight` caps the frame by scaling the WHOLE image down; the width cap
 *   is derived from the ratio so no letterboxing or cropping occurs
 * - transparent PNGs keep their alpha (no background behind loaded media)
 */
export function MediaSlot({
  name,
  alt,
  ratio,
  label,
  className = "",
  priority = false,
  maxHeight,
  children,
}: {
  name: string;
  alt: string;
  /** Fallback aspect ratio, used only when the file is unknown to the manifest. */
  ratio?: string;
  label?: string;
  className?: string;
  priority?: boolean;
  /** Optional cap, e.g. "62vh". Scales the entire frame down — never crops. */
  maxHeight?: string;
  children?: ReactNode;
}) {
  const entry = media(name);
  const [measured, setMeasured] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const src = entry?.url ?? `/media/${name}`;
  const aspect = entry?.ratio ?? measured ?? ratio ?? "4 / 5";
  const [rw, rh] = aspect.split("/").map((v) => Number(v.trim()));
  const maxWidth =
    maxHeight && rw && rh ? `calc(${maxHeight} * ${(rw / rh).toFixed(6)})` : undefined;

  return (
    <figure
      className={`relative mx-auto ${loaded ? "" : "bg-[color-mix(in_oklab,var(--color-foreground)_5%,transparent)]"} ${className}`}
      style={{ aspectRatio: aspect, maxHeight, maxWidth }}
      data-media-slot={name}
    >
      {!loaded ? <Placeholder name={name} label={label} /> : null}
      {!failed ? (
        <img
          src={src}
          alt={alt}
          {...(entry ? { width: entry.width, height: entry.height } : {})}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          ref={(el) => {
            // Images cached/decoded before hydration never fire onLoad.
            if (el?.complete && el.naturalWidth) markLoaded(el);
          }}
          onLoad={(e) => markLoaded(e.currentTarget)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-contain ${loaded ? "opacity-100" : "opacity-0"}`}
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
      <div className="absolute inset-0 flex flex-col justify-between p-3">
        <span className="label-tech">{label ?? "MEDIA"}</span>
        <span className="label-tech break-all opacity-70">{name}</span>
      </div>
    </div>
  );
}
