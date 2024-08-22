import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ZodExceptionFilter } from './common/filters/zod-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalFilters(new ZodExceptionFilter());
  app.use(cookieParser());
  app.enableCors({
    origin: configService.getOrThrow('WEB_APP_URL'),
    credentials: true,
  });
  await app.listen(parseInt(configService.getOrThrow('API_PORT')));
}
bootstrap();
