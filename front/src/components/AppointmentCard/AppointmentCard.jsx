/* eslint-disable react/prop-types */
import styles from "./AppointmentCard.module.css";

export default function AppointmentCard({ 
    id,
    date, 
    time, 
    status,
    peopleNumber,
    handleAppointmentCancel,
}) 
    
{
    const handleClick = () => {
        if (
            window.confirm (`¿Cancelar Reserva del día ${date} a las ${time}?`)
        ) {
            handleAppointmentCancel(id);
        }
    };

    return (
        <div className={styles.cardContainer}>
            <span>{date}</span>
            <span>{time}</span>
            <span>{peopleNumber}</span>
            {
                status === "active"
                    ? (<span className={styles.active} onClick = {handleClick}>Activo</span>)
                    : (<span className={styles.cancelled}>Cancelado</span>)
            }            
        </div>
    );
}