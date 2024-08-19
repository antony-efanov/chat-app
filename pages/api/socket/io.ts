import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponseServerIo } from "@/types";
import { Socket } from "socket.io/dist/socket";
import { Room } from "@/types/Room";
import { Message } from "@/types/Message";

export const config = {
  api: {
    bodyParser: false,
  },
};

const rooms: Room[] = [];

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io: ServerIO = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    // Authorized user joins any chat room
    io.on("connection", (socket: Socket) => {
      socket.on("room joined", ({ roomId, user }) => {
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
      });

      socket.on("message", (message: Message) => {
        socket.to(message.toRoomId).emit("message", message);
      });

      socket.on("disconnect", (reason) => {
        // TODO: do something
      });
    });
  }

  res.end();
};

export default ioHandler;
