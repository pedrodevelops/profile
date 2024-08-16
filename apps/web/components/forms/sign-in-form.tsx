"use client";

import { signInSchema } from "@profile/validations";
import { useForm } from "react-hook-form";
import { unknown, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@web/services/auth.service";
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
  useToast,
} from "@profile/ui";
import { Button, Input } from "@profile/ui";
import { ApiError } from "@web/errors";
import Link from "next/link";

type signInSchema = z.infer<typeof signInSchema>;

export function SignInForm() {
  const form = useForm<signInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const { toast } = useToast();

  async function onSubmit(data: signInSchema) {
    try {
      const user = await authService.signIn(data);
      toast({
        title: "Login efetuado com sucesso!",
        description: `Bem-vindo de volta, ${user.name}!`,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        return toast({
          title: "Erro ao fazer login",
          description: error.message,
          variant: "destructive",
        });
      }

      toast({
        title: "Erro ao fazer login",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  }

  return (
    <FormBox>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormTitle>Bem-vindo de volta!</FormTitle>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="pedrodevelops" {...field} />
                </FormControl>
                <FormDescription>
                  Seu nome é único e será usado como link para seu perfil.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-8">
            <Button className="w-full" type="submit">
              Entrar
            </Button>
            <Link href="/auth/sign-up">
              <Button className="w-full" variant="link">
                Ainda não tem uma conta? Crie uma agora.
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </FormBox>
  );
}
