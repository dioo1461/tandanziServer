import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    uid: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    username: string;
}