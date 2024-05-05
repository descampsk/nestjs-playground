import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  InternalServerErrorException,
  ForbiddenException,
  UnauthorizedException,
  Type,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { auth0ConfigRegistered } from './auth0.config';
import { Request, Response } from 'express';
import {
  auth,
  InvalidTokenError,
  UnauthorizedError,
  claimCheck,
  InsufficientScopeError,
} from 'express-oauth2-jwt-bearer';
import { promisify } from 'util';
import { AuthenticatedRequest } from './auth0.types';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    @Inject(auth0ConfigRegistered.KEY)
    private auth0Config: ConfigType<typeof auth0ConfigRegistered>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const response = context.switchToHttp().getResponse<Response>();

    const validateAccessToken = promisify(
      auth({
        audience: this.auth0Config.audience,
        issuerBaseURL: this.auth0Config.issuerBaseUrl,
        tokenSigningAlg: 'RS256',
      }),
    );

    try {
      await validateAccessToken(request, response);
      const { auth } = request;
      request.user = {
        userId: auth!.payload.sub!,
        permissions: auth!.payload.permissions as string[],
      };

      return true;
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        throw new UnauthorizedException('Bad credentials');
      }

      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedException('Requires authentication');
      }

      throw new InternalServerErrorException();
    }
  }
}

function createPermissionsGuard(
  requiredRoutePermissions: string[],
): Type<CanActivate> {
  @Injectable()
  class PermissionsGuardImpl implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const response = context.switchToHttp().getResponse<Response>();

      const permissionCheck = promisify(
        claimCheck((payload) => {
          const permissionsJwtClaim =
            (payload.permissions as string[] | undefined) || [];

          const hasRequiredRoutePermissions = requiredRoutePermissions.every(
            (requiredRoutePermission) =>
              permissionsJwtClaim.includes(requiredRoutePermission),
          );

          if (!hasRequiredRoutePermissions) {
            throw new InsufficientScopeError();
          }

          return hasRequiredRoutePermissions;
        }),
      );

      try {
        await permissionCheck(request, response);

        return true;
      } catch (error) {
        throw new ForbiddenException('Permission denied');
      }
    }
  }

  return PermissionsGuardImpl;
}

export const PermissionsGuard = (
  routePermissions: string[],
): Type<CanActivate> => createPermissionsGuard(routePermissions);
