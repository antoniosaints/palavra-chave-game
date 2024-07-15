import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketIOServer } from 'socket.io';
import { Liquid } from 'liquidjs';
import path from 'path';
import router from './routes/router';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: '*',
    },
});

// Configurar Liquid como o template engine
const engine = new Liquid({
  root: path.resolve(__dirname, 'views/'), // diretório das views
  extname: '.liquid' // extensão dos arquivos de template
});
app.engine('liquid', engine.express()); // definir o engine
app.set('view engine', 'liquid'); // definir a view engine
app.set('views', path.resolve(__dirname, 'views')); // definir o diretório das views

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/home', router);

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
