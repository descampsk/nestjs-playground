import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { auth0ConfigRegistered } from './auth0.config';
import { ManagementClient } from 'auth0';

@Injectable()
export class Auth0Service {
  private readonly logger = new Logger(Auth0Service.name);

  private managementClient: ManagementClient;

  constructor(
    @Inject(auth0ConfigRegistered.KEY)
    private auth0Config: ConfigType<typeof auth0ConfigRegistered>,
  ) {
    this.managementClient = new ManagementClient({
      domain: this.auth0Config.domain,
      clientId: this.auth0Config.clientId,
      clientSecret: this.auth0Config.clientSecret,
    });
  }

  public async getUsers() {
    return this.managementClient.users.getAll();
  }
}
