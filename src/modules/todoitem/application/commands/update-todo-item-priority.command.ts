export class UpdateTodoItemPriorityCommand {
  constructor(
    public readonly todoListId: string,
    public readonly todoItemId: string,
    public readonly newPriority: number,
  ) {}
}
