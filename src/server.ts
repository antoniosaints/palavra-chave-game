import express from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import router from './routes/router';
import { openConnectionWithSocket } from './ws/socket';

const app = express();
const server = http.createServer(app);
openConnectionWithSocket(server);
export const getHtml = (fileName: any): any => {
  return path.join(__dirname, '../public/', fileName + '.html');
}

// Middleware
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
