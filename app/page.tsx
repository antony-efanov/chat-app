"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex justify-center items-center h-screen">
      <Button onClick={() => router.push("/chat")}>Back to chat!</Button>
    </main>
  );
}
