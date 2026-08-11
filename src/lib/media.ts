// Bundled media manifest — local GitHub Pages paths + intrinsic dimensions.
// Dimensions are the true source pixel sizes; layout is built around them so
// media is never cropped, zoomed or clipped.

export type MediaEntry = { url: string; width: number; height: number; ratio: string };

export const MEDIA = {
  "1_email.png": { url: "media/1_email.png", width: 512, height: 512, ratio: "512 / 512" },
  "2_sms.png": { url: "media/2_sms.png", width: 512, height: 512, ratio: "512 / 512" },
  "3_chat.png": { url: "media/3_chat.png", width: 512, height: 512, ratio: "512 / 512" },
  "4_pager.png": { url: "media/4_pager.png", width: 512, height: 512, ratio: "512 / 512" },
  "Evo_1.png": { url: "media/Evo_1.png", width: 512, height: 512, ratio: "512 / 512" },
  "Evo_2.png": { url: "media/Evo_2.png", width: 512, height: 512, ratio: "512 / 512" },
  "Evo_3.png": { url: "media/Evo_3.png", width: 512, height: 512, ratio: "512 / 512" },
  "Evo_4.png": { url: "media/Evo_4.png", width: 512, height: 512, ratio: "512 / 512" },
  "Hero_man_alter_ego_5x.png": { url: "media/Hero_man_alter_ego_5x.png", width: 543, height: 724, ratio: "543 / 724" },
  "Hero_man_guest_4x.png": { url: "media/Hero_man_guest_4x.png", width: 543, height: 724, ratio: "543 / 724" },
  "Hero_man_personal_1x.png": { url: "media/Hero_man_personal_1x.png", width: 543, height: 724, ratio: "543 / 724" },
  "Hero_man_work_3x.png": { url: "media/Hero_man_work_3x.png", width: 543, height: 724, ratio: "543 / 724" },
  "Hero_storyscroll_img_ENG_2.jpg": { url: "media/Hero_storyscroll_img_ENG_2.jpg", width: 1254, height: 1254, ratio: "1254 / 1254" },
  "Hero_storyscroll_img_ENG_3.jpg": { url: "media/Hero_storyscroll_img_ENG_3.jpg", width: 1254, height: 1254, ratio: "1254 / 1254" },
  "Hero_storyscroll_img_RU_2.jpg": { url: "media/Hero_storyscroll_img_RU_2.jpg", width: 1254, height: 1254, ratio: "1254 / 1254" },
  "Hero_storyscroll_img_RU_3.jpg": { url: "media/Hero_storyscroll_img_RU_3.jpg", width: 1254, height: 1254, ratio: "1254 / 1254" },
  "Hero_storyscroll_img_RU_ENG_1.jpg": { url: "media/Hero_storyscroll_img_RU_ENG_1.jpg", width: 1254, height: 1254, ratio: "1254 / 1254" },
  "Hero_storyscroll_img_ZH_2.png": { url: "media/Hero_storyscroll_img_ZH_2.png", width: 1254, height: 1254, ratio: "1254 / 1254" },
  "Hero_storyscroll_img_ZH_3.png": { url: "media/Hero_storyscroll_img_ZH_3.png", width: 1254, height: 1254, ratio: "1254 / 1254" },
  "Multiprofile_img_01.jpg": { url: "media/Multiprofile_img_01.jpg", width: 1254, height: 1254, ratio: "1254 / 1254" },
  "Multiprofile_img_02.jpg": { url: "media/Multiprofile_img_02.jpg", width: 1254, height: 1254, ratio: "1254 / 1254" },
  "Multiprofile_img_03.jpg": { url: "media/Multiprofile_img_03.jpg", width: 1254, height: 1254, ratio: "1254 / 1254" },
  "Multiprofiles_mobile_img_1.png": { url: "media/Multiprofiles_mobile_img_1.png", width: 941, height: 1672, ratio: "941 / 1672" },
  "Multiprofiles_mobile_img_2.png": { url: "media/Multiprofiles_mobile_img_2.png", width: 941, height: 1672, ratio: "941 / 1672" },
  "Multiprofiles_mobile_img_3.png": { url: "media/Multiprofiles_mobile_img_3.png", width: 941, height: 1672, ratio: "941 / 1672" },
  "hero_dsktp_001.png": { url: "media/hero_dsktp_001.png", width: 1672, height: 941, ratio: "1672 / 941" },
  "hero_dsktp_003.png": { url: "media/hero_dsktp_003.png", width: 1122, height: 1402, ratio: "1122 / 1402" },
  "hero_mob_001.png": { url: "media/hero_mob_001.png", width: 745, height: 1180, ratio: "745 / 1180" },
  "mpf_desktop_1.png": { url: "media/mpf_desktop_1.png", width: 1672, height: 941, ratio: "1672 / 941" },
  "mpf_desktop_2.png": { url: "media/mpf_desktop_2.png", width: 1672, height: 941, ratio: "1672 / 941" },
  "mpf_desktop_3.png": { url: "media/mpf_desktop_3.png", width: 1672, height: 941, ratio: "1672 / 941" },
  "pager_id_variation_002.jpg": { url: "media/pager_id_variation_002.jpg", width: 1586, height: 992, ratio: "1586 / 992" },
  "pgr_scr_002.jpg": { url: "media/pgr_scr_002.jpg", width: 477, height: 1043, ratio: "477 / 1043" },
  "pgr_scr_003.jpg": { url: "media/pgr_scr_003.jpg", width: 477, height: 1043, ratio: "477 / 1043" },
} as const satisfies Record<string, MediaEntry>;

export type MediaName = keyof typeof MEDIA;

export function media(name: string): MediaEntry | undefined {
  return (MEDIA as Record<string, MediaEntry>)[name];
}
