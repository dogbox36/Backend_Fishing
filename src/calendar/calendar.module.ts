import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { Calendar } from './entities/calendar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calendar, User])],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
