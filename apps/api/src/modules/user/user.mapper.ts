import { SignUpInput } from '@profile/validations';
import { UserEntity } from './user.entity';

export class UserMapper {
  static fromDto(dto: SignUpInput): UserEntity {
    return new UserEntity({
      email: dto.email,
      name: dto.name,
      password: dto.password,
    });
  }

  static toHTTP(user: UserEntity) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
