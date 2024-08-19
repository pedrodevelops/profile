import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileMapper } from './profile.mapper';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { updateProfileSchema } from '@profile/validations';
import { ZodValidationPipe } from '@api/common/pipes/zod-validation.pipe';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { profilePictureStorage } from '@api/config/multer.config';
import { ConfigService } from '@nestjs/config';
import { UpdateProfileRequest } from '@profile/types';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/me')
  async findMyProfile(@CurrentUser() { nickname }: { nickname: string }) {
    const profile = await this.profileService.findByNickname(nickname);

    if (profile == null) {
      throw new NotFoundException(
        `Não conseguimos encontrar o perfil de ${nickname}.`,
      );
    }

    return ProfileMapper.toHTTP(profile);
  }

  @IsPublic()
  @Get(':nickname')
  async findProfile(@Param('nickname') nickname: string) {
    const profile = await this.profileService.findByNickname(nickname);

    if (profile == null) {
      throw new NotFoundException(
        `Não conseguimos encontrar o perfil de ${nickname}.`,
      );
    }

    return ProfileMapper.toHTTP(profile);
  }

  @Patch('/me')
  async patchProfile(
    @CurrentUser() { nickname }: { nickname: string },
    @Body(new ZodValidationPipe(updateProfileSchema))
    body: UpdateProfileRequest,
  ) {
    const cleanBody = ProfileMapper.filterPatchBody(body);
    const profile = await this.profileService.update(nickname, cleanBody);

    return ProfileMapper.toHTTP(profile);
  }

  @Patch('/me/icon')
  @UseInterceptors(FileInterceptor('file', { storage: profilePictureStorage }))
  async patchProfileImage(
    @CurrentUser() { nickname }: { nickname: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    const iconUrl =
      this.configService.getOrThrow('API_URL') + '/' + file.filename;

    const profile = await this.profileService.update(nickname, { iconUrl });

    return ProfileMapper.toHTTP(profile);
  }
}
