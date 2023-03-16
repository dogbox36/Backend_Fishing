import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Catch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  species: string;

  @Column({ type: 'float' })
  weight: number;

  @Column({ type: 'float' })
  length: number;

  @Column()
  location: string;

  @ManyToOne(() => User, (user) => user.catches)
  user: User;
}
