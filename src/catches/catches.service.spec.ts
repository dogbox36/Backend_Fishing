import { Test, TestingModule } from '@nestjs/testing';
import { CatchesService } from './catches.service';

describe('CatchesService', () => {
  let service: CatchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatchesService],
    }).compile();

    service = module.get<CatchesService>(CatchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
