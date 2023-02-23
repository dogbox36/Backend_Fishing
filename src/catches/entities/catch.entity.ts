import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Catch {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    xFcord: number;

    @Column()
    yFcord: number;

    @Column()
    fishspecies: string;

    @Column()
    weight: number;

    @Column()
    size: number;


}
