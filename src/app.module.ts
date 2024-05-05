import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { HealthModule } from './core/health/health.module';
import { ConditionalModule, ConfigModule } from '@nestjs/config';
import { LoggerConfig } from './core/logger/logger.config';
import { PrimeModule } from './modules/prime/prime.module';
import { Auth0Module } from './modules/auth0/auth0.module';
import { join } from 'path';

const conditionalModules = [PrimeModule, Auth0Module];
const registerConditionalModules = conditionalModules.map((module) =>
  ConditionalModule.registerWhen(
    module,
    (env) =>
      env['MODULES_ENABLED']?.includes(module.name) ||
      env['MODULES_ENABLED'] === 'ALL',
  ),
);

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    LoggerConfig,
    HealthModule,
    ...registerConditionalModules,
  ],
})
export class AppModule {}
