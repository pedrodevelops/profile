import { ProfileEntity } from './profile.entity';
import { CreateProfileInput } from '@profile/validations';

export class ProfileMapper {
  static toEntity(
    createProfileDto: CreateProfileInput & {
      username: string;
      iconUrl?: string;
    },
  ) {
    return new ProfileEntity({
      bio: createProfileDto.bio,
      iconUrl: createProfileDto.iconUrl,
      socials: createProfileDto.socials,
      username: createProfileDto.username,
      tags: createProfileDto.tags,
    });
  }

  static toHTTP(entity: ProfileEntity) {
    return {
      bio: entity.bio,
      iconUrl: entity.iconUrl,
      socials: entity.socials,
      username: entity.username,
      tags: entity.tags,
    };
  }

  static filterPatchBody(data: Partial<CreateProfileInput>) {
    return {
      bio: data.bio,
      socials: data.socials,
      tags: data.tags,
    };
  }
}
