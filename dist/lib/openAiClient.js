"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../../src/lib/config");
var openai_1 = require("openai");
// Configura as variáveis de ambiente
(0, config_1.configureEnv)();
var openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY || '', // Adiciona verificação de chave vazia
});
exports.default = openai;
