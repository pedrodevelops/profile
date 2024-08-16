import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { InMemoryProfileRepository } from './impl/in-memory-profile.repository';
import { ProfileService } from './profile.service';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [
    {
      provide: ProfileRepository,
      useClass: InMemoryProfileRepository,
    },
    ProfileService,
  ],
  exports: [ProfileService],
})
export class ProfileModule {}
