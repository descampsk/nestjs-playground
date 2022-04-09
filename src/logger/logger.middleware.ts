import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, path, query, params, body } = req;
    const message = `Receive ${method} ${url} request`;
    console.log({
      message,
      method,
      url,
      path,
      query,
      params,
      body,
    });
    next();
  }
}
