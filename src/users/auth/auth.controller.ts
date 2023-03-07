import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import LoginDto from './login.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private dataSource: DataSource,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    const usersRepo = this.dataSource.getRepository(User);
    const user = await usersRepo.findOne({
      where: { username: loginData.username },
    });

    const passwordMatches = await bcrypt.compare(
      loginData.password,
      user.password,
    );
    if (!user && !passwordMatches) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const token = await this.authService.generateTokenFor(user);
    return { token };
  }
  // logoutnál: törli a token-t
  @Post('users')
  async postUsers(@Body() usersdto: CreateUserDto) {
    usersdto.id = undefined;
    const Repo = this.dataSource.getRepository(User);
    const user = Object.assign(new User(), usersdto);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    console.log(user);
    await Repo.save(user);
  }
}
