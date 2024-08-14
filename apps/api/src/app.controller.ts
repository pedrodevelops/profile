import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthResponse } from '@profile/validations/auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(): HealthResponse {
    return this.appService.getHealth();
  }
}
