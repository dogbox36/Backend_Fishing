import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CatchesService } from './catches.service';
import { CreateCatchDto } from './dto/create-catch.dto';
import { UpdateCatchDto } from './dto/update-catch.dto';
import { Request } from 'express';
import { User } from '../users/entities/user.entity'; // added

@Controller('catches')
export class CatchesController {
  constructor(private readonly catchesService: CatchesService) {}

  @Post('add')
  async create(
    @Body() createCatchDto: CreateCatchDto,
    @Req() req: Request & { user?: User },
  ) {
    const userId = req.user?.id; // get logged in user's id
    return await this.catchesService.create(createCatchDto, userId); // pass userId to service method
  }

  @Get('info')
  findAll() {
    return this.catchesService.findAll();
  }

  @Get(':id/user')
  async findUserByCatch(@Param('id') id: string) {
    return await this.catchesService.findUserByCatch(+id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catchesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatchDto: UpdateCatchDto) {
    return this.catchesService.update(+id, updateCatchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catchesService.remove(+id);
  }
}
