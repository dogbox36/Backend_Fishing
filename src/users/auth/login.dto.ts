import { IsString } from 'class-validator';

export default class LoginDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
