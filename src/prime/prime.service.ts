import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PrimeService {
  private readonly logger = new Logger(PrimeService.name);

  public computePrimeNumber(limit: number): number[] {
    this.logger.log({ message: 'Computing prime number...', limit });
    const primesBoolean: boolean[] = [];
    for (let i = 2; i <= limit + 1; i++) {
      primesBoolean.push(true);
    }

    for (let i = 2; i <= Math.sqrt(limit); i++) {
      if (primesBoolean[i]) {
        for (let j = i * i; j < limit; j += i) {
          primesBoolean[j] = false;
        }
      }
    }
    const primes: number[] = [];
    primesBoolean.forEach((value, index) => {
      if (value) {
        primes.push(index);
      }
    });
    return primes.slice(2);
  }
}
