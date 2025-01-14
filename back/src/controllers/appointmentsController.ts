import { Request, Response } from "express";
import { Appointment } from "../entities/Appointment";
import { getAllAppointmentsService, getAppointmentByIdService, scheduleAppointmentService, cancelAppointmentService } from "../services/appointmentsService";
import IAppointmentsDto from "../dto/IAppointmentsDto";

export const getAllAppointments = async (req: Request, res: Response): Promise<void> => {
    try {
        const allAppointments: Appointment[] = await getAllAppointmentsService();
        res.status(200).json(allAppointments);
    }
    catch (error: any) {
        res.status(404).json({error: error.message});
    };
};

export const getAppointmentById = async (req: Request<{ appointmentId: string}>, res: Response): Promise<void> => {
    const { appointmentId } = req.params;
    try {
        const appointment = await getAppointmentByIdService (Number(appointmentId));
        res.status(200).json(appointment);
    }
    catch (error: any) {
        res.status(404).json({error: error.message});
    };
};

export const scheduleAppointment = async (req: Request<{}, {}, IAppointmentsDto>, res: Response): Promise<void> => {
    const { date, time, peopleNumber, userId } = req.body;
    try {
        const newAppointment: Appointment = await scheduleAppointmentService({ date, time, peopleNumber, userId });
        res.status(201).json(newAppointment);
    }
    catch (error: any) {
        res.status(400).json({error: error.message});
    };
};

export const cancelAppointment = async (req: Request<{ appointmentId: string}, {}, {}>, res: Response): Promise<void> => {
    const { appointmentId } = req.params;
    try {
        await cancelAppointmentService(Number(appointmentId));
        res.status(200).json({message: "Reserva cancelada"});
    }
    catch (error: any) {
        res.status(404).json({error: error.message});
    };
};
