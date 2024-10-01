import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoListDocument } from '../schemas/todo-list.schema';
import { TodoList } from '../../domain/entities/todolist.entity';
import { TodoItem } from 'src/modules/todoitem/domain/entities/todoitem.entity';

@Injectable()
export class TodoListRepository {
  constructor(
    @InjectModel(TodoList.name)
    private readonly todoListModel: Model<TodoListDocument>,
  ) {}

  async findById(todoListId: string): Promise<TodoList> {
    const todoListDoc = await this.todoListModel.findById(todoListId).exec();

    return new TodoList(
      todoListDoc._id.toString(),
      todoListDoc.userId,
      todoListDoc.title,
      todoListDoc.todoItems.map(
        (item: any) =>
          new TodoItem(
            item._id.toString(),
            todoListDoc._id.toString(),
            item.title,
            item.description,
            item.priority,
          ),
      ),
    );
  }

  async save(todoList: TodoList): Promise<void> {
    await this.todoListModel.updateOne(
      { _id: todoList.id },
      {
        userId: todoList.userId,
        title: todoList.title,
        todoItems: todoList.todoItems.map((item) => ({
          _id: item.id,
          title: item.title,
          description: item.description,
          priority: item.priority,
        })),
      },
      { upsert: true },
    );
  }

  async delete(todoListId: string): Promise<void> {
    await this.todoListModel.deleteOne({ _id: todoListId }).exec();
  }
}
