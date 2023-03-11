import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  
  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file, @Body() userDto: CreateLocationDto): Promise<Location> {
    const { originalname, buffer } = file;
    const user = await this.locationsService.create({
      ...userDto,
      image: buffer.toString('base64'),
    });
    return location;
  }

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(+id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(+id);
  }
}
