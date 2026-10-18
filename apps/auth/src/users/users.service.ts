import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepository } from './users.repository';
import { UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    // hash the password
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.usersRepository.create(createUserDto);
  }

  async validateUser(email: string, password: string): Promise<UserDocument> {
    // fetch the user
    let user: UserDocument;
    try {
      user = await this.usersRepository.findOne({
        email,
      });
    } catch (err) {
      throw new UnauthorizedException(err);
    }

    // validate the passwords
    const isPasswordCorrect: boolean = await bcrypt.compare(
      password,
      user!.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return user;
  }
}
