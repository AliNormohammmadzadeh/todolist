import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserTodoListsQuery } from '../queries/get-todo-list.query';
import { Inject } from '@nestjs/common';
import { IUserRepository } from 'src/modules/user/domain/repositories/user.repository.interface';

@QueryHandler(GetUserTodoListsQuery)
export class GetUserTodoListsHandler
  implements IQueryHandler<GetUserTodoListsQuery>
{
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: GetUserTodoListsQuery): Promise<any> {
    const user = await this.userRepository.findById(query.userId);
    if (!user) {
      throw new Error('User not found');
    }

    return user.todoLists;
  }
}
