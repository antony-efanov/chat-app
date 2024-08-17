"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useSocket } from "@/infrastructure/providers/SocketProvider";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { RoomsDialog } from "@/app/chat/_components/rooms-dialog";

type Message = {
  text: string;
  clientId: string;
};

const colors = [
  "text-yellow-500",
  "text-orange-500",
  "text-red-500",
  "text-lime-500",
  "text-green-500",
];

const isMyMessage = (
  myClientId: string | undefined,
  messageClientId: string,
): boolean => {
  return myClientId === messageClientId;
};

export default function Chat() {
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState("");
  const { socket, isConnected } = useSocket();
  const user = useCurrentUser();

  const randomColor = useMemo(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  const randomColor2 = useMemo(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  const scrollToBottom = () => {
    if (messagesRef?.current) {
      setTimeout(() => {
        if (messagesRef.current) {
          messagesRef.current.scrollTop =
            messagesRef?.current.scrollHeight -
            messagesRef?.current.clientHeight;
        }
      }, 0);
    }
  };

  const sendMessage = () => {
    // @ts-ignore
    const newMessage: Message = { text: value, clientId: user?.id };
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
        <Button onClick={() => signOut({ callbackUrl: "/auth/login" })}>
          Sign out
        </Button>
      </div>
      <div
        ref={messagesRef}
        style={{ float: "left", clear: "both" }}
        className="flex  flex-col gap-2 mb-auto mt-8 w-full h-96 overflow-y-auto border p-4 rounded-xl border-blue-300"
      >
        {messages.map((message, index) => {
          return (
            <div key={index}>
              <b
                className={
                  isMyMessage(user?.id, message.clientId)
                    ? randomColor
                    : randomColor2
                }
              >
                {user?.name}:{" "}
              </b>
              <span>{message.text}</span>
            </div>
          );
        })}
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
        <RoomsDialog />
        <Button
          onClick={sendMessage}
          variant="default"
          className="h-[60px] w-20 flex-shrink-0"
        >
          Send
        </Button>
      </div>
    </main>
  );
}
