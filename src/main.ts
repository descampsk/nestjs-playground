import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { mainConfig } from './main.config';
import { type NestExpressApplication } from '@nestjs/platform-express';

/**
 * The main function to bootstrap the application.
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  mainConfig(app);
  const port = Number.parseInt(process.env.PORT ?? '3000', 10);
  await app.listen(port);
}
void bootstrap();
