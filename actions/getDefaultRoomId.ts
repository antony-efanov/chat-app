"use server";

import { db } from "@/lib/db";

export const getDefaultRoomId = async () => {
  try {
    const room = await db.room.findFirst({ where: { id: "system-1" } });
    return room?.id;
  } catch {
    return null;
  }
};
