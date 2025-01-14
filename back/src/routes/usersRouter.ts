import { Router } from 'express';
import { getAllUsers, getUserById, createUser, loginUser } from '../controllers/userController';
import userValidate from '../middlewares/userValidate';
import credentialValidate from '../middlewares/credentialValidate';

const usersRouter: Router = Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("/register", userValidate, createUser);
usersRouter.post("/login", credentialValidate, loginUser);

export default usersRouter;