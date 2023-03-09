import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly datasource: DataSource) {}

  async create(createUserDto: CreateUserDto) {
    const repo = this.datasource.getRepository(User);
    return await repo.save({
      ...createUserDto,
      password: '', //bcrypt
    });
  }

  async findAll() {
    const repo = this.datasource.getRepository(User);
    return await repo;
  }

  async findOne(id: number): Promise<User> {
    const repo = this.datasource.getRepository(User);
    return repo.findOne({where: {id: id}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
