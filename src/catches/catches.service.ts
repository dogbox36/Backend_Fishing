import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatchDto } from './dto/create-catch.dto';
import { UpdateCatchDto } from './dto/update-catch.dto';
import { Catch } from './entities/catch.entity';

@Injectable()
export class CatchesService {
  constructor(
    @InjectRepository(Catch) private catchRepository: Repository<Catch>,
  ) {}
  async create(createCatchDto: CreateCatchDto) {
    const newCatch = this.catchRepository.create(createCatchDto);
    return await this.catchRepository.save(newCatch);
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
