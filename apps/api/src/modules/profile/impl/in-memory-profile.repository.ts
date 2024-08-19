import { InMemoryGenericRepository } from '@api/common/impl/in-memory-generic.repository';
import { ProfileRepository } from '../profile.repository';
import { ProfileEntity } from '../profile.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryProfileRepository
  extends InMemoryGenericRepository<ProfileEntity>
  implements ProfileRepository
{
  findByNickname(nickname: string): Promise<ProfileEntity | null> {
    return this.findByKey(
      'nickname',
      nickname,
    ) as Promise<ProfileEntity | null>;
  }
}
