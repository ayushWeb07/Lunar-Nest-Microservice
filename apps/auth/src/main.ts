import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
  });

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

  // 1. Retrieve the ConfigService instance from the application context
  const configService = app.get(ConfigService);

  // 2. Access your environment variables with optional type-safety
  const port = configService.getOrThrow<number>('PORT');

  await app.startAllMicroservices();
  await app.listen(port);
}
bootstrap();
