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
exports.loginUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const userService_1 = require("../services/userService");
const credentialsService_1 = require("../services/credentialsService");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getAllUsersService)();
        {
            res.status(200).json(users);
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
    ;
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield (0, userService_1.getUserByIdService)(Number(id));
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
    ;
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, birthdate, nDni, username, password } = req.body;
    try {
        const newUser = yield (0, userService_1.createUserService)({ name, email, birthdate, nDni, username, password });
        res.status(201).json({ message: "Usuario creado correctamente", user: newUser });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
    ;
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const credentials = yield (0, credentialsService_1.validateCredentials)({ username, password });
        const user = yield (0, userService_1.findUserByCredentialsId)(credentials.id);
        res.status(200).json({ login: true, user });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
    ;
});
exports.loginUser = loginUser;
