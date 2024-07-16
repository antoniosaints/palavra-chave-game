import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketIOServer } from 'socket.io';
import path from 'path';
import router from './routes/router';
import { managerCards } from './ws/managerCards';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
  },
});

const getHtml = (fileName: any): any => {
  return path.join(__dirname, 'public/', fileName + '.html');
}

app.use(express.static(path.resolve(__dirname, 'public')));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(getHtml("gameboard"));
});
// Configuração do Socket.IO
io.on('connection', (socket) => {
  console.log('Novo cliente conectado ' + socket.id);

  managerCards(io, socket);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Porta do servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
