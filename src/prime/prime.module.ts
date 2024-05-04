import { Module } from '@nestjs/common';
import { PrimeController } from './prime.controller';
import { PrimeService } from './prime.service';
import { CacheModuleRegistered } from './cache/cache.config';

@Module({
  imports: [CacheModuleRegistered],
  controllers: [PrimeController],
  providers: [PrimeService],
})
export class PrimeModule {}
