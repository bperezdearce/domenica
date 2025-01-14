"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredentials = exports.createCredential = void 0;
const repositories_1 = require("../repositories");
const createCredential = (createCredentialsDto) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = createCredentialsDto;
    const foundCredentials = yield repositories_1.credentialRepository.findOneBy({ username });
    if (foundCredentials)
        throw Error("El usuario ya existe");
    const newCredentials = repositories_1.credentialRepository.create({ username, password });
    yield repositories_1.credentialRepository.save(newCredentials);
    return newCredentials;
});
exports.createCredential = createCredential;
const validateCredentials = (validateCredentialsDto) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = validateCredentialsDto;
    const foundCredentials = yield repositories_1.credentialRepository.findOneBy({ username });
    if (!foundCredentials)
        throw Error("Credenciales incorrectas");
    if (foundCredentials.password !== password)
        throw Error("Credenciales incorrectas");
    return foundCredentials;
});
exports.validateCredentials = validateCredentials;
