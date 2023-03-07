import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import TokenStrategy from './token.strategy';

@Module({
  controllers: [AuthController, AppController],
  providers: [AuthService, TokenStrategy, AppService],
})
export class AuthModule {}
