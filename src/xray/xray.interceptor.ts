import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { express } from 'aws-xray-sdk';
import { HttpAdapterHost } from '@nestjs/core';

@Injectable()
export class XRayInterceptor implements NestInterceptor {
  constructor(private readonly httpAdapter: HttpAdapterHost) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        tap(() => this.httpAdapter.httpAdapter.use(express.closeSegment())),
      );
  }
}
