import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { v4 as uuidV4 } from 'uuid';
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
    LoggerModule.forRoot({
      pinoHttp: {
        genReqId: () => uuidV4(),
        quietReqLogger: true,
      },
    }),
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
