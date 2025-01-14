import { Request, Response } from "express";
import { getAllUsersService, getUserByIdService, createUserService, findUserByCredentialsId } from "../services/userService";
import IUserDto from "../dto/IUserDto";
import ICredentialsDto from "../dto/ICredentialsDto";
import { validateCredentials } from "../services/credentialsService";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: User[] = await getAllUsersService();
        {res.status(200).json(users)}
    }
    catch (error: any) {
        res.status(400).json({message: error.message})
    };
};

export const getUserById = async (req: Request<{id: string}>, res: Response) => {
    const { id } = req.params;
    try {
        const user = await getUserByIdService(Number(id));
        res.status(200).json(user);
    } 
    catch (error: any) {
        res.status(404).json({ message: error.message })
    };    
};

export const createUser = async (req: Request<{}, {}, IUserDto>, res: Response) => {
    const { name, email, birthdate, nDni, username, password } = req.body;
    try {
        const newUser: User = await createUserService({name, email, birthdate, nDni, username, password});
        res.status(201).json({message: "Usuario creado correctamente", user: newUser});
    }
    catch(error: any) {
        res.status(400).json({message: error.message});
    };
};

export const loginUser = async (req: Request<{}, {}, ICredentialsDto>, res: Response) => {
    const {username, password} = req.body;
    try {
        const credentials: Credential = await validateCredentials({username, password});

        const user = await findUserByCredentialsId(credentials.id);
        res.status(200).json({login: true, user});
    }
    catch(error: any) {
        res.status(400).json({message: error.message});
    };
};