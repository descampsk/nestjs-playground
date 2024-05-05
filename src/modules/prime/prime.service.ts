import { Injectable, Logger } from '@nestjs/common';

/**
 * The prime service allows you to compute prime numbers.
 */
@Injectable()
export class PrimeService {
  /**
   * PrimeService Logger
   */
  private readonly logger = new Logger(PrimeService.name);

  /**
   * Compute prime numbers up to the limit.
   * @param limit limit of the prime numbers to compute
   * @returns A list of prime numbers up to the limit
   */
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
