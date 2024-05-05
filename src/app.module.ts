import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { HealthModule } from './core/health/health.module';
import { ConditionalModule, ConfigModule } from '@nestjs/config';
import { LoggerConfig } from './core/logger/logger.config';
import { PrimeModule } from './modules/prime/prime.module';
import { Auth0Module } from './modules/auth0/auth0.module';
import { join } from 'path';

/**
 * Here you can add the conditional modules that you want to enable based on the environment variable MODULES_ENABLED.
 */
const conditionalModules = [PrimeModule, Auth0Module];

/**
 * @ignore
 */
const registerConditionalModules = conditionalModules.map((module) =>
  ConditionalModule.registerWhen(
    module,
    (env) =>
      env['MODULES_ENABLED']?.includes(module.name) ||
      env['MODULES_ENABLED'] === 'ALL',
  ),
);

/**
 * The main application module with:
 * - ServeStaticModule is used to serve the compodoc documentation.
 * - ConfigModule is used to load the configuration from the environment variables.
 * - LoggerConfig is used to configure the logger.
 * - HealthModule is used to provide a health check endpoint.
 * - registerConditionalModules is used to register the conditional modules based on the environment variable MODULES_ENABLED.
 */
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'compodoc'),
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
