import { db } from '@/lib/db';
import { v4 } from 'uuid';
import { Room } from '@prisma/client';

export const createRoom = async (
    ownerId: string,
    title: string
): Promise<Room | null> => {
    try {
        return await db.room.create({
            data: {
                id: v4(),
                isPrivate: false,
                ownerId,
                title,
            },
        });
    } catch {
        return null;
    }
};
