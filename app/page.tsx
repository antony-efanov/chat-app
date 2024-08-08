"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex h-screen">
      <button onClick={() => router.push("/auth/login")}>Sign in</button>
    </main>
  );
}
