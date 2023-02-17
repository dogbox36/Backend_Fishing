import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { DataSource, EntityNotFoundError } from 'typeorm';
import { AppService } from './app.service';
import newUserDTO from './dto/users.dto';
import { Users } from './entity/Users.entity';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  /**
   *
   * Listing out all the users what we have in users database
   */
  @Get('/api/listUsers')
  async listAllUsers() {
    const UsersRepository = this.dataSource.getRepository(Users);
    return await UsersRepository.find();
  }
  /**
   *
   *  @Get('api/searchUserById/:id') List out the user by adding the user id and if it's not exits it gaves back an error
   */
  @Get('api/searchUserById/:id')
  async getUserData(@Param('id') id: number) {
    try {
      const usersRepo = this.dataSource.getRepository(Users);
      return await usersRepo.findOneByOrFail({ id: id });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException('Nem létezik ehez az id-hoz felhasználó');
      }
    }
  }

  @Get('api/searchUser/:username')
  async getUsernameData(@Param('username') userName: string) {
    try {
      const usersRepo = this.dataSource.getRepository(Users);
      return await usersRepo.findOneByOrFail({ username: userName });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException({ message: 'Nem létezik a username' });
      }
    }
  }

  @Post('api/addUser')
  async addNewUser(@Body() newUserAdd: newUserDTO) {
    {
      const usersRepo = this.dataSource.getRepository(Users);
      await usersRepo.save(newUserAdd);
    }
  }
  @Delete('api/deleteUser/:id')
  async deleteUser(@Param('id') id: number) {
    const usersRepo = this.dataSource.getRepository(Users);
    await usersRepo.delete(id);
  }
}
