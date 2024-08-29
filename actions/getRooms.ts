'use server';

import { db } from '@/lib/db';
import { Room } from '@prisma/client';

export const getRooms = async (): Promise<Room[] | null> => {
    try {
        const rooms = await db.room.findMany();
        return rooms || [];
    } catch {
        return null;
    }
};
