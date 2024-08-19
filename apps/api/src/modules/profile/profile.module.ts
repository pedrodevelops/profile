import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';
import { PrismaProfileRepository } from './impl/prisma-profile.repository';
import { PrismaService } from '@api/common/services/prisma.service';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [
    {
      provide: ProfileRepository,
      useClass: PrismaProfileRepository,
    },
    ProfileService,
    PrismaService,
  ],
  exports: [ProfileService],
})
export class ProfileModule {}
