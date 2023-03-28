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
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('locations')
@UseGuards(AuthGuard('bearer'))
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post('add')
  create(
    @Body() createLocationDto: CreateLocationDto,
    @Req() req: Request & { user?: User },
  ) {
    const userId = req.user?.id;
    return this.locationsService.create(createLocationDto, userId);
  }

  // @Post('image')
  // @UseInterceptors(FileInterceptor('image'))
  // async uploadImage(
  //   @UploadedFile() file,
  //   @Body() locationDto: CreateLocationDto,
  //   @Req() req: Request & { user?: User },
  // ): Promise<Location> {
  //   const { originalname, buffer } = file;
  //   const userId = req.user?.id;
  //   const location = await this.locationsService.create(locationDto, userId);
  //   location.image = buffer.toString('base64');
  //   await this.locationsService.update(
  //     location.id,
  //     { image: location.image },
  //     userId,
  //   );
  //   return location;
  // }

  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
    @Req() req: Request & { user?: User },
  ) {
    const userId = req.user?.id;
    return this.locationsService.update(+id, updateLocationDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request & { user?: User }) {
    const userId = req.user?.id;
    return this.locationsService.remove(+id, userId);
  }
}
