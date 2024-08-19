import { RESERVED_NICKNAMES } from "@profile/constants";
import * as z from "zod";

export const signUpSchema = z.object({
  nickname: z
    .string({ message: "O apelido é obrigatório." })
    .min(3, { message: "O apelido deve ter pelo menos 3 caracteres." })
    .max(32, { message: "O apelido deve ter no máximo 32 caracteres." })
    .refine(refineNickname, {
      message: "Este apelido é reservado. Por favor, escolha outro.",
    }),
  email: z
    .string({ message: "O e-mail é obrigatório." })
    .email({ message: "O e-mail deve ser válido." }),
  password: z
    .string({ message: "A senha é obrigatória." })
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
    .max(32, { message: "A senha deve ter no máximo 32 caracteres." }),
});

export const signInSchema = z.object({
  nickname: z
    .string({ message: "O apelido é obrigatório." })
    .min(3, { message: "O apelido deve ter pelo menos 3 caracteres." })
    .max(32, { message: "O apelido deve ter no máximo 32 caracteres." })
    .refine(refineNickname, {
      message: "Este apelido é reservado, informe um apelido válido.",
    }),
  password: z
    .string({ message: "A senha é obrigatória." })
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
    .max(32, { message: "A senha deve ter no máximo 32 caracteres." }),
});

function refineNickname(value: string) {
  return !RESERVED_NICKNAMES.includes(
    value as (typeof RESERVED_NICKNAMES)[number]
  );
}
