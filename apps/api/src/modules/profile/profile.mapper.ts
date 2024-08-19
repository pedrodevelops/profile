import { ProfileEntity } from './profile.entity';
import { Profile, UpdateProfileRequest } from '@profile/types';

export class ProfileMapper {
  static toEntity(data: Omit<Profile, 'id'>) {
    return new ProfileEntity({
      bio: data.bio,
      iconUrl: data.iconUrl || null,
      socials: data.socials,
      nickname: data.nickname,
      tags: data.tags,
    });
  }

  static toHTTP(entity: ProfileEntity) {
    return {
      bio: entity.bio,
      iconUrl: entity.iconUrl,
      socials: entity.socials,
      nickname: entity.nickname,
      tags: entity.tags,
    };
  }

  static filterPatchBody(data: UpdateProfileRequest) {
    return {
      bio: data.bio,
      socials: data.socials,
      tags: data.tags,
    };
  }
}
