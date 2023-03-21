import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FishingController } from './fishing.controller';
import { FishingService } from './fishing.service';
import { Fishing } from './entities/fishing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fishing])],
  controllers: [FishingController],
  providers: [FishingService],
})
export class FishingModule {}
