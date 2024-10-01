import { TodoItem } from 'src/modules/todoitem/domain/entities/todoitem.entity';

export class TodoList {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public title: string,
    public todoItems: TodoItem[] = [],
  ) {}

  addTodoItem(todoItem: TodoItem): void {
    this.todoItems.push(todoItem);
    this.sortTodoItemsByPriority();
  }

  removeTodoItem(todoItemId: string): void {
    this.todoItems = this.todoItems.filter((item) => item.id !== todoItemId);
  }

  updateTodoItem(todoItem: TodoItem): void {
    const index = this.todoItems.findIndex((item) => item.id === todoItem.id);
    if (index !== -1) {
      this.todoItems[index] = todoItem;
    }
    this.sortTodoItemsByPriority();
  }

  private sortTodoItemsByPriority(): void {
    this.todoItems.sort((a, b) => a.priority - b.priority);
  }
}
