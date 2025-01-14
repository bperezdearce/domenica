import { Request, Response, NextFunction } from "express"
import IUserDto from "../dto/IUserDto"

const userValidate = (
    req: Request <{}, {}, IUserDto>, 
    res: Response, 
    next: NextFunction) => {
    const {name, email, birthdate, nDni, username, password} = req.body    
    try {
        if (!name) throw new Error("El campo es requerido");
        if (name.length < 3) throw new Error("El nombre debe tener al menos 3 caracteres");
        if (name.length > 50) throw new Error("El nombre debe tener menos de 50 caracteres");

        if (!email) throw new Error("El campo es requerido");
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) throw new Error("El email no es válido");

        if (!birthdate) throw new Error("El campo es requerido");
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(birthdate)) throw new Error("La fecha de nacimiento debe estar en formato YYYY-MM-DD");
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const birthdateDate = new Date(birthdate);
        const ageDiff = new Date(today.getTime() - birthdateDate.getTime());
        const age = ageDiff.getUTCFullYear() - 1970;
        if (age < 18) throw new Error("Debes ser mayor de 18 años para registrarte");

        if (!nDni) throw new Error("El campo es requerido");
        if (typeof nDni !== "number") throw new Error("El DNI debe ser un número");
        if (nDni < 0) throw new Error("El DNI no puede ser negativo");

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

export default userValidate;