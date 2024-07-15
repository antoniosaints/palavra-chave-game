import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketIOServer } from 'socket.io';
import router from './infra/server/routes';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: '*',
    },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api', router);

// Configuração do Socket.IO
io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  socket.on('message', (msg) => {
    console.log('Mensagem recebida: ', msg);
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Porta do servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});