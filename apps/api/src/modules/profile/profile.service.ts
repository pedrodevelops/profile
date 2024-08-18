import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { ProfileEntity } from './profile.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly configService: ConfigService,
  ) {}

  /**
   * @throws ConflictException - If the username is already taken.
   */
  async create(entity: ProfileEntity): Promise<void> {
    const usernameTaken = await this.profileRepository.findByUsername(
      entity.username,
    );

    if (usernameTaken != null) {
      throw new ConflictException('Username already taken');
    }

    return await this.profileRepository.create(entity);
  }

  async findByUsername(username: string): Promise<ProfileEntity | null> {
    return await this.profileRepository.findByUsername(username);
  }

  /**
   * @throws NotFoundException - If the profile is not found.
   */
  async update(
    username: string,
    data: Partial<Omit<ProfileEntity, 'id'>>,
  ): Promise<ProfileEntity> {
    const entity = await this.profileRepository.findByUsername(username);

    if (entity == null) {
      throw new NotFoundException('Profile not found');
    }

    const updatedEntity = new ProfileEntity(
      {
        bio: data.bio ?? entity.bio,
        iconUrl: data.iconUrl ?? entity.iconUrl,
        socials: data.socials ?? entity.socials,
        tags: data.tags ?? entity.tags,
        username: entity.username,
      },
      entity.id,
    );

    await this.profileRepository.update(updatedEntity);

    return updatedEntity;
  }

  getProfilePictureUrl(filename: string) {
    return this.configService.getOrThrow('API_URL') + '/' + filename;
  }
}
