import { useRef, useState, type ReactNode } from "react";

/**
 * MediaSlot — intentional slot for supplied production media.
 * Files drop into /public/media/<name>. Until then an engineered
 * placeholder holds the exact composition and aspect ratio.
 */
export function MediaSlot({
  name,
  alt,
  fit = "cover",
  ratio = "4 / 5",
  label,
  className = "",
  priority = false,
  children,
}: {
  name: string;
  alt: string;
  fit?: "cover" | "contain";
  ratio?: string;
  label?: string;
  className?: string;
  priority?: boolean;
  children?: ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  return (
    <figure
      className={`relative overflow-hidden bg-[color-mix(in_oklab,var(--color-foreground)_5%,transparent)] ${className}`}
      style={{ aspectRatio: ratio }}
      data-media-slot={name}
    >
      <Placeholder name={name} label={label} />
      {!failed ? (
        <img
          ref={ref}
          src={`/media/${name}`}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full ${loaded ? "opacity-100" : "opacity-0"} ${fit === "contain" ? "object-contain" : "object-cover"}`}
        />
      ) : null}
      {children}
    </figure>
  );
}

function Placeholder({ name, label }: { name: string; label?: string | undefined }) {
  return (
    <div className="absolute inset-0">
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
