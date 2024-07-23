import { Server as SocketIOServer } from "socket.io";
import { managerCards } from "./managerCards";
export const openConnectionWithSocket = (serverHttp: any) => {
    const io = new SocketIOServer(serverHttp, {
      cors: {
        origin: "*",
      },
    });

    io.on('connection', (socket) => {
        managerCards(io, socket);
    });
}
