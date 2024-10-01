import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoListCommand } from '../commands/update-todo-list.command';
import { TodoListRepository } from '../../infrastructure/repositories/todo-list.repository';

@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListHandler implements ICommandHandler<UpdateTodoListCommand> {
  constructor(private readonly todoListRepository: TodoListRepository) {}

  async execute(command: UpdateTodoListCommand): Promise<void> {
    const { userId, todoListId, title } = command;

    const todoList = await this.todoListRepository.findById(todoListId);
    
    if (!todoList || todoList.userId !== userId) {
      throw new Error('TodoList not found or access denied');
    }

    if (title) {
      todoList.title = title;
    }

    await this.todoListRepository.save(todoList);
  }
}
