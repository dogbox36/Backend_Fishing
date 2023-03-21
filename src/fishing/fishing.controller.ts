import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { FishingService } from './fishing.service';
import { CreateFishingDto } from './dto/create-fishing.dto';
import { UpdateFishingDto } from './dto/update-fish.dto';

@Controller('calendar')
export class FishingController {
  constructor(private readonly calendarService: FishingService) {}

}
