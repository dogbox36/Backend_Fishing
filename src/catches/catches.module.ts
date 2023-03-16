import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatchesService } from './catches.service';
import { CatchesController } from './catches.controller';
import { Catch } from './entities/catch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Catch])],
  controllers: [CatchesController],
  providers: [CatchesService],
})
export class CatchesModule {}
