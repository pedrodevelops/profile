"use client";

import { signUpSchema } from "@profile/validations";
import { SignUpRequest } from "@profile/types";
import { useForm } from "react-hook-form";
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
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const form = useForm<SignUpRequest>({
    resolver: zodResolver(signUpSchema),
  });

  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(data: SignUpRequest) {
    try {
      const user = await authService.signUp(data);
      toast({
        title: "Conta criada com sucesso!",
        description: `Bem-vindo, ${user.nickname}!`,
      });

      router.push("/edit");
    } catch (error) {
      if (error instanceof ApiError) {
        return toast({
          title: "Erro ao criar conta",
          description: error.message,
          variant: "destructive",
        });
      }

      toast({
        title: "Erro ao criar conta",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <FormBox>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormTitle>Crie seu perfil</FormTitle>
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apelido</FormLabel>
                <FormControl>
                  <Input placeholder="pedrodevelops" {...field} />
                </FormControl>
                <FormDescription>
                  Seu apelido é único e será usado como link para seu perfil.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="hey@pedrodevelops.com" {...field} />
                </FormControl>
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
              Registrar
            </Button>
            <Link href="/auth/sign-in">
              <Button className="w-full" variant="link">
                Já tem uma conta? Faça login.
              </Button>
            </Link>
          </div>
        </form>
      </FormBox>
    </Form>
  );
}
