import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateFishingDto } from './dto/create-fishing.dto';
import { Fishing } from './entities/fishing.entity';


@Injectable()

export class FishingService {
  constructor(
    @InjectRepository(Fishing) private fishingReprository: Repository<Fishing>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly datasource: DataSource
  ) {}



  async findAll() {
    const repo = this.datasource.getRepository(Fishing);
    return await repo;
  }

 
  async createFishing(CreateFishingDto: CreateFishingDto,userId: number){
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const repo = this.datasource.getRepository(Fishing);
    const newFishing = this.fishingReprository.create({ ...CreateFishingDto, user });
    return await this.fishingReprository.save(newFishing);
  }

}
