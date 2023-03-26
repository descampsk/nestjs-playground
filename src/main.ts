import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { XRayInterceptor } from './xray/xray.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new XRayInterceptor(app.get(HttpAdapterHost)));
  await app.listen(3000);
}
bootstrap();
