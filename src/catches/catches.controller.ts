import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CatchesService } from './catches.service';
import { CreateCatchDto } from './dto/create-catch.dto';
import { UpdateCatchDto } from './dto/update-catch.dto';

@Controller('catches')
export class CatchesController {
  constructor(private readonly catchesService: CatchesService) {}

  @Post('add')
  async create(@Body() createCatchDto: CreateCatchDto) {
    return await this.catchesService.create(createCatchDto);
  }

  @Get('info')
  findAll() {
    return this.catchesService.findAll();
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
