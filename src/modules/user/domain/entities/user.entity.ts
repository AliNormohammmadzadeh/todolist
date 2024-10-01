import { TodoList } from 'src/modules/todolist/domain/entities/todolist.entity';

export class User {
  constructor(
    public readonly id: string,
    public username: string,
    public password: string,
    public todoLists: TodoList[] = [],
  ) {}

  addTodoList(todoList: TodoList): void {
    this.todoLists.push(todoList);
  }

  removeTodoList(todoListId: string): void {
    this.todoLists = this.todoLists.filter(
      (todoList) => todoList.id !== todoListId,
    );
  }
}
