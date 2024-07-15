import { Server as SocketIOServer, Socket } from 'socket.io';

export const managerCards = (io: SocketIOServer, socket: Socket) => {
  socket.on('message', (msg) => {
    console.log('Mensagem recebida: ', msg);
    io.emit('message', msg);
  });
};
