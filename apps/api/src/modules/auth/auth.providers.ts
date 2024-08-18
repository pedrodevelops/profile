import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

export const AuthGuardProvider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};
