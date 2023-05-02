import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CatchesService } from './catches.service';
import { CreateCatchDto } from './dto/create-catch.dto';
import { UpdateCatchDto } from './dto/update-catch.dto';
import { Request } from 'express';
import { User } from '../users/entities/user.entity'; // added
import { AuthGuard } from '@nestjs/passport';

@Controller('catches')
@UseGuards(AuthGuard('bearer'))
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
  async findUserCatches(@Req() req: Request & { user?: { id: number } }) {
    const userId = req.user?.id; // get logged in user's id
    return await this.catchesService.findUserCatches(userId); // pass userId to service method
  }

  @Get(':id/user')
  async findUserByCatch(@Param('id') id: string) {
    return await this.catchesService.findUserCatches(+id);
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
