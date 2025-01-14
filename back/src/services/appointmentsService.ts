import IAppointmentsDto from "../dto/IAppointmentsDto";
import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";
import { appointmentRepository, userRepository } from "../repositories";
import { AppointmentStatus } from "../interfaces/IAppointment";

export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
    const allAppointments: Appointment[] = await appointmentRepository.find();
    return allAppointments;
};

export const getAppointmentByIdService = async (appointmentId: number): Promise<Appointment> => {
    const appointment: Appointment | null = await appointmentRepository.findOneBy({id: appointmentId});
    if (!appointment) throw Error ("Reserva no encontrada");
    return appointment;
};

export const scheduleAppointmentService = async (IAppointmentsDto: IAppointmentsDto): Promise<Appointment> => {
    const { date, time, peopleNumber, userId } = IAppointmentsDto;
    const user: User | null = await userRepository.findOneBy({id: userId});
    if (!user) throw Error ("Usuario no encontrado");
    const newAppointment: Appointment = appointmentRepository.create({ 
        date,
        time,
        peopleNumber,
    });
    newAppointment.user = user;
    await appointmentRepository.save(newAppointment);
    return newAppointment;
};

export const cancelAppointmentService = async (appointmentId: number): Promise<void> => {
    const appointment: Appointment | null = await appointmentRepository.findOneBy({id: appointmentId});
    if (!appointment) throw Error ("Reserva no encontrada");
    appointment.status = AppointmentStatus.CANCELLED;
    await appointmentRepository.save(appointment);
    return;
};