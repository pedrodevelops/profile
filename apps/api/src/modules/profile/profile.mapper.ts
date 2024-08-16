import { ProfileEntity } from './profile.entity';
import { CreateProfileInput } from '@profile/validations';

export class ProfileMapper {
  static toEntity(data: CreateProfileInput & { username: string }) {
    return new ProfileEntity({
      bio: data.bio,
      image: data.image,
      socials: data.socials,
      username: data.username,
      tags: data.tags,
    });
  }

  static toHTTP(entity: ProfileEntity) {
    return {
      bio: entity.bio,
      image: entity.image,
      socials: entity.socials,
      username: entity.username,
      tags: entity.tags,
    };
  }

  static filterPatchBody(data: Partial<CreateProfileInput>) {
    return {
      bio: data.bio,
      image: data.image,
      socials: data.socials,
      tags: data.tags,
    };
  }
}
