import { BaseEntity } from '@api/common/domain/base.entity';

type UserEntityProps = {
  name: string;
  email: string;
  password: string;
};

export class UserEntity extends BaseEntity {
  name: string;
  email: string;
  password: string;

  constructor({ email, name, password }: UserEntityProps, id?: string) {
    super(id);
    this.email = email;
    this.name = name;
    this.password = password;
  }
}
