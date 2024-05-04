import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { mainConfig } from './main.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  mainConfig(app);
  const port = Number.parseInt(process.env.PORT || '3000', 10);
  await app.listen(port);
}
bootstrap();
