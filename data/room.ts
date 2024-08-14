import { db } from "@/lib/db";

export const getSystemRooms = async () => {
  try {
    await db.room.findMany({
      where: {
        id: {
          startsWith: "system",
        },
      },
    });
  } catch {
    return null;
  }
};
