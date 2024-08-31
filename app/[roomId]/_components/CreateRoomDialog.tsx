import React, { useState } from 'react';
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
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { createRoom } from '@/actions/rooms/createRoom';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';

export const CreateRoomDialog = () => {
    const [value, setValue] = useState('');
    const user = useCurrentUser();
    const router = useRouter();

    const onClickHandler = () => {
        createRoom(user?.id!, value)
            .then((room) => {
                router.push(`/${room.id}`);
            })
            .catch((error: Error) => {
                setValue('');
                alert(error.message);
            });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-l-none flex-shrink-0 bg-cyan-500 hover:bg-cyan-400">
                    <PiShoppingCartSimpleBold />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create your room</DialogTitle>
                    <DialogDescription>
                        Search for room to chat
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Label>Room name</Label>
                    <Input
                        minLength={3}
                        placeholder="Party hard"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button
                        onClick={onClickHandler}
                        disabled={value.length <= 3}
                    >
                        Create room
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
