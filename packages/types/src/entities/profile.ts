export type SocialPlatform = {
  platform: string;
  url: string;
};

export type Tag = string;

export type Profile = {
  id: string;
  nickname: string;
  bio: string;
  iconUrl: string | null;
  socials: SocialPlatform[];
  tags: Tag[];
};
