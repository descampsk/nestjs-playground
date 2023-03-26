import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  CacheModule,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import type { RedisClientOptions } from 'redis';
import { LoggerMiddleware } from './logger/logger.middleware';
import { PrimeController } from './prime/prime.controller';
import { PrimeService } from './prime/prime.service';
import { HealthModule } from './health/health.module';
import { XRayMiddleware } from './xray/xray.middleware';
import { CacheModuleRegistered } from './cache/cache.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HealthModule,
    CacheModuleRegistered,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
  ],
  controllers: [PrimeController],
  providers: [PrimeService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(XRayMiddleware, LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
