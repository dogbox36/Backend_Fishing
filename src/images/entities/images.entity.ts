import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  src: string;

  @Column()
  breed: string;

  @Column()
  weight: string;

  @Column()
  lenght: string;

  @Column()
  location: string;

  @ManyToOne(() => User, (user) => user.catches)
  @JoinColumn()
  user: User;
}
