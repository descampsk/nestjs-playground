import { ValidationPipe } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { type NestExpressApplication } from '@nestjs/platform-express';
import { buildAuthSwaggerConfig } from './modules/auth0/auth0.swagger';
import { buildPrimeSwaggerConfig } from './modules/prime/prime.swagger';

/**
 * To be able to have the same configuration in integration test and in the main application, we extract the main configuration.
 *
 * This function should be called in the main.ts file and in every integration test file.
 */
export function mainConfig(app: NestExpressApplication) {
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.enableCors();

  const swaggerBuilders = [buildAuthSwaggerConfig, buildPrimeSwaggerConfig];
  for (const swaggerBuilder of swaggerBuilders) {
    swaggerBuilder(app);
  }

  app.useLogger(app.get(Logger));
}
