import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Auth0Service } from 'src/auth0/auth0.service';

export const buildSwaggerConfig = (app: INestApplication) => {
  const builder = new DocumentBuilder()
    .setTitle('NestJS Playgroud')
    .setDescription('OpenAPI for the NestJS Playground API')
    .setVersion('1.0');

  const configService = new ConfigService();
  const modulesEnabled = configService.get('MODULES_ENABLED', 'ALL');
  if (modulesEnabled === 'ALL' || modulesEnabled.includes('Auth0Module')) {
    const auth0Service = app.get(Auth0Service);
    auth0Service.addSwaggerOauth2(builder);
  }

  const swaggerConfig = builder.build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // There is an issue with Oauth2 redirect_uri in the swagger-ui if the path is docs without a trailing slash
  SwaggerModule.setup('docs/', app, document, {
    swaggerOptions: {
      initOAuth: {
        clientId: configService.get('AUTH0_CLIENT_ID'),
      },
    },
  });
};
