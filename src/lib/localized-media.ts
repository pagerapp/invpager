import { media } from "./media";

/**
 * LOCALIZED MEDIA RESOLVER.
 *
 * Some supplied frames contain baked-in typography, so localization must swap
 * the SOURCE FILE — never overlay translated HTML on top of the artwork.
 *
 * Resolution order: current language → English variant → shared/neutral variant.
 * The first name that exists in the generated manifest wins.
 */

export type Locale = string;

/** Language buckets used by the asset filenames. */
function langKeys(locale: Locale): string[] {
  if (locale === "ru") return ["RU", "RU_ENG", "ENG"];
  if (locale === "zh") return ["ZH", "CN", "ENG", "RU_ENG"];
  return ["ENG", "RU_ENG"];
}

/** First existing manifest entry from a candidate list. */
export function resolveMedia(candidates: string[], fallback: string): string {
  for (const name of candidates) if (media(name)) return name;
  return fallback;
}

/**
 * Build candidates from a template containing `{lang}`.
 * e.g. "Hero_storyscroll_img_{lang}_2.jpg"
 */
export function localizedMedia(template: string, locale: Locale, fallback: string): string {
  return resolveMedia(
    langKeys(locale).map((k) => template.replace("{lang}", k)),
    fallback,
  );
}

/** Hero StoryScroll frames — 01 PROBLEM, 02 RELATIONSHIPS, 03 CONTROL. */
export function heroMedia(locale: Locale): string[] {
  const frameTwo = locale === "ru"
    ? "Hero_storyscroll_img_RU_2_001.jpg"
    : locale === "zh"
      ? "Hero_storyscroll_img_ZH_2_001.jpg"
      : "Hero_storyscroll_img_EN_03.jpg";
  const frameThree = locale === "zh"
    ? localizedMedia("Hero_storyscroll_img_{lang}_3.png", locale, "Hero_storyscroll_img_ENG_3.jpg")
    : localizedMedia("Hero_storyscroll_img_{lang}_3.jpg", locale, "Hero_storyscroll_img_ENG_3.jpg");
  return [
    "Hero_storyscroll_img_RU_ENG_ZH_003.jpg",
    frameTwo,
    frameThree,
  ];
}

/** Multiprofile StoryScroll frames — the approved three-scene sequence. */
export function multiprofileMedia(_locale: Locale): string[] {
  return [
    "Multiprofile_img_01.jpg",
    "Multiprofile_img_02.jpg",
    "Multiprofile_img_03.jpg",
  ];
}

/** The approved Multiprofile artwork is square and shared across breakpoints. */
export function multiprofileMobileMedia(_locale: Locale): string[] {
  return [
    "Multiprofile_img_01.jpg",
    "Multiprofile_img_02.jpg",
    "Multiprofile_img_03.jpg",
  ];
}

