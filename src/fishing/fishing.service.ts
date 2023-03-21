import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fishing } from './entities/fishing.entity';


@Injectable()
export class FishingService {
  constructor(
    @InjectRepository(Fishing)
    private readonly calendarRepository: Repository<Fishing>,
  ) {}

 

  async remove(id: number): Promise<void> {
    const calendar = await this.calendarRepository.findOne({ where: { id } });
    if (!calendar) {
      throw new NotFoundException(`Calendar with id ${id} not found`);
    }
    await this.calendarRepository.remove(calendar);
  }
}
