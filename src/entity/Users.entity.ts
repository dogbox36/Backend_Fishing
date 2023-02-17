import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profiles } from './Profiles.entity';
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToOne(() => Profiles, (profiles) => profiles.users)
  profile: Profiles;
}
