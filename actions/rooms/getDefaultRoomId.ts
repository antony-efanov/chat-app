"use server";

import { db } from "@/lib/db";
import { Room } from "@prisma/client";

export const getDefaultRoomId = async (): Promise<string | null> => {
  try {
    const room = (await db.room.findFirst({
      where: { id: "system-1" },
    })) as Room | null;

    if (room) {
      return room.id;
    }

    return null;
  } catch {
    return null;
  }
};
