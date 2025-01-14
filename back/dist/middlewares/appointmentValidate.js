"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appointmentValidate = (req, res, next) => {
    const { date, time, peopleNumber } = req.body;
    try {
        if (!date)
            throw new Error("El campo fecha es requerido");
        const appointmentDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const in14Days = new Date(today);
        in14Days.setDate(in14Days.getDate() + 13);
        if (appointmentDate < tomorrow || appointmentDate > in14Days) {
            throw new Error("La fecha de la reserva debe ser entre mañana y dentro de 14 días");
        }
        if (!time)
            throw new Error("El campo hora es requerido");
        const validTimes = [
            "12:00",
            "12:30",
            "13:00",
            "13:30",
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "19:00",
            "19:30",
            "20:00",
            "20:30",
            "21:00",
            "21:30",
            "22:00",
            "22:30",
        ];
        if (!validTimes.includes(time)) {
            throw new Error("El horario de la reserva debe ser entre las 12:00 y las 15:30 o entre las 19:00 y las 22:30");
        }
        if (!peopleNumber)
            throw new Error("El campo número de personas es requerido");
        if (typeof peopleNumber !== "number")
            throw new Error("El campo número de personas debe ser un número");
        if (peopleNumber < 1 || peopleNumber > 8) {
            throw new Error("El número de personas debe ser entre 1 y 8");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
    next();
};
exports.default = appointmentValidate;
