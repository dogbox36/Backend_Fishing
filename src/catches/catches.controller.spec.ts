import { Test, TestingModule } from '@nestjs/testing';
import { CatchesController } from './catches.controller';
import { CatchesService } from './catches.service';

describe('CatchesController', () => {
  let controller: CatchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatchesController],
      providers: [CatchesService],
    }).compile();

    controller = module.get<CatchesController>(CatchesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
