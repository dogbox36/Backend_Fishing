
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import {Catch} from 'src/catches/entities/catch.entity'
@Entity()
export class Fishing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  startingOfFishing: Date;

  @Column()
  endingOfFishing: Date;

  @Column()
  piecesOfTheFishes: number;

  @Column()
  sumWeight: number;

 
  @ManyToOne(() => User, (user) => user.fishing)
  user: User;
  
  @OneToMany(() => Catch, (relatedCatch) => relatedCatch.fishing)
  catches: Catch[];





}
