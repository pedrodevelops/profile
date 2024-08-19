import z from "zod";
import { SUPPORTED_PLATFORMS, TRUSTED_DOMAINS } from "@profile/constants";

export const createProfileSchema = z.object({
  bio: z
    .string({ message: "A bio deve ser uma string." })
    .max(255, { message: "A bio deve ter no máximo 255 caracteres." }),
  socials: z
    .array(
      z
        .object({
          platform: z
            .string({ message: "A plataforma é obrigatória." })
            .toLowerCase()
            .max(32, {
              message: "A plataforma deve ter no máximo 32 caracteres.",
            })
            .refine(refinePlatform, {
              message: "A plataforma não é suportada",
            }),
          url: z
            .string({ message: "A URL é obrigatória." })
            .url({
              message: "A URL deve ser válida.",
            })
            .refine(refineUrl, { message: "A URL não é confiável." }),
        })
        .refine((obj) => obj.url.includes(obj.platform), {
          message: "URL inválida para a rede social informada.",
        })
    )
    .max(10, { message: "Você pode adicionar no máximo 10 redes sociais." }),
  tags: z
    .array(
      z
        .string({ message: "A tag deve ser uma string." })
        .toLowerCase()
        .min(3, { message: "A tag deve ter no mínimo 3 caracteres." })
        .max(16, { message: "A tag deve ter no máximo 16 caracteres." }),
      { message: "Tags inválidas." }
    )
    .max(15, { message: "Você pode adicionar no máximo 10 tags." })
    .refine(refineTags, { message: "Tags repetidas." }),
});

export const updateProfileSchema = createProfileSchema.partial();

function refinePlatform(value: string) {
  return SUPPORTED_PLATFORMS.includes(
    value.toLowerCase() as (typeof SUPPORTED_PLATFORMS)[number]
  );
}

function refineUrl(value: string) {
  return TRUSTED_DOMAINS.includes(
    new URL(value).hostname as (typeof TRUSTED_DOMAINS)[number]
  );
}

function refineTags(value: string[]) {
  // Check if all tags are unique
  return value.length === new Set(value).size;
}
