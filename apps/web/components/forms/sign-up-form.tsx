"use client";

import { signUpSchema } from "@profile/validations";
import { useForm } from "react-hook-form";
import { unknown, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@web/services/auth.service";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useToast,
} from "@profile/ui";
import { Button, Input } from "@profile/ui";
import { ApiError } from "@web/errors";
import Link from "next/link";

type SignUpSchema = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const { toast } = useToast();

  async function onSubmit(data: SignUpSchema) {
    try {
      const user = await authService.signUp(data);
      toast({
        title: "Conta criada com sucesso!",
        description: `Bem-vindo, ${user.name}!`,
      });
    } catch (error) {
      console.log(error);
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
    <div className="m-auto border p-6 rounded-lg drop-shadow-2xl">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <p className="text-xl font-bold">Crie seu perfil</p>
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
      </Form>
    </div>
  );
}
