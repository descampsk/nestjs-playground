import * as expressOauth2JwtBearer from 'express-oauth2-jwt-bearer';

export const mockAuth0Guard = (user: {
  email: string;
  permissions: string[];
}) => {
  const auth0MockGuard = jest
    .spyOn(expressOauth2JwtBearer, 'auth')
    .mockImplementation(() => (req, res, next) => {
      req.auth = {
        payload: {
          [`${process.env.AUTH0_AUDIENCE}/email`]: user.email,
          permissions: user.permissions,
        },
      } as unknown as expressOauth2JwtBearer.AuthResult;
      next();
    });
  return auth0MockGuard;
};
