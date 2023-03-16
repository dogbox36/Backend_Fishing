import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
