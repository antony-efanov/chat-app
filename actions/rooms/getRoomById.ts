'use server';

import { Room } from '@prisma/client';
import { db } from '@/lib/db';

export const getRoomById = async (id: string): Promise<Room | null> => {
    return db.room.findFirst({ where: { id } }).catch(() => null);
};
