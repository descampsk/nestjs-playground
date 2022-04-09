import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { PrimeService } from './prime.service';

@Controller('prime')
export class PrimeController {
  constructor(private primeNumberService: PrimeService) {}

  @Get()
  getPrimeNumber(@Query('limit', ParseIntPipe) limit: number): number[] {
    return this.primeNumberService.computePrimeNumber(limit);
  }
}
