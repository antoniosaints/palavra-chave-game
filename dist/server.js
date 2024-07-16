"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_express = __toESM(require("express"));
var import_http = __toESM(require("http"));
var import_cors = __toESM(require("cors"));
var import_socket = require("socket.io");
var import_path = __toESM(require("path"));

// src/controllers/beggingGame.ts
var BeggingGame = class {
  constructor() {
    this.words = [
      "ABOBORA",
      "CEBOLA",
      "ICE",
      "CARV\xC3O",
      "VIAGEM",
      "LUTA",
      "DESTINO",
      "CAMINHAR",
      "CIDADE",
      "ALMO\xC7O",
      "VELHO",
      "LULA",
      "CREATINA",
      "SUCO",
      "CIDADANIA",
      "OUVIDO",
      "VERDADE",
      "COPO",
      "COMPUTADOR",
      "PRATO",
      "\xD3CULOS",
      "FONE",
      "MOUSE",
      "PERFUME",
      "CADEIRA",
      "CASA",
      "FILHO",
      "PAIS",
      "FAMILIA",
      "ESCOLA",
      "PAPEL",
      "TAMANHO",
      "CAIXA",
      "EMANUEL"
    ];
    this.numberOfCards = 25;
  }
  defineWords(words = []) {
    this.words.push(...words);
  }
  getWords() {
    return this.words;
  }
};

// src/controllers/constantsGame.ts
var bgColorRed = "rgb(215 87 87)";
var bgColorBlue = "rgb(87 127 215)";
var defaultBG = "#837c6e";

// src/controllers/assemblyCards.ts
var AssemblyCards = class {
  constructor() {
  }
  getAssemblyCards() {
    const begginGame = new BeggingGame();
    const words = begginGame.getWords();
    const selectedWords = [];
    const copyWorlds = [...words];
    for (let i = 0; i < begginGame.numberOfCards; i++) {
      const randomIndex = Math.floor(Math.random() * copyWorlds.length);
      selectedWords.push(copyWorlds[randomIndex]);
      copyWorlds.splice(randomIndex, 1);
    }
    return selectedWords;
  }
  getCardsWithColors() {
    let isEspiao = false;
    const selectedWord = this.getAssemblyCards();
    const wordsWithColors = selectedWord.map((word, index) => {
      let color;
      let classe;
      let classeDefined;
      let equipeId;
      if (index < 8) {
        color = bgColorBlue;
        classe = !isEspiao ? ".is-random" : "is-blue-simple";
        classeDefined = "is-blue";
        equipeId = 1;
      } else if (index < 16) {
        color = bgColorRed;
        classe = !isEspiao ? ".is-random" : "is-red-simple";
        classeDefined = "is-red";
        equipeId = 2;
      } else if (index < 17) {
        color = "black";
        classe = !isEspiao ? ".is-random" : "is-black-simple";
        classeDefined = "is-black";
        equipeId = 3;
      } else {
        color = defaultBG;
        classe = "is-white";
        classeDefined = "is-other";
        equipeId = 4;
      }
      return { word, color, classe, classeDefined, equipeId };
    });
    wordsWithColors.sort(() => Math.random() - 0.5);
    return wordsWithColors;
  }
};

// src/ws/managerCards.ts
var quantideJogadores = 0;
var mounCards = () => {
  const assemblyCards = new AssemblyCards();
  let equipeStart = Math.floor(Math.random() * 2) + 1;
  const cardsToIterator = assemblyCards.getCardsWithColors();
  return { equipeStart, cardsToIterator };
};
var managerCards = (io2, socket) => {
  socket.on("message", (msg) => {
    console.log("Mensagem recebida: ", msg);
    io2.emit("message", msg);
  });
  socket.on("iniciar_jogo", (action) => {
    const { equipeStart, cardsToIterator } = mounCards();
    io2.emit(
      "iniciar_jogo",
      action,
      equipeStart,
      cardsToIterator,
      false
    );
  });
  socket.on("reiniciar_jogo", (action) => {
    const { equipeStart, cardsToIterator } = mounCards();
    io2.emit(
      "reiniciar_jogo",
      action,
      equipeStart,
      cardsToIterator,
      false
    );
  });
  socket.on("entrou_partida", () => {
    if (quantideJogadores === 4) {
      io2.emit("entrou_partida", `Maximo de jogadores - ${quantideJogadores}`);
      return;
    }
    quantideJogadores++;
    io2.emit("entrou_partida", quantideJogadores);
  });
  socket.on("trocar_lado", () => {
    io2.emit("trocar_lado", true);
  });
  socket.on("selected_this_card", (msg) => {
    io2.emit("selected_this_card", msg.uniqId, msg.classeDefined, msg.classe);
  });
};

// src/server.ts
var app = (0, import_express.default)();
var server = import_http.default.createServer(app);
var io = new import_socket.Server(server, {
  cors: {
    origin: "*"
  }
});
var getHtml = (fileName) => {
  return import_path.default.join(__dirname, "../public/", fileName + ".html");
};
app.use(import_express.default.static(import_path.default.resolve(__dirname, "../public")));
app.use((0, import_cors.default)());
app.use(import_express.default.json());
app.use(import_express.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(getHtml("gameboard"));
});
io.on("connection", (socket) => {
  console.log("Novo cliente conectado " + socket.id);
  managerCards(io, socket);
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});
var PORT = process.env.PORT || 3e3;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
