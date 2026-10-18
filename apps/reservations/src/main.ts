import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);

  // use api prefix
  app.setGlobalPrefix('api/v1');

  // register the validation filters
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // 1. Retrieve the ConfigService instance from the application context
  const configService = app.get(ConfigService);

  // 2. Access your environment variables with optional type-safety
  const port = configService.getOrThrow<number>('PORT');

  await app.listen(port);
}
bootstrap();
