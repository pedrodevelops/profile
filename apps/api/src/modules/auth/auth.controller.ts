import { Body, Controller, Post, Response, UsePipes } from '@nestjs/common';
import { IsPublic } from './decorators/is-public.decorator';
import {
  SignInInput,
  signInSchema,
  SignUpInput,
  signUpSchema,
} from '@profile/validations';
import { AuthService } from './auth.service';
import { Response as ExpressResponse } from 'express';
import { ZodValidationPipe } from '@api/common/pipes/zod-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('sign-in')
  @UsePipes(new ZodValidationPipe(signInSchema))
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
  @UsePipes(new ZodValidationPipe(signUpSchema))
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
