import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    xScord: number;

    @Column()
    yScord: number;

    @Column()
    comment: string;
}
