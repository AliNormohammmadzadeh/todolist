import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoItemCommand } from '../commands/update-todo-item.command';
import { TodoItemRepository } from '../../infrastructure/repositories/todo-item.repository';

@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemHandler implements ICommandHandler<UpdateTodoItemCommand> {
  constructor(private readonly todoItemRepository: TodoItemRepository) {}

  async execute(command: UpdateTodoItemCommand): Promise<void> {
    await this.todoItemRepository.updateTodoItem(
      command.userId,
      command.todoListId,
      command.todoItemId,
      command.title,
      command.description,
      command.priority
    );
  }
}
