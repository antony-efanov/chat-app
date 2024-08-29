import { useSession } from 'next-auth/react';

export interface SessionUser {
    id: string;
    name?: string | null;
    email?: string | null;
}

export const useCurrentUser = (): SessionUser => {
    const { data: session } = useSession();

    const user = session?.user as SessionUser;

    return user as SessionUser;
};
