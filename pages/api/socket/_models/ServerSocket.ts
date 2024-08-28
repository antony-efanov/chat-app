import { Server as HTTPServer } from 'http'
import { Socket, Server, ServerOptions } from 'socket.io'
import { ClientToServerEvents, ServerToClientEvents } from '@/types/Socket'
import { Message } from '@/types/Message'
import { Room } from '@/types/Room'

const rooms: Room[] = []

const SERVER_OPTIONS: Partial<ServerOptions> = {
    path: '/api/socket/io',
    addTrailingSlash: false,
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
    cors: {
        origin: '*',
    },
}

export class ServerSocket {
    public static _instance: ServerSocket
    public _io: Server

    public _users: { [uid: string]: string }

    constructor(server: HTTPServer) {
        ServerSocket._instance = this
        this._users = {}
        this._io = new Server<
            ClientToServerEvents,
            ServerToClientEvents,
            {},
            any
        >(server, SERVER_OPTIONS)

        this._io.on('connect', this.startListeners)
        this._io.engine.on('connection', (rawSocket) => {
            rawSocket.request = null
        })
    }

    private startListeners = (socket: Socket): void => {
        socket.on('roomJoined', ({ roomId, user }) => {
            const existingRoom = rooms.find((room) => room.id === roomId)

            const socketUser = {
                id: user.id,
                name: user.name,
            }

            if (!existingRoom) {
                rooms.push({ id: roomId, users: [socketUser] })
            } else {
                existingRoom.users.push(socketUser)
            }

            socket.join(roomId)

            socket.broadcast.to(roomId).emit('roomJoined', { roomId, user })
        })

        socket.on('message', (message: Message) => {
            socket.broadcast.to(message.toRoomId).emit('message', message)
        })
    }
}
