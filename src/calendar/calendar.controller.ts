import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post('add')
  create(@Body() createCalendarDto: CreateCalendarDto) {
    return this.calendarService.create(createCalendarDto);
  }

  @Get('info')
  findAll() {
    return this.calendarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calendarService.findOneById(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCalendarDto: UpdateCalendarDto,
  ) {
    return this.calendarService.update(+id, updateCalendarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calendarService.remove(+id);
  }
}
