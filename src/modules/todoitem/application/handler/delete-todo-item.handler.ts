import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoItemRepository } from '../../infrastructure/repositories/todo-item.repository';
import { DeleteTodoItemCommand } from '../commands/delete-todo-item.command';

@CommandHandler(DeleteTodoItemCommand)
export class DeleteTodoItemHandler
  implements ICommandHandler<DeleteTodoItemCommand>
{
  constructor(private readonly todoItemRepository: TodoItemRepository) {}

  async execute(command: DeleteTodoItemCommand): Promise<void> {
    await this.todoItemRepository.deleteTodoItem(
      command.userId,
      command.todoListId,
      command.todoItemId,
    );
  }
}
