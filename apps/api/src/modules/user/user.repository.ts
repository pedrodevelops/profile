import { UserEntity } from './user.entity';

export abstract class UserRepository {
  abstract create(userEntity: UserEntity): Promise<void>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findByName(name: string): Promise<UserEntity | null>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract update(userEntity: UserEntity): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
