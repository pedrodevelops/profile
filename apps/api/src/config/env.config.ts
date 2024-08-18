import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  API_PORT: z.string(),
  API_URL: z.string().url(),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).optional(),
  JWT_SECRET: z
    .string()
    .min(32, 'JWT_SECRET must be at least 32 characters long'),
  WEB_APP_URL: z.string().url(),
});

export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  validate: (config) => {
    const parsed = envSchema.safeParse(config);
    if (parsed.success == false) {
      throw new Error(`Config validation error: ${parsed.error.message}`);
    }
    return parsed.data;
  },
};
