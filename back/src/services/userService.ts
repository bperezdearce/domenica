import IUserDto from '../dto/IUserDto';
import { createCredential } from './credentialsService';
import { userRepository } from '../repositories/index';
import { User } from '../entities/User';   
import { Credential } from '../entities/Credential';


export const getAllUsersService = async (): Promise<User[]> => {
    const allUsers: User[] = await userRepository.find({
        relations: ["appointments"],
    });
    return allUsers;
};

export const getUserByIdService = async (id: number): Promise<User> => {
    const foundUser: User | null = await userRepository.findOne({
        where: { id },
        relations: ["appointments"]
    })
    if (!foundUser) throw new Error("Usuario no encontrado");
    return foundUser;    
};

export const createUserService = async (userDto: IUserDto) => {
    const {name, email, birthdate, nDni, username, password} = userDto;

    const foundUser: User | null = await userRepository.findOneBy({ email});
    if (foundUser) throw new Error("Usuario ya registrado");

    const newCredential: Credential = await createCredential({username, password});    
    const newUser = userRepository.create({ name, email, birthdate, nDni });

    newUser.credentials = newCredential;
    await userRepository.save(newUser);  
    return newUser;
}

export const findUserByCredentialsId = async (credentialsId: number): Promise<User> => {
    const foundUser: User | null = await userRepository.findOneBy({ id: credentialsId });
    if (!foundUser) throw new Error("Usuario no encontrado");
    return foundUser;
}