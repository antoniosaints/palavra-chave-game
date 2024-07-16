import { Server as SocketIOServer, Socket } from 'socket.io';
import { AssemblyCards } from '../controllers/assemblyCards';

let quantideJogadores = 0;
const mounCards = () => {
  const assemblyCards = new AssemblyCards();
  let equipeStart = Math.floor(Math.random() * 2) + 1;
  const cardsToIterator = assemblyCards.getCardsWithColors()

  return { equipeStart, cardsToIterator };
}
export const managerCards = (io: SocketIOServer, socket: Socket) => {
  socket.on('message', (msg) => {
    console.log('Mensagem recebida: ', msg);
    io.emit('message', msg);
  });

  socket.on('iniciar_jogo', (action) => {
    const { equipeStart, cardsToIterator } = mounCards();
    io.emit('iniciar_jogo',
      action,
      equipeStart,
      cardsToIterator,
      false
    );
  });

  socket.on('reiniciar_jogo', (action) => {
    const { equipeStart, cardsToIterator } = mounCards();
    io.emit('reiniciar_jogo',
      action,
      equipeStart,
      cardsToIterator,
      false
    );
  });

  socket.on('entrou_partida', () => {
    if (quantideJogadores === 4) {
      io.emit('entrou_partida', `Maximo de jogadores - ${quantideJogadores}`);
      return
    }
    quantideJogadores++;
    io.emit('entrou_partida', quantideJogadores);
  });

  socket.on('trocar_lado', () => {
    io.emit('trocar_lado', true);
  });

  socket.on('selected_this_card', (msg) => {
    io.emit('selected_this_card', msg.uniqId, msg.classeDefined, msg.classe);
  });
};
