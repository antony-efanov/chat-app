'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Message } from '@/types/Message';
import { useSocket } from '@/infrastructure/providers/SocketProvider';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/Button';
import { signOut } from 'next-auth/react';
import { Chat } from '@/app/[roomId]/_components/Chat';
import { Textarea } from '@/components/ui/Textarea';
import { RoomsDialog } from '@/app/[roomId]/_components/RoomsDialog';
import { CreateRoomDialog } from '@/app/[roomId]/_components/CreateRoomDialog';
import { observer } from 'mobx-react-lite';
import { Room } from '@prisma/client';
import { User } from '@/types/User';

export const RoomComponent = observer(
    ({ room, roomUsers }: { room: Room; roomUsers: User[] }) => {
        const messagesRef = useRef<HTMLDivElement | null>(null);
        const [messages, setMessages] = useState<Message[]>([]);
        const [value, setValue] = useState('');
        const { socket, isConnected } = useSocket();
        const currentUser = useCurrentUser();
        const params = useParams();

        useEffect(() => {
            const roomId = Array.isArray(params?.roomId)
                ? params?.roomId[0]
                : params?.roomId;
            if (roomId) {
            }
        }, [params?.roomId, socket, currentUser]);

        const scrollToBottom = () => {
            if (messagesRef?.current) {
                setTimeout(() => {
                    if (messagesRef.current) {
                        if ('scrollTop' in messagesRef.current) {
                            messagesRef.current.scrollTop =
                                messagesRef?.current.scrollHeight -
                                messagesRef?.current.clientHeight;
                        }
                    }
                }, 0);
            }
        };

        useEffect(() => {
            socket?.on('message', (message) => {
                setMessages((prev) => [...prev, message]);
            });

            socket?.on('roomJoined', ({ roomId, user }) => {
                if (user?.id !== currentUser?.id) {
                    setMessages((prev) => [
                        ...prev,
                        {
                            sender: 'SYSTEM',
                            toRoomId: roomId,
                            text: `${user?.name} joined room`,
                        },
                    ]);
                }
            });
        }, [socket]);

        const sendMessage = useCallback(() => {
            const newMessage: Message = {
                text: value,
                sender: { id: currentUser?.id, name: currentUser?.name },
                toRoomId: params?.roomId as string,
            };
            socket?.emit('message', newMessage);
            setMessages((prev) => [...prev, newMessage]);
            setValue('');
            scrollToBottom();
        }, [socket, value]);

        const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        };

        return (
            <main className="flex min-h-screen flex-col justify-between p-4">
                <div className="flex items-center justify-between">
                    <Badge
                        className={cn(
                            'select-none w-fit',
                            isConnected
                                ? 'bg-green-800 hover:bg-green-800 '
                                : 'bg-yellow-700 hover:bg-yellow-700 '
                        )}
                    >
                        {isConnected ? 'Connected' : 'Not connected'}
                    </Badge>
                    <h1 className="text-lg">{room?.title}</h1>
                    <Button
                        onClick={() => signOut({ callbackUrl: '/auth/login' })}
                    >
                        Sign out
                    </Button>
                </div>
                <div className="flex mb-auto mt-8 gap-4">
                    <Chat ref={messagesRef} messages={messages} />
                    <div className="border border-blue-300 rounded-xl p-4 min-w-56">
                        {roomUsers.map((user) => {
                            return <div>{user.name}</div>;
                        })}
                    </div>
                </div>
                <div className="flex w-full gap-4">
                    <Textarea
                        onKeyDown={handleKeyDown}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        style={{ resize: 'none' }}
                        className="border-blue-300"
                        placeholder="Булкозавр..."
                    />
                    <Button
                        onClick={sendMessage}
                        variant="default"
                        className="h-[60px] w-20 flex-shrink-0"
                    >
                        Send
                    </Button>
                    <div className="flex">
                        <RoomsDialog />
                        <CreateRoomDialog />
                    </div>
                </div>
            </main>
        );
    }
);
