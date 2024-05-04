import { registerAs } from '@nestjs/config';

export interface Auth0ConfigEnv {
  AUTH0_ISSUER_BASE_URL: string;
  AUTH0_DOMAIN: string;
  AUTH0_AUDIENCE: string;
  AUTH0_CLIENT_ID: string;
  AUTH0_CLIENT_SECRET: string;
}

export const auth0ConfigRegistered = registerAs('auth0', () => ({
  issuerBaseUrl: process.env.AUTH0_ISSUER_BASE_URL!,
  domain: process.env.AUTH0_DOMAIN!,
  audience: process.env.AUTH0_AUDIENCE!,
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
}));
