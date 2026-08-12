import Lenis from "lenis";
import { useEffect } from "react";

/**
 * A single, page-level scroll layer. It deliberately does not snap or own
 * story state: native position remains the source of truth for every chapter.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.72,
      touchMultiplier: 1,
      autoRaf: true,
      // The product experience intentionally uses a short, controlled scroll
      // inertia even when the browser reports reduced motion.
      respectReducedMotion: false,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
