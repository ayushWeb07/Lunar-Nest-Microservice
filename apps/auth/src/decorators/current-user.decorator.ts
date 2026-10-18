import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../users/schemas/user.schema';
import type { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserDocument => {
    const req: Request = context.switchToHttp().getRequest();
    return req.user as UserDocument;
  },
);
