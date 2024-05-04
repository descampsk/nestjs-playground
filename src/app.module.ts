import { Module } from '@nestjs/common';
import { HealthModule } from './core/health/health.module';
import { ConditionalModule, ConfigModule } from '@nestjs/config';
import { LoggerConfig } from './core/logger/logger.config';
import { PrimeModule } from './prime/prime.module';
import { Auth0Module } from './auth0/auth0.module';

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
