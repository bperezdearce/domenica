import React from "react";
import axios from "axios"; 
import { useEffect, useState } from "react";
import styles from "./AppointmentForm.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const POSTAPPOINTMENT_URL = "http://localhost:3000/appointments/schedule";

export default function AppointmentForm() {
    const navigate = useNavigate();
    const userId = useSelector((state) => 
        state.actualUser?.userData.user.id);

    useEffect(() => {
        if(!userId) {
            navigate("/login");
        }
    }, [userId, navigate]);
    
    const initialState = {
        date: "",
        hours: "12",
        minutes: "00",
        peopleNumber: 1,
    };

    const [appointment, setAppointment] = useState(initialState);
    const [errors, setErrors] = useState({
        date: "Debe ingresar una fecha",
    });

    const validateAppointment = ({
        date, hours, minutes, peopleNumber
    }) => {
        const errors = {};
        if (!date) errors.date = "Debe ingresar una fecha";
        else if (isWeekend(date)) errors.date = "No se puede reservar en fin de semana";
        if (!hours) errors.hours = "Debe ingresar una hora";
        if (!minutes) errors.minutes = "Debe ingresar los minutos";
        if (!peopleNumber) errors.peopleNumber = "Debe ingresar la cantidad de personas";
        return errors;
    };

    const isWeekend = (date) => {
        const day = new Date(date).getDay();
        return day === 5 || day === 6;
    };

    const handleChange = (event) => {
        const { value, name } = event.target;
        const updatedAppointment = { ...appointment, [name]: value };
        setAppointment(updatedAppointment);
        setErrors(validateAppointment(updatedAppointment));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newAppointment = {
            date: appointment.date,
            time: `${appointment.hours}:${appointment.minutes}`,
            peopleNumber: appointment.peopleNumber,
            userId,
        };
        axios
            .post(POSTAPPOINTMENT_URL, newAppointment)
            .then(({ data }) => { 
                alert (`Reserva en la Fecha ${data.date} a las ${data.time} para ${data.peopleNumber} personas realizada exitosamente`);
                setAppointment(initialState);
                navigate("/appointments");
            })
            .catch((error) => {
                alert(`Error: ${error.response.data.error}`)
            });
        };

        const validHours = ["12", "13", "14", "15", "16", "19", "20", "21", "22", "23"];
        const validMinutes = ["00", "30"];

        function getTomorrow() {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow.toISOString().split("T")[0];
        }

        function getFourteenDaysAhead() {
            const today = new Date();
            const fourteenDaysAhead = new Date(today);
            fourteenDaysAhead.setDate(fourteenDaysAhead.getDate() + 13);
            return fourteenDaysAhead.toISOString().split("T")[0];
        }

        return (
            <div className={styles.formContainer}>
                <h2>Nueva Reserva</h2>
                <hr />
                <form onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="date">Fecha</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            min={getTomorrow()}
                            max={getFourteenDaysAhead()}
                            value={appointment.date}
                            onChange={handleChange}
                        />
                        {errors.date && <span>{errors.date}</span>}
                    </div>

                    <div>
                        <label htmlFor="hours">Hora</label>
                        <select
                            id="hours"
                            name="hours"
                            value={appointment.hours}
                            onChange={handleChange}
                        >
                            {validHours.map((hour) => (
                                <option key={hour} value={hour}>
                                    {hour}
                                </option>
                            ))}
                        </select>
                        <select
                            id="minutes"
                            name="minutes"
                            value={appointment.minutes}
                            onChange={handleChange}
                        >
                            {validMinutes.map((minute) => (
                                <option key={minute} value={minute}>
                                    {minute}
                                </option>
                            ))}
                        </select>
                    </div>
                    <br />

                    <div>
                        <label htmlFor="peopleNumber">Cantidad de Personas</label>
                        <input
                            type="number"
                            id="peopleNumber"
                            name="peopleNumber"
                            min="1"
                            value={appointment.peopleNumber}
                            onChange={handleChange}
                        />
                        {errors.peopleNumber && <span>{errors.peopleNumber}</span>}
                    </div>
                    
                    <button type="submit" disabled={Object.keys(errors).length > 0}> Realizar Reserva </button>
                    
                    </form>
            </div>
    );
}