import React from "react";
import { SignIn } from "@/components/SignIn";

export default function Home() {
  return (
    <main className="flex h-screen">
      <section className="flex-1 bg-amber-50"></section>
      <section className="flex flex-1 justify-center items-center">
        <SignIn />
      </section>
    </main>
  );
}
