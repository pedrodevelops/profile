import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { configOptions } from './config/env.config';
import { jwtOptions } from './config/jwt.config';
import { AuthGuardProvider } from './modules/auth/auth.providers';
import { ServeStaticModule } from '@nestjs/serve-static';
import { serveStaticOptions } from './config/serve-static.config';

@Module({
  imports: [
    AuthModule,
    ProfileModule,
    JwtModule.registerAsync(jwtOptions),
    ConfigModule.forRoot(configOptions),
    ServeStaticModule.forRoot(serveStaticOptions),
  ],
  controllers: [],
  providers: [AuthGuardProvider],
})
export class AppModule {}
