import React from 'react';
import { useEffect } from 'react';
import AppointmentCard from '../../components/AppointmentCard/AppointmentCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Appointments.module.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';

const GETUSERBYID_URL = 'http://localhost:3000/users/';
const CANCEL_URL = 'http://localhost:3000/appointments/cancel/';

export default function Appointments() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = useSelector((state) => state.actualUser.userData.login);
    const id = useSelector((state) => state.actualUser.userData.user.id);
    const appointments = useSelector((state) => state.actualUser.userAppointments);
    
    useEffect(() => {
        !login && navigate("/login");      
    }, [login, navigate]);

    useEffect(() => {
      axios
        .get(GETUSERBYID_URL + id)
        .then((response) => response.data)
        .then (actualUser => {
            dispatch(AppointmentForm(actualUser.appointments));
        })
        .catch ((error) => console.log(error.message));
    }, [id, dispatch]);

    const handleAppointmentCancel = (appointmentId) => {
      axios
        .put(CANCEL_URL + appointmentId)
        .then((response) => response.data)
        .then (() => {
          axios
            .get(GETUSERBYID_URL + id)
            .then((response) => response.data)
            .then (actualUser => {
              dispatch(AppointmentForm(actualUser.appointments));
            })
            .catch ((error) => console.log(error.message));
        })
        .catch ((error) => console.log(error.message));
    };
    
    return (
      <div>
        <h1>Mis Reservas</h1>
      <div className={styles.AppointmentCard}>
        {appointments.map((appointment) => (
            <AppointmentCard 
                key={appointment.id} 
                id={appointment.id}
                date={appointment.date}
                time={appointment.time}
                status={appointment.status}
                peopleNumber={appointment.peopleNumber}
                handleAppointmentCancel={handleAppointmentCancel}
                />
              ))
            }
        </div>
      </div>
    );
}

//setuserappointments!!!!