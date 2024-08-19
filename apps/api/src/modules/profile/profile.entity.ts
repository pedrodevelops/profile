import { BaseEntity } from '@api/common/domain/base.entity';

export type ProfileSocial = {
  platform: string;
  url: string;
};

export type ProfileEntityProps = {
  nickname: string;
  bio: string;
  iconUrl: string | null;
  socials: ProfileSocial[];
  tags: string[];
};

export class ProfileEntity extends BaseEntity {
  nickname: string;
  bio: string;
  iconUrl: string | null;
  socials: ProfileSocial[];
  tags: string[];

  constructor(
    { nickname, bio, iconUrl, socials, tags }: ProfileEntityProps,
    id?: string,
  ) {
    super(id);
    this.nickname = nickname;
    this.bio = bio;
    this.iconUrl = iconUrl;
    this.socials = socials;
    this.tags = tags;
  }
}
