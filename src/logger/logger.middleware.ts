import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @InjectPinoLogger(LoggerMiddleware.name)
    private readonly logger: PinoLogger,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, path, query, params, body } = req;
    const message = `Receive ${method} ${url} request`;
    this.logger.info({
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
