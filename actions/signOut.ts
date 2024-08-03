"use server";

import { signOut as signOutFn } from "@/auth";

export async function signOut() {
  await signOutFn({ redirectTo: "/" });
}
