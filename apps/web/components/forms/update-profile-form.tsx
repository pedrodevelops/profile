"use client";

import { UpdateProfileInput, updateProfileSchema } from "@profile/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormBox,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormTitle,
  Textarea,
  useToast,
} from "@profile/ui";
import { Button, Input } from "@profile/ui";
import { ApiError } from "@web/errors";
import {
  GetProfileResponse,
  profileService,
} from "@web/services/profile.service";
import * as React from "react";
import { ExternalLinkIcon, SaveIcon, UploadIcon, XIcon } from "lucide-react";
import { AddTagDialog } from "../dialogs/add-tag-dialog";
import { AddSocialMediaDialog } from "../dialogs/add-social-media-dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function UpdateProfileForm() {
  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
  });

  const { toast } = useToast();
  const router = useRouter();

  const [profile, setProfile] = React.useState<GetProfileResponse>();
  const [error, setError] = React.useState<string>();
  const [file, setFile] = React.useState<File | null>(null);

  React.useEffect(() => {}, [profile]);

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfile("me");
        setProfile(data);
      } catch (err) {
        if (err instanceof ApiError) {
          if ([401, 403, 404].includes(err.code)) {
            router.push("/auth/sign-in");
          }
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (profile == undefined) {
    return <p>Loading...</p>;
  }

  async function onSubmit(data: UpdateProfileInput) {
    const validUpdateAttempt = updateProfileSchema.safeParse({
      ...data,
      tags: profile?.tags,
      socials: profile?.socials,
    });

    if (validUpdateAttempt.success == false) {
      return toast({
        title: "Por favor, revise os campos.",
        description: validUpdateAttempt.error.errors[0].message,
        variant: "destructive",
      });
    }

    try {
      const body = validUpdateAttempt.data;
      await profileService.updateProfile(body);

      if (file) {
        await profileService.updateProfilePicture(file);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        return toast({
          title: "Erro ao atualizar perfil",
          description: error.message,
          variant: "destructive",
        });
      }

      return toast({
        title: "Erro ao atualizar perfil",
        description:
          "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    }

    toast({
      title: "Atualização realizada com sucesso ✅",
      description: (
        <p>
          Você já pode ver suas alterações no seu{" "}
          <Link className="font-bold underline" href={`/${profile?.username}`}>
            perfil
          </Link>
        </p>
      ),
    });
  }

  return (
    <Form {...form}>
      <FormBox>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormTitle>Atualize seu perfil</FormTitle>
          <div className="grid grid-flow-col gap-8 grid-cols-2 grid-rows-2">
            <FormItem>
              <FormLabel>Ícone</FormLabel>
              <FormControl>
                <Input
                  id="picture"
                  type="file"
                  onChange={(e) => {
                    if (e?.target.files) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                Adicione uma imagem para seu perfil.
              </FormDescription>
              <FormMessage />
            </FormItem>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>Fale um pouco sobre você.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-4">
              <FormLabel>Suas tags</FormLabel>
              <ul className="flex gap-2 flex-wrap">
                {profile.tags.length > 0 ? (
                  profile.tags.map((tag) => (
                    <div
                      key={tag}
                      className="pl-3 py-1 pr-0 flex gap-4 items-center rounded border"
                    >
                      <p className="text-sm font-semibold">{tag}</p>
                      <Button
                        onClick={() => {
                          setProfile({
                            ...profile,
                            tags: profile.tags.filter((t) => t !== tag),
                          });
                        }}
                        variant="ghost"
                        className="rounded-full"
                        size="sm"
                        type="button"
                      >
                        <XIcon size={16} />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Nenhuma tag adicionada
                  </p>
                )}
              </ul>
              <AddTagDialog setProfile={setProfile} profile={profile} />
            </div>

            <div className="space-y-4">
              <FormLabel>Suas redes sociais</FormLabel>
              <ul className="flex gap-2 flex-wrap">
                {profile.socials.length > 0 ? (
                  profile.socials.map((socialMedia) => (
                    <div
                      key={socialMedia.url}
                      className="pl-3 py-1 pr-0 flex gap-4 items-center rounded border"
                    >
                      <p className="text-sm font-semibold">
                        {socialMedia.media}
                      </p>
                      <Button
                        onClick={() => {
                          setProfile({
                            ...profile,
                            socials: profile.socials.filter(
                              (s) => s !== socialMedia
                            ),
                          });
                        }}
                        variant="ghost"
                        className="rounded-full"
                        size="sm"
                        type="button"
                      >
                        <XIcon size={16} />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Nenhuma rede social adicionada
                  </p>
                )}
              </ul>
              <AddSocialMediaDialog setProfile={setProfile} profile={profile} />
            </div>
          </div>
          <div className="flex gap-4">
            <Button className="flex gap-2" type="submit">
              Salvar alterações
              <SaveIcon size={16} />
            </Button>
            <Link href={`/${profile.username}`}>
              <Button variant="link" className="flex gap-2" type="submit">
                Visitar seu perfil
                <ExternalLinkIcon size={16} />
              </Button>
            </Link>
          </div>
        </form>
      </FormBox>
    </Form>
  );
}
