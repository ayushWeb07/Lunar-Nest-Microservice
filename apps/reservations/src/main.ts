import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

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

  // setup other middlewares
  app.use(cookieParser());

  // retrieve the ConfigService instance from the application context
  const configService = app.get(ConfigService);

  // access your environment variables with optional type-safety
  const port = configService.getOrThrow<number>('PORT');

  await app.listen(port);
}
bootstrap();
