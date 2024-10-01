import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoListSchema } from './infrastructure/schemas/todo-list.schema';
import { TodoItemSchema } from '../todoitem/infrastructure/schemas/todo-item.schema';
import { TodoList } from './domain/entities/todolist.entity';
import { TodoItem } from '../todoitem/domain/entities/todoitem.entity';
import { TodoListController } from './presentation/todo-list.controller';
import { TodoListRepository } from './infrastructure/repositories/todo-list.repository';
import { AddTodoItemHandler } from '../todoitem/application/handler/add-todo-item.handler';
import { UpdateTodoListHandler } from './application/handler/update-todo-list.handler';
import { GetUserTodoListsHandler } from './application/handler/get-todo-list.handler';
import { UserModule } from '../user/user.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TodoList.name, schema: TodoListSchema },
      { name: TodoItem.name, schema: TodoItemSchema },
    ]),
    CqrsModule,
    UserModule, 
  ],
  controllers: [TodoListController],
  providers: [
    TodoListRepository,
    AddTodoItemHandler,
    UpdateTodoListHandler,
    GetUserTodoListsHandler,
  ],
  exports: [
    TodoListRepository,
  ],
})
export class TodoListModule {}
