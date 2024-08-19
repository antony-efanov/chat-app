import { ReactNode } from "react";
import { SocketProvider } from "@/infrastructure/providers/SocketProvider";

export default async function ChatLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <SocketProvider>{children}</SocketProvider>;
}
