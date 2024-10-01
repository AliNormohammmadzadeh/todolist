export class TodoItemAddedEvent {
  constructor(
    public readonly todoListId: string,
    public readonly todoItemId: string,
  ) {}
}
