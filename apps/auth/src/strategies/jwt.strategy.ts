import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let token: string | null = null;

          if (request && request.cookies) {
            token = request.cookies['authentication'];
          }

          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(payload: ITokenPayload): Promise<UserDocument> {
    let user: UserDocument;

    try {
      user = await this.usersService.findById({
        id: payload.userId,
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired token has been provided');
    }

    return user;
  }
}
