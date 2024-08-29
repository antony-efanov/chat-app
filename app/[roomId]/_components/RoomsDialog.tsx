import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { getRooms } from '@/actions/getRooms';
import { Room } from '@prisma/client';
import { useParams } from 'next/navigation';

export const RoomsDialog = () => {
    const [rooms, setRooms] = useState<Room[] | null>([]);

    useEffect(() => {
        getRooms().then((rooms) => {
            setRooms(rooms);
        });
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    className="h-[60px] w-20 flex-shrink-0 bg-emerald-500 hover:bg-emerald-400"
                >
                    Rooms
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Browse rooms</DialogTitle>
                    <DialogDescription>
                        Search for room to chat
                    </DialogDescription>
                    <div className="flex gap-1 rounded-md">
                        {rooms?.map((room) => {
                            return <RoomComponent key={room.id} room={room} />;
                        })}
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <Button>Create room</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const RoomComponent = ({ room }: { room: Room }) => {
    const params = useParams();

    console.log();

    return (
        <div className="w-full p-1.5 rounded-md bg-emerald-50 flex justify-between items-center">
            <span>{room.title}</span>
            <Button variant="link" disabled={params?.roomId === room.id}>
                {params?.roomId === room.id ? 'Joined' : 'Join'}
            </Button>
        </div>
    );
};
