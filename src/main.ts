import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { AppModule } from './app.module';
import { XRayInterceptor } from './xray/xray.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(
    new LoggerErrorInterceptor(),
    new XRayInterceptor(app.get(HttpAdapterHost)),
  );
  const port = Number.parseInt(process.env.PORT || '3000', 10);
  await app.listen(port);
}
bootstrap();
