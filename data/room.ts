import { db } from "@/lib/db";

export const getSystemRooms = async () => {
  try {
    await db.room.findFirst();
  } catch {
    return null;
  }
};
