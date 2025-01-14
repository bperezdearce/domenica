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
exports.findUserByCredentialsId = exports.createUserService = exports.getUserByIdService = exports.getAllUsersService = void 0;
const credentialsService_1 = require("./credentialsService");
const index_1 = require("../repositories/index");
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield index_1.userRepository.find({
        relations: ["appointments"],
    });
    return allUsers;
});
exports.getAllUsersService = getAllUsersService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield index_1.userRepository.findOne({
        where: { id },
        relations: ["appointments"]
    });
    if (!foundUser)
        throw new Error("Usuario no encontrado");
    return foundUser;
});
exports.getUserByIdService = getUserByIdService;
const createUserService = (userDto) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, birthdate, nDni, username, password } = userDto;
    const foundUser = yield index_1.userRepository.findOneBy({ email });
    if (foundUser)
        throw new Error("Usuario ya registrado");
    const newCredential = yield (0, credentialsService_1.createCredential)({ username, password });
    const newUser = index_1.userRepository.create({ name, email, birthdate, nDni });
    newUser.credentials = newCredential;
    yield index_1.userRepository.save(newUser);
    return newUser;
});
exports.createUserService = createUserService;
const findUserByCredentialsId = (credentialsId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield index_1.userRepository.findOneBy({ id: credentialsId });
    if (!foundUser)
        throw new Error("Usuario no encontrado");
    return foundUser;
});
exports.findUserByCredentialsId = findUserByCredentialsId;
