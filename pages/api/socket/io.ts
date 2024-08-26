import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponseServerIo } from "@/types";
import { Socket } from "socket.io/dist/socket";
import { Room } from "@/types/Room";
import { Message } from "@/types/Message";
import { ClientToServerEvents, ServerToClientEvents } from "@/types/Socket";

const rooms: Room[] = [];

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io: ServerIO<ClientToServerEvents, ServerToClientEvents, {}, any> = new ServerIO<ClientToServerEvents, ServerToClientEvents>(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    io.engine.on("connection", (rawSocket) => {
      rawSocket.request = null;
    });

    // Authorized user joins any chat room
    io.on("connection", (socket: Socket) => {
      socket.on("roomJoined", ({ roomId, user }) => {
        const existingRoom = rooms.find((room) => room.id === roomId);

        const socketUser = {
          id: user.id,
          name: user.name,
        };

        if (!existingRoom) {
          rooms.push({ id: roomId, users: [socketUser] });
        } else {
          existingRoom.users.push(socketUser);
        }

        socket.join(roomId);

        socket.broadcast.to(roomId).emit("roomJoined", { roomId, user })
      });

      socket.on("message", (message: Message) => {
        socket.broadcast.to(message.toRoomId).emit("message", message);
      });
    });
  }

  res.end();
};

export default ioHandler;
