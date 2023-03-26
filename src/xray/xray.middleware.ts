import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { express } from 'aws-xray-sdk';

@Injectable()
export class XRayMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    express.openSegment('demo-aws-app-runner');
    next();
  }
}
