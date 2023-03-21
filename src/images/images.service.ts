import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateImageDto } from './dto/update-images.dto';
import { Image } from './entities/images.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async create(image: Image): Promise<Image> {
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
