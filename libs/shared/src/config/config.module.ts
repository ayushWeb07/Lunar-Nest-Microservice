import { Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';
import { z } from 'zod';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: z.object({
        MONGO_URI: z.string().nonempty(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
