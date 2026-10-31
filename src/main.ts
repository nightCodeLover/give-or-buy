import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { nestCsrf } from 'ncsrf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(helmet());

  app.use(cookieParser());

  app.use(nestCsrf());

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
