import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';
import { AddTodoListCommand } from '../commands/add-todo-list-command';
import { UserRepository } from 'src/modules/user/infrastructure/repositories/user.repository';
import { TodoList } from '../../domain/entities/todolist.entity';

@CommandHandler(AddTodoListCommand)
export class AddTodoListHandler implements ICommandHandler<AddTodoListCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: AddTodoListCommand): Promise<any> {
    const user = await this.userRepository.findById(command.userId);
    if (!user) {
      throw new Error('User not found');
    }

    const todoList = new TodoList(uuidv4(), command.userId, command.title, []);

    user.addTodoList(todoList);
    await this.userRepository.update(user);

    return todoList;
  }
}
