import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddTodoItemCommand } from '../commands/add-todo-item.command';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TodoListRepository } from 'src/modules/todolist/infrastructure/repositories/todo-list.repository';
import { TodoItemAddedEvent } from 'src/core/domain/events/todo-item-add-event';
import { TodoItem } from '../../domain/entities/todoitem.entity';
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(AddTodoItemCommand)
export class AddTodoItemHandler implements ICommandHandler<AddTodoItemCommand> {
  constructor(
    private readonly todoListRepository: TodoListRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: AddTodoItemCommand): Promise<void> {
    const todoList = await this.todoListRepository.findById(command.todoListId);
    
    const todoItem = new TodoItem(
      uuidv4(),
      command.todoListId, 
      command.title,
      command.description,
      command.priority,
    );

    todoList.addTodoItem(todoItem);
    await this.todoListRepository.save(todoList);

    this.eventEmitter.emit(
      'todo-item.added',
      new TodoItemAddedEvent(todoList.id, todoItem.id),
    );
  }
}
