import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { catchError, map, Observable, tap } from 'rxjs';
import type { Request } from 'express';
import { AUTH_SERVICE_PROVIDER } from '@app/shared/auth/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { IUserDto } from '@app/shared/dtos';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE_PROVIDER) private readonly authClient: ClientProxy,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // fetch token from request cookies
    const request: Request = context.switchToHttp().getRequest();
    const token: string | null = request?.cookies?.['authentication'];

    if (!token) return false;

    // validate the cookie from the auth service
    return this.authClient
      .send<IUserDto>('validateToken', {
        authentication: token,
      })
      .pipe(
        tap((user: IUserDto): void => {
          request.user = user;
        }),
        map((): boolean => true),
        catchError(() => {
          throw new UnauthorizedException(
            'Incorrect or expired token has been provided',
          );
        }),
      );
  }
}
