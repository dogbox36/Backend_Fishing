import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import * as crypto from 'crypto';
import Token from './token.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private dataSource: DataSource) {}

  async findUserByToken(token: string) {
    const tokenRepo = this.dataSource.getRepository(Token);
    const tokenObj = await tokenRepo.findOne({
      where: { token },
      relations: { users: true },
    });
    if (tokenObj === null) {
      return null;
    }
    return tokenObj.users;
  }

  async generateTokenFor(users: User) {
    // Véletlen string generálása
    const veletlen = crypto.randomBytes(32);
    const tokenString = veletlen.toString('hex');
    // Eltenni adatbázisba
    const token = new Token();
    token.users = users;
    token.token = tokenString;
    await this.dataSource.getRepository(Token).insert(token);

    return tokenString;
  }
}
