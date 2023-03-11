import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    xLoccord: number;

    @Column()
    yLoccord: number;

    @Column()
    comment: string;

    @Column({type: 'text', nullable:true})
    image:string;
    
    @CreateDateColumn()
    createdAt:Date;

    @ManyToOne(()=> User, user => user.locations)
    user: User;
    
}
