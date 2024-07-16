const socket = io();
document.body.classList.remove("time-red");
document.body.classList.add("time-blue");
const gameBoard = document.querySelector(".game-board");
const reiniciar = document.getElementById("button_reiniciar");
const iniciar_jogo = document.querySelector(".iniciar_jogo");
const redefinir_sala = document.querySelector(".redefinir_sala");
const embaralhar_equipes = document.querySelector(".embaralhar_equipes");
const movimentos_jogo = document.querySelector(".movimentos_jogo");
const indicator_phase = document.querySelector(".indicator-phase");
const compartilhar = document.querySelector(".compartilhar");
const entrarComoAgenteAzul = document.querySelector("#entrarComoAgenteAzul");
const entrarComoEspiaoAzul = document.querySelector("#entrarComoEspiaoAzul");
const entrarComoEspiaoVermelho = document.querySelector("#entrarComoEspiaoVermelho");
const entrarComoAgenteVermelho = document.querySelector("#entrarComoAgenteVermelho");

iniciar_jogo.addEventListener("click", () => {
    socket.emit("iniciar_jogo", true)
})
reiniciar.addEventListener("click", () => {
    socket.emit("reiniciar_jogo", true)
})

entrarComoAgenteAzul.addEventListener("click", () => {
    socket.emit("entrou_partida", true)
    console.log("Entrou como agente azul")
})

entrarComoEspiaoAzul.addEventListener("click", () => {
    socket.emit("entrou_partida", true)
    console.log("Entrou como espião azul")
})

entrarComoEspiaoVermelho.addEventListener("click", () => {
    socket.emit("entrou_partida", true)
    console.log("Entrou como espião vermelho")
})

entrarComoAgenteVermelho.addEventListener("click", () => {
    socket.emit("entrou_partida", true)
    console.log("Entrou como agente vermelho")
})

socket.on("iniciar_jogo", (action, equipeStart, cardsToIterator, isEspiao) => {
    if (action) {
        startGame(equipeStart, cardsToIterator, isEspiao)
        iniciar_jogo.style.display = "none";
        reiniciar.style.display = "inline";
    }
})

socket.on("entrou_partida", (msg) => {
    console.log(msg)
})

socket.on("reiniciar_jogo", (action, equipeStart, cardsToIterator, isEspiao) => {
    if (action) {
        startGame(equipeStart, cardsToIterator, isEspiao)
        iniciar_jogo.style.display = "none";
    }
})

socket.on("selected_this_card", (card_selected, classeDefined, classe) => {
    console.log(card_selected, classeDefined, classe)
    document.getElementById(card_selected).classList.add("is-discovery");
    document.getElementById(card_selected).classList.remove(classe);
    document.getElementById(card_selected).classList.add(classeDefined);
})

socket.on("trocar_lado", () => {
    changeEquipe();
    changeSide(EquipeAtual);
})

const equipes = {
    1: {
        nome: "Azul"
    },
    2: {
        nome: "Vermelha"
    },
}

const dicaPalavra = "";

let CanSelectCards = true;
let isAdmin = true;
let MinhaEquipe = 1;
let isEspiao = false;

indicator_phase.innerHTML = "";

if (isAdmin) {
    compartilhar.style.display = "flex";
    redefinir_sala.style.display = "flex";
    embaralhar_equipes.style.display = "flex";
    iniciar_jogo.style.display = "inline";
} else {
    compartilhar.style.display = "none";
    redefinir_sala.style.display = "none";
    embaralhar_equipes.style.display = "none";
    iniciar_jogo.style.display = "none";
}

const startGame = (equipeBeggin, wordsWithColors, isEspiao) => {
    EquipeAtual = equipeBeggin;
    isEspiao = isEspiao;
    CanSelectCards = true;
    changeSide(EquipeAtual);
    gameBoard.innerHTML = "";

    wordsWithColors.forEach(({ word, color, classe, classeDefined, equipeId }) => {
        const uniqId = `card_${equipeId}_${word}`;
        const card = document.createElement("div");
        card.classList.add("card");
        card.id = uniqId;
        card.textContent = word;
        card.classList.add(classe);

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
                classe
            });
            card.removeEventListener("click", handleClick);
        };

        card.addEventListener("click", handleClick);

        gameBoard.appendChild(card);
        gameBoard.classList.add("is-starting");
    });
}

const verifyTypesOfCards = (equipeId) => {
    if (equipeId === MinhaEquipe) {
        return true;
    }
    else if (equipeId === 3) {
        socket.emit("trocar_lado", true)
        CanSelectCards = false;
        alert(`A equipe ${equipes[EquipeAtual].nome} venceu!`);
    } else if (equipeId === 4) {
        socket.emit("trocar_lado", true)
    } else {
        console.log("A equipe " + equipes[EquipeAtual].nome + " selecionou o carta da equipe " + equipes[equipeId].nome);
        socket.emit("trocar_lado", true)
    }
}

const changeEquipe = () => {
    EquipeAtual == 1 ? EquipeAtual = 2 : EquipeAtual = 1;
}

const changeSide = (equipe) => {
    if (equipe === 1) {
        document.body.classList.remove("time-red");
        document.body.classList.add("time-blue");
    } else {
        document.body.classList.remove("time-blue");
        document.body.classList.add("time-red");
    }
}
