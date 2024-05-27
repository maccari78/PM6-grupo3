import { Test, TestingModule } from '@nestjs/testing';
import { AdressesService } from './adresses.service';

describe('AdressesService', () => {
  let service: AdressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdressesService],
    }).compile();

    service = module.get<AdressesService>(AdressesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
