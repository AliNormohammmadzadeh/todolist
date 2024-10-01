import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import {
  TodoItem,
  TodoItemSchema,
} from './infrastructure/schemas/todo-item.schema';
import { AddTodoItemHandler } from './application/handler/add-todo-item.handler';
import { TodoItemRepository } from './infrastructure/repositories/todo-item.repository';
import { TodoItemController } from './presentation/todo-item.controller';
import { DeleteTodoItemHandler } from './application/handler/delete-todo-item.handler';
import { GetTodoItemHandler } from './application/handler/get-todo-item.handler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UpdateTodoItemHandler } from './application/handler/update-todo-item-priority.handler';
import { UserModule } from '../user/user.module';
import {
  TodoList,
  TodoListSchema,
} from '../todolist/infrastructure/schemas/todo-list.schema';
import { TodoListModule } from '../todolist/todolist.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TodoItem.name, schema: TodoItemSchema },
      { name: TodoList.name, schema: TodoListSchema },
    ]),
    CqrsModule,
    EventEmitterModule.forRoot(),
    UserModule,
    TodoListModule
  ],
  controllers: [TodoItemController],
  providers: [
    TodoItemRepository,
    AddTodoItemHandler,
    UpdateTodoItemHandler,
    GetTodoItemHandler,
    DeleteTodoItemHandler,
  ],
})
export class TodoItemModule {}
