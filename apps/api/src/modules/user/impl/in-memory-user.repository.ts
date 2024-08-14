import { InMemoryGenericRepository } from '@api/common/impl/in-memory-generic.repository';
import { UserRepository } from '../user.repository';
import { UserEntity } from '../user.entity';

export class InMemoryUserRepository
  extends InMemoryGenericRepository<UserEntity>
  implements UserRepository
{
  findByName(name: string): Promise<UserEntity | null> {
    return this.findByKey('name', name);
  }
  findByEmail(email: string): Promise<UserEntity | null> {
    return this.findByKey('email', email);
  }
}
