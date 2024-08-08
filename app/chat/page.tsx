"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { useSocket } from "@/infrastructure/providers/SocketProvider";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Message = {
  text: string;
  clientId: string;
};

const isMyMessage = (
  myClientId: string | null,
  messageClientId: string,
): boolean => {
  return myClientId === messageClientId;
};

export default function Chat() {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState("");
  const { socket, clientId, isConnected } = useSocket();

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    // @ts-ignore
    const newMessage: Message = { text: value, clientId };
    // @ts-ignore
    socket.emit("message", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setValue("");
    scrollToBottom();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    socket?.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, [socket]);

  return (
    <main className="flex min-h-screen flex-col justify-between p-4">
      <div className="flex items-center justify-between">
        <Badge
          className={cn(
            "select-none w-fit",
            isConnected
              ? "bg-green-800 hover:bg-green-800 "
              : "bg-yellow-700 hover:bg-yellow-700 ",
          )}
        >
          {isConnected ? "Connected" : "Not connected"}
        </Badge>
        <div>
          <form action="./api/db/data" method="post">
            <label htmlFor="name">Enter Name </label>
            <input type="text" name="name" id="name" />

            <label htmlFor="age"> Enter Age </label>
            <input type="text" name="age" id="age" />

            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
      <div
        style={{ float: "left", clear: "both" }}
        className="flex flex-col gap-2 mb-auto mt-8 w-full h-96 overflow-y-auto border p-4 rounded-2xl border-blue-300"
      >
        {messages.map((message, index) => {
          return (
            <div
              key={index}
              className={cn(
                "flex w-fit text-white bg-gray-700 p-2 rounded-md",
                isMyMessage(clientId, message.clientId)
                  ? "bg-green-900 ml-auto"
                  : "bg-gray-700",
              )}
            >
              {message.text}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex w-full gap-4">
        <Textarea
          onKeyDown={handleKeyDown}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ resize: "none" }}
          className="border-blue-300"
          placeholder="Булкозавр..."
        />
        <Button
          variant="default"
          className="w-20 flex-shrink-0 bg-emerald-500 hover:bg-emerald-400"
        >
          Shop
        </Button>
        <Button
          onClick={sendMessage}
          variant="default"
          className="w-20 flex-shrink-0"
        >
          Send
        </Button>
      </div>
    </main>
  );
}
