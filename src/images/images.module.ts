import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Image } from './entities/images.entity';
import { ImagesController } from './images.controller';
import { ImageService } from './images.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image, User])],
  controllers: [ImagesController],
  providers: [ImageService],
})
export class ImagesModule {}
