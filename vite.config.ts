// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // GitHub Pages serves this project from /invpager/ rather than the domain root.
  // Keep generated scripts, styles, and media on the repository base path.
  vite: {
    base: "/invpager/",
  },
  // The page is deployed as a TanStack SPA shell; GitHub Pages does not need a
  // Nitro server bundle and the Start plugin can emit the static client output.
  nitro: false,
  tanstackStart: {
    spa: { enabled: true },
  },
});
