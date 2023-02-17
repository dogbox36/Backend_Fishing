import { isDefined, IsEmail, IsNotEmpty, isPhoneNumber } from 'class-validator';

export default class newUserDTO {
    username: string;
    @IsNotEmpty()
    password: string;
    @IsEmail()
    email: string;
    phone: string;
}
