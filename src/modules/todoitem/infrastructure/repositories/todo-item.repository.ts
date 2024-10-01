import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoItem } from '../schemas/todo-item.schema';
import { TodoListDocument } from 'src/modules/todolist/infrastructure/schemas/todo-list.schema';

@Injectable()
export class TodoItemRepository {
  constructor(
    @InjectModel('TodoList') private readonly todoListModel: Model<TodoListDocument>,) {}

  async createTodoItem(
    userId: string,
    todoListId: string,
    title: string,
    description: string,
    priority: number,
  ): Promise<TodoItem> {
    const todoList = await this.todoListModel.findOne({ _id: todoListId, userId }).exec();

    if (!todoList) {
      throw new Error('TodoList not found or access denied');
    }

    const newItem = {
      _id: new this.todoListModel().id,
      title,
      description,
      priority,
    };

    todoList.todoItems.push(newItem as any);

    await todoList.save();

    return newItem as any; 
  }

  async updatePriority(
    userId: string,
    todoListId: string,
    todoItemId: string,
    newPriority: number
  ): Promise<void> {
    await this.todoListModel.updateOne(
      { _id: todoListId, userId, 'todoItems._id': todoItemId },
      { $set: { 'todoItems.$.priority': newPriority } }
    ).exec();
  }

  async updateTodoItem(
    userId: string,
    todoListId: string,
    todoItemId: string,
    title?: string,
    description?: string,
    priority?: number
  ): Promise<void> {
    const updateFields: any = {};
    if (title) updateFields['todoItems.$.title'] = title;
    if (description) updateFields['todoItems.$.description'] = description;
    if (priority) updateFields['todoItems.$.priority'] = priority;

    await this.todoListModel.updateOne(
      { _id: todoListId, userId, 'todoItems._id': todoItemId },
      { $set: updateFields }
    ).exec();
  }

  async findById(userId: string, todoListId: string, todoItemId: string){
    const todoList = await this.todoListModel.findOne(
      { _id: todoListId, userId, 'todoItems._id': todoItemId },
      { 'todoItems.$': 1 } 
    ).exec();

    if (!todoList || !todoList.todoItems.length) {
      return null;
    }

    return todoList.todoItems[0] as any;
  }

  async deleteTodoItem(userId: string, todoListId: string, todoItemId: string): Promise<void> {
    await this.todoListModel.updateOne(
      { _id: todoListId, userId }, 
      { $pull: { todoItems: { _id: todoItemId } } } 
    ).exec();
  }
}
