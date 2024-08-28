import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/types";
import { ServerSocket } from "@/pages/api/socket/_models/ServerSocket";

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const httpServer: NetServer = res.socket.server as any;

    new ServerSocket(httpServer);
  }

  res.end();
};

export default ioHandler;
