import { ReactNode } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { cn } from "@/lib/utils/cn";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={cn(inter.className, "h-screen")}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
