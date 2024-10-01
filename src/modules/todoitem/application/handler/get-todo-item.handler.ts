import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoItemRepository } from '../../infrastructure/repositories/todo-item.repository';
import { GetTodoItemQuery } from '../queries/get-todo-item.query';

@QueryHandler(GetTodoItemQuery)
export class GetTodoItemHandler implements IQueryHandler<GetTodoItemQuery> {
  constructor(private readonly todoItemRepository: TodoItemRepository) {}

  async execute(query: GetTodoItemQuery): Promise<any> {
    return this.todoItemRepository.findById(query.userId, query.todoListId, query.todoItemId);
  }
}
