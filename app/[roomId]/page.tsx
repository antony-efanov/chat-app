'use client';

import React, { useEffect, useState } from 'react';
import { RoomComponent } from '@/app/[roomId]/_components/RoomComponent';
import { useParams } from 'next/navigation';
import { getRoomById } from '@/actions/rooms/getRoomById';
import { Room } from '@prisma/client';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { updateLastVisitedRoom } from '@/actions/rooms/updateLastVisitedRoomId';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

function RoomController() {
    const [loading, setLoading] = useState(true);
    const [room, setRoom] = useState<Room | null>(null);
    const params = useParams();
    const currentUser = useCurrentUser();

    useEffect(() => {
        const roomId = params?.roomId as string;

        updateLastVisitedRoom({
            userId: currentUser.id,
            roomId,
        });
        getRoomById(roomId)
            .then((room) => setRoom(room))
            .finally(() => setLoading(false));
    }, [params?.roomId]);

    return (
        <>
            {loading || !room ? (
                <LoadingScreen />
            ) : (
                <RoomComponent room={room} />
            )}
        </>
    );
}

export default RoomController;
