import { ReactNode } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { SocketProvider } from "@/infrastructure/providers/SocketProvider";
import { SessionProvider } from "next-auth/react";
import { cn } from "@/utils/cn";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "h-full")}>
        <SessionProvider>
          <SocketProvider>{children}</SocketProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
