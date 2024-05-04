import { INestApplication, ValidationPipe } from '@nestjs/common';
import { buildSwaggerConfig } from './core/swagger';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

export function mainConfig(app: INestApplication) {
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

  buildSwaggerConfig(app);

  app.useLogger(app.get(Logger));
}
