import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    uid: number;
    
    @Column()
    readonly age: number | null;

    @Column()
    readonly height: number | null;

    @Column()
    readonly weight: number | null;

    @Column()
    readonly bodyWater: number | null;

    @Column()
    readonly bodyProtein: number | null;

    @Column()
    readonly bodyMineral: number | null;
    
    @Column()
    readonly bodyFat: number | null;

    @Column()
    readonly waistHipRatio: number | null;
}