import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import LoginDto from './login.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Request } from 'express';
import Token from './token.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private dataSource: DataSource,
    private authService: AuthService,
  ) {}
  // login username jelszó ellenőrzés
  @Post('login')
  async login(@Body() loginData: LoginDto) {
    const usersRepo = this.dataSource.getRepository(User);
    const user = await usersRepo.findOne({
      where: { username: loginData.username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordMatches = await bcrypt.compare(
      loginData.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const token = await this.authService.generateTokenFor(user);
    return { token };
  }
  // logoutnál: törli a token-t
  @Delete('logout')
  async logout(@Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1]; // Token kinyerése a fejlécből
    await this.authService.deleteTokenFor(token);
  }

  @Delete('logout/android')
  async logoutAndroid(@Body() tokenUser: Token) {
    const token = tokenUser.token;
    await this.authService.deleteTokenFor(token);
  }

  // felhasználó regisztráció
  @Post('users')
  async postUsers(@Body() usersdto: CreateUserDto) {
    const usersRepo = this.dataSource.getRepository(User);

    // Ellenőrizzük, hogy a felhasználónév vagy az email cím vagy a telefonszám már létezik-e az adatbázisban
    const existingUser = await usersRepo.findOne({
      where: [
        { username: usersdto.username },
        { email: usersdto.email },
        { phone: usersdto.phone },
      ],
    });

    if (existingUser) {
      let errorMsg = '';

      if (existingUser.username === usersdto.username) {
        errorMsg += 'A felhasználónév már foglalt!\n';
      }

      if (existingUser.email === usersdto.email) {
        errorMsg += 'Az email cím már foglalt!\n';
      }

      if (existingUser.phone === usersdto.phone) {
        errorMsg += 'A telefonszám már foglalt!\n';
      }

      throw new BadRequestException(errorMsg);
    }

    // A felhasználó mentése az adatbázisba
    usersdto.id = undefined;
    const user = Object.assign(new User(), usersdto);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    console.log(user);
    await usersRepo.save(user);
  }
}
