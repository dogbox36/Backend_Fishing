import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateImageDto } from './dto/update-images.dto';
import { Image } from './entities/images.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(image: Image, userId: number): Promise<Image> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    image.user = user;
    return await this.imageRepository.save(image);
  }

  async findAll(): Promise<Image[]> {
    return await this.imageRepository.find();
  }

  async findOne(id: number): Promise<Image> {
    return await this.imageRepository.findOne({ where: { id } });
  }

  async update(id: number, updateImageDto: UpdateImageDto): Promise<Image> {
    const existingImage = await this.findOne(id);
    const updatedImage = { ...existingImage, ...updateImageDto };
    return await this.imageRepository.save(updatedImage);
  }

  async remove(id: number): Promise<void> {
    await this.imageRepository.delete(id);
  }
}
