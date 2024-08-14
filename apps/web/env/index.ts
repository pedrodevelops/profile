import { z } from "zod";

const envSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.string(),
  API_URL: z.string(),
  WEB_APP_URL: z.string(),
});

const parseAttempt = envSchema.safeParse(process.env);

if (parseAttempt.success == false) {
  throw new Error("Invalid environment variables", {
    cause: parseAttempt.error,
  });
}

export const env = parseAttempt.data;
