'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { getDefaultRoomId } from '@/actions/rooms/getDefaultRoomId';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { getUserById } from '@/data/user';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

export default function Home() {
    const router = useRouter();
    const user = useCurrentUser();

    useEffect(() => {
        getUserById(user.id).then((user) => {
            const lastVisitedRoomId = user?.lastVisitedRoomId;
            if (user?.lastVisitedRoomId) {
                router.push(`/${lastVisitedRoomId}`);
            } else {
                getDefaultRoomId().then((roomId) => {
                    router.push(`/${roomId}`);
                });
            }
        });
    }, []);

    return (
        <main className="flex justify-center items-center h-screen">
            <LoadingScreen />
        </main>
    );
}
