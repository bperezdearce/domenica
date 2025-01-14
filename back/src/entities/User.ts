import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OneToOne } from 'typeorm/decorator/relations/OneToOne';
import { Credential } from './Credential';
import { Appointment } from './Appointment';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    name!: string;

    @Column()
    email!: string;

    @Column()
    birthdate!: string;

    @Column({ type: 'integer' })
    nDni!: number;

    @OneToOne(() => Credential)
    @JoinColumn({ name: 'credentials_id' })
    credentials!: Credential;

    @OneToMany(() => Appointment, appointment => appointment.user)
    appointments!: Appointment[];
}