import { Module } from '@nestjs/common';
import { CatchesService } from './catches.service';
import { CatchesController } from './catches.controller';

@Module({
  controllers: [CatchesController],
  providers: [CatchesService]
})
export class CatchesModule {}
