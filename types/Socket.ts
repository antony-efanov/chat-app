export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: ({a, b, c}: {a: number, b: string, c: Buffer}) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
    hello: ({a, b, c}: {a: number, b: string, c: Buffer}) => void;
}