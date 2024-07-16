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

// src/controllers/constantsGame.ts
var constantsGame_exports = {};
__export(constantsGame_exports, {
  CANSELECTCARD: () => CANSELECTCARD,
  ISADMIN: () => ISADMIN,
  ISESPIAO: () => ISESPIAO,
  MINHAEQUIPE: () => MINHAEQUIPE,
  bgColorBlue: () => bgColorBlue,
  bgColorRed: () => bgColorRed,
  defaultBG: () => defaultBG
});
module.exports = __toCommonJS(constantsGame_exports);
var CANSELECTCARD = false;
var ISADMIN = false;
var MINHAEQUIPE = 0;
var ISESPIAO = true;
var bgColorRed = "rgb(215 87 87)";
var bgColorBlue = "rgb(87 127 215)";
var defaultBG = "#837c6e";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CANSELECTCARD,
  ISADMIN,
  ISESPIAO,
  MINHAEQUIPE,
  bgColorBlue,
  bgColorRed,
  defaultBG
});
