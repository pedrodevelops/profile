import { Button } from "@profile/ui";
import { ArrowRightIcon, EarthIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <main className="max-w-3xl">
        <h1 className="text-5xl font-extrabold text-left leading-tight text-primary mb-8">
          Construa sua presença digital com um{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            cartão de apresentação digital
          </span>{" "}
          único e personalizável.
        </h1>

        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
          <span className="font-semibold text-primary">Profile</span> é uma
          plataforma que permite você criar um cartão de apresentação digital
          para compartilhar links para suas redes sociais, e um pouco sobre
          você.
        </p>

        <div className="flex gap-4">
          <Link href="/auth/sign-up">
            <Button className="flex  text-md gap-2 bg-primary text-primary-foreground hover:bg-primary-dark transition">
              <p>Criar meu perfil</p>
              <ArrowRightIcon size={20} />
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" className="flex  text-md gap-2 ">
              <p>Explorar</p>
              <EarthIcon size={20} />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
