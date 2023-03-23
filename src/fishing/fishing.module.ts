import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FishingController } from './fishing.controller';
import { FishingService } from './fishing.service';
import { Fishing } from './entities/fishing.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fishing,User])],
  controllers: [FishingController],
  providers: [FishingService],
})
export class FishingModule {}
