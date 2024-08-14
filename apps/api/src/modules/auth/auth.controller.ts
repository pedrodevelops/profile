import { Body, Controller, Post, Response } from '@nestjs/common';
import { IsPublic } from './decorators/is-public.decorator';
import { SignInInput, SignUpInput } from '@profile/validations/auth';
import { AuthService } from './auth.service';
import { Response as ExpressResponse } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('sign-in')
  async signIn(@Body() body: SignInInput, @Response() res: ExpressResponse) {
    const { token, ...user } = await this.authService.signIn(
      body.name,
      body.password,
    );

    res.cookie('Authorization', `Bearer ${token}`, {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.json(user);
  }

  @IsPublic()
  @Post('sign-up')
  async signUp(@Body() body: SignUpInput, @Response() res: ExpressResponse) {
    const { token, ...user } = await this.authService.signUp(
      body.name,
      body.email,
      body.password,
    );

    res.cookie('Authorization', `Bearer ${token}`, {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.json(user);
  }
}
