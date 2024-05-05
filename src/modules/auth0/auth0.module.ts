import { Module } from '@nestjs/common';
import { Auth0Service } from './auth0.service';
import { Auth0Controller } from './auth0.controller';
import { ConfigModule } from '@nestjs/config';
import { auth0ConfigRegistered } from './auth0.config';

@Module({
  imports: [ConfigModule.forFeature(auth0ConfigRegistered)],
  providers: [Auth0Service],
  controllers: [Auth0Controller],
})
export class Auth0Module {}
