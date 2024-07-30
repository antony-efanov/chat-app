"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import {
  SocketProvider,
  useSocket,
} from "@/components/providers/SocketProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SocketProvider>{children}</SocketProvider>
      </body>
    </html>
  );
}
