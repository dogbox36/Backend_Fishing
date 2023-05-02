import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;
  password: string;
  @IsEmail({})
  email: string;
  phone?: string;
  id: any;
}
