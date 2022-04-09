import { Test, TestingModule } from '@nestjs/testing';
import { PrimeController } from './prime.controller';
import { PrimeService } from './prime.service';

describe('PrimeController', () => {
  let controller: PrimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrimeController],
      providers: [PrimeService],
    }).compile();

    controller = module.get<PrimeController>(PrimeController);
  });

  it('should be get the right prime numbers', () => {
    expect(controller.getPrimeNumber(10)).toStrictEqual([2, 3, 5, 7]);
  });
});
