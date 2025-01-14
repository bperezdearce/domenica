import ICredentialsDto from "../dto/ICredentialsDto";
import { Credential } from "../entities/Credential";
import { credentialRepository } from "../repositories";

export const createCredential = async (createCredentialsDto: ICredentialsDto): Promise<Credential> => {
  const {username, password} = createCredentialsDto;

  const foundCredentials: Credential | null = await credentialRepository.findOneBy({ username });
  if(foundCredentials) throw Error("El usuario ya existe");

  const newCredentials: Credential = credentialRepository.create({ username, password });

  await credentialRepository.save(newCredentials);
  return newCredentials;
};

export const validateCredentials = async (validateCredentialsDto: ICredentialsDto) : Promise<Credential> => {
  const {username, password} = validateCredentialsDto;
  
  const foundCredentials: Credential | null = 
  await credentialRepository.findOneBy({ username });
  if(!foundCredentials) 
    throw Error("Credenciales incorrectas");
  
  if(foundCredentials.password !== password) throw Error("Credenciales incorrectas");

  return foundCredentials;
}; 