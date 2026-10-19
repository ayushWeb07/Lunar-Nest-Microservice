import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { IUserDto } from '@app/shared/dtos';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IUserDto => {
    const req: Request = context.switchToHttp().getRequest();
    return req.user as IUserDto;
  },
);
