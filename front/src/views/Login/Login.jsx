import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/userSlice";
import styles from "./Login.module.css";

const USERLOGIN_URL = "http://localhost:3000/users/login";

function Login() {
    const initialState = {
        username: "",
        password: "",
    };

    const [user, setUser] = useState(initialState);
    const [errors, setErrors] = useState(initialState);

    const validateUserLogin = ({ username, password }) => {
        const errors = {};
        if (!username) errors.username = "El campo Usuario es obligatorio";
        if (!password) errors.password = "El campo Contraseña es obligatorio";
        return errors;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
        setErrors(validateUserLogin({ ...user, [name]: value }));
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateUserLogin(user);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        axios
            .post(USERLOGIN_URL, user)
            .then(({ data }) => {
                dispatch(setUserData(data));
                alert("Login exitoso");
                setUser(initialState);
                navigate("/");
            })
            .catch(() => {
                alert("Credenciales Incorrectas");
            });
    };

    const formData = [
        { label: "Usuario: ", name: "username", type: "text" },
        { label: "Contraseña: ", name: "password", type: "password" },
    ];

    return (
      <div>
        <h2 className={styles.formTitle}>Login de Usuario</h2>
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
                <button type="submit" className={styles.formSubmit} disabled={Object.keys(user).some(e => !user[e])}>Ingresar</button>
        </form>
      </div>
    );
}
  
export default Login;