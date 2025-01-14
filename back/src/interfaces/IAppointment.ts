export enum AppointmentStatus {
    ACTIVE = "active",
    CANCELLED = "cancelled",
}

interface IAppointment {
    id: number;
    date: string;
    time: string;
    peopleNumber: number;
    status: AppointmentStatus;
    userId: number;
}

export default IAppointment; 