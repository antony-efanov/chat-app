'use server';

import { db } from '@/lib/db';
import { Room } from '@prisma/client';

export const createRoom = async (
    ownerId: string,
    title: string
): Promise<Room | null> => {
    // TODO: добавить валидацию если такая комната уже есть, кидать ошибку
    try {
        return await db.room.create({
            data: {
                isPrivate: false,
                ownerId,
                title,
            },
        });
    } catch {
        return null;
    }
};
