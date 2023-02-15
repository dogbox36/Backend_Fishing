import { Body, Controller, Get, NotFoundException, Param, Post, Render } from '@nestjs/common';
import { DataSource, EntityNotFoundError } from 'typeorm';
import { AppService } from './app.service';
import newUserDTO from './dto/users.dto';
import { Users } from './entity/Users.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) { }

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
   * @param id List out the user by adding the user id and if it's not exits it gaves back an error
   */
  @Get('api/searchUser/:id')
  async getUserData(@Param('id') id: number) {
    try {
      const usersRepo = this.dataSource.getRepository(Users);
      return await usersRepo.findOneByOrFail({ id: id });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException(
          'Nem létezik ehez az id-hoz felhasználó'
        )
      }
    }
  }

  @Post('api/addUser')
  async addNewUser(@Body() newUserAdd: newUserDTO){{
    const usersRepo = this.dataSource.getRepository(Users)
    await usersRepo.save(newUserAdd)
  }
    
  }
}
