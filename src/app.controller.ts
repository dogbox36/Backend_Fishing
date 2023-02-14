import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { Users } from './entity/Users.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Get('api/listUsers')
  async listAllUsers() {
    const UsersRepository = this.dataSource.getRepository(Users);
    return await UsersRepository.find();
  }
  @Post('api/addNewUser')
  as
}
