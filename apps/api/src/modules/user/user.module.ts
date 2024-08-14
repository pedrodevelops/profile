import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InMemoryUserRepository } from './impl/in-memory-user.repository';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: UserRepository,
      useClass: InMemoryUserRepository,
    },
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
