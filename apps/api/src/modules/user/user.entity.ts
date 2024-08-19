import { BaseEntity } from '@api/common/domain/base.entity';

type UserEntityProps = {
  nickname: string;
  email: string;
  password: string;
};

export class UserEntity extends BaseEntity {
  nickname: string;
  email: string;
  password: string;

  constructor({ email, nickname, password }: UserEntityProps, id?: string) {
    super(id);
    this.email = email;
    this.nickname = nickname;
    this.password = password;
  }
}
