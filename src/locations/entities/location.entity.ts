import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  xLoccord: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  yLoccord: number;

  @Column()
  comment: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.catches)
  @JoinColumn()
  user: User;
}
