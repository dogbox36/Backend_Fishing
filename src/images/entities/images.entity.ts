import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
