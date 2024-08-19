import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { PrismaUserRepository } from './impl/prisma-user.repository';
import { PrismaService } from '@api/common/services/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    UserService,
    PrismaService,
  ],
  exports: [UserService],
})
export class UserModule {}
