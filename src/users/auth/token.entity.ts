import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export default class Token {
  @PrimaryColumn()
  token: string;

  @ManyToOne(() => User)
  users: User;
  //Márk: @CreateDateColumn()
 // createdAt:Date;
  // Dominik: Lejárati dátum
}
