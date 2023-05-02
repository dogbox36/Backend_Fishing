import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(
    createLocationDto: CreateLocationDto,
    userId: number,
  ): Promise<Location> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const newLocation = this.locationRepository.create({
      ...createLocationDto,
      user,
    });
    return await this.locationRepository.save(newLocation);
  }

  async findUserLocations(userId: number) {
    return await this.locationRepository.find({
      where: { user: { id: userId } },
    });
  }
  async findAll(): Promise<Location[]> {
    return await this.locationRepository.find();
  }

  async findOneById(id: number): Promise<Location> {
    return await this.locationRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateLocationDto: UpdateLocationDto,
    userId: number,
  ): Promise<void> {
    const location = await this.locationRepository.findOneOrFail({
      where: { id, user: { id: userId } },
    });
    await this.locationRepository.update(location, updateLocationDto);
  }

  async remove(id: number, userId: number): Promise<Location> {
    const locationToDelete = await this.locationRepository.findOneOrFail({
      where: { id: id },
    });
    await this.locationRepository.remove(locationToDelete);
    return locationToDelete;
  }
}
