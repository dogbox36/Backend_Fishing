import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(private readonly datasource: DataSource) { }


  async create(createLocationDto: CreateLocationDto) {
    const repo = this.datasource.getRepository(Location)
    return await repo.save({
      ...createLocationDto,
    })
  }

  async findAll(): Promise<Location[]> {
    const repo = this.datasource.getRepository(Location);
    return await repo.find()
  }

  async findOne(id: number): Promise<Location> {
    const repo = this.datasource.getRepository(Location);
    return await repo.findOne({where: {id} });
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  async remove(id: number): Promise<Location> {
    const repo = this.datasource.getRepository(Location);
    const locationToDelete = await repo.findOneOrFail({where: {id}});
    await repo.remove(locationToDelete);
    return locationToDelete;
  }
}
