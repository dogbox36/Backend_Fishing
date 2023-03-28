import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, User])],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
