export class TodoItem {
  constructor(
    public readonly id: string,
    public todoListId: string,
    public title: string,
    public description: string,
    public priority: number,
  ) {}

  updatePriority(newPriority: number): void {
    this.priority = newPriority;
  }
}
