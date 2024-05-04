/* eslint-disable @typescript-eslint/ban-types */
import { Request } from 'express';

type ToObject<T> = T extends undefined ? {} : T;
type GenericParamsType = Record<string, string>;

/**
 * BodyType is the type of the body of the request
 * ParamsType is the type of the params included in the url.
 * QueryType is the type of the query params included in the url.
 */
export type RequestDescriptor<
  TBody = {},
  TParams extends GenericParamsType = {},
  TQuery = {},
> = {
  body?: TBody;
  params?: TParams;
  query?: TQuery;
};

export type Auth0User = {
  userId: string;
  permissions: string[];
};

export type AuthenticatedRequest<
  T extends RequestDescriptor = { body: {}; params: {}; query: {} },
> = Request<ToObject<T['params']>, any, T['body'], T['query']> & {
  user: Auth0User;
};
