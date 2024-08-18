import z from "zod";
import {
  SUPPORTED_SOCIAL_MEDIAS,
  SocialMedia,
  TRUSTED_DOMAINS,
  TrustedDomain,
} from "@profile/constants";

export const createProfileSchema = z.object({
  bio: z
    .string({ message: "A bio deve ser uma string." })
    .max(255, { message: "A bio deve ter no máximo 255 caracteres." }),
  socials: z
    .array(
      z
        .object({
          media: z
            .string({ message: "A mídia social é obrigatória." })
            .toLowerCase()
            .max(32, {
              message: "A mídia social deve ter no máximo 32 caracteres.",
            })
            .refine(
              (value) =>
                SUPPORTED_SOCIAL_MEDIAS.includes(
                  value.toLowerCase() as SocialMedia
                ),
              { message: "A mídia social não é suportada" }
            ),
          url: z
            .string({ message: "A URL é obrigatória." })
            .url({
              message: "A URL deve ser válida.",
            })
            .refine(
              (value) => {
                const url = new URL(value);

                return (
                  url.protocol == "https:" &&
                  TRUSTED_DOMAINS.includes(url.hostname as TrustedDomain)
                );
              },
              { message: "A URL não é confiável." }
            ),
        })
        .refine((obj) => obj.url.includes(obj.media), {
          message: "URL inválida para a rede social informada.",
        })
    )
    .max(10, { message: "Você pode adicionar no máximo 10 mídias sociais." }),
  tags: z
    .array(
      z
        .string({ message: "A tag deve ser uma string." })
        .toLowerCase()
        .min(3, { message: "A tag deve ter no mínimo 3 caracteres." })
        .max(16, { message: "A tag deve ter no máximo 16 caracteres." }),
      { message: "Tags inválidas." }
    )
    .max(15, { message: "Você pode adicionar no máximo 10 tags." }),
});

export const updateProfileSchema = createProfileSchema.partial();

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export type UpdateProfileResponse = {
  username: string;
  bio: string;
  image: string;
  socials: {
    media: SocialMedia;
    url: string;
  }[];
  tags: string[];
};

export type CreateProfileInput = z.infer<typeof createProfileSchema>;

export type ProfileSocialMedia = {
  media: string;
  url: string;
};

export type Profile = {
  id: string;
  username: string;
  bio: string;
  iconUrl: string;
  socials: Array<ProfileSocialMedia>;
  tags: Array<string>;
};
