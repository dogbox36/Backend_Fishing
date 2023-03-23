import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { FishingService } from './fishing.service';
import { CreateFishingDto } from './dto/create-fishing.dto';
import { UpdateFishingDto } from './dto/update-fish.dto';
import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Controller('Fishing')
export class FishingController {
  constructor(private readonly FishingService: FishingService,
    private readonly datasource: DataSource){}
  

  @Get()
  findAll() {
    return this.FishingService.findAll();
  }
  //Creating fishing by user()
  @Post('add')
  async create(
    @Body() CreateFishingDto: CreateFishingDto,
    @Req() req: Request & { user?: User },
  ) {
    const userId = req.user?.id; // get logged in user's id
    return await this.FishingService.createFishing(CreateFishingDto, userId); // pass userId to service method
  }
  



}
