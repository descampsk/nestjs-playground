import { Module } from '@nestjs/common';
import { PrimeController } from './prime.controller';
import { PrimeService } from './prime.service';
import { CacheModuleRegistered } from './cache/cache.config';

/**
 * The prime module allows you to compute prime numbers.
 */
@Module({
  imports: [CacheModuleRegistered],
  controllers: [PrimeController],
  providers: [PrimeService],
})
export class PrimeModule {}
