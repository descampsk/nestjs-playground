import type { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrimeModule } from './prime.module';

export const buildPrimeSwaggerConfig = (app: INestApplication) => {
  const configService = new ConfigService();
  const modulesToEnabled = configService.get<string>('MODULES_ENABLED', 'ALL');
  if (
    !modulesToEnabled.includes(PrimeModule.name) &&
    modulesToEnabled !== 'ALL'
  ) {
    return;
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS Playgroud - Prime')
    .setDescription('OpenAPI for the Prime module of the NestJS Playground API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [PrimeModule],
  });

  SwaggerModule.setup('prime/docs/', app, document);
};
