import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Profile{
    @PrimaryGeneratedColumn({type: 'int'})
    uid: number;
    
    @Column({type: 'int'})
    readonly age: number | null;

    @Column({type: 'decimal', precision:5, scale: 2})
    readonly height: number | null;

    @Column({type: 'decimal', precision:5, scale: 2})
    readonly weight: number | null;

    @Column({type: 'decimal', precision:5, scale: 2})
    readonly bodyWater: number | null;

    @Column({type: 'decimal', precision:5, scale: 2})
    readonly bodyProtein: number | null;

    @Column({type: 'decimal', precision:5, scale: 2})
    readonly bodyMineral: number | null;
    
    @Column({type: 'decimal', precision:5, scale: 2})
    readonly bodyFat: number | null;

    @Column({type: 'decimal', precision:5, scale: 2})
    readonly waistHipRatio: number | null;
}