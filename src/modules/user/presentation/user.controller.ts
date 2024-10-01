import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../application/dtos/create-user.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../application/commands/create-user.command';

@Controller('users')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() createUserDto: CreateUserDto) {
    await this.commandBus.execute(
      new CreateUserCommand(createUserDto.username, createUserDto.password),
    );
    return { message: 'User registered successfully' };
  }
}
