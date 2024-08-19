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

export const platformIcons: Record<string, IconType> = {
  instagram: SiInstagram,
  facebook: SiFacebook,
  twitter: SiX,
  linkedin: SiLinkedin,
  youtube: SiYoutube,
  tiktok: SiTiktok,
  whatsapp: SiWhatsapp,
  telegram: SiTelegram,
  discord: SiDiscord,
  twitch: SiTwitch,
  spotify: SiSpotify,
  soundcloud: SiSoundcloud,
  github: SiGithub,
};
