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
   * @throws ConflictException - If the nickname is already taken.
   */
  async create(entity: ProfileEntity): Promise<void> {
    const nicknameTaken = await this.profileRepository.findByNickname(
      entity.nickname,
    );

    if (nicknameTaken != null) {
      throw new ConflictException('Apelido já em uso');
    }

    return await this.profileRepository.create(entity);
  }

  async findByNickname(nickname: string): Promise<ProfileEntity | null> {
    return await this.profileRepository.findByNickname(nickname);
  }

  /**
   * @throws NotFoundException - If the profile is not found.
   */
  async update(
    nickname: string,
    data: Partial<Omit<ProfileEntity, 'id'>>,
  ): Promise<ProfileEntity> {
    const entity = await this.profileRepository.findByNickname(nickname);

    if (entity == null) {
      throw new NotFoundException(
        `Não conseguimos encontrar o perfil de ${nickname}.`,
      );
    }

    const updatedEntity = new ProfileEntity(
      {
        bio: data.bio ?? entity.bio,
        iconUrl: data.iconUrl ?? entity.iconUrl,
        socials: data.socials ?? entity.socials,
        tags: data.tags ?? entity.tags,
        nickname: entity.nickname,
      },
      entity.id,
    );

    await this.profileRepository.update(updatedEntity);

    return updatedEntity;
  }

  async findRandom() {
    return await this.profileRepository.findRandom();
  }

  getProfilePictureUrl(filename: string) {
    return this.configService.getOrThrow('API_URL') + '/' + filename;
  }
}
