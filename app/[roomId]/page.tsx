"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { useSocket } from "@/infrastructure/providers/SocketProvider";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { RoomsDialog } from "@/app/[roomId]/_components/rooms-dialog";
import { Message } from "@/types/Message";
import { Chat } from "@/app/[roomId]/_components/chat";
import { useParams } from "next/navigation";

export default function Room() {
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState("");
  const { socket, isConnected } = useSocket();
  const user = useCurrentUser();
  const params = useParams();

  useEffect(() => {
    const roomId = Array.isArray(params?.roomId)
      ? params?.roomId[0]
      : params?.roomId;
    if (roomId) {
      socket?.emit("roomJoined", { roomId, user });
    }
  }, [params?.roomId, socket, user]);

  const scrollToBottom = () => {
    if (messagesRef?.current) {
      setTimeout(() => {
        if (messagesRef.current) {
          if ("scrollTop" in messagesRef.current) {
            messagesRef.current.scrollTop =
              messagesRef?.current.scrollHeight -
              messagesRef?.current.clientHeight;
          }
        }
      }, 0);
    }
  };

  useEffect(() => {
    socket?.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, [socket]);

  const sendMessage = useCallback(() => {
    const newMessage: Message = {
      text: value,
      sender: { id: user?.id, name: user?.name },
      toRoomId: params?.roomId as string,
    };
    socket?.emit("message", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setValue("");
    scrollToBottom();
  }, [socket, value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

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
      <Chat ref={messagesRef} messages={messages} />
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
