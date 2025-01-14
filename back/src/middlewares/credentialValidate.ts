import { Request, Response, NextFunction } from 'express';
import ICredentialsDto from '../dto/ICredentialsDto';

const credentialValidate = (
    req: Request<{}, {}, ICredentialsDto>,
    res: Response,
    next: NextFunction
) => {
    const { username, password } = req.body;
    try {
        if (!username) throw new Error("El campo es requerido");
        if (username.length < 4) throw new Error("El nombre de usuario debe tener al menos 4 caracteres");
        if (username.length > 20) throw new Error("El nombre de usuario debe tener menos de 20 caracteres");

        if (!password) throw new Error("El campo es requerido");
        if (password.length < 8) throw new Error("La contraseña debe tener al menos 8 caracteres");
        if (password.length > 20) throw new Error("La contraseña debe tener menos de 20 caracteres");
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,20}$/;
        if (!passwordRegex.test(password)) throw new Error("La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial");
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
    }
    next();
};

export default credentialValidate;