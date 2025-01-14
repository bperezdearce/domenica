"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userValidate_1 = __importDefault(require("../middlewares/userValidate"));
const credentialValidate_1 = __importDefault(require("../middlewares/credentialValidate"));
const usersRouter = (0, express_1.Router)();
usersRouter.get("/", userController_1.getAllUsers);
usersRouter.get("/:id", userController_1.getUserById);
usersRouter.post("/register", userValidate_1.default, userController_1.createUser);
usersRouter.post("/login", credentialValidate_1.default, userController_1.loginUser);
exports.default = usersRouter;
