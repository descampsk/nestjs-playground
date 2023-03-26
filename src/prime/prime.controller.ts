import {
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PrimeService } from './prime.service';

@Controller('prime')
@UseInterceptors(CacheInterceptor)
export class PrimeController {
  constructor(private primeNumberService: PrimeService) {}

  @Get()
  @CacheTTL(3600000)
  getPrimeNumber(@Query('limit', ParseIntPipe) limit: number): number[] {
    return this.primeNumberService.computePrimeNumber(limit);
  }
}
