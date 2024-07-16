import { Server as SocketIOServer, Socket } from 'socket.io';
import { AssemblyCards } from '../controllers/assemblyCards';
type jogadores = {
  id: string,
  funcao: string
}
let jogadores: Array<jogadores> = [];
const mountCardsToFrontend = () => {
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
    const { equipeStart, cardsToIterator } = mountCardsToFrontend();
    io.emit('iniciar_jogo',
      action,
      equipeStart,
      cardsToIterator,
      false
    );
  });

  socket.on('reiniciar_jogo', (action) => {
    const { equipeStart, cardsToIterator } = mountCardsToFrontend();
    io.emit('reiniciar_jogo',
      action,
      equipeStart,
      cardsToIterator,
      false
    );
  });

  socket.on('entrou_partida', (entrou_como) => {
    if (jogadores.length === 4) {
      io.emit('entrou_partida', `Maximo de jogadores - ${jogadores.length}`);
      return
    }
    if (jogadores.find((jogador) => jogador.id === socket.id)) {
      io.emit('entrou_partida', 'Jogador ja se encontra na partida');
      return
    }
    jogadores.push({
      id: socket.id,
      funcao: entrou_como
    });
    console.log(`${socket.id} entrou na partida`);
    io.emit('entrou_partida', jogadores);
  });

  socket.on('trocar_lado', () => {
    io.emit('trocar_lado', true);
  });

  socket.on('selected_this_card', (msg) => {
    io.emit('selected_this_card', msg.uniqId, msg.classeDefined, msg.classe);
  });

  socket.on('disconnect', () => {
    jogadores = jogadores.filter((jogador) => jogador.id !== socket.id);
    console.log(`${socket.id} saiu da partida`);
    io.emit('entrou_partida', jogadores);
  });
};
