import { media } from "./media";

/**
 * ISOLATED MEDIA MAPPING — Multiprofile story states.
 *
 * The final art direction is a 1:1 three-image sequence:
 *   Multiprofile_img_01.jpg = PROBLEM
 *   Multiprofile_img_02.jpg = REALIZATION
 *   Multiprofile_img_03.jpg = SOLUTION
 *
 * Until those files exist in the manifest, the component keeps working on the
 * existing screens. Dropping the three assets into the manifest swaps them in
 * with zero layout or component changes.
 */
export const MULTIPROFILE_FINAL = [
  "Multiprofile_img_01.jpg",
  "Multiprofile_img_02.jpg",
  "Multiprofile_img_03.jpg",
] as const;

const FALLBACK = ["mpf_desktop_1.png", "mpf_desktop_2.png", "mpf_desktop_4.png"] as const;

export const MULTIPROFILE_FINAL_AVAILABLE = MULTIPROFILE_FINAL.every((n) => Boolean(media(n)));

export function multiprofileStates(): string[] {
  return MULTIPROFILE_FINAL_AVAILABLE ? [...MULTIPROFILE_FINAL] : [...FALLBACK];
}
