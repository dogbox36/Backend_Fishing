import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { Calendar } from './entities/calendar.entity';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calendar)
    private readonly calendarRepository: Repository<Calendar>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(
    createCalendarDto: CreateCalendarDto,
    userId: number,
  ): Promise<Calendar> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const calendar = new Calendar();
    calendar.title = createCalendarDto.title;
    calendar.start = createCalendarDto.start;
    calendar.end = createCalendarDto.end;
    calendar.user = user; // set the user to the calendar entity
    return await this.calendarRepository.save(calendar);
  }

  async findAll(): Promise<Calendar[]> {
    return await this.calendarRepository.find();
  }

  async findOneById(id: number): Promise<Calendar> {
    return await this.calendarRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateCalendarDto: UpdateCalendarDto,
  ): Promise<Calendar> {
    const calendar = await this.calendarRepository.findOne({ where: { id } });
    if (!calendar) {
      throw new NotFoundException(`Calendar with id ${id} not found`);
    }

    calendar.title = updateCalendarDto.title;
    calendar.start = updateCalendarDto.start;
    calendar.end = updateCalendarDto.end;

    return await this.calendarRepository.save(calendar);
  }

  async remove(id: number): Promise<void> {
    const calendar = await this.calendarRepository.findOne({ where: { id } });
    if (!calendar) {
      throw new NotFoundException(`Calendar with id ${id} not found`);
    }
    await this.calendarRepository.remove(calendar);
  }
}
