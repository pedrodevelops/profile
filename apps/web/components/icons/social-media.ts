import {
  SiDiscord,
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiSoundcloud,
  SiSpotify,
  SiTelegram,
  SiTiktok,
  SiTwitch,
  SiX,
  SiWhatsapp,
  SiYoutube,
} from "react-icons/si";

import { IconType } from "react-icons";

export const socialMediaIcons: Record<string, IconType> = {
  instagram: SiInstagram,
  twitter: SiX,
  facebook: SiFacebook,
  linkedin: SiLinkedin,
  youtube: SiYoutube,
  github: SiGithub,
  tiktok: SiTiktok,
  whatsapp: SiWhatsapp,
  telegram: SiTelegram,
  discord: SiDiscord,
  twitch: SiTwitch,
  spotify: SiSpotify,
  soundcloud: SiSoundcloud,
};

export type SocialMedia = keyof typeof socialMediaIcons;
