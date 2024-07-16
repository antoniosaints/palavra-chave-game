const socket = io();
document.body.classList.remove("time-red");
document.body.classList.add("time-blue");
const gameBoard = document.querySelector(".game-board");
const reiniciar = document.getElementById("button_reiniciar");
const iniciar_jogo = document.querySelector(".iniciar_jogo");
const movimentos_jogo = document.querySelector(".movimentos_jogo");
const indicator_phase = document.querySelector(".indicator-phase");
const compartilhar = document.querySelector(".compartilhar");
const entrarComoAgenteAzul = document.querySelector("#entrarComoAgenteAzul");
const entrarComoEspiaoAzul = document.querySelector("#entrarComoEspiaoAzul");
const entrarComoEspiaoVermelho = document.querySelector(
  "#entrarComoEspiaoVermelho"
);
const entrarComoAgenteVermelho = document.querySelector(
  "#entrarComoAgenteVermelho"
);
iniciar_jogo.style.display = "none";
iniciar_jogo.addEventListener("click", () => {
  socket.emit("iniciar_jogo", true);
});
reiniciar.addEventListener("click", () => {
  socket.emit("reiniciar_jogo", true);
});

const sendEquipeSide = (equipe) => {
  socket.emit("entrou_partida", equipe);
};

entrarComoAgenteAzul.addEventListener("click", () => {
  sendEquipeSide("entrarComoAgenteAzul");
  isEspiao = false;
});

entrarComoEspiaoAzul.addEventListener("click", () => {
  sendEquipeSide("entrarComoEspiaoAzul");
  isEspiao = true;
});

entrarComoEspiaoVermelho.addEventListener("click", () => {
  sendEquipeSide("entrarComoEspiaoVermelho");
  isEspiao = true;
});

entrarComoAgenteVermelho.addEventListener("click", () => {
  sendEquipeSide("entrarComoAgenteVermelho");
  isEspiao = false;
});

socket.on("iniciar_jogo", (action, equipeStart, cardsToIterator) => {
  if (action) {
    startGame(equipeStart, cardsToIterator);
    iniciar_jogo.style.display = "none";
    reiniciar.style.display = "inline";
  }
});

socket.on("entrou_partida", (jogadores) => {
  console.log(jogadores);
  if (typeof jogadores === "object") {
    jogadores.forEach((jogador) => {
      document.getElementById(jogador.funcao).innerText = jogador.id;
      document.getElementById(jogador.funcao).setAttribute("disabled", true);
    });
  }
  if (jogadores.length === 4) {
    iniciar_jogo.style.display = "inline";
  }
});

socket.on(
  "reiniciar_jogo",
  (action, equipeStart, cardsToIterator) => {
    if (action) {
      startGame(equipeStart, cardsToIterator);
      iniciar_jogo.style.display = "none";
    }
  }
);

socket.on("selected_this_card", (card_selected, classeDefined, classe, classeEspiao) => {
  document.getElementById(card_selected).classList.add("is-discovery");
  document.getElementById(card_selected).classList.remove(isEspiao ? classeEspiao : classe);
  document.getElementById(card_selected).classList.add(classeDefined);
});

socket.on("trocar_lado", () => {
  changeEquipe();
  changeSide(EquipeAtual);
});

const equipes = {
  1: {
    nome: "Azul",
  },
  2: {
    nome: "Vermelha",
  },
};

const dicaPalavra = "";

let CanSelectCards = true;
let isAdmin = true;
let MinhaEquipe = 1;
let isEspiao = false;

// indicator_phase.innerHTML = "";

if (isAdmin) {
  compartilhar.style.display = "flex";
} else {
  compartilhar.style.display = "none";
}

const startGame = (equipeBeggin, wordsWithColors) => {
  EquipeAtual = equipeBeggin;
  CanSelectCards = true;
  changeSide(EquipeAtual);
  gameBoard.innerHTML = "";

  wordsWithColors.forEach(
    ({ word, color, classe, classeEspiao, classeDefined, equipeId }) => {
      const uniqId = `card_${word}`;
      const card = document.createElement("div");
      card.classList.add("card");
      card.id = uniqId;
      card.textContent = word;
      card.classList.add(isEspiao ? classeEspiao : classe);

      // Define the click handler separately
      const handleClick = () => {
        if (MinhaEquipe != EquipeAtual || !CanSelectCards || isEspiao) return;
        card.classList.add("is-discovery");
        card.classList.remove(classe);
        card.classList.add(classeDefined);
        verifyTypesOfCards(equipeId);
        socket.emit("selected_this_card", {
          uniqId,
          classeDefined,
          classe,
          classeEspiao
        });
        card.removeEventListener("click", handleClick);
      };

      card.addEventListener("click", handleClick);

      gameBoard.appendChild(card);
      gameBoard.classList.add("is-starting");
    }
  );
};

const verifyTypesOfCards = (equipeId) => {
  if (equipeId === MinhaEquipe) {
    return true;
  } else if (equipeId === 3) {
    socket.emit("trocar_lado", true);
    CanSelectCards = false;
    alert(`A equipe ${equipes[EquipeAtual].nome} venceu!`);
  } else if (equipeId === 4) {
    socket.emit("trocar_lado", true);
  } else {
    console.log(
      "A equipe " +
        equipes[EquipeAtual].nome +
        " selecionou o carta da equipe " +
        equipes[equipeId].nome
    );
    socket.emit("trocar_lado", true);
  }
};

const changeEquipe = () => {
  EquipeAtual == 1 ? (EquipeAtual = 2) : (EquipeAtual = 1);
};

const changeSide = (equipe) => {
  if (equipe === 1) {
    document.body.classList.remove("time-red");
    document.body.classList.add("time-blue");
  } else {
    document.body.classList.remove("time-blue");
    document.body.classList.add("time-red");
  }
};
