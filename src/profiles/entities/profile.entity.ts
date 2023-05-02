import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile {
@PrimaryGeneratedColumn()
  id: number;

  @Column()
  lastname: string;

  @Column()
  firstname: string;

  @Column()
  birthdate: Date;

  @Column({ unique: true })
  fishingid: number;
  
  @OneToOne(() => User, (users) => users.profile)
  @JoinColumn()
  user: User;
}
