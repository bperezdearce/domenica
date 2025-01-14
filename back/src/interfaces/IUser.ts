import { Credential } from "../entities/Credential";

interface IUser {
    id: number;
    name: string;
    email: string;
    birthdate: string;
    nDni: number;
    userImage: string;
    credential: Credential;
}

export default IUser;