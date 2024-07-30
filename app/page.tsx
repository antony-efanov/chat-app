"use client";

import { useSocket } from "@/components/providers/SocketProvider";

export default function Home() {
  const { isConnected } = useSocket();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isConnected ? (
        <div className="text-green-400">Connected</div>
      ) : (
        <div className="text-yellow-300">Not connected</div>
      )}
    </main>
  );
}
