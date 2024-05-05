import { Test, type TestingModule } from '@nestjs/testing';
import { PrimeService } from './prime.service';
import { getLoggerToken } from 'nestjs-pino';
import { mockLogger } from '../../core/logger/mocks/logger.mock';

describe('PrimeNumberService', () => {
  let service: PrimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrimeService,
        {
          provide: getLoggerToken(PrimeService.name),
          useValue: mockLogger,
        },
      ],
    }).compile();

    service = module.get<PrimeService>(PrimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('computePrimeNumber', () => {
    it.each([
      [10, [2, 3, 5, 7]],
      [30, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]],
    ])(
      'should return the right prime numbers for limit %i',
      (limit, expected) => {
        const primes = service.computePrimeNumber(limit);
        expect(primes).toStrictEqual(expected);
      },
    );
  });
});
