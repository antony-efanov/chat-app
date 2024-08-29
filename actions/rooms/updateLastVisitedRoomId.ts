'use server';

import { db } from '@/lib/db';
import { User } from '@prisma/client';

type Args = {
    userId: string;
    roomId: string;
};

export const updateLastVisitedRoom = async ({
    userId,
    roomId,
}: Args): Promise<User> => {
    return db.user
        .update({
            where: { id: userId },
            data: { lastVisitedRoomId: roomId },
        })
        .catch(() => {
            throw new Error('User was not found!');
        });
};
