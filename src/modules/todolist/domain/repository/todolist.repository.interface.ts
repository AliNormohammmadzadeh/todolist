import { TodoList } from '../entities/todolist.entity';

export interface ITodoListRepository {
  findById(id: string): Promise<TodoList | null>;
  findByUserId(userId: string): Promise<TodoList[]>;
  save(todoList: TodoList): Promise<void>;
  update(todoList: TodoList): Promise<void>;
  delete(id: string): Promise<void>;
}
