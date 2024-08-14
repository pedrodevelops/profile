import z from "zod";

export type HealthResponse = {
  status: "UP" | "DOWN";
  timestamp: string;
  uptime: number;
  environment: "development";
};

export const signUpSchema = z.object({
  name: z.string().min(3).max(32),
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  name: z.string().min(3).max(32),
  password: z.string().min(8).max(32),
});

export type SignInInput = z.infer<typeof signInSchema>;
