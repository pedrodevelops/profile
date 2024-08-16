import { BaseEntity } from '@api/common/domain/base.entity';

export type ProfileSocial = {
  media: string;
  url: string;
};

export type ProfileEntityProps = {
  username: string;
  bio: string;
  image: string;
  socials: ProfileSocial[];
  tags: string[];
};

export class ProfileEntity extends BaseEntity {
  username: string;
  bio: string;
  image: string;
  socials: ProfileSocial[];
  tags: string[];

  constructor(
    { username, bio, image, socials, tags }: ProfileEntityProps,
    id?: string,
  ) {
    super(id);
    this.username = username;
    this.bio = bio;
    this.image = image;
    this.socials = socials;
    this.tags = tags;
  }
}
