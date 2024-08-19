import { Body, Controller, Post, Response, UsePipes } from '@nestjs/common';
import { IsPublic } from './decorators/is-public.decorator';
import { signInSchema, signUpSchema } from '@profile/validations';
import { SignInRequest, SignUpRequest } from '@profile/types';
import { AuthService } from './auth.service';
import { Response as ExpressResponse } from 'express';
import { ZodValidationPipe } from '@api/common/pipes/zod-validation.pipe';
import { UserMapper } from '../user/user.mapper';
import { UserEntity } from '../user/user.entity';

// TODO: separate auth cookie configs
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('sign-in')
  @UsePipes(new ZodValidationPipe(signInSchema))
  async signIn(@Body() body: SignInRequest, @Response() res: ExpressResponse) {
    const { token, ...user } = await this.authService.signIn(
      body.nickname,
      body.password,
    );

    res.cookie('Authorization', `Bearer ${token}`, {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.json(UserMapper.toHTTP(user as UserEntity));
  }

  @IsPublic()
  @Post('sign-up')
  @UsePipes(new ZodValidationPipe(signUpSchema))
  async signUp(@Body() body: SignUpRequest, @Response() res: ExpressResponse) {
    const { token, ...user } = await this.authService.signUp(
      body.nickname,
      body.email,
      body.password,
    );

    res.cookie('Authorization', `Bearer ${token}`, {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.json(UserMapper.toHTTP(user as UserEntity));
  }
}
