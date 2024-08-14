import * as z from "zod";

export const signUpSchema = z.object({
  name: z
    .string({ message: "O nome é obrigatório." })
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres." })
    .max(32, { message: "O nome deve ter no máximo 32 caracteres." }),
  email: z
    .string({ message: "O e-mail é obrigatório." })
    .email({ message: "O e-mail deve ser válido." }),
  password: z
    .string({ message: "A senha é obrigatória." })
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
    .max(32, { message: "A senha deve ter no máximo 32 caracteres." }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  name: z
    .string({ message: "O nome é obrigatório." })
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres." })
    .max(32, { message: "O nome deve ter no máximo 32 caracteres." }),
  password: z
    .string({ message: "A senha é obrigatória." })
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
    .max(32, { message: "A senha deve ter no máximo 32 caracteres." }),
});

export type SignInInput = z.infer<typeof signInSchema>;
