import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Catches } from './Catches.entity';
import { Users } from './Users.entity';

@Entity()
export class Profiles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lastname: string;

  @Column()
  firstname: string;

  @Column()
  birthdate: Date;

  @Column({ unique: true })
  fishingid: number;
  @OneToOne(() => Users, (users) => users.profile)
  @JoinColumn()
  users: Users;

  @OneToMany(() => Catches, (catches) => catches.profile)
  catches: Catches[];
}
