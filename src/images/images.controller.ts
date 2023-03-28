import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ImageService } from './images.service';
import { CreateImageDto } from './dto/create-images.dto';
import { UpdateImageDto } from './dto/update-images.dto';
import { Image } from './entities/images.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';

@Controller('images')
@UseGuards(AuthGuard('bearer'))
export class ImagesController {
  constructor(private readonly imagesService: ImageService) {}

  @Post('add')
  create(
    @Body() createImageDto: CreateImageDto,
    @Req() req: Request & { user?: User },
  ): Promise<Image> {
    const image = new Image();
    image.src = createImageDto.src;
    image.breed = createImageDto.breed;
    image.weight = createImageDto.weight;
    image.lenght = createImageDto.lenght;
    image.location = createImageDto.location;
    const userId = req.user?.id;
    return this.imagesService.create(image, userId);
  }

  @Get('info')
  findAll(): Promise<Image[]> {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Image> {
    return this.imagesService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateImageDto: UpdateImageDto,
  ): Promise<Image> {
    const updatedImage = await this.imagesService.update(id, updateImageDto);
    return updatedImage;
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.imagesService.remove(+id);
  }
}
