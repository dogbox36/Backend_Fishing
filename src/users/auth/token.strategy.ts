import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { AuthService } from './auth.service';

@Injectable()
export default class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(token: string) {
    const users = this.authService.findUserByToken(token);
    if (users === null) {
      throw new UnauthorizedException();
    }
    // Token-hez tárolunk pl. lejárati időt, akkor itt tudjuk ellenőrozni
    // - Pl. Token entity-hez validUntil oszlop
    return users;
  }
}
