import { BaseEntity } from '@api/common/domain/base.entity';

export type ProfileSocial = {
  media: string;
  url: string;
};

export type ProfileEntityProps = {
  username: string;
  bio: string;
  iconUrl?: string;
  socials: ProfileSocial[];
  tags: string[];
};

export class ProfileEntity extends BaseEntity {
  username: string;
  bio: string;
  iconUrl?: string;
  socials: ProfileSocial[];
  tags: string[];

  constructor(
    { username, bio, iconUrl, socials, tags }: ProfileEntityProps,
    id?: string,
  ) {
    super(id);
    this.username = username;
    this.bio = bio;
    this.iconUrl = iconUrl;
    this.socials = socials;
    this.tags = tags;
  }
}
