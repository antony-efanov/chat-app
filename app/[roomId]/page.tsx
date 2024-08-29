'use client';

import React, { useEffect, useState } from 'react';
import { RoomComponent } from '@/app/[roomId]/_components/RoomComponent';
import { useParams } from 'next/navigation';
import { getRoomById } from '@/actions/rooms/getRoomById';
import { Room } from '@prisma/client';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { useSocket } from '@/infrastructure/providers/SocketProvider';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { User } from '@/types/User';

function RoomController() {
    const { socket } = useSocket();
    const currentUser = useCurrentUser();
    const [loading, setLoading] = useState(true);
    const [room, setRoom] = useState<Room | null>(null);
    const [roomUsers, setRoomUsers] = useState<User[]>([]);
    const params = useParams();

    useEffect(() => {
        const roomId = params?.roomId as string;
        socket?.emit(
            'roomJoined',
            { roomId, user: currentUser },
            (users: User[]) => setRoomUsers(users)
        );

        getRoomById(roomId)
            .then((room) => setRoom(room))
            .finally(() => setLoading(false));
    }, [params?.roomId]);

    return (
        <>
            {loading || !room ? (
                <LoadingScreen />
            ) : (
                <RoomComponent room={room} roomUsers={roomUsers} />
            )}
        </>
    );
}

export default RoomController;
