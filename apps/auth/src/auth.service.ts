import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from './users/schemas/user.schema';
import type { Response } from 'express';
import { ITokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserDocument, res: Response) {
    // create the payload
    const payload: ITokenPayload = {
      userId: user._id.toHexString(),
    };

    // set the expiration
    const expiryTime = new Date();
    expiryTime.setSeconds(
      expiryTime.getSeconds() +
        this.configService.getOrThrow<number>('JWT_EXPIRATION'),
    );

    // create the token and set in cookies
    const token: string = await this.jwtService.signAsync(payload);

    res.cookie('authentication', token, {
      httpOnly: true,
      expires: expiryTime,
    });
  }
}
