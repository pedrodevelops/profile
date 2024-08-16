export const SUPPORTED_SOCIAL_MEDIAS = [
  "facebook",
  "twitter",
  "instagram",
  "linkedin",
  "youtube",
  "tiktok",
  "whatsapp",
  "telegram",
  "discord",
  "twitch",
  "spotify",
  "soundcloud",
  "github",
] as const;

export const TRUSTED_DOMAINS = [
  "facebook.com",
  "twitter.com",
  "instagram.com",
  "linkedin.com",
  "youtube.com",
  "tiktok.com",
  "whatsapp.com",
  "telegram.org",
  "discord.com",
  "twitch.tv",
  "spotify.com",
  "soundcloud.com",
  "github.com",
] as const;

export type SocialMedia = (typeof SUPPORTED_SOCIAL_MEDIAS)[number];
export type TrustedDomain = (typeof TRUSTED_DOMAINS)[number];
