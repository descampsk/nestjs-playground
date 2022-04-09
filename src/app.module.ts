import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './logger/logger.middleware';
import { PrimeController } from './prime/prime.controller';
import { PrimeService } from './prime/prime.service';
import { HealthModule } from './health/health.module';

@Module({
  imports: [HealthModule],
  controllers: [PrimeController],
  providers: [PrimeService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
