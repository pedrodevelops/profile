import { Injectable } from '@nestjs/common';
import { HealthResponse } from '@profile/validations/auth';

@Injectable()
export class AppService {
  getHealth(): HealthResponse {
    return {
      status: 'UP',
      uptime: 2345.789,
      timestamp: new Date().toISOString(),
      environment: 'development',
    };
  }
}
