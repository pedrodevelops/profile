import { z } from "zod";

// TODO: Verify this server-side environment variables somewhere, since
// these are not available in client-side code.
const envSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.string(),
  API_URL: z.string(),
  WEB_APP_URL: z.string(),
});

const parseAttempt = envSchema.safeParse(process.env);

if (parseAttempt.success == false) {
  throw new Error("Invalid environment variables: ");
}

export const env = parseAttempt.data;
