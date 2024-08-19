import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UserEntity } from '../user.entity';
import { PrismaService } from '@api/common/services/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userEntity: UserEntity): Promise<void> {
    await this.prismaService.user.create({
      data: {
        email: userEntity.email,
        id: userEntity.id,
        nickname: userEntity.nickname,
        password: userEntity.password,
      },
    });
  }

  async findById(id: string): Promise<UserEntity | null> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByNickname(name: string): Promise<UserEntity | null> {
    return await this.prismaService.user.findUnique({
      where: {
        nickname: name,
      },
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(userEntity: UserEntity): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: userEntity.id,
      },
      data: {
        email: userEntity.email,
        nickname: userEntity.nickname,
        password: userEntity.password,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
