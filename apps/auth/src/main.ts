import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  // retrieve the ConfigService instance from the application context
  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: configService.getOrThrow<string>('HOST'),
      port: configService.getOrThrow<number>('TCP_PORT'),
    },
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

  // access your environment variables with optional type-safety
  const port = configService.getOrThrow<number>('HTTP_PORT');

  await app.startAllMicroservices();
  await app.listen(port);
}
bootstrap();
