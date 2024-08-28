'use client'

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'

import { io as ClientIO } from 'socket.io-client'
import { Socket } from 'socket.io-client'
import { ClientToServerEvents, ServerToClientEvents } from '@/types/Socket'

type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents> | null

type SocketContextType = {
    socket: ClientSocket
    clientId: string | undefined
    isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    clientId: undefined,
    isConnected: false,
})

export const useSocket = (): SocketContextType => {
    return useContext<SocketContextType>(SocketContext)
}

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<ClientSocket>(null)
    const [clientId, setClientId] = useState<string | undefined>(undefined)
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        const socketInstance = ClientIO(process.env.NEXT_PUBLIC_SITE_URL!, {
            path: '/api/socket/io',
            addTrailingSlash: false,
        })

        socketInstance.on('connect', () => {
            setClientId(socketInstance.id)
            setIsConnected(true)
        })

        socketInstance.on('disconnect', () => {
            setIsConnected(false)
        })

        setSocket(socketInstance)

        return () => {
            socketInstance.disconnect()
        }
    }, [])

    return (
        <SocketContext.Provider value={{ socket, clientId, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}
