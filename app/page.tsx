"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@/components/providers/SocketProvider";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([])
  const [value, setValue] = useState("")
  const { socket, isConnected } = useSocket();

  const onClickSend = () => {
      // @ts-ignore
      socket?.emit("message", value);
      setMessages((prev) => [...prev, value])
      setValue("")
  }

    useEffect(() => {
        socket?.on("message", (message) => {
            setMessages((prev) => [...prev, message])
        })
    }, [socket]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isConnected ? (
        <div className="text-green-400">Connected</div>
      ) : (
        <div className="text-yellow-300">Not connected</div>
      )}
        <div>{messages.map((message, index) => {
            return <div key={index}>{message}</div>
        })}</div>
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <button onClick={onClickSend}>Send</button>
        </div>
    </main>
  );
}
