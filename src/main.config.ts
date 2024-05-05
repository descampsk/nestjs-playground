import { ValidationPipe } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { type NestExpressApplication } from '@nestjs/platform-express';
import { buildAuthSwaggerConfig } from './modules/auth0/auth0.swagger';
import { buildPrimeSwaggerConfig } from './modules/prime/prime.swagger';

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
