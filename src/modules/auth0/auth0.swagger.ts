import type { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Auth0Module } from './auth0.module';

export const buildAuthSwaggerConfig = (app: INestApplication) => {
  const configService = new ConfigService();
  const modulesToEnabled = configService.get<string>('MODULES_ENABLED', 'ALL');
  if (
    !modulesToEnabled.includes(Auth0Module.name) &&
    modulesToEnabled !== 'ALL'
  ) {
    return;
  }

  const issuerBaseUrl = configService.getOrThrow<string>(
    'AUTH0_ISSUER_BASE_URL',
  );
  const audience = configService.getOrThrow<string>('AUTH0_AUDIENCE');
  const clientId = configService.getOrThrow<string>('AUTH0_CLIENT_ID');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS Playgroud - Auth0')
    .setDescription('OpenAPI for the Auth0 module of the NestJS Playground API')
    .setVersion('1.0')
    .addOAuth2(
      {
        type: 'oauth2',
        scheme: 'bearer',
        in: 'header',
        bearerFormat: 'JWT',
        flows: {
          implicit: {
            authorizationUrl: `${issuerBaseUrl}/authorize?audience=${audience}`,
            tokenUrl: `${issuerBaseUrl}/oauth/token`,
            scopes: {
              openid: 'openid',
            },
          },
        },
      },
      'Auth0',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [Auth0Module],
  });

  // There is an issue with Oauth2 redirect_uri in the swagger-ui if the path is docs without a trailing slash
  SwaggerModule.setup('auth0/docs/', app, document, {
    swaggerOptions: {
      initOAuth: {
        clientId,
      },
    },
  });
};
