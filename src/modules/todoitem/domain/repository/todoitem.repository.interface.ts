import { TodoItem } from '../entities/todoitem.entity';

export interface ITodoItemRepository {
  findById(id: string): Promise<TodoItem | null>;
  findByTodoListId(todoListId: string): Promise<TodoItem[]>;
  save(todoItem: TodoItem): Promise<void>;
  update(todoItem: TodoItem): Promise<void>;
  delete(id: string): Promise<void>;
}
