import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'int' })
    uid: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    username: string;
}