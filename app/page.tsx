"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { getDefaultRoomId } from "@/actions/getDefaultRoomId";

export default function Home() {
  const router = useRouter();

  const onClickHandler = async () => {
    const roomId = await getDefaultRoomId();
    router.push(`/${roomId}`);
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <Button onClick={onClickHandler}>Back to chat!</Button>
    </main>
  );
}
