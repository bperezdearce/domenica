import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import validateUser from "../../helpers/validateUser";
import styles from "./Register.module.css";

const USERREGISTER_URL = "http://localhost:3000/users/register";

function Register () {
    const initialState = {
        name: "",
        email: "",
        birthdate: "",
        nDni: "",
        username: "",
        password: "",
    };

    const [user, setUser] = useState(initialState);
    const [errors, setErrors] = useState(initialState);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
        setErrors(validateUser({ ...user, [name]: value }));
    };

    const handleReset = (event) => {
        event.preventDefault();
        setUser(initialState);
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            nDni: Number(user.nDni),
            username: user.username,
            password: user.password,
        };
        try {
            const response = await fetch(USERREGISTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                setUser(initialState);
                navigate("/login");
            } else {
                alert(data.message || 'Error al registrar usuario');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    console.log(errors);

    const formData = [
        {label: "Nombre: ", name: "name", type: "text" },
        {label: "Email: ", name: "email", type: "text" },
        {label: "Fecha de nacimiento: ", name: "birthdate", type: "text" },
        {label: "N° DNI: ", name: "nDni", type: "text" },
        {label: "Username: ", name: "username", type: "text" },
        {label: "Contraseña: ", name: "password", type: "password" },
    ];

    return (
        <div>
            <h2 className={styles.formTitle}>Regístrate</h2>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                {formData.map(({ label, name, type }) => (
                    <div key={name}>
                        <label htmlFor={name}>{label}</label>
                        <input
                            id={name}
                            name={name}
                            type={type}
                            value={user[name]} 
                            onChange={handleChange}
                        />
                        {errors[name] && (<span>{errors[name]}</span>)}
                    </div>
                ))}
                <button type="submit" className={styles.formSubmit}
                disabled={Object.keys(user).some(e => !user[e])}>Registrarse</button>
                <button type="reset" className={styles.formClean} onClick={handleReset}>Limpiar Formulario</button>
            </form>
        </div>
    );
}

export default Register;