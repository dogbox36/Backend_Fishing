
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import {Fishing} from  'src/fishing/entities/fishing.entity'
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

  @ManyToOne(() => Fishing, (fishing) => fishing.catches)
  fishing: Fishing;
}
