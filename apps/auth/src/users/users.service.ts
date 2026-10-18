import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepository } from './users.repository';
import { UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { FindByIdDto } from './dtos/find-by-id.dto';

@Injectable()
export class UsersService {
  constructor(
    private logger: Logger,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    // check if such user already exists
    const userExists: boolean = await this.usersRepository
      .findOne({
        email: createUserDto.email,
      })
      .then(() => true)
      .catch(() => false);

    if (userExists) {
      throw new ConflictException('User with such email already exists');
    }

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
    } catch {
      throw new UnauthorizedException('Credentials are not valid');
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

  async findById(findByIdDto: FindByIdDto): Promise<UserDocument> {
    return this.usersRepository.findOne({
      _id: findByIdDto.id,
    });
  }
}
