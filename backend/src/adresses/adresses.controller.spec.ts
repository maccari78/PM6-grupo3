import { Test, TestingModule } from '@nestjs/testing';
import { AdressesController } from './adresses.controller';
import { AdressesService } from './adresses.service';

describe('AdressesController', () => {
  let controller: AdressesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdressesController],
      providers: [AdressesService],
    }).compile();

    controller = module.get<AdressesController>(AdressesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
