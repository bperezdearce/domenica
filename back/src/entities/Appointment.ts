import { Entity, JoinColumn, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AppointmentStatus } from '../interfaces/IAppointment';
import { User } from './User';

@Entity({ name: 'appointments' })
export class Appointment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 8 })
    date!: string;

    @Column({ length: 5 })
    time!: string;

    @Column({ type: 'integer' })
    peopleNumber!: number;    

    @Column({ default: AppointmentStatus.ACTIVE })
    status!: string; 

    @ManyToOne(() => User, user => user.appointments)
    @JoinColumn({ name: 'user_id' })
    user!: User;
}