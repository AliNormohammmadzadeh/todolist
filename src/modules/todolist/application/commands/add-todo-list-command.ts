export class AddTodoListCommand {
  constructor(
    public readonly userId: string,
    public readonly title: string,
  ) {}
}
