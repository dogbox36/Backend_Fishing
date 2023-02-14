import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Spots {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  xScord: number;

  @Column()
  yScord: number;

  @Column()
  comment: string;
}
