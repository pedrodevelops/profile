import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@profile/ui/utils";
import "./globals.css";
import { Toaster } from "@profile/ui";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Construa sua presença digital com um cartão de apresentação digital único e personalizável.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-background'")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
