import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';

@Controller('calendar')
@UseGuards(AuthGuard('bearer'))
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post('add')
  create(
    @Body() createCalendarDto: CreateCalendarDto,
    @Req() req: Request & { user?: User },
  ) {
    const userId = req.user?.id;
    return this.calendarService.create(createCalendarDto, userId);
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
