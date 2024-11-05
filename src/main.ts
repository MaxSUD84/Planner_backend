import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import { join } from 'node:path';
import { json } from 'express';
import { ConfigService } from '@nestjs/config';
import { allowedHeaders, methods } from './config/auth.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');

  /** Config Service */
  const config = app.get(ConfigService);
  const origin = config.get<string>('ALLOW_ORIGINS').split(',');

  /** CORS */
  app.enableCors({
    origin,
    allowedHeaders,
    methods,
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  app.use(json({ limit: '100mb' }));

  /** Main Api Port */
  const port = config.get<number>('API_PORT', 5000);

  /** Global validation */
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();

  /** Shared static files */
  // app.useStaticAssets(join(process.cwd(), 'public'));

  await app.listen(port, () => {
    Logger.log(`Main app started on "${port}" port`, 'MAIN');
  });
}
bootstrap();
