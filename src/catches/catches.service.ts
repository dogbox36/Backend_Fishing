import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCatchDto } from './dto/create-catch.dto';
import { UpdateCatchDto } from './dto/update-catch.dto';
import { Catch } from './entities/catch.entity';

@Injectable()
export class CatchesService {
  constructor(
    @InjectRepository(Catch) private catchRepository: Repository<Catch>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createCatchDto: CreateCatchDto, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
 // get user by userId
    const newCatch = this.catchRepository.create({ ...createCatchDto, user }); // create new catch with user object
    return await this.catchRepository.save(newCatch); // save to database
  }

  async findUserByCatch(catchId: number): Promise<User> {
    const catchObj = await this.catchRepository.findOne({
      where: { id: catchId },
      relations: ['user'],
    });
    if (!catchObj) {
      return null;
    }
    return catchObj.user;
  }
  async findAll() {
    return await this.catchRepository.find();
  }
  findOne(id: number) {
    return `This action returns a #${id} catch`;
  }

  update(id: number, updateCatchDto: UpdateCatchDto) {
    return `This action updates a #${id} catch`;
  }

  remove(id: number) {
    return `This action removes a #${id} catch`;
  }
}
