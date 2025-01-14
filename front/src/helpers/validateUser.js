const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,20}$/;

const validateUser = ({
    name,
    username,
    password,
    email,
    birthdate,
    nDni,
}) => {
        const errors = {};
        if (!name) throw new Error("El campo es requerido");
        else {
            if (name.length < 3) errors.name = "El nombre debe tener al menos 3 caracteres";
            if (name.length > 50) errors.name = "El nombre debe tener menos de 50 caracteres";
        }

        if (!email) errors.email = "El campo es requerido";
            else {
                if (!emailRegex.test(email)) errors.email = "El email no es válido";
            }

        if (!birthdate) errors.birthdate = "El campo es requerido";
        else {
            if (!dateRegex.test(birthdate)) errors.birthdate = "La fecha de nacimiento debe estar en formato YYYY-MM-DD";
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const birthdateDate = new Date(birthdate);
            const ageDiff = new Date(today.getTime() - birthdateDate.getTime());
            const age = ageDiff.getUTCFullYear() - 1970;
            if (age < 18) errors.birthdate = "Debes ser mayor de 18 años";
        }

        if (!nDni) errors.nDni = "El campo es requerido";
        else {
            if (isNaN(Number(nDni))) errors.nDni = "El DNI debe ser un número";
            if (nDni < 0) errors.nDni = "El DNI no puede ser negativo";
        }

        if(!username) errors.username = "El campo es requerido";
        else {
            if (username.length < 4) errors.username = "El nombre de usuario debe tener al menos 4 caracteres";
            if (username.length > 20) errors.username = "El nombre de usuario debe tener menos de 20 caracteres";
        }

        if (!password) errors.password = "El campo es requerido";
        else {
            if (password.length < 8) errors.password = "La contraseña debe tener al menos 8 caracteres";
            if (password.length > 20) errors.password = "La contraseña debe tener menos de 20 caracteres";
            if (!passwordRegex.test(password)) errors.password = "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial";
        }

        return errors;
};

export default validateUser;