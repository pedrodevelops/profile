import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '../profile.repository';
import { ProfileEntity } from '../profile.entity';
import { PrismaService } from '@api/common/services/prisma.service';

@Injectable()
export class PrismaProfileRepository implements ProfileRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(profileEntity: ProfileEntity): Promise<void> {
    await this.prismaService.profile.create({
      data: {
        bio: profileEntity.bio,
        iconUrl: profileEntity.iconUrl,
        id: profileEntity.id,
        socials: {
          create: profileEntity.socials.map((social) => ({
            platform: social.platform,
            url: social.url,
          })),
        },
        tags: profileEntity.tags,
        user: {
          connect: {
            nickname: profileEntity.nickname,
          },
        },
      },
    });
  }

  async findByNickname(nickname: string): Promise<ProfileEntity | null> {
    const profile = await this.prismaService.profile.findUnique({
      where: {
        nickname,
      },
      include: {
        socials: true,
      },
    });

    if (profile == null) {
      return null;
    }

    return new ProfileEntity(
      {
        bio: profile.bio,
        iconUrl: profile.iconUrl,
        nickname: profile.nickname,
        socials: profile.socials.map((social) => ({
          platform: social.platform,
          url: social.url,
        })),
        tags: profile.tags,
      },
      profile.id,
    );
  }

  async update(profileEntity: ProfileEntity): Promise<void> {
    await this.prismaService.profile.update({
      where: {
        id: profileEntity.id,
      },
      data: {
        bio: profileEntity.bio,
        iconUrl: profileEntity.iconUrl,
        socials: {
          deleteMany: {
            profileId: profileEntity.id,
          },
          create: profileEntity.socials.map((social) => ({
            platform: social.platform,
            url: social.url,
          })),
        },
        tags: profileEntity.tags,
      },
    });
  }
}
