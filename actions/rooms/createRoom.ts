'use server';

import { db } from '@/lib/db';
import { Room } from '@prisma/client';

export const createRoom = async (
    ownerId: string,
    title: string
): Promise<Room | null> => {
    const existingRoom = await db.room.findFirst({ where: { title: title } });

    if (existingRoom) {
        throw new Error('Room with such name already exists');
    } else {
        return db.room
            .create({
                data: {
                    isPrivate: false,
                    ownerId,
                    title,
                },
            })
            .catch(() => null);
    }
};
