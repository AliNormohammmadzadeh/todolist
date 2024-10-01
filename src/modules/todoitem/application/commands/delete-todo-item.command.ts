export class DeleteTodoItemCommand {
  constructor(
    public readonly userId: string,
    public readonly todoListId: string,
    public readonly todoItemId: string,
  ) {}
}
