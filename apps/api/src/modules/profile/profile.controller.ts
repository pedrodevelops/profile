import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileMapper } from './profile.mapper';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { UpdateProfileInput, updateProfileSchema } from '@profile/validations';
import { ZodValidationPipe } from '@api/common/pipes/zod-validation.pipe';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/me')
  async findMyProfile(@CurrentUser() { username }: { username: string }) {
    const profile = await this.profileService.findByUsername(username);

    if (profile == null) {
      throw new NotFoundException('Profile not found');
    }

    return ProfileMapper.toHTTP(profile);
  }

  @IsPublic()
  @Get(':username')
  async findProfile(@Param('username') username: string) {
    const profile = await this.profileService.findByUsername(username);

    if (profile == null) {
      throw new NotFoundException('Profile not found');
    }

    return ProfileMapper.toHTTP(profile);
  }

  @Patch('/me')
  async patchProfile(
    @CurrentUser() { username }: { username: string },
    @Body(new ZodValidationPipe(updateProfileSchema)) body: UpdateProfileInput,
  ) {
    const cleanBody = ProfileMapper.filterPatchBody(body);
    const profile = await this.profileService.update(username, cleanBody);

    return ProfileMapper.toHTTP(profile);
  }
}
