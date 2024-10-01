import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoListCommand } from '../commands/delete-todo-list.command';
import { TodoListRepository } from '../../infrastructure/repositories/todo-list.repository';

@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListHandler
  implements ICommandHandler<DeleteTodoListCommand>
{
  constructor(private readonly todoListRepository: TodoListRepository) {}

  async execute(command: DeleteTodoListCommand): Promise<void> {
    await this.todoListRepository.delete(command.todoListId);
  }
}
