"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@/components/providers/SocketProvider";

type Message = {
    text: string;
    clientId: string;
};

const isMyMessage = (myClientId: string | null, messageClientId: string): boolean => {
    return myClientId === messageClientId
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [value, setValue] = useState("")
  const { socket, clientId, isConnected } = useSocket();

  const onClickSend = () => {
      // @ts-ignore
      const newMessage: Message = { text: value, clientId };
      // @ts-ignore
      socket.emit("message", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setValue("");
  }

    useEffect(() => {
        socket?.on("message", (message: Message) => {
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
            return <div key={index} className={isMyMessage(clientId, message.clientId) ? "text-green-400" : "text-yellow-300"}>{message.text}</div>
        })}</div>
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <button onClick={onClickSend}>Send</button>
        </div>
    </main>
  );
}
