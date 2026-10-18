import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';
import { LoginUserDto } from '../users/dtos/login-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(loginUserDto: LoginUserDto): Promise<UserDocument> {
    const user: UserDocument = await this.usersService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );

    return user;
  }
}
