import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { User } from '../../domain/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { username, password } = command;

    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException('Username already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(uuidv4(), username, hashedPassword);
    await this.userRepository.save(user);
  }
}
