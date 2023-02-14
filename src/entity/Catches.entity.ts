import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profiles } from './Profiles.entity';

@Entity()
export class Catches {
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

  @ManyToOne(() => Profiles, (profile) => profile.catches)
  profile: Profiles;
}
