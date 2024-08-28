import {Message} from "@/types/Message";
import {SessionUser} from "@/hooks/useCurrentUser";

export interface ServerToClientEvents {
    roomJoined: ({ roomId, user }: { roomId: string, user: SessionUser | null }) => void
    message: (message: Message) => void
}

export interface ClientToServerEvents {
    roomJoined: ({ roomId, user }: { roomId: string, user: SessionUser | null }) => void
    message: (message: Message) => void
}