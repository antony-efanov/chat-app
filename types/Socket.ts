import {Message} from "@/types/Message";
import {SessionUser} from "@/hooks/use-current-user";

export interface ServerToClientEvents {
    message: (message: Message) => void
    noArg: () => void;
    basicEmit: ({a, b, c}: {a: number, b: string, c: Buffer}) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
    roomJoined: ({ roomId, user }: { roomId: string, user: SessionUser | null }) => void
    message: (message: Message) => void
}