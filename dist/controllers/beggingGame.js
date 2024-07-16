"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/beggingGame.ts
var beggingGame_exports = {};
__export(beggingGame_exports, {
  BeggingGame: () => BeggingGame
});
module.exports = __toCommonJS(beggingGame_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BeggingGame
});
