"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const server_1 = __importDefault(require("./server"));
const data_source_1 = require("./config/data-source");
const envs_1 = require("./config/envs");
data_source_1.AppDataSource.initialize()
    .then(() => {
    server_1.default.listen(envs_1.PORT, () => {
        console.log(`Servidor corriendo en el puerto 3000`);
    });
    console.log("Base de Datos conectada");
})
    .catch((error) => {
    console.error("Error al inicializar la base de datos:", error);
});
