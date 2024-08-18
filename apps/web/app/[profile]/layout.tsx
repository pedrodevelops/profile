import { Button, Logo } from "@profile/ui";
import { EditIcon } from "lucide-react";
import Link from "next/link";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="absolute right-0 top-0 p-2 flex items-end">
        <Link href="/edit">
          <Button className="flex gap-2">
            <p>Edite seu perfil</p>
            <EditIcon size={16} />
          </Button>
        </Link>
      </header>
      {children}
      <footer className="absolute bottom-0 left-0 w-full py-8 text-center text-muted-foreground">
        <p>
          Feito com{" "}
          <Link href="/">
            <Logo />
          </Link>
        </p>
      </footer>
    </div>
  );
}
