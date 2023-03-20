import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  //működik http://localhost:3000/locations
  @Post('add')
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  //image feltoltese NINCS TESZTELVE
  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file,
    @Body() locationDto: CreateLocationDto,
  ): Promise<Location> {
    const { originalname, buffer } = file;
    const user = await this.locationsService.create({
      ...locationDto,
      image: buffer.toString('base64'),
    });
    return location;
  }
  //müködik
  @Get()
  findAll() {
    return this.locationsService.findAll();
  }
  //müködik
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(+id);
  }
  //halásztol meg kell kérdezni az update dto hogy mukszik
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationsService.update(+id, updateLocationDto);
  }
  //müködik
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(+id);
  }
}
