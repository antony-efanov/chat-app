'use client';

import React, { useEffect, useState } from 'react';
import { RoomComponent } from '@/app/[roomId]/_components/RoomComponent';
import { useParams } from 'next/navigation';
import { getRoomById } from '@/actions/rooms/getRoomById';
import { Room } from '@prisma/client';

function RoomController() {
    const [loading, setLoading] = useState(true);
    const [room, setRoom] = useState<Room | null>(null);
    const params = useParams();

    useEffect(() => {
        getRoomById(params?.roomId as string)
            .then((room) => setRoom(room))
            .finally(() => setLoading(false));
    }, [params?.roomId]);

    return (
        <>
            {loading || !room ? (
                <div>Loading...</div>
            ) : (
                <RoomComponent room={room} />
            )}
        </>
    );
}

export default RoomController;
