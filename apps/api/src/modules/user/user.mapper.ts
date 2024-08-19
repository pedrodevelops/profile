import { SignUpRequest } from '@profile/types';
import { UserEntity } from './user.entity';

export class UserMapper {
  static toEntity(dto: SignUpRequest): UserEntity {
    return new UserEntity({
      email: dto.email,
      nickname: dto.nickname,
      password: dto.password,
    });
  }

  static toHTTP(user: UserEntity) {
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    };
  }
}
