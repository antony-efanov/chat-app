"use client";

import React, { forwardRef } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Message } from "@/types/Message";

export const Chat = forwardRef<HTMLDivElement, { messages: Message[] }>(
  ({ messages }, ref) => {
    return (
      <div
        ref={ref}
        style={{ float: "left", clear: "both" }}
        className="flex flex-col gap-2 mb-auto mt-8 w-full h-96 overflow-y-auto border p-4 rounded-xl border-blue-300"
      >
        {messages.map((message, index) => (
          <div key={index}>
            <b>{message.sender === "SYSTEM" ? "System" : message.sender.name}: </b>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
    );
  },
);

Chat.displayName = "Chat";
