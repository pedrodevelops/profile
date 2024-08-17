import { Logo } from "@profile/ui";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-fit space-y-4">
      <Link href="/">
        <Logo className="text-3xl" />
      </Link>
      {children}
    </div>
  );
}
