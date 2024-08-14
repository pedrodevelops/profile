import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthResponse } from '@profile/validations/auth';
import { IsPublic } from './modules/auth/decorators/is-public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get()
  getHealth(): HealthResponse {
    return this.appService.getHealth();
  }
}
