import { Location } from 'src/locations/entities/location.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Catch } from 'src/catches/entities/catch.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToOne(() => Profile, (profiles) => profiles.user)
  profile: Profile;

  @OneToMany(() => Location, (location) => location.user)
  locations: Location[];
  
  @OneToMany(() => Catch, (catchObj) => catchObj.user)
  catches: Catch[];

}
