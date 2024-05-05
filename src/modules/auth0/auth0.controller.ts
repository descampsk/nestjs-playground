import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizationGuard, PermissionsGuard } from './auth0.guard';
import { AuthenticatedRequest } from './auth0.types';
import { Auth0Service } from './auth0.service';

@ApiTags('auth0')
// To be able to create a route at the root level, we need to use the @Controller() decorator without any arguments.
@Controller('auth0')
export class Auth0Controller {
  constructor(private auth0Service: Auth0Service) {}

  // It seems there is a bug, as the Oauth Swagger redirect to /oauth2-redirect.html instead of /docs/oauth2-redirect.html
  // @Get('/oauth2-redirect.html')
  // swaggerOauth2Redirect(@Res() response: Response) {
  //   response.redirect('/docs/oauth2-redirect.html');
  // }

  @ApiBearerAuth('Auth0')
  @Get('/profile')
  @UseGuards(AuthorizationGuard)
  getProfile(@Req() request: AuthenticatedRequest) {
    return {
      message: 'You have successfully authenticated with Auth0',
      user: request.user,
    };
  }

  @ApiBearerAuth('Auth0')
  @Get('/users')
  @UseGuards(AuthorizationGuard, PermissionsGuard(['admin']))
  async listUsers() {
    const users = await this.auth0Service.getUsers();
    return {
      message: 'You have access to all users',
      users,
    };
  }
}
