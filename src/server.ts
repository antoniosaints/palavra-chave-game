import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketIOServer } from 'socket.io';
import path from 'path';
import { managerCards } from './ws/managerCards';
import router from './routes/router';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
  },
});

export const getHtml = (fileName: any): any => {
  return path.join(__dirname, '../public/', fileName + '.html');
}

// Middleware
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

io.on('connection', (socket) => {
  console.log('Novo cliente conectado ' + socket.id);
  managerCards(io, socket);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
